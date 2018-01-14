import React, { Component } from 'react'

import SideBar from './SideBar/SideBar.jsx'

import TestComponent from './TestComponent.jsx'
import Canvas from './Canvas.jsx'
import NavBarTop from './NavBarTop.jsx'
import ColorPicker from './ColorPicker.jsx'
import ToggleButton from 'react-toggle-button'

class App extends Component {
  constructor() {
    super()
    this.handleChangePixel = this.handleChangePixel.bind(this)
    this.handleChangeCurrentColor = this.handleChangeCurrentColor.bind(this)
    this.handleSetMode = this.handleSetMode.bind(this)
    /**
     * propTypes:
     * onChangePixel - fn
     * pixels - []
     * changes - {}
     * */

    this.state = {
      currentColor: '#222222',
      mode: 1
    }
  }

  handleChangePixel(id, changes) {
    this.props.onChangePixel(id, changes)
  }

  handleChangeCurrentColor(color) {
    this.setState({ currentColor: color });
  }

  handleSetMode(mode) {
    this.setState({ mode })
  }

  render() {
    const {
      pixels,
      changes,
    } = this.props

    const {
      currentColor,
      mode
    } = this.state

    // MAIN below is a placeholder for <Canvas/>
    return (
      <div>
        <NavBarTop/>
        <SideBar
          pixels={pixels}
          changes={changes}
          onChangePixel={this.onChangePixel}
          onRemoveChange={this.props.onRemoveChange}
          onSetMode={this.handleSetMode}
        />
        <Canvas
          mode={mode}
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
