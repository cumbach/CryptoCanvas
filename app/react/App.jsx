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
    this.setSpecialHoverId = this.setSpecialHoverId.bind(this)
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
      mode: 0,
      specialHoverId: null,
      documentWidth:  800,
      documentHeight: 182,
      test: '',
      sideBarOpen: false
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if(window.innerWidth < 500) {
      this.setState({ documentWidth: 450, documentHeight: 102 });
    } else {
      // let update_width  = window.innerWidth-100;
      // let update_height = Math.round(update_width/4.4);
      this.setState({ documentWidth: window.innerWidth, documentHeight: window.innerHeight });
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

  setSpecialHoverId(pixelId) {
    if (!pixelId && pixelId !== 0) {
      this.setState({specialHoverId: null})
    } else {
      this.setState({specialHoverId: pixelId})
    }
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
      mode,
      specialHoverId,
      documentHeight,
      documentWidth
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

    const containerHeight = documentHeight * 0.8;

    // MAIN below is a placeholder for <Canvas/>
    return (
      <div>
        <NavBarTop
          setUpCanvas={this.setUpCanvas}
        />
        <div
          style={{
            'display': 'flex',
            'position': 'absolute',
            'top': documentHeight * 0.1 + 'px',
            'height': containerHeight + 'px',
            'width': containerHeight * 1.6 + 'px'
          }}
        >
          <div
            style={{
              'display': 'flex',
              'flexDirection': 'column',
              'height': containerHeight + 'px',
              'position': 'relative'
            }}
          >
            <Canvas
              mode={mode}
              pixels={displayPixels}
              changes={relevantChanges}
              currentColor={currentColor}
              onAddTransaction={relevantAddFunction}
              setSpecialHoverId={this.setSpecialHoverId}
              size={mode !==0 ? containerHeight * .85 : containerHeight}
              specialHoverId={specialHoverId}
              setSpecialHoverId={this.setSpecialHoverId}
            />
            {mode !== 0 ? <ColorPicker
              currentColor={currentColor}
              onClick={this.handleChangeCurrentColor}
            /> : null}
          </div>
          <SideBar
            pixels={pixels}
            buyPixels={buyPixels}
            rentPixels={rentPixels}
            changes={relevantChanges}
            onRemoveTransaction={relevantRemoveFunction}
            onSetMode={this.handleSetMode}
            size={containerHeight * 1.6 * 0.3}
            closeMenu={() => this.setState({ sideBarOpen: false })}
            openMenu={() => this.setState({ sideBarOpen: true })}
            isOpen={this.state.sideBarOpen}
            specialHoverId={specialHoverId}
            setSpecialHoverId={this.setSpecialHoverId}
          />
        </div>
      </div>
    )
  }

}

export default App
