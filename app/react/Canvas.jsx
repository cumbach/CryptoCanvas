import React, {Component} from 'react'
import Pixel from './Pixel.jsx';

export default class Canvas extends Component {
  /**
    pixels={displayPixels}
    changes={relevantChanges}
    currentColor={currentColor}
    onAddTransaction={relevantAddFunction}
    mode: int (may be a string in the future) 0:view, 1:buy, 2:rent, 3:manage
    documentHeight
    documentWidth
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
    const { currentColor, onAddTransaction } = this.props
    onAddTransaction(id, { color: currentColor })
  }

  handleMouseMove(e) {
    this.setState({ commentPosition: [e.clientX, e.clientY] })
  }

  handleSetComment(pixel, off) {
    if (off) {
      this.setState({ commentText: null})
    }
    this.setState({ commentText: pixel.comment })
  }

  handleMouseLeave() {
    this.setState({ commentPosition: null })
  }

  render() {
    const { documentHeight, documentWidth, mode, pixels, pixelSize, setHoverId } = this.props;
    const { commentPosition, commentText } = this.state;
    const pixelDimension = Math.round(Math.sqrt(pixels.length));

    const canvasDimension = documentWidth * .4;


    return (
      <div
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
        style={{
          'height': this.props.size + 'px',
          'width': this.props.size + 'px',
          'float': 'left',
          'boxShadow': '0px 0px 3px black'
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
              'borderRadius': '3px',
              'cursor': 'pointer',
            }}
          >
            {commentText}
          </div>
        : null}
        {pixels.map((pixel, id) => {
          return <Pixel
            key={id}
            color={pixel.color}
            size={this.props.size/pixelDimension}
            selectPixel={this.selectPixel.bind(this, id)}
            setComment={this.handleSetComment.bind(this, pixel)}
            mode={mode}
            buyable={pixel.buyable}
            rentable={pixel.rentable}
            setHoverId={setHoverId}
            id={id}
          />
        }, this)}
      </div>
    );
  }
}
