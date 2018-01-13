import React, {Component} from 'react'
import Pixel from './Pixel.jsx';
import { Stage, Layer, Rect, Text } from 'react-konva';

export default class Canvas extends Component {
  /**
  / pixels: array
  **/
  constructor(props) {
    super(props)
    this.state = {
      color: 'green'
    }

    this.dimensions = Math.round(Math.sqrt(this.props.pixels.length))
    this.pixelSize = 5;
  }

  render() {
    console.log(this.props.pixels)
    return (
      <Stage width={700} height={700}>
        <Layer>
          {this.props.pixels.map((pixel, i) => {
            return <Rect
              x={this.pixelSize * (Math.floor(i / this.dimensions))}
              y={this.pixelSize * (i % this.dimensions)}
              width={5}
              height={5}
              key={i}
              fill={pixel.color}
              shadowBlur={5}
              onClick={this.handleClick}
            />
          })}
        </Layer>
      </Stage>
    );
  }

  handleClick() {

  }

}
