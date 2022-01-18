const { accountsTable } = require('../database')

getAccounts = (req, res) => {
    const { accountNumber } = req.query
    if(accountNumber){
        console.log(req.query)
        const accountNumber = req.query.accountNumber
        const fetchAccount =  accountsTable.filter((account) => {
            return account.accountNumber === Number(accountNumber)
        })
        const mapAccount = fetchAccount.map((account) => {
            const { accountNumber, accountBalance, accountOpeningDate, name } = account
            return { accountNumber, accountBalance, accountOpeningDate, name }
        })
        if(fetchAccount.length > 0){
            return res.json(mapAccount)
        }
        return res
            .status(404)
            .json({success : true, message : "No accounts match the account number provided."})
    }
    return res.status(200).json(accountsTable)    
}

getAccountById = (req, res) => {
    const accountId = req.params.accountId
    const fetchAccount =  accountsTable.filter((account) => {
        return account.accountId === Number(accountId)
    })
    const mapAccount = fetchAccount.map((account) => {
            const { accountNumber, name, accountBalance, accountOpeningDate} = account
            return { accountNumber, name, accountBalance, accountOpeningDate}
    })
    return res.json(mapAccount)
}

createAccount = (req, res) => {
    console.log(req.body)
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({success: false, message: "Empty object passed."})   
    }
    accountsTable.push(req.body)
    return res.status(201).json(req.body)
}

updateAccount = (req, res) => {
    const { accountId } = req.params
    if(req.body.name){
        theAccount = accountsTable.filter((account) => {
            return account.accountId == Number(accountId)
        })
        theAccount[0].name = req.body.name
        console.log(theAccount)
        return res.status(204).json()
    }
    return res.status(404).json({success:false, data : "Invalid payload."})
}

module.exports = 
{ 
    getAccounts, 
    getAccountById,
    createAccount,
    updateAccount
}