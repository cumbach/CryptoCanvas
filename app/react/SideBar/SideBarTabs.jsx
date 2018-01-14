import React, {Component} from 'react'

export default class SideBarTabs extends Component {
  constructor(props) {
    super(props)
    this.handleTabChange = this.handleTabChange.bind(this)
  /**
   * selectedTab = int (0, 1, or 2)
   * onTabChange fn() (changes tab which is stored in state of parent)
   */

  }

  handleTabChange(tab) {
    this.props.onTabChange(tab)
  }

  render() {
    const leftTab = 'tab left' + (this.props.selectedTab === 1 ? ' active' : '')
    const centerTab ='tab center'  + (this.props.selectedTab === 2 ? ' active' : '')
    const rightTab = 'tab right' + (this.props.selectedTab === 3 ? ' active' : '')

    return (
      <div>
          <button
            className={leftTab}
            onClick={this.handleTabChange.bind(null, 1)}
            >
            Buy
          </button>
          <button
            className={centerTab}
            onClick={this.handleTabChange.bind(null, 2)}
            >
            Rent
          </button>
          <button
            className={rightTab}
            onClick={this.handleTabChange.bind(null, 3)}
          >
            Manage
          </button>
        </div>
      );
    }

}
