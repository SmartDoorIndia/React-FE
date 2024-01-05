/** @format */

import React, { Component } from 'react';
import { Form, Image } from 'react-bootstrap';
import Slider from 'react-slick';
import banner from '../../../assets/images/sb.jpg';
import banner1 from '../../../assets/images/sm1.jpg';
import banner2 from '../../../assets/images/sm2.jpg';
import banner3 from '../../../assets/images/sm3.jpg';
import waterMarkImg from '../../../assets/images/waterMark-img.png';
import watermarkimg from '../../../assets/images/building-image.svg';
import crossIcon from '../../../assets/svg/crossIcon.svg'
import './ImageSliderComponent.scss'
import { deletePropertyImage } from '../../../common/redux/actions';
import ConfirmationModal from '../../../shared/Modal/ConfirmationModal/ConfirmationModal';
// import uploadIcons from "../../../assets/svg/user-uploads.png";
import addIcons from "../../../assets/svg/add.svg";
import Loader from '../../../common/helpers/Loader';

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    console.log('props:', this.props.imagesArr);
    console.log('props:', this.props);

    this.state = {
      nav1: null,
      nav2: null,
      showDeleteImgModal: false,
      docIdModal: ''
    };
    this.deleteModal = this.deleteModal.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.deleteAction = this.deleteAction.bind(this);
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }
  // deleteImageHandler = (docId) => {
  //   console.log(docId,"ddddddddddddddddddddddddddddddddddddd")
  //   deletePropertyImage({ docId: docId })
  //       .then((response)=>{
  //         // setLoading(false);
  //         if (response.data) {
  //           if (response.data.resourceData) {
  //             // setpropertyData(response.data.resourceData);
  //           }
  //         }
  //         console.log('responseDeleteImage', response);
  //       })
  //       .catch((error)=>{
  //         // setLoading(false);
  //         console.log('error', error)
  //       })

  // }
  // const _getPropertyDetails = useCallback(() => {
  //   getPropertyDetails({ propertyId: propertyId, userId: userId })
  //       .then((response)=>{
  //         setLoading(false);
  //         if (response.data) {
  //           if (response.data.resourceData) {
  //             setpropertyData(response.data.resourceData);
  //           }
  //         }
  //         console.log('responseSocietyDetails', response);
  //       })
  //       .catch((error)=>{
  //         setLoading(false);
  //         console.log('error', error)
  //       })
  // }, [ getPropertyDetails ])

  deleteModal(docId) {
    console.log(docId, "docId of modal is selected")
    this.setState({ docIdModal: docId })
    this.setState({ showDeleteImgModal: true })
  }
  modalClose() {
    this.setState({ docIdModal: '' })
    this.setState({ showDeleteImgModal: false })
  }
  deleteAction() {
    console.log(this.state.docIdModal, "docId of image which is going to delete")
    this.props.deleteImageHandler(this.state.docIdModal)
    this.setState({ showDeleteImgModal: false })
  }

  render() {
    const settings = {
      arrows: false,
      autoplay: false,
      infinite: false,
    };

    return (
      <div className="mb-0 imageViewer">
        {this.state.showDeleteImgModal ?
          <ConfirmationModal
            // title ={ blockData.isBlocked?'Are you sure you want to unblock this user?':'Are you sure you want to block this user?' }
            title={'Are you sure you want to delete this image?'}
            cancelButtonName="Cancel"
            primaryButtonName={'Delete'}
            show={true}
            handleClose={this.modalClose}
            // handleShow={handleModalShow}
            handlePerformAction={this.deleteAction}
          />
          : null
        }
        <Slider
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
          className="bigSlider"
          {...settings}>
          {this.props.imagesArr ? (
            this.props.imagesArr.map((cVal) => (
              <>
                <div className='crossIcon'>
                  <span className='closeRight' onClick={() => this.props.deleteImageHandler(cVal?.docId)}><img src={crossIcon} alt="cross icon" /></span>
                </div>
                <div className="item-img">
                  <img src={cVal.docURL} style={{ height: '100%', width: '100%' }} />
                </div>
              </>
            ))
          ) : (
            <div className="item-img noImage">
              {' '}
              <img
                src={watermarkimg}
                style={{ height: '100%', width: '100%', objectFit: 'fill' }}
              />{' '}
            </div>
          )}
        </Slider>

        <div className='uploadImg sliderAddImage'>
          <Slider
            asNavFor={this.state.nav1}
            ref={(slider) => (this.slider2 = slider)}
            slidesToShow={3}
            swipeToSlide={true}
            focusOnSelect={true}
            className="thumbSlider propertySmallSlider"
            {...settings}>
            {this.props.imagesArr ? (
              this.props.imagesArr.map((cVal) => (
                <div className='main_box'>

                  <div className="item-img container">
                    <img src={cVal.docURL} />
                  </div>

                  <span><div onClick={() => this.props.deleteImageHandler(cVal?.docId)} className='crossIcon'><img src={crossIcon} /></div></span>

                </div>
              ))
            ) : (
              <div className="item-img noImage">
                {' '}
                <img
                  src={watermarkimg}
                  style={{ height: '100%', width: '100%', objectFit: 'fill' }}
                />{' '}
              </div>
            )}
          </Slider>
          <div className='uploadIcon'>
            <div className='inputFields'>
              <label controlId="formFileLg">
                <Form.Control disabled={this.props.imageLoader} onChange={(e) => this.props.fileUpload(e)} accept=".png, .jpg, .jpeg" type="file" size="lg" />
                {this.props.imageLoader ?
                  <div className='imageloader'>
                    <Loader />
                  </div>
                  : <Image src={addIcons} className="img-fluid" alt="Upload Icon" />}

              </label>

            </div>
          </div>
        </div>
      </div>
    );
  }
} 
