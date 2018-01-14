import React, {Component} from 'react'

const COLOR_MAP = {
  0: 'red',
  1: 'blue',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'black',
  6: 'white',
  7: 'grey',
  8: 'brown'
}

class BigSelected extends Component {
  /**
   * proptypes
   * pixel - object
   * color - int? i think
   * onRemoveChange fn()
   */

  render() {
    const {
      color,
      pixel,
      onRemoveChange,
    } = this.props
    return (
      <div className="big-selected">
        <SmallSelected
          color={color}
        />
        <div className="price-label">{pixel.price} eth</div> {/* showing old price here */}
        <button
          onClick={onRemoveChange}
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
   * color - int? i think
   */
  render() {
    const {
      color,
    } = this.props

    return (
      <div className="selected-pixel" style={{ backgroundColor: COLOR_MAP[parseInt(color)] }} />
    )
  }
}

export default class SelectedPixels extends Component {
  constructor(props) {
    super(props)
    this.getCell = this.getCell.bind(this)
    this.getColor = this.getColor.bind(this)
    this.state = {
      expanded: false,
    }

        /**
     * propTypes
     * ---------
     * pixels - array of Pixel objects
     * changes object
     * onRemoveChange fn ()  (deletes change)
     *
     */

  }

  getColor(p) {
    const { changes, pixels } = this.props

    if (changes && changes[p.id] && changes[p.id].color) return changes[p.id].color
    console.log('p.color')

    return p.color
  }

  getCell(p) {
    console.log(this.props)

    console.log(this.props.onRemoveChange)

    if (this.state.expanded) {
      return (
        <BigSelected
          pixel={p}
          color={this.getColor(p)}
          key={p.id}
          onRemoveChange={this.props.onRemoveChange.bind(null, p.id)}
        />
      )
    }

    return (
      <SmallSelected
        pixel={p}
        color={this.getColor(p)}
        key={p.id}
      />
    )
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
          <span>Selected Pixels</span>
          <button
            className="expand-button"
            onClick={()=>this.setState(prevState => {
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
    )
  }

}
