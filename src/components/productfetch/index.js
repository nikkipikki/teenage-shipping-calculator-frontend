import React from "react"
import Product from "../product"
import "./style.css"
import Header from "../header"
import Chosenproducts from "../chosenproducts"

class Productfetch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      chosenproducts: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/products").then(response => (
      response.json()
    )).then(json => {
      this.setState({
        products: json
      })
    })
  }

  handleClearAll = () => {
    this.setState({
      chosenproducts: []
    })
  }

  addProductCallback = product => {
    this.setState({
      chosenproducts: [...this.state.chosenproducts, product]
    })
  }

  removeProductCallback = product => {
    this.setState(prevState => ({
      chosenproducts: this.removeFromChosenProducts(prevState, product)
    }))
  }

  removeFromChosenProducts = (prevState, product) => {
    prevState.chosenproducts.splice(prevState.chosenproducts.indexOf(product), 1)
    return prevState.chosenproducts
  }

  render() {
    return (
      <div>
        <Header
          chosenProducts={this.state.chosenproducts}
          productLength={this.state.products.length} />
        <div className="container">
          {this.state.products.map(product => (
            <Product
              product={product}
              chosenCallback={this.addProductCallback}
              removeCallback={this.removeProductCallback}
              chosenProducts={this.state.chosenproducts} />
          ))}
        </div>
        {this.state.chosenproducts.length > 0 &&
          <Chosenproducts
            onClear={this.handleClearAll}
            chosenProducts={this.state.chosenproducts} />}
      </div>

    )
  }

}

export default Productfetch
