import React, {Component} from 'react'

export default class NavBarTop extends Component {
  constructor(props) {
    super(props)
  }

  render() {
      return (
        <div className="nav-bar-top">
            <div onClick={this.props.setUpCanvas} className="nav-bar-title">CryptoCanvas</div>
            <a href="https://github.com/cumbach/CryptoCanvas" target="_blank"><div className="nav-bar-about">About</div></a>
        </div>
      )
    }

}
