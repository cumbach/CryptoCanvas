import React, {Component} from 'react'
import Pixel from './Pixel.jsx';
import { Stage, Layer, Rect, Text } from 'react-konva';

export default class Canvas extends Component {
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
          <Rect
            x={20}
            y={20}
            width={5}
            height={5}
            fill={this.state.color}
            shadowBlur={5}
            onClick={this.handleClick}
          />
        </Layer>
      </Stage>
    );
  }

  handleClick() {

  }

}
