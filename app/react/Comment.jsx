import React, {Component} from 'react'

export default class Canvas extends Component {
  /**
  * text: string
  **/
  constructor(props) {
    super(props)
  }

  render() {
    const { displayOnlyBuyable, pixels, pixelSize } = this.props;
    const dimensions = Math.round(Math.sqrt(pixels.length));

    return (
      <div style={{'height': '500px', 'width': '500px'}}>
        {pixels.map((pixel, id) => {
          return <Pixel
            key={id}
            color={pixel.color}
            size={500/dimensions}
            onClick={this.handleClick.bind(this, id)}
            under={displayOnlyBuyable && !pixel.buyable}
            over={displayOnlyBuyable && pixel.buyable}
            selectable={!displayOnlyBuyable || pixel.buyable}
          />
        }, this)}
      </div>
    );
  }

  handleClick(id) {
    const { currentColor, onChangePixel } = this.props;
    onChangePixel(id, { color: currentColor })
  }

}
