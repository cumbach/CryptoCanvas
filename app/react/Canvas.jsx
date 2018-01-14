import React, {Component} from 'react'
import Pixel from './Pixel.jsx';

export default class Canvas extends Component {
  /**
    pixels={displayPixels}
    changes={relevantChanges}
    currentColor={currentColor}
    onAddTransaction={relevantAddFunction}
  * mode: int (may be a string in the future) 0:view, 1:buy, 2:rent, 3:manage
  **/
  constructor(props) {
    super(props)

    this.state = {
      commentPosition: null,
      commentText: null
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleSetComment = this.handleSetComment.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  selectPixel(id) {
    const { currentColor, onAddTransaction } = this.props;
    onAddTransaction(id, { color: currentColor })
  }

  handleMouseMove(e) {
    this.setState({ commentPosition: [e.clientX, e.clientY] })
  }

  handleSetComment(comment) {
    this.setState({ commentText: comment })
  }

  handleMouseLeave() {
    this.setState({ commentPosition: null })
  }

  render() {
    const { mode, pixels, pixelSize } = this.props;
    const { commentPosition, commentText } = this.state;
    const dimensions = Math.round(Math.sqrt(pixels.length));

    return (
      <div
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
        style={{
          'height': '500px', 'width': '500px'
        }}
      >
        { mode===0 && commentPosition ?
          <div
            style={{
              'position': 'fixed',
              'zIndex': '2',
              'left': commentPosition[0],
              'top': commentPosition[1],
              'backgroundColor': 'white',
              'padding': '2px 6px',
              'border': '1px solid black',
              'borderRadius': '5px'
            }}
          >
            {commentText}
          </div>
        : null}
        {pixels.map((pixel, id) => {
          return <Pixel
            key={id}
            color={pixel.color}
            size={500/dimensions}
            selectPixel={this.selectPixel.bind(this, id)}
            setComment={this.handleSetComment.bind(this, pixel.comment)}
            mode={mode}
            buyable={pixel.buyable}
            rentable={pixel.rentable}
          />
        }, this)}
      </div>
    );
  }
}
