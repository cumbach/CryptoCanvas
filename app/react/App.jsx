import React, { Component } from 'react'

import SideBar from './SideBar/SideBar.jsx'

import TestComponent from './TestComponent.jsx'
import Canvas from './Canvas.jsx'
import NavBarTop from './NavBarTop.jsx'
import ColorPicker from './ColorPicker.jsx'

class App extends Component {
  constructor() {
    super()
    this.handleChangePixel = this.handleChangePixel.bind(this)
    this.handleChangeCurrentColor = this.handleChangeCurrentColor.bind(this)
    /**
     * propTypes:
     * onChangePixel - fn
     * pixels - []
     * changes - {}
     * */

    this.state = {
      currentColor: '#222222'
    }
  }

  handleChangePixel(id, changes) {
    this.props.onChangePixel(id, changes)
  }

  handleChangeCurrentColor(color) {
    this.setState({ currentColor: color });
  }

  render() {
    const {
      pixels,
      changes,
    } = this.props

    const {
      currentColor
    } = this.state

    // MAIN below is a placeholder for <Canvas/>
    return (
      <div>
        <NavBarTop/>

        <Canvas
          pixels={pixels}
          changes={changes}
          currentColor={currentColor}
          onChangePixel={this.handleChangePixel}
        />
        <ColorPicker
          currentColor={currentColor}
          onClick={this.handleChangeCurrentColor}
        />
      </div>
    )
  }

}

export default App
