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
    this.toggleHidden = this.toggleHidden.bind(this)

    this.state = {
      tab: 1,
      hidden: true,
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

  toggleHidden() {
    this.setState(prevState => { hidden: !prevState.hidden })
  }

  render() {
    const {
      changes,
      pixels,
    } = this.props

    const actions = {
      1: () => console.log('buy'),
      2: () => console.log('rent'),
      3: () => console.log('update')
    }

    if (this.state.hidden) {
      return (
        <div className="arrow" onClick={()=>this.setState({hidden: false})}>
          {`<`}
        </div>
      )
    }

    return (
      <div>
        <div className="arrow" onClick={() => this.setState({ hidden: true })}>
          {`>`}
        </div>
        <div className="side-bar">
          <SideBarTabs
            selectedTab={this.state.tab}
            onTabChange={this.handleTabChange}
          />
          <PriceSlider/>
          <SelectedPixels
            changes={changes}
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
