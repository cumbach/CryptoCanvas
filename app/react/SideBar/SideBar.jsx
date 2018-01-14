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

    this.state = {
      tab: 1
    }

    /**
     * propTypes
     * ---------
     * pixels - array of Pixel objects
     * changes object
     * onChangePixel fn
     * onRemoveChange fn ()  (deletes change)
     * onSetMode: fn
     *
     */
  }

  handleTabChange(tab) {
    const { onSetMode } = this.props;
    this.setState({ tab }, onSetMode(tab))
  }

  render() {
    const {
      changes,
      pixels,
    } = this.props

    if (this.state.tab !== 1) {
      return (
        <div className="side-bar">
          <SideBarTabs
            selectedTab={this.state.tab}
            onTabChange={this.handleTabChange}
          />
          <br/>
          <br/>
          <span style={{paddingLeft: '2rem'}}>Coming soon!!!</span>
        </div>
      )

    }
    return (
      <div className="side-bar">
        <SideBarTabs
          selectedTab={this.state.tab}
          onTabChange={this.handleTabChange}
        />
        <PriceSlider/>
        <SelectedPixels
          changes={changes}
          pixels={pixels}
          onRemoveChange={this.props.onRemoveChange}
        />
        <CoolDown/>
        <TransactionInfo/>
        <button/>
      </div>
    )
  }

}

export default SideBar
