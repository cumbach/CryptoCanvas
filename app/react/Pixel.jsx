import React, {Component} from 'react'

export default class Pixel extends Component {
  constructor(props) {
    /**
    * key: int
    * id: int
    * color: string
    * size: int
    * onClick: func
    * mode: int
    * buyable: bool
    * rentable: bool
    * setComment: func
    **/
    super(props)
    this.state = {
      hover: false
    }

    this.setComment = this.setComment.bind(this);
    this.hideComment = this.hideComment.bind(this);
    this.exitCell = this.exitCell.bind(this);
    this.enterCell = this.enterCell.bind(this);
    this.highlight = this.highlight.bind(this);
    this.unhighlight = this.unhighlight.bind(this);
    this.visitLink = this.visitLink.bind(this);

    this.emphasizedStyle = {
      'boxShadow': '0px 0px 2px black',
      'zIndex': '1'
    }

    this.deemphasizedStyle = {
      'opacity': '1'
    }
  }

  enterCell(isSelectable, mode) {
    // this.props.setSpecialHoverId(this.props.id)
    if (mode ==0) {
      this.setComment()
    } else if (isSelectable) {
      this.highlight()
    }
  }

  exitCell(isSelectable, mode) {
    // this.props.setSpecialHoverId(null)
    if (mode == 0) {
      this.hideComment()
    } else if (isSelectable) {
      this.unhighlight()
    }
  }

  visitLink() {
    const link = this.props.link.slice(0, 8) !== 'https://' && this.props.link.slice(0, 7) !== 'http://'
      ? `http://${this.props.link}`
      : this.props.link;

    window.open(link, '_blank');
  }

  render() {
    const { buyable, mode, color, id, rentable, selectPixel, size, specialHoverId, setSpecialHoverId } = this.props;
    const { hover } = this.state;
    const isSelectable = (mode===1 && buyable) || (mode===2 && rentable);
    const isDisabled = (mode===1 && !buyable) || (mode===2 && !rentable);
    const isSpecialHover = specialHoverId === id;
    let boxShadow;
    if (isSpecialHover) {
      boxShadow = '0px 0px 3px red'
    } else if (hover) {
      boxShadow = '0px 0px 5px black'
    } else if (isSelectable) {
      boxShadow = '0px 0px 2px black'
    } else {

    }

    return (
      <div
        onClick={mode===0 ? this.visitLink : isSelectable ? selectPixel : () => {}}
        onMouseEnter={()=>this.enterCell(isSelectable, mode)}
        onMouseLeave={()=>this.exitCell(isSelectable, mode)}
        style={{
          'backgroundColor': color,
          'width': size + 'px',
          'height': size + 'px',
          'float': 'left',
          'opacity': isDisabled ? '0.1' : '1',
          'zIndex': isSelectable ? '1' : '0',
          'boxShadow': boxShadow,
          'borderRadius': isSelectable ? '1px' : '0px',
          'outline': hover ? '1px black' : '0px black',
          'cursor': 'pointer'
        }}
      />
    );
  }

  setComment() {
    this.props.setComment()
  }

  hideComment() {
    this.props.setComment('off')
  }

  highlight() {
    this.setState({ hover: true })
  }

  unhighlight() {
    this.setState({ hover: false })
  }
}
