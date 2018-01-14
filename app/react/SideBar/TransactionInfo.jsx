import React, {Component} from 'react'
import COLORS from './../colors.js'

const ACTIONS = {
  1: 'Buy',
  2: 'Rent',
  3: 'Update',

}

const CLEAR_STATE = {
  comment: '',
  link: '',
  price: '',
}
export default class TransactionInfo extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.formatDataForSubmit = this.formatDataForSubmit.bind(this)
    this.state = CLEAR_STATE
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
    let sumPrices = 0
    updatedPixels.forEach(pixel => {
      pixelIds.push(pixel.id)
      const colorId = COLORS.findIndex(c => (c === pixel.color))
      colors.push(colorId == -1 ? 99 : colorId)
      sumPrices += pixel.price
    })
    console.log('submitting:', pixelIds, colors, link, comment, price, sumPrices, '***')

    if (selectedTab === 1) {
      return [pixelIds, colors, link, comment, price, sumPrices]
    } else {
      return [pixelIds, colors, link, comment]
    }
  }

  handleClick(e) {
    e.preventDefault()
    const { actions, selectedTab } = this.props
    const formattedData = this.formatDataForSubmit()
    console.log('submitting: ', formattedData, '******')
    this.setState(CLEAR_STATE)
    actions[selectedTab](...formattedData)
    this.props.closeMenu()
  }

  render() {
      const {
        changes,
        pixels,
        selectedTab,
      } = this.props
      const changeIds = Object.keys(changes);
      let price = 0;
      const total = changeIds.length;
      if (total > 0 && selectedTab == 1) {
        price = pixels[changeIds[0]].price;
      }

      return (
        <div className="transaction-info">
          <form>
            <div className="form-line">
              <input
                value={this.state.link}
                onChange={this.handleChange}
                type="text"
                id="link"
                className="transaction-input"
                placeholder="Comment..."
              />
            </div>
            <div className="form-line">
              <input
                value={this.state.comment}
                onChange={this.handleChange}
                type="text"
                id="comment"
                placeholder="Url..."
                className="transaction-input"
              />
            </div>
            <div className="form-line">
              <input
                value={this.state.price}
                onChange={this.handleChange}
                type="text"
                id="price"
                placeholder="Price..."
                className="transaction-input"
              />
            </div>
            {
              (this.props.pixels.length > 0 && selectedTab <= 2) ?
              <div className="form-line">
                <div className="total-amount">
                  Total Cost: {Math.round(price * total * 1.013600 * 100000)/100000} ETH
                </div>
              </div> : null
            }

            <div className="button-line">
              <button onClick={this.handleClick} className="action-button">
                {ACTIONS[this.props.selectedTab]}
              </button>
            </div>
          </form>
        </div>
      )
    }

}
