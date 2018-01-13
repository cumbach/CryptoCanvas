import React, { Component } from 'react'

import Main from './Main.jsx'
import SideBar from './SideBar.jsx'
import CanvasCore from './CanvasCore.jsx'

class App extends Component {

  render() {
      return (
        <div>
          <Main/>
          <SideBar/>
          <CanvasCore/>
        </div>
      )
    }

}

export default App
