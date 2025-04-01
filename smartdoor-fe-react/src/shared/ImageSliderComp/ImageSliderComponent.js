/** @format */

import React, { Component } from 'react';
import Slider from 'react-slick';
import watermarkimg from '../../assets/images/building-image.svg';
import './ImageSliderComponent.scss';
import YouTubeThumbnail from '../../shared/YoutubeThumbnail/YoutubeThumbnail';
import { getYouTubeVideoId } from '../../common/helpers/Utils';

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nav1: null,
      nav2: null,
      selectedImageIndex: 0,
      imageArray: [],
      playingVideoId: null
    };

  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
      imageArray: [],
      playingVideoId: null
    });

  }

  componentDidUpdate(prevProps) {
    const { imagesArr, videosArr } = this.props;
  
    if (prevProps.imagesArr !== imagesArr || prevProps.videosArr !== videosArr) {
      let videoIdList = videosArr?.map(element => {
        if (element.docURL !== null) {
          const videoId = getYouTubeVideoId(element.docURL);
          return { docURL: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` };
        }
        return null;
      }).filter(Boolean); // Remove null values
  
      // Ensure no duplicate images are added
      const updatedImageArray = [...new Set([...imagesArr, ...videoIdList])];
  
      if (JSON.stringify(this.state.imageArray) !== JSON.stringify(updatedImageArray)) {
        this.setState({ imageArray: updatedImageArray });
      }
    }
  }

  handleThumbnailClick = (index) => {

    this.setState({ selectedImageIndex: index });

    this.slider1.slickGoTo(index);

    this.slider2.slickGoTo(0);
  };

  handleVideoThumbnailClick = (index) => {

    this.setState({ selectedImageIndex: index });

    this.slider1.slickGoTo(index);

    this.slider2.slickGoTo(0);
  };

  handlePlayVideo = (videoId) => {
    this.setState({ playingVideoId: videoId }); // Update the currently playing video
  };

  render() {
    const { selectedImageIndex } = this.state;

    const settings = {
      arrows: false,
      autoplay: false,
      infinite: false,
    };


    return (
      <div className="mb-0 imageViewer">
        {/* Main Image Slider */}
        <Slider
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
          className="bigSlider"
          {...settings}
        >
          {this.props.imagesArr ? (
            this.props.imagesArr.map((cVal, index) => (
              <div key={index} className="item-img main-image" style={{ position: 'relative' }}>
                <img
                  src={cVal?.docURL || cVal}
                  alt="slider image"
                  className="slider-image"
                  style={{ objectFit: 'contain' }}
                />
                {/* {this.props.smartdoorProperty ? (
                  <img
                    src={smartdoorTag}
                    alt="top right corner image"
                    className="smartdoorTag"
                  />
                ) : null} */}
              </div>
            ))
          ) : null}

          {this.props.videosArr ? (
            this.props.videosArr.map((cVal, index) => (
              <div key={index} className="item-img main-image" style={{ position: 'relative' }}>
                <YouTubeThumbnail
                  className="slider-image youtube-thumbnail"
                  videoId={getYouTubeVideoId(cVal.docURL)}
                  isPlaying={this.state.playingVideoId === getYouTubeVideoId(cVal.docURL)}
                  onPlay={() => this.handlePlayVideo(getYouTubeVideoId(cVal.docURL))}
                  height='400'
                />
              </div>
            ))
          ) : null}

          {!this.props.imagesArr && !this.props.videosArr ? (
            <div className="item-img noImage">
              <img alt="no image available" src={watermarkimg} className="slider-image" style={{height:'30%', width:'30%'}} />
            </div>
          ) : null}
        </Slider>


        {/* Thumbnail Image Slider */}
        <div className="uploadImg sliderAddImage">
          <Slider
            asNavFor={this.state.nav1}
            ref={(slider) => (this.slider2 = slider)}
            slidesToShow={this.state.imageArray?.length < 4 ? 4 : 4}
            swipeToSlide={true}
            focusOnSelect={false}
            className="thumbSlider propertySmallSlider"
            {...settings}
            style={{ overflowX: 'auto' }}
          >
            {this.state.imageArray ? (
              this.state.imageArray.map((cVal, index) => (
                <div
                  key={index}
                  className={`main_box thumbnail p-1 ${selectedImageIndex === index ? 'selected-thumbnail' : ''}`}
                  onClick={() => this.handleThumbnailClick(index)}
                >
                  <div className="item-img thumbnail-container p-1">
                    <img
                      src={cVal?.docURL || cVal}
                      alt="thumbnail"
                      className="thumbnail-image"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="item-img noImage">
                <img
                  alt="no thumbnail available"
                  src={watermarkimg}
                  className="thumbnail-image"
                />
              </div>
            )}
            {/* {this.props.videosArr ? (
              this.props.videosArr.map((cVal, index) => (
                <div key={index}
                className={`main_box thumbnail p-1 ${selectedImageIndex === index ? 'selected-thumbnail' : ''}`} >
                  <img src={`https://img.youtube.com/vi/${getYouTubeVideoId(cVal.docURL)}/hqdefault.jpg`}  onClick={() => this.handleVideoThumbnailClick(index)}/>
                </div>
              ))
            ) : null} */}
          </Slider>
        </div>
      </div>
    );
  }
}
