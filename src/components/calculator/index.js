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
      FedexWW: 0,
      totalquantity: 0
    }
  }

  calculateTotalBoxes= () => {
    let total = 0
    this.props.values.map(p => {
      total += Number.parseInt(p.quantity, 10)
    })
    this.setState({
      totalquantity: total
    })
  }

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
      this.calculateTotalBoxes()
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

  bestAlternative = () => {
    const best = {
      cheap: "",
      expensive: "",
      cheapName: "",
      expensiveName: ""
    }
    if (this.state.UpsUS < this.state.FedexUS) {
      best.cheap = this.state.UpsUS
      best.expensive = this.state.FedexUS
      best.cheapName = "ups"
      best.expensiveName = "fedex"
    } else {
      best.cheap = this.state.FedexUS
      best.expensive = this.state.UpsUS
      best.cheapName = "fedex"
      best.expensiveName = "ups"
    }
    return (
      <div>
        <div className="bestalternativecontainer">
          {/* <div className="bestalternative" /> */}
          <h1 id="lightfont">shipping options:</h1>
          <div className="goodorbad">
            <h1 id="bestoption">{best.cheapName} {best.cheap} $</h1>
            <h1 id="linethrough">{best.expensiveName} {best.expensive} $</h1>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="calculatedproducts">
        <h1 id="bestoption">total boxes: {this.state.totalquantity}</h1>
        <p>{this.bestAlternative()}</p>
      </div>
    )
  }
}

export default Calculator
