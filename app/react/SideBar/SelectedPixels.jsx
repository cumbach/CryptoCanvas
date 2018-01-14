import React, {Component} from 'react'

class BigSelected extends Component {
  /**
   * proptypes
   * pixel - object
   * color - int? i think
   * onRemoveTransaction fn()
   */

  render() {
    const {
      color,
      pixel,
      onRemoveTransaction,
    } = this.props
    return (
      <div className="big-selected">
        <SmallSelected
          color={color}
        />
        <div className="price-label">{pixel.price} eth</div> {/* showing old price here */}
        <button
          onClick={onRemoveTransaction}
          className="remove-button"
        >
          Remove
        </button>
      </div>
    )
  }
}


class SmallSelected extends Component {
  /**
   * proptypes
   * pixel - object
   * color - str representing hex
   */
  render() {
    const {
      expand,
      color,
    } = this.props

    return (
      <div onClick={expand} className="selected-pixel" style={{ backgroundColor: color }} />
    )
  }
}

export default class SelectedPixels extends Component {
  constructor(props) {
    super(props)
    this.getCell = this.getCell.bind(this)
    this.getColor = this.getColor.bind(this)
    this.expand = this.expand.bind(this)
    this.state = {
      expanded: false,
    }

        /**
     * propTypes
     * ---------
     * pixels - array of Pixel objects
     * changes object
     * onRemoveTransaction fn ()  (deletes change)
     *
     */

  }

  getColor(p) {
    const { changes, pixels } = this.props
    if (changes && changes[p.id] && changes[p.id].color) return changes[p.id].color
    return p.color
  }

  getCell(p) {

    if (this.state.expanded) {
      return (
        <BigSelected
          pixel={p}
          color={this.getColor(p)}
          key={p.id}
          onRemoveTransaction={this.props.onRemoveTransaction.bind(null, p.id)}
        />
      )
    }

    return (
      <SmallSelected
        pixel={p}
        color={this.getColor(p)}
        key={p.id}
        expand={this.expand}
      />
    )
  }

  expand() {
    this.setState({
      expanded: true
    })
  }

  render() {
    const {
      changes,
      pixels,
    } = this.props
    // debugger
    const sorted = (changes && pixels && pixels.length) ? Object.keys(changes).sort((a, b) => pixels[b].price - pixels[a].price).map(p => pixels[p]) : []


    return (
      <div className="selected-pixel-section">
        <div className="selected-pixel-header">
          <div>
            <span>Selected Pixels</span>
            <button
              className="expand-button"
              onClick={()=> this.setState(prevState => {
              return {expanded: !prevState.expanded}
            })}
              >
              {this.state.expanded ? '-' : '+'}
            </button>
          </div>
          <div className="selected-pixel-area">
            {
              sorted.map(p => {
                return this.getCell(p)
              })
            }
          </div>
        </div>
      </div>
    )
  }

}
