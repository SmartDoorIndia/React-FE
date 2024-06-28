import React, { Component } from 'react';
import Slider from 'react-slick';
import watermarkimg from '../../assets/images/building-image.svg';

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    console.log('props:', this.props.imagesArr);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    const settings = {
      arrows: false,
      autoplay: false,
      infinite: false,
    };

    return (
      <div className="mb-3 imageViewer">
        <Slider
          asNavFor={ this.state.nav2 }
          ref={ (slider) => (this.slider1 = slider) }
          className="bigSlider"
          { ...settings }
        >
          {
            this.props.imagesArr ?
            this.props.imagesArr.map( (cVal) =>(<div className="item-img"> <img src={ cVal.docURL } alt="" style={ { height: '100%', width: '100%' } } /> </div>)) :
            <div className="item-img noImage"> <img src={ watermarkimg } alt="" style={ { height: '100%', width: '100%', objectFit: 'fill' } } /> </div>
          }

        </Slider>
        <Slider
          asNavFor={ this.state.nav1 }
          ref={ (slider) => (this.slider2 = slider) }
          slidesToShow={ 4 }
          swipeToSlide={ true }
          focusOnSelect={ true }
          className="thumbSlider"
          { ...settings }
        >
          {
            this.props.imagesArr ?
            this.props.imagesArr.map( (cVal) =>(<div className="item-img"> <img src={ cVal.docURL } alt="" /> </div>)) :
            <div className="item-img noImage"> <img src={ watermarkimg } alt="" style={ { height: '100%', width: '100%', objectFit: 'fill' } } /> </div>
          }

        </Slider>
      </div>
    );
  }
}
