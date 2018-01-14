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
      <div style={{'height': '500px', 'width': '500px'}}>
        {pixels.map((pixel, id) => {
          return <div
            key={id}
            style={{
              'backgroundColor': COLOR_MAP[pixel.color],
              'width': 500/dimensions + 'px',
              'height': 500/dimensions + 'px',
              'float': 'left'
            }}
            // onClick={this.handleClick.bind(this, id)}
            onClick={this.handleClick.bind(this, id)}
          />
        }, this)}
      </div>
    );
  }

  handleClick(id) {
    const { onChangePixel } = this.props;
    onChangePixel(id, { color: 1 })
  }

}
