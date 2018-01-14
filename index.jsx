import React from 'react'
import ReactDOM from 'react-dom'
import CanvasCore from './app/react/CanvasCore.jsx'

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<CanvasCore />, document.getElementById('app'))
})
