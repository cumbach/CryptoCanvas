import React, {Component} from 'react'
import Comment from './Comment.jsx'

export default class Pixel extends Component {
  constructor(props) {
    /**
    * key: int
    * color: string
    * size: int
    * onClick: func
    * buyModeEnabled: bool
    * buyable: bool
    * setComment: func
    **/
    super(props)
    this.state = {
      hover: false
    }

    this.setComment = this.setComment.bind(this);
    this.highlight = this.highlight.bind(this);
    this.unhighlight = this.unhighlight.bind(this);

    this.emphasizedStyle = {
      'boxShadow': '0px 0px 2px black',
      'zIndex': '1'
    }

    this.deemphasizedStyle = {
      'opacity': '1'
    }
  }

  render() {
    const { buyable, buyModeEnabled, color, selectPixel, size } = this.props;
    const { hover } = this.state;
    const isSelectable = buyModeEnabled && buyable;
    const isDisabled = buyModeEnabled && !buyable;

    return (
      <div
        onClick={isSelectable ? selectPixel : () => {}}
        onMouseEnter={!buyModeEnabled ? this.setComment : isSelectable ? this.highlight : () => {}}
        onMouseLeave={!buyModeEnabled ? this.hideComment : isSelectable ? this.unhighlight : () => {}}
        style={{
          'backgroundColor': color,
          'width': size + 'px',
          'height': size + 'px',
          'float': 'left',
          'outline': hover ? '2px solid black' : 'none',
          'opacity': isDisabled ? '0.3' : '1',
          'zIndex': isSelectable ? '1' : '0',
          'boxShadow': isSelectable ? '0px 0px 2px black' : 'none',
        }}
      />
    );
  }

  setComment() {
    this.props.setComment()
  }

  highlight() {
    this.setState({ hover: true })
  }

  unhighlight() {
    this.setState({ hover: false })
  }
}
