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
      setHoverId,
      removeHoverId,
    } = this.props
    return (
      <div className="big-selected">
        <SmallSelected
          setHoverId={setHoverId}
          removeHoverId={removeHoverId}
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
      setHoverId,
      removeHoverId,
    } = this.props

    return (
      <div
        onClick={expand}
        className="selected-pixel"
        style={{ backgroundColor: color }}
        onMouseEnter={setHoverId}
        onMouseLeave={removeHoverId}
      />
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
    const { hoverId, setHoverId } = this.props
    const highlighted = hoverId === p.id
    const setHoverIdFn = setHoverId && setHoverId.bind(null, p.id)
    const removeHoverId = setHoverId && setHoverId.bind(null, null)
    const className = highlighted ? 'highlighted-pixel' : ''
    if (this.state.expanded) {
      return (
        <BigSelected
          setHoverId={setHoverIdFn}
          removeHoverId={removeHoverId}
          pixel={p}
          color={this.getColor(p)}
          key={p.id}
          onRemoveTransaction={this.props.onRemoveTransaction.bind(null, p.id)}
          className={className}
          />
        )
      }

      return (
        <SmallSelected
          setHoverId={setHoverIdFn}
          removeHoverId={removeHoverId}
          pixel={p}
          color={this.getColor(p)}
          key={p.id}
          expand={this.expand}
          className={className}
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
      hoverId,
    } = this.props

    const sorted = (changes && pixels && pixels.length) ? Object.keys(changes).sort((a, b) => pixels[a].sortIndex - pixels[b].sortIndex).map(p => pixels[p]) : []


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
