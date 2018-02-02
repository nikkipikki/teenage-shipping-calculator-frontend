import React from "react"
import "./style.css"
import Calculator from "../calculator"

class Chosenproducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHidden: true,
      quantity: []
    }
  }

toggleHidden = () => {
  this.setState({
    isHidden: !this.state.isHidden
  })
}

getcalculateButtonText = () => {
  if (this.state.isHidden) {
    return "calculate"
  } else {
    return "re-count"
  }
}

onClickClear = () => {
  this.props.onClear(this.props.index)
}

handleInputQty = (event, productName) => {
  const tuple = {
    name: productName,
    quantity: event.target.value
  }
  if (this.state.quantity.find(item => (
    item.name === productName
  ))) {
    this.setState(prevState => {
      const array = prevState.quantity.map(item => {
        if (item.name === productName) {
          item.quantity = tuple.quantity
        }
        return item
      })
      return {
        quantity: array
      }
    })
  } else {
    this.setState(prevState => ({
      quantity: [...prevState.quantity, tuple]
    }))
  }
}

  printNames = () => ((
    <div>
      {this.props.chosenProducts.map(product => (
        <div>
          <div className="nameandnumber" id="fontsize20">
            <p>{product.name}</p>
            <div>
              <input
                onChange={event => this.handleInputQty(event, product.name)}
                type="number"
                min="1"
                max="20" />
            </div>
          </div>
        </div>

      ))}
    </div>
  ))

  render() {
    return (
      <div>
        {!this.state.isHidden && <Calculator
          chosenProducts={this.props.chosenProducts}
          values={this.state.quantity} />}
        <div className="chosenproducts" id="chosen">
          <h1 id="underline">add boxes:</h1>
          <div className="printednames">
            <p>{this.printNames()}</p>
            <a href="#scrolldown">
              <div className="shipbuttoncontainer">
                <button className="shipbutton grow3" onClick={this.toggleHidden}>
                  <p id="calculatetext"> {this.getcalculateButtonText()}</p>
                </button>
              </div>
            </a>
          </div>
          <a href="#home">
            <div className="deletebuttoncontainer" id="scrolldown">
              <button className="deletebutton" onClick={this.onClickClear} />
            </div>
          </a>
        </div>
      </div>
    )
  }
}

export default Chosenproducts
