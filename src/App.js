import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyItems: ['milk', 'bread', 'fruits'],
      message: ''
    }
  }

  addItem(event) {
    event.preventDefault()
    const { buyItems } = this.state;
    const newItem = this.newItem.value;

    const isOnTheList = buyItems.includes(newItem)

    if (isOnTheList) {
      this.setState({
        message: 'This item is already on the list'
      })
    } else {
      newItem !== '' & this.setState({
        buyItems: [...this.state.buyItems, newItem],
        message: ''
      })
    }
    this.addForm.reset()
  }

  removeItem(item){
    const newBuyItems = this.state.buyItems.filter(buyItems => {
      return item !== buyItems
    })

    this.setState({
      buyItems: [...newBuyItems]
    })

    if(newBuyItems.length === 0){
      this.setState({
        message: 'No Item on the list, add some'
      })
    }
  }

  clearAll(){
    this.setState({
      buyItems: [],
      message: 'No Item on the list, add some'
    })
  }


  render() {
    const { buyItems, message } = this.state
    return (
      <div className="container">
        <h1>Shopping List</h1>
        <div className="content">

          <form ref={input => {this.addForm = input}} className="form-inline" onSubmit={this.addItem.bind(this)}>
            <div className="form-group">
              <label htmlFor="newItemInput" className="sr-only">Add New Item</label>
              <input ref={input => {this.newItem = input}}
                type="text" className="form-control" id="newItemInput" />
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
          {
            (message !== '' || buyItems.length === 0) && <p className="message text-danger">{message}</p>
          }
        {
          buyItems.length > 0 &&
        <table className="table">
          <caption>Shopping List</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              buyItems.map(item => {
                return (
                  <tr key={item}>
                    <th scope="row">1</th>
                    <td>{item}</td>
                    <td>
                      <button onClick={(e) => this.removeItem(item)}  type="button" className="btn btn-default btn-sm">
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">&nbsp;</td>
              <td>
                <button onClick={(e) => this.clearAll()}
                className="btn btn-default btn-sm">Clear List</button>
              </td>
            </tr>
          </tfoot>
        </table>
        }
        </div>
      </div>
    );
  }
}

export default App;