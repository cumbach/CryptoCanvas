import React, {Component} from 'react'
import COLORS from './../colors.js'

const ACTIONS = {
  1: 'Buy',
  2: 'Rent',
  3: 'Manage',

}

export default class TransactionInfo extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.formatDataForSubmit = this.formatDataForSubmit.bind(this)
    this.state = {
      comment: '',
      link: '',
      price: '',
    }
    /**
     * proptypes:
     * selectedTab int 1 = buy 2= rent 3=update
     * pixels = List of all Pixel objects
     * changes = kv object with preselected relevant changes (buy or rent)
     * actions = kv object with key as tab number (1,2,3) and value is appropriate action function
     */
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
  }


  formatDataForSubmit() {
    const {
      changes,
      pixels,
      selectedTab,
    } = this.props

    const {
      link,
      comment,
      price,
    } = this.state

    console.log('data in', changes)
    const changeIds = Object.keys(changes)
    if (!changeIds || !changeIds.length) return
    if (!([1, 2].includes(selectedTab))) {
      return
    }
    const updatedPixels = changeIds.map(key => {
      return {
        ...pixels[key],
        ...changes[key],
      }
    })
    const pixelIds = []
    const colors = []
    updatedPixels.forEach(pixel => {
      pixelIds.push(pixel.id)
      const colorId = COLORS.findIndex(c => (c === pixel.color))
      colors.push(colorId == -1 ? 99 : colorId)
    })
    console.log('submitting:', pixelIds, colors, link, comment, price, '***')

    if (selectedTab === 1) {
      return [pixelIds, colors, link, comment, price]
    } else {
      return [pixelIds, colors, link, comment]
    }
  }

  handleClick(e) {
    e.preventDefault()
    const { actions, selectedTab } = this.props
    const formattedData = this.formatDataForSubmit()
    console.log('submitting: ', formattedData, '******')

    actions[selectedTab](...formattedData)
  }

  render() {
      return (
        <div className="transaction-info">
          <form>
            <label>
              URL:
            </label>
            <input
              value={this.state.link}
              onChange={this.handleChange}
              type="text"
              id="link"
              className="transaction-input"
              placeholder=""
            />
            <br />
            <label>
              Comment
            </label>
            <input
              value={this.state.comment}
              onChange={this.handleChange}
              type="text"
              id="comment"
              placeholder=""
              className="transaction-input"
            />
            <label>
              Price
            </label>
            <input
              value={this.state.price}
              onChange={this.handleChange}
              type="text"
              id="price"
              placeholder=""
              className="transaction-input"
            />

            <button onClick={this.handleClick} className="action-button">
              {ACTIONS[this.props.selectedTab]}
            </button>
          </form>
        </div>
      )
    }

}


