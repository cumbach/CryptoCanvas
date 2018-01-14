import React, {Component} from 'react'

export default class Pixel extends Component {
  constructor(props) {
    /**
    * key: int
    * color: string
    * size: int
    * selectPixel: func
    * mode: int
    * buyable: bool
    * rentable: bool
    * setComment: func
    * link: string
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
    const { buyable, mode, color, link, rentable, selectPixel, size } = this.props;
    const { hover } = this.state;
    const isSelectable = (mode===1 && buyable) || (mode===2 && rentable);
    const isDisabled = (mode===1 && !buyable) || (mode===2 && !rentable);

    return (
      <div
        onClick={isSelectable ? selectPixel : () => {window.open(link, '_blank')}}
        onMouseEnter={mode===0 ? this.setComment : isSelectable ? this.highlight : () => {}}
        onMouseLeave={mode===0 ? this.hideComment : isSelectable ? this.unhighlight : () => {}}
        style={{
          'backgroundColor': color,
          'width': size + 'px',
          'height': size + 'px',
          'float': 'left',
          'outline': hover ? '2px solid black' : 'none',
          'opacity': isDisabled ? '0.1' : '1',
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
