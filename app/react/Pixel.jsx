import React, {Component} from 'react'

export default class Pixel extends Component {
  constructor(props) {
    /**
    * key: int
    * color: string
    * size: int
    * onClick: func
    * under: bool
    * over: bool
    * selectable: bool
    **/
    super(props)
    this.state = {
      hover: false
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  render() {
    const { color, onClick, over, selectable, size, under } = this.props;
    const { hover } = this.state;

    return (
      <div
        onClick={selectable ? onClick : () => {}}
        onMouseEnter={selectable ? this.handleMouseEnter : () => {}}
        onMouseLeave={selectable ? this.handleMouseLeave : () => {}}
        style={{
          'backgroundColor': color,
          'width': size + 'px',
          'height': size + 'px',
          'float': 'left',
          'outline': hover ? '2px solid black' : 'none',
          'opacity': under ? '0.3' : '1',
          'zIndex': over ? '1' : '0',
          'boxShadow': over ? '0px 0px 2px black' : 'none',
        }}
      >
      </div>
    );
  }

  handleMouseEnter() {
    this.setState({ hover: true })
  }

  handleMouseLeave() {
    this.setState({ hover: false })
  }
}
