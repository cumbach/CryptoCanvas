import React, {Component} from 'react'

export default class Pixel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  render() {
    const { color, onClick, size } = this.props;
    const { hover } = this.state;

    return (
      <div
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{
          'backgroundColor': color,
          'width': size + 'px',
          'height': size + 'px',
          'float': 'left',
          'outline': hover ? '1px solid black' : 'none'
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
