import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/Operations.css'
import Deposit from '@material-ui/icons/LocalAtmSharp'
import Payment from '@material-ui/icons/PaymentSharp'
class Operations extends Component {
    constructor() {
        super()
        this.state = {
            amount: "",
            vendor: "",
            category: "",
            changed: false
        }
    }
    handleInputChange = (event) => {
        const val = event.target.value;
        this.setState({ [event.target.name]: val });
    }
    clearInputFields = () => {
        this.setState({
          categoryInput:"",
          vendorInput:"",
          amountInput:0
        })
      }
    deposit = () =>{
        if(this.state.category && this.state.vendor && this.state.amount > 0){
          this.props.addTransaction({amount: parseInt(this.state.amount), vendor:this.state.vendor, category:this.state.category})
          alert('Added new deposit')
          this.clearInputFields()
          this.setState({changed:true})
        }
      }

    withdraw = () => {
        if(this.state.category && this.state.vendor && this.state.amount){
            this.props.addTransaction({amount: `-${parseInt(this.state.amount)}`, vendor:this.state.vendor, category:this.state.category})
            alert('Added new withdraw')
            this.clearInputFields()
            this.setState({changed:true})
          }
    }  
    render() {
        return (
            <div className="App">
                {this.state.changed ? <Redirect to="/transactions"></Redirect> : null}
                <input id="Amount" type="number" name={"amount"} placeholder="Amount" value={this.state.amount} onChange={this.handleInputChange}></input>
                <input id="Vendor" name={"vendor"} placeholder="Vendor" value={this.state.vendor} onChange={this.handleInputChange}></input>
                <input id="Category" name={"category"} placeholder="Category" value={this.state.category} onChange={this.handleInputChange} ></input>
                <div>
                <Deposit id="deposit" name={"deposit"} onClick = {this.deposit}></Deposit>
                <Payment id="withdraw" name={"withdraw"} onClick = {this.withdraw}></Payment>
                </div>
            </div>
        );
    }
}
export default Operations;
