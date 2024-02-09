const express = require('express')
const expensesController = require('../controllers/expensesController')

const router = express.Router()

router.route('/')
    .get(expensesController.getAll)
    .post(expensesController.create)

router.route('/:id')
    .patch(expensesController.update)
    .delete(expensesController.remove)

router.route('/get-over-period')
    .post(expensesController.getOverPeriod)

router.route('/sum-over-period')
    .post(expensesController.sumOverPeriod)

module.exports = router
