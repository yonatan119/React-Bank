
import React, { Component } from 'react';
import '../App.css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class Transaction extends Component {
    
    delete = () =>{
          this.props.deleteTransaction(this.props.data)
          alert('Deleted transaction')
      }

  render() {
     const t = this.props.data
    return (
      <div className="App" >
          <div id="Transaction"> {t.amount}₪ | {t.vendor} | {t.category}
          <DeleteForeverIcon id="delete" onClick={this.delete}></DeleteForeverIcon>
          </div>
      </div>
    );
  }
}
export default Transaction;
