const Expenses = require('../models/Expenses')
const MONTHLY_LIMIT = 100

exports.getAll = async (req, res) =>{
    try {
        const records = await Expenses.find()

        res.status(200).json({ 
            status: 'success',
            results: records.length,
            data: { records },
        })
    } catch(err) {
        res.status(404).json({
            status: 'failed',
            message: err.message,
        })
    } 
}

exports.update = async (req, res) => {
    try {
        const hotel = await Expenses.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(201).json({
            status: 'success',
            message: 'updated',
            data: {
                hotel
            },
        })
    } catch(err) {
        res.status(404).json({
            status: 'failed',
            message: err.message,
        })
    }
}

exports.remove = async (req, res) => {
    try {
        await Expenses.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'success',
            message: 'deleted',
            data: null,
        })
    } catch(err) {
        res.status(404).json({
            status: 'failed',
            message: err.message,
        })
    }
}

exports.getOverPeriod = async (req, res) => {
    let data = []

    try {
        data = await getExpensesOverPeriod(req.body.from, req.body.to)
    } catch(err) {
        res.status(404).json({
            status: 'failed',
            message: err.message,
        })
    }

    res.status(200).json({
        status: 'success',
        data: data,
    })
}

exports.sumOverPeriod = async (req, res) => {
    const records = await getExpensesOverPeriod(req.body.from, req.body.to)
    
    res.status(200).json({
        status: 'success',
        data: {
            total: sumExpensesOverPeriod(records)
        },
    })
}

exports.create = async (req, res) => {
    const monthTotal = await getMonthExpenditure(new Date(req.body.createdAt))
  
    if (monthTotal > MONTHLY_LIMIT)
    {
        res.status(403).json({
            status: 'denied',
            message: 'limit reached',
        })

        return
    }

    try {
        const newRecord = await Expenses.create(req.body)

        res.status(201).json({
            status: 'success',
            message: 'created',
            data: newRecord,
        })
    } catch(err) {
        res.status(404).json({
            status: 'failed',
            message: err.message,
        })
    }
}

async function getExpensesOverPeriod(from, to) {
    return await Expenses.find({
        createdAt: {
            $gte: new Date(from), 
            $lt: new Date(to),
        }
    })
}

function sumExpensesOverPeriod(expenses)
{
    return expenses.reduce((n, { amount }) => n + amount, 0)
}

async function getMonthExpenditure(checkDate) {
    const firstDayOfMonth = new Date(checkDate.getFullYear(), checkDate.getMonth(), 1);
    const lastDayOfMonth = new Date(checkDate.getFullYear(), checkDate.getMonth() + 1, 0);

    const monthlyExpenses = await getExpensesOverPeriod(firstDayOfMonth, lastDayOfMonth)

    return sumExpensesOverPeriod(monthlyExpenses)
}
