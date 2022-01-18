const { Router } = require('express')
const express = require('express')
const router = express.Router()

const { 
    getAccounts, 
    getAccountById,
    createAccount,
    updateAccount
} = require('../controllers/accounts')

router.route('/').get(getAccounts).post(createAccount)
router.route('/:accountId').get(getAccountById).put(updateAccount)

module.exports = router