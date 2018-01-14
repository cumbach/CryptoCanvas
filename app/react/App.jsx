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
    this.handleAddBuy = this.handleAddBuy.bind(this)
    this.handleAddRent = this.handleAddRent.bind(this)
    this.handleChangeCurrentColor = this.handleChangeCurrentColor.bind(this)
    this.handleSetMode = this.handleSetMode.bind(this)
    this.setUpCanvas = this.setUpCanvas.bind(this)
    /**
          pixels={pixels}
          onAddBuy={this.handleAddBuy}
          onRemoveBuy={this.handleRemoveBuy}
          onAddRent={this.handleAddRent}
          onRemoveRent={this.handleRemoveRent}
          buys={buys}
          rents={rents}
     * */

    this.state = {
      currentColor: '#222222',
      mode: 0
    }
  }

  handleAddBuy(id, buy) {
    this.props.onAddBuy(id, buy)
  }

  handleAddRent(id, rent) {
    this.props.onAddRent(id, rent)
  }

  setUpCanvas() {
    this.props.setUpCanvas();
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
      buys,
      rents,
      buyPixels,
      rentPixels,
    } = this.props



    const {
      currentColor,
      mode
    } = this.state

    const relevantChanges = mode===1 ? buys : mode===2 ? rents : {};
    const relevantAddFunction = mode===1 ? this.handleAddBuy : mode===2 ? this.handleAddRent : () => {}
    const relevantRemoveFunction = mode===1 ? this.props.onRemoveBuy : mode===2 ? this.props.onRemoveRent : () => {};

    const displayPixels = [ ...pixels ];
    Object.keys(relevantChanges).forEach((id) => {
      displayPixels[id] = {
        ...displayPixels[id],
        ...relevantChanges[id]
      }
    });

    // MAIN below is a placeholder for <Canvas/>
    return (
      <div>
        <NavBarTop
          setUpCanvas={this.setUpCanvas}
        />
        <SideBar
          buyPixels={buyPixels}
          rentPixels={rentPixels}
          pixels={pixels}
          changes={relevantChanges}
          onRemoveTransaction={relevantRemoveFunction}
          onSetMode={this.handleSetMode}
        />
        <Canvas
          mode={mode}
          pixels={displayPixels}
          changes={relevantChanges}
          currentColor={currentColor}
          onAddTransaction={relevantAddFunction}
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
