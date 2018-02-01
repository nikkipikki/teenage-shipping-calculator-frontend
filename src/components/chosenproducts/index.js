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
          <div className="nameandnumber">
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
        {/* {this.state.isHidden && */}
        <div className="chosenproducts" id="chosen">
          <h1 className="chosenproductsheader"> calculating products: {this.props.chosenProducts.length}</h1>
          <h1>add quantity:</h1>
          <div className="printednames">
            <p>{this.printNames()}</p>
            <div className="shipbuttoncontainer">
              <button className="shipbutton grow" onClick={this.toggleHidden} />
            </div>
          </div>
          <a href="#home">
            <div className="deletebuttoncontainer">
              <button className="deletebutton" onClick={this.onClickClear} />
            </div>
          </a>
        </div>
        {/* } */}
        {!this.state.isHidden && <Calculator
          chosenProducts={this.props.chosenProducts}
          values={this.state.quantity} />}
        {/* {this.state.isHidden && */}
        {/* } */}
      </div>
    )
  }
}

export default Chosenproducts
