import React from "react"
import "./style.css"

class Header extends React.Component {

  dontShow() {
    if (this.props.chosenProducts.length < 1) {
      return null
    } else {
      return this.props.chosenProducts.length
    }
  }

  render() {
    return (
      <div className="largeheadercontainer" id="home">
        <h1 id="largeheader">shipping calculator</h1>
        <a href="#chosen">
          <div className="basketcontainer grow">
            <div className="basketicon"><p id="yellow">{this.dontShow()}</p></div>
          </div>
        </a>
      </div>
    )
  }
}

export default Header
