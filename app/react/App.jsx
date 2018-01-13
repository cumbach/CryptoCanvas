import React, { Component } from 'react'

import Main from './Main.jsx'
import SideBar from './SideBar.jsx'
import Canvas from './Canvas.jsx'

class App extends Component {

  render() {
    const pixels = [
      {color: 'green'}
    ]

    return (
      <div>
        <Main/>
        <SideBar/>
        <Canvas pixels={pixels} />
      </div>
    )
  }

}

export default App
