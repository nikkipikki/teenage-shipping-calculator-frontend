import React from "react"
import "./style.css"

class Accordion extends React.Component {
  render() {
    return (
      <div className="attributes">
        {this.props.product.type}
        <p>category: {this.props.product.category}</p>
        <p>box:{this.props.product.numberInBox}</p>
        <p>weight:{this.props.product.weight}</p>
        <p>volume:{this.props.product.volume}</p>
        <p>value: {this.props.product.value}</p>
        <p>{this.props.product.descriptionHarmCode}</p>
        <p>harmcode: {this.props.product.harmcode}</p>
      </div>
    )
  }
}

export default Accordion
