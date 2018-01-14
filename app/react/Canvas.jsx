import React, {Component} from 'react'
import Pixel from './Pixel.jsx';
import { Stage, Layer, Rect, Text } from 'react-konva';

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
  * pixels: array
  * onChangePixel: func
  * pixelSize: number
  **/
  constructor(props) {
    super(props)
    this.state = {
      pixels: props.pixels
    }
  }

  render() {
    const { pixels, pixelSize } = this.props;
    const dimensions = Math.round(Math.sqrt(pixels.length));

    return (
      <Stage width={700} height={700}>
        <Layer>
          {pixels.map((pixel, id) => {
            return <Rect
              x={pixelSize * (Math.floor(id / dimensions))}
              y={pixelSize * (id % dimensions)}
              width={5}
              height={5}
              key={id}
              fill={COLOR_MAP[pixel.color]}
              shadowBlur={5}
              onClick={this.handleClick.bind(this, id)}
            />
          }, this)}
        </Layer>
      </Stage>
    );
  }

  handleClick(id) {
    const { onChangePixel } = this.props;
    onChangePixel(id, { color: 'blue' })
  }

}
