import React, { Component } from 'react'

import SideBar from './SideBar.jsx'
import Canvas from './Canvas.jsx'
import NavBarTop from './NavBarTop.jsx'


class App extends Component {
  constructor() {
    super()
    this.handleChangePixel = this.handleChangePixel.bind(this)
    /**
     * propTypes:
     * onChangePixel - fn
     * pixels - []
     * changes - {}
     * */
  }

  handleChangePixel({ id, field, newValue }) {
    this.props.onChangePixel({ id, field, newValue })
  }

  render() {
    const {
      pixels,
      changes,
    } = this.props

    // MAIN below is a placeholder for <Canvas/>
    return (
      <div>
        <NavBarTop/>
        <Canvas
          pixels={pixels}
          changes={changes}
          onChangePixel={this.handleChangePixel}
        />
        <SideBar
          pixels={pixels}
          changes={changes}
          onChangePixel={this.handleChangePixel}
        />
      </div>
    )
  }

}

export default App
