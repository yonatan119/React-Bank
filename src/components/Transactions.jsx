import React, { Component } from 'react';
import Transaction from './Transaction'
class Transactions extends Component {
    


  render() {
      return (
        this.props.transaction.map( t => 
      <div className="transactions" >
          <Transaction data={t} key={Math.random()} id={Math.random()} deleteTransaction = {this.props.deleteTransaction} key={Math.random()}/>
      </div>
    ));
  }
}
export default Transactions;
