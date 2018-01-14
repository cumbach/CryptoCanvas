import React, {Component} from 'react'

export default class NavBarTop extends Component {
  constructor(props) {
    super(props)
  }

  render() {
      return (
        <div onClick={this.props.setUpCanvas} className="nav-bar-top">
            <div className="nav-bar-title">CryptoCanvas</div>
            <div className="nav-bar-user">Johnny Canvas</div>
        </div>
      )
    }

}
