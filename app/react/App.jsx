import React, { Component } from 'react'

import SideBar from './SideBar.jsx'
import Canvas from './Canvas.jsx'
import NavBarTop from './NavBarTop.jsx'


class App extends Component {
  constructor() {
    super()
    this.handleChangePixel = this.handleChangePixel.bind(this)
    this.state = {
      pixels: [
        {color: 'green'}
      ],  // array of <Pixels>
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
