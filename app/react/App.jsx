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
    this.handleToggleBuyable = this.handleToggleBuyable.bind(this)
    /**
     * propTypes:
     * onChangePixel - fn
     * pixels - []
     * changes - {}
     * */

    this.state = {
      currentColor: '#222222',
      displayOnlyBuyable: true
    }
  }

  handleChangePixel(id, changes) {
    this.props.onChangePixel(id, changes)
  }

  handleChangeCurrentColor(color) {
    this.setState({ currentColor: color });
  }

  handleToggleBuyable() {
    this.setState((prevState) => ({ displayOnlyBuyable: !prevState.displayOnlyBuyable }))
  }

  render() {
    const {
      pixels,
      changes,
    } = this.props

    const {
      currentColor,
      displayOnlyBuyable
    } = this.state

    // MAIN below is a placeholder for <Canvas/>
    return (
      <div>
        <NavBarTop/>

        <Canvas
          displayOnlyBuyable={displayOnlyBuyable}
          pixels={pixels}
          changes={changes}
          currentColor={currentColor}
          onChangePixel={this.handleChangePixel}
        />
        <ColorPicker
          currentColor={currentColor}
          onClick={this.handleChangeCurrentColor}
        />
        <ToggleButton
          value={ displayOnlyBuyable }
          onToggle={this.handleToggleBuyable}
        />
      </div>
    )
  }

}

export default App
