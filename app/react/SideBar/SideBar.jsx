import React, {Component} from 'react'

import SideBarTabs from './SideBarTabs.jsx'
import PriceSlider from './PriceSlider.jsx'
import SelectedPixels from './SelectedPixels.jsx'
import CoolDown from './CoolDown.jsx'
import TransactionInfo from './TransactionInfo.jsx'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleOpenMenu = this.handleOpenMenu.bind(this)
    this.handleCloseMenu = this.handleCloseMenu.bind(this)

    this.state = {
      tab: 1
    }

    /**
     * propTypes
     * ---------
          pixels={pixels}
          changes={relevantChanges}
          onRemoveTransaction={relevantRemoveFunction}
          onSetMode={this.handleSetMode}
     *
     */
  }

  handleTabChange(tab) {
    const { onSetMode } = this.props;
    this.setState({ tab }, onSetMode(tab))
  }

  handleOpenMenu() {
    const { onSetMode } = this.props;
    this.props.openMenu();
    this.setState({ hidden: false }, onSetMode(1))
  }

  handleCloseMenu() {
    const { onSetMode } = this.props;
    this.props.closeMenu();
    this.setState({ hidden: true }, onSetMode(0))
  }

  render() {
    const {
      changes,
      pixels,
      buyPixels,
      rentPixels,
      hoverId,
    } = this.props

    const actions = {
      1: buyPixels,
      2: rentPixels,
      3: () => console.log('update')
    }

    if (!this.props.isOpen) {
      return (
        <div className="arrow" onClick={this.handleOpenMenu}>
          {`<`}
        </div>
      )
    }

    return (
      <div>
        <div className="arrow" onClick={this.handleCloseMenu}>
          {`>`}
        </div>
        <div
          className="side-bar"
          style={{
            'width': this.props.size,
            'float': 'right'
          }}
        >
          <SideBarTabs
            selectedTab={this.state.tab}
            onTabChange={this.handleTabChange}
          />
          <PriceSlider/>
          <SelectedPixels
            setHoverId={this.props.setHoverId}
            changes={changes}
            hoverId={hoverId}
            pixels={pixels}
            onRemoveTransaction={this.props.onRemoveTransaction}
          />
          <CoolDown/>
          <TransactionInfo
            selectedTab={this.state.tab}
            pixels={pixels}
            changes={changes}
            actions={actions}
          />
        </div>
      </div>
    )
  }

}

export default SideBar
