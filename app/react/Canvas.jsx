import React, {Component} from 'react'
import Pixel from './Pixel.jsx';

const COLOR_MAP = {
  0: 'red',
  1: 'blue',
  3: 'green',
  4: 'yellow',
  5: 'orange',
  6: 'black',
  7: 'white',
  8: 'grey',
  9: 'brown'
}

export default class Canvas extends Component {
  /**
  * displayOnlyBuyable: bool
  * pixels: array[ pixel: object ]
  * onChangePixel: func
  * pixelSize: number
  * currentColor: string
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
