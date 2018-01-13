import React, { Component } from 'react'

import Main from './Main.jsx'
import SideBar from './SideBar.jsx'
import Canvas from './Canvas.jsx'

class App extends Component {

  render() {
      return (
        <div>
          <Main/>
          <SideBar/>
          <Canvas/>
        </div>
      )
    }

}

export default App
