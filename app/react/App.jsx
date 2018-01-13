import React, { Component } from 'react'

import Main from './Main.jsx'
import SideBar from './SideBar.jsx'
import CanvasCore from './CanvasCore.jsx'
import NavBarTop from './NavBarTop.jsx'


class App extends Component {
  constructor() {
    super()
    this.handleChangePixel = this.handleChangePixel.bind(this)
    this.state = {
      pixels: [],  // array of <Pixels>
      changes: {},  // eg: {pixelId: { color: <new color> }}
    }
  }

  handleChangePixel({ id, field, newValue }) {
    this.setState({
      changes: {
        [field]: value,
       }
      })
  }

  render() {
    const {
      pixels,
      changes,
    } = this.state

    // MAIN below is a placeholder for <Canvas/>
    return (
      <div>
        <NavBarTop/>
        <Main
          pixels={pixels}
          changes={changes}
          onChangePixel={this.handleChangePixel}
        />
        <SideBar
          pixels={pixels}
          changes={changes}
          onChangePixel={this.handleChangePixel}
        />
        <CanvasCore/>
      </div>
    )
  }

}

export default App
