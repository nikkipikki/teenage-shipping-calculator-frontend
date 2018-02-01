import React from "react"
import "./style.css"
import Accordion from "../accordion"

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHidden: true,
      isChecked: false
    }
  }

  toggleHiddenbox = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  isProductChosen = () => {
    this.setState({
      isChecked: !this.state.isChecked
    }, () => {
      if (this.state.isChecked) {
        this.props.chosenCallback(this.props.product)
      } else {
        this.props.removeCallback(this.props.product)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.chosenProducts !== nextProps.chosenProducts
      && nextProps.chosenProducts.length === 0) {
      this.setState({
        isChecked: false
      })
    }
  }

  render() {
    return (
      <div className="productbox">
        <div className="name">

          <div className="checkboxpick grow2">
            <input
              type="checkbox"
              id={this.props.product._id}
              checked={this.state.isChecked}
              onChange={this.isProductChosen} />
            <label
              className="checkboxstyle"
              htmlFor={this.props.product._id}>
              <div>
                <h1>{this.props.product.name}</h1>
                <p>{this.props.product.sku}</p>
              </div>

              <div className="picturebox">
                <img
                  className="picture"
                  alt="produktbild"
                  src={this.props.product.image} />
              </div>

              <div className="informationbox">
                <button className="information" onClick={this.toggleHiddenbox}>i
                  {!this.state.isHidden &&
                  <Accordion
                    product={this.props.product} />
                  }
                </button>
              </div>
            </label>
          </div>
        </div>
      </div>

    )
  }

}

export default Product
