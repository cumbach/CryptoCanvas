import React, { Component } from 'react'

import TestComponent from './TestComponent.jsx'
import SideBar from './SideBar/SideBar.jsx'
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

  handleChangePixel(id, changes) {
    this.props.onChangePixel(id, changes)
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
        <SideBar
          pixels={pixels}
          pixelSize={5}
          changes={changes}
          onChangePixel={this.handleChangePixel}
        />
        <Canvas
          pixels={pixels}
          changes={changes}
          onChangePixel={this.handleChangePixel}
        />
      </div>
    )
  }

}

export default App
