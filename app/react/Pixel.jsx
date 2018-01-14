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

    this.emphasizedStyle = {
      'boxShadow': '0px 0px 2px black',
      'zIndex': '1'
    }

    this.deemphasizedStyle = {
      'opacity': '1'
    }
  }

  enterCell(isSelectable, mode) {
    isSelectable
    console.log('setting hoverId', this.props.id)
    this.props.setHoverId(this.props.id)
    if (mode ==0) {
      this.setComment()
    } else if (isSelectable) {
      this.highlight()
    }
  }

  exitCell(isSelectable, mode) {
    isSelectable
    console.log('deleting hoverId', )
    this.props.setHoverId(null)
    if (mode == 0) {
      this.hideComment()
    } else if (isSelectable) {
      this.unhighlight()
    }

  }

  render() {
    const { buyable, mode, color, rentable, selectPixel, size } = this.props;
    const { hover } = this.state;
    const isSelectable = (mode===1 && buyable) || (mode===2 && rentable);
    const isDisabled = (mode===1 && !buyable) || (mode===2 && !rentable);

    return (
      <div
        onClick={isSelectable ? selectPixel : () => {}}
        onMouseEnter={()=>this.enterCell(isSelectable, mode)}
        onMouseLeave={()=>this.exitCell(isSelectable, mode)}
        style={{
          'backgroundColor': color,
          'width': size + 'px',
          'height': size + 'px',
          'float': 'left',
          'outline': hover ? '2px solid black' : 'none',
          'opacity': isDisabled ? '0.1' : '1',
          'zIndex': isSelectable ? '1' : '0',
          'boxShadow': isSelectable ? '0px 0px 2px black' : 'none',
          'cursor': 'pointer',
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
