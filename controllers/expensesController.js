const Expenses = require('../models/Expenses')

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

exports.create = async (req, res) => {
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
        data = await Expenses.find({
            createdAt: {
                $gte: new Date(req.body.from), 
                $lt: new Date(req.body.to),
            }
        })
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
    const records = await Expenses.find()
    let total = 0

    for (const record of records) {
        total += record.amount
    }

    res.status(200).json({
        status: 'success',
        data: total,
    })
}
