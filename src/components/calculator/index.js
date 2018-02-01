import React from "react"
import "./style.css"

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      UpsUS: 0,
      UpsEU: 0,
      UpsWW: 0,
      FedexUS: 0,
      FedexEU: 0,
      FedexWW: 0
    }
  }

  printShip = () => ((
    <div>
      {this.props.values.map(p => (
        <div>
          <p>{p.name}</p>
          <p>{p.quantity}</p>
        </div>
      ))}
    </div>
  ))

  getVolume = name => {
    let findVolume = 0
    this.props.chosenProducts.map(product => {
      if (product.name === name) {
        findVolume = product.volume
      }
    })
    return findVolume
  }

  componentDidMount() {
    fetch("http://localhost:8080/calculate", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        products: Object.keys(this.props.values).map(index => ({
          name: this.props.values[index].name,
          volume: this.getVolume(this.props.values[index].name),
          qty: this.props.values[index].quantity
        }))
      })
    }).then(response => {
      return response.json()
    }).then(json => {
      console.log("Server Response...")
      console.log(json)
      this.calculateTotalShippingCost(json)
      // console.log(this.bestShipping)
      // this.bestShipping()
    })
  }

  calculateTotalShippingCost(shipping) {
    shipping.map(options => {
      options.shippingOptions.map(option => {
        if (option.upsUS) {
          this.setState({
            UpsUS: this.state.UpsUS + option.upsUS
          })
        } else if (option.upsEU) {
          this.setState({
            UpsEU: this.state.UpsEU + option.upsEU
          })
        } else if (option.upsWW) {
          this.setState({
            UpsWW: this.state.UpsWW + option.upsWW
          })
        } else if (option.FedexUS) {
          this.setState({
            FedexUS: this.state.FedexUS + option.FedexUS
          })
        } else if (option.FedexEU) {
          this.setState({
            FedexEU: this.state.FedexEU + option.FedexEU
          })
        } else if (option.FedexWW) {
          this.setState({
            FedexWW: this.state.FedexWW + option.FedexWW
          })
        } else {
          console.log(option.upsUS)
        }
      })
    })
  }

  bestShipping = () => {
    if (this.state.UpsUS < this.state.FedexUS) {
      return <div className="bestalternativecontainer"><h1>best</h1><div className="bestalternative"></div><h1>:</h1><h1>upsUS: {this.state.UpsUs} $</h1></div>
    } else {
      return <div className="bestalternativecontainer"><h1>best</h1><div className="bestalternative"></div><h1>:</h1><h1>fedexUS: {this.state.FedexUS} $</h1></div>
    }
  }

  render() {
    return (
      <div className="calculatedproducts">
        <h1>CALCULATOR</h1>
        <div className="printedship">
          {/* <p>{this.printShip()}</p> */}
          <p>upsUS: {this.state.UpsUS} $</p>
          <p>I</p>
          {/* <p>upsEU: {this.state.UpsEU} $</p>
          <p>upsWW: {this.state.UpsWW} $</p> */}
          <p>fedexUS: {this.state.FedexUS} $</p>
        </div>
        <p>{this.bestShipping()}</p>
        {/* <p>fedexEU: {this.state.FedexEU} $</p>
          <p>fedexWW: {this.state.FedexWW} $</p> */}
      </div>
    )
  }
}

export default Calculator
