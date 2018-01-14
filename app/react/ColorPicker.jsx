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
          'boxShadow': '0px 0px 4px black',
          'borderRadius': '3px',
          'marginTop': '10px',
          'position': 'absolute',
          'bottom': '0',
          'width': '100%'
        }}
      >
        <div
          style={{
            'display': 'flex',
            'flexWrap': 'wrap',
            'margin': '10px 10px',
            'justifyContent': 'space-between',
          }}
        >
          {COLORS.map((color, i) => {
            return <div
              key={i}
              onClick={this.handleClick.bind(this, color)}
              style={{
                'backgroundColor': color,
                'margin': '0px, 2px, 0px, 2px',
                'width': '30px',
                'height': '30px',
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
