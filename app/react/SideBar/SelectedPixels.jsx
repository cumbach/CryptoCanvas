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
      setSpecialHoverId,
      specialHoverId,
      removeSpecialHoverId,
    } = this.props
    return (
      <div className="big-selected">
        <SmallSelected
          setSpecialHoverId={setSpecialHoverId}
          removeSpecialHoverId={removeSpecialHoverId}
          color={color}
          specialHoverId={specialHoverId}
          pixelId={pixel.id}
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
      setSpecialHoverId,
      removeSpecialHoverId,
      specialHoverId,
      pixelId,
    } = this.props

    return (
      <div
        onClick={expand}
        className="selected-pixel"
        style={{
          backgroundColor: color,
          boxShadow: pixelId === specialHoverId ? "0px 0px 3px red" : "0px 0px 0px"
        }}
        onMouseEnter={setSpecialHoverId}
        onMouseLeave={removeSpecialHoverId}
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
    const { specialHoverId, setSpecialHoverId } = this.props
    const highlighted = specialHoverId === p.id
    const setSpecialHoverIdFn = setSpecialHoverId && setSpecialHoverId.bind(null, p.id)
    const removeSpecialHoverId = setSpecialHoverId && setSpecialHoverId.bind(null, null)
    const className = highlighted ? 'highlighted-pixel' : ''
    if (this.state.expanded) {
      return (
        <BigSelected
          setSpecialHoverId={setSpecialHoverIdFn}
          removeSpecialHoverId={removeSpecialHoverId}
          pixel={p}
          color={this.getColor(p)}
          key={p.id}
          onRemoveTransaction={this.props.onRemoveTransaction.bind(null, p.id)}
          className={className}
          specialHoverId={specialHoverId}
          />
        )
      }

      return (
        <SmallSelected
          setSpecialHoverId={setSpecialHoverIdFn}
          removeSpecialHoverId={removeSpecialHoverId}
          pixel={p}
          color={this.getColor(p)}
          key={p.id}
          expand={this.expand}
          className={className}
          specialHoverId={specialHoverId}
          pixelId={p.id}
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
      specialHoverId,
    } = this.props

    const sorted = (changes && pixels && pixels.length) ? Object.keys(changes).sort((a, b) => pixels[a].sortIndex - pixels[b].sortIndex).map(p => pixels[p]) : []


    return (
      <div className="selected-pixel-section">
        <div className="selected-pixel-header">
          <div>
            Selected Pixels
          </div>
          <button
            className="expand-button"
            onClick={()=> this.setState(prevState => {
            return {expanded: !prevState.expanded}
          })}
            >
            <img src="./app/react/SideBar/list.png"></img>
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
