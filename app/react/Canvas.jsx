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
  }

  render() {
    return (
      <Stage width={700} height={700}>
        <Layer>
          {this.props.pixels.map((pixel, key) => {
            return <Rect
              x={20}
              y={20}
              width={5}
              height={5}
              key={key}
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
