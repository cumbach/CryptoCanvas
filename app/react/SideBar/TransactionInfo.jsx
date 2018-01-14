import React, {Component} from 'react'

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
    this.state = {
      comment: '',
      link: '',
      price: '',
    }
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    const { actions, selectedTab } = this.props
    actions[selectedTab]()
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


