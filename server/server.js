const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = express.Router()
const app = express()
const port = 8080
const Transaction = require("./Schema")

mongoose.connect('mongodb://localhost:27017/ReactBank', {useNewUrlParser: true});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/transactions', async function(req,res){
    const transactions = await Transaction.find({})
    res.send(transactions)
})

app.post('/transaction', async function (req,res){
    const newTransaction = new Transaction(req.body)
    await newTransaction.save()
    res.send(newTransaction)

})
app.delete('/transaction/:amount/:vendor/:category',function(req,res){
    const transaction = req.params
    Transaction.findOneAndDelete({amount:transaction.amount, vendor:transaction.vendor, category:transaction.category})
    .then((response) => res.send(response))
})

app.listen(port, function( ) {
console.log(`listening on ${port}`)
})