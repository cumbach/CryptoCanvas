import React, {Component} from 'react'

import SideBarTabs from './SideBarTabs.jsx'
import PriceSlider from './PriceSlider.jsx'
import SelectedPixels from './SelectedPixels.jsx'
import CoolDown from './CoolDown.jsx'
import TransactionInfo from './TransactionInfo.jsx'

class SideBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
      return (
        <div className="side-bar">
          <SideBarTabs/>
          sidebar tabs
          <PriceSlider/>
          price slider
          <SelectedPixels/>
          <CoolDown/>
          <TransactionInfo/>
          <button/>
        </div>
      )
    }

}

export default SideBar
