import COLORS from './colors.js';
import React, {Component} from 'react'

export default class ColorPicker extends Component {
  constructor(props) {
    /**
     * currentColor: string
     * onClick: func
     **/
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(color) {
    this.props.onClick(color)
  }

  render() {
    const { currentColor } = this.props;

    return (
      <div
        style={{
          'border': '1px solid black',
          'borderRadius': '5px',
          'marginTop': '10px'
        }}
      >
        <div
          style={{
            'width': '160px',
            'display': 'flex',
            'flexWrap': 'wrap',
            'margin': '10px 10px'
          }}
        >
          {COLORS.map((color, i) => {
            return <div
              key={i}
              onClick={this.handleClick.bind(this, color)}
              style={{
                'backgroundColor': color,
                'width': '20px',
                'height': '20px',
                'boxShadow': color === currentColor ? '0px 0px 2px black' : 'none',
                'zIndex': color === currentColor ? '1' : '0'
              }}
            />
          }, this)}
        </div>
      </div>
    )
  }

}
