import React, { Component } from 'react';
import './App.css';
import Transactions from './components/Transactions'
import Operations from './components/Operations'
import axios from '../node_modules/axios/dist/axios'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import logo from './Assets/deposit.svg'
class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: []
    }
  }

  getTransactions = async () => {
    return await axios.get("http://localhost:8080/transactions")
  }

  async componentDidMount() {
    const response = await this.getTransactions()
    this.setState({ transactions: response.data })
  }

  reducer = (accumulator, currentValue) => accumulator + currentValue;

  addTransaction = async (data) => {
    const response = await axios.post(`http://localhost:8080/transaction`, data)
    const newTransactions = [...this.state.transactions]
    newTransactions.push(response.data)
    this.setState({ transactions: newTransactions })
  }

  deleteTransaction = async (data) => {
    console.log(data)
    const response = await axios.delete(`http://localhost:8080/transaction/${data.amount}/${data.vendor}/${data.category}`)
    const indexToDelete = this.state.transactions.findIndex(t => t._id === response.data._id)
    const newTransactions = [...this.state.transactions]
    newTransactions.splice(indexToDelete, 1)
    this.setState({ transactions: newTransactions })
  }

  render() {
    const balance = this.state.transactions.map(a => a.amount).reduce(this.reducer, 0)
    return (
      <Router>
        <div id = "background">
        <div className="App">
          <div className="main-links"></div>
          <nav>
            <div class="nav-wrapper blue">
              <div className="container">
              <a href="" className="brand-logo center">{<img src={logo}></img>}React-Bank</a>
              <ul className="left hide-on-med-and-down">
                <li><a href="sass.html"></a><Link to='/transactions'>Transactions</Link></li>
                <li><a href="badges.html"></a><Link to='/operations'>Operations</Link></li>
                <li className="active"><a href="collapsible.html"></a></li>
              </ul>
              </div>
            </div>
          </nav>
          
          
          <div className="balance"> {balance}₪</div>
          <Route path="/operations" exact render={() => <Operations addTransaction={this.addTransaction} key={Math.random()} />}></Route>
          <Route path="/transactions" exact render={() => <Transactions key={Math.random()} transaction={this.state.transactions} deleteTransaction={this.deleteTransaction} />}></Route>
        </div>
      </div>
      </Router>
    );
  }
}
export default App;
