import "./BuilderProjectEdit.scss";

import Form from "react-bootstrap/Form";

import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Row } from "react-bootstrap";

import Buttons from "../../../../shared/Buttons/Buttons";
import Text from "../../../../shared/Text/Text";
import Image from "../../../../shared/Image/Image";
import Camera from "../../../../assets/images/camra-icon.svg";
import Input from '../../../../shared/Inputs/Input/Input';
import TextArea from '../../../../shared/Inputs/TextArea/TextArea';
import MapComponent from "../../../../shared/Map/MapComponent";
import UserImg from "../../../../assets/images/author.png";
import House from "../../../../assets/images/houseIcon.svg";
import TowerList from './TowerList';

import { editBuilderValidationSchema } from '../../../../common/validations/builder.validation';
import { dateWithFormate } from '../../../../common/helpers/Utils';

// import Building from "../BuilderProperty/Building";
// import { ToolTip, showLimitedChar } from "../../../../common/helpers/Utils";
// import AutoCompleteInput from "../../../../shared/Inputs/AutoComplete";
// import S3 from "react-aws-s3";
// import { validateBuilderProperty } from "../../../../common/validations";
// import ConfirmationModal from "../../../../shared/Modal/ConfirmationModal/ConfirmationModal";
// import Constants from "../../../../common/helpers/Constants";
// import Swimming from "../../../../assets/images/la_swimming-pool.svg";
// import Power from "../../../../assets/images/powerIcon.svg";
// import Gym from "../../../../assets/images/gym.svg";
// import Lift from "../../../../assets/images/liftIcon.svg";
// import Gated from "../../../../assets/images/Gatedcommunity.svg";
// import Parking from "../../../../assets/images/tabler_parking.svg";
// import Pets from "../../../../assets/images/Pets.svg";
// import Playground from "../../../../assets/images/playground.svg";



const BuilderProjectEdit = () => {

   const { state } = useLocation();
   const projectData = state?.projectData;

   // functions to build form returned by useForm() hook
  const { register, handleSubmit, formState:{ errors }, reset } = useForm({
    resolver: yupResolver(editBuilderValidationSchema)
  });

   function onSubmit(data) {

     // display form data on success
     console.log('SUCCESS!! :-)\n\n', data);
   }

   console.log('useLocation!! :-)', projectData);

   return(
           <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>

	            <div className="builderForm bg-white mt-1">
	               <Text
	                  size="regular"
	                  fontWeight="mediumbold"
	                  color="secondryColor"
	                  text="Project Details"
	               />

                  <Row>
                     <Col lg={4} md={4}>
                        <Input
                           label="Project Group"
                           type="text"
                           placeholder="Enter Project Group"
                           maxLength="75"
                           error={ errors?.projectGroup?.message }
                           defaultValue= { projectData?.projectGroup }
                           { ...register("projectGroup") }
                        />
                     </Col>
                     <Col lg={4} md={4}>
                        <Input 
                           label="Project Name"
                           type="text"
                           placeholder="Enter Project Name"
                           maxLength="75"                              
                           error={ errors?.projectName?.message }
                           defaultValue= { projectData?.projectName }
                           { ...register("projectName") }
                        />
                     </Col>
                     <Col lg={4} md={4}>
                        <Input 
                           label="Project Type"
                           type="text"
                           placeholder="Enter Project Type"
                           maxLength="35"                              
                           error={ errors?.projectType?.message }
                           defaultValue= { projectData?.projectType }
                           { ...register("projectType") }
                        />
                     </Col>
                     <Col lg={4} md={4}>
                        <Input 
                           label="Organization Type"
                           type="text"
                           placeholder="Enter Organization Type"
                           maxLength="35"                              
                           error={ errors?.organizationType?.message }
                           defaultValue= { projectData?.organizationType }
                           { ...register("organizationType") }
                        />
                     </Col>
                     <Col lg={4} md={4}>
                        <Input 
                           label="Promoter Name"
                           type="text"
                           placeholder="Enter Promoter Name"
                           maxLength="35"                              
                           defaultValue= { projectData?.promotorInfo?.promotorName }
                           { ...register("promotorName") }
                        />
                     </Col>
                     <Col lg={4} md={4}>
                        <Input 
                           label="Promoter Contact Number"
                           type="number"
                           placeholder="Enter Promoter Contact Number"
                           defaultValue= { projectData?.promotorInfo?.contactNo }
                           { ...register("contactNo") }
                        />
                     </Col>
                  </Row>

                  <Row>

                     <Col lg={8} md={6}>
                        <Row>
                           <Col lg={6} md={6}>
                              <Input 
                                 label="Last Modified"
                                 type="date"
                                 defaultValue={ dateWithFormate(projectData?.lastModifiedDate, "YYYY-MM-DD") }
                                 { ...register("lastModifiedDate") }
                              />
                           </Col>

                           <Col lg={6} md={6}>
                              <Input 
                                 label="Proposed Date Of Completionn"
                                 type="date"
                                 defaultValue={ dateWithFormate(projectData?.proposedDateOfCompletion, "YYYY-MM-DD") }
                                 { ...register("proposedDateOfCompletion") }
                              />
                           </Col>
                           <Col lg={6} md={6}>
                              <Input 
                                 label="Revised Proposed Date Of Completion"
                                 type="date"
                                 defaultValue={ dateWithFormate(projectData?.revisedDateOfCompletion, "YYYY-MM-DD") }
                                 { ...register("revisedDateOfCompletion") }
                              />
                           </Col>

                           <Col lg={6} md={6}>
                              <Input 
                                 label="Extention Date (Optional)"
                                 type="date"
                                 defaultValue={ dateWithFormate(projectData?.extensionDate, "YYYY-MM-DD") }
                                 { ...register("extensionDate") }
                              />
                           </Col>
                        </Row>
                     </Col>

                     <Col lg={4} md={4}>
                        <TextArea 
                           id="description" 
                           label="Short description" 
                           rows="6"
                           placeholder="Enter Description..." 
                           style={{"maxHeight":"132px"}} maxLength={500} 
                           defaultValue={ projectData?.description }
                           { ...register("description") }
                           />
                     </Col>

                  </Row>

                  <Row className="mt-4">
                     <Col lg={4} md={4}>
                        <Text  size="regular" fontWeight="mediumbold" color="secondryColor" text="Builder Details" />

                        <Input 
                           label="Builder Name (Organization Name)" 
                           type="text" 
                           maxLength="35" 
                           placeholder="Enter Builder Name"  
                           defaultValue={ projectData?.builderInfo?.builderName }
                           { ...register("builderName") } />

                        <Input 
                           label="Contact Number" 
                           type="number" 
                           min="0" 
                           placeholder="Enter Contact Number" 
                           defaultValue={ projectData?.builderInfo?.builderContactNo }
                           { ...register("builderContactNo")} />
                        <Input 
                           label="Email" 
                           type="email" 
                           maxLength="35" 
                           placeholder="Enter Email" 
                           defaultValue={ projectData?.builderInfo?.email }
                           { ...register("email") } />
                        <Input 
                           label="Sales Office Address" 
                           type="text" 
                           maxLength="100" 
                           placeholder="Enter Sales Office Address" 
                           defaultValue={ projectData?.builderInfo?.address }
                           { ...register("address") } />
                        <Input 
                           label="Website Url" 
                           type="email" 
                           maxLength="75" 
                           className="primaryColor" 
                           placeholder="Enter Website Url" 
                           defaultValue= { projectData?.builderInfo?.website }
                           { ...register("website") } />
                        <div className="mt-4-5"> </div>

                        <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Site Address" />
                        <Text 
                           size="Small" 
                           fontWeight="regularbold" 
                           color="secondryColor"
                           className="addresText" 
                           text={ projectData?.siteLocation } />

                        <div className="positionRelative">
                           <MapComponent p_lat={0} p_lng={0} draggable
                              // onMarkerDragEnd={(result) => this.onMarkerDragEnd(result)}
                           />
                        </div>

                        <Input 
                           label="Plot Number" 
                           type="text" 
                           maxLength="20" 
                           placeholder="Enter Plot Number" 
                           defaultValue={ projectData?.plotNumber }
                           { ...register("plotNumber") } />
                        <Input 
                           label="Locality" 
                           type="text" 
                           maxLength="35" 
                           placeholder="Enter Locality" 
                           defaultValue={ projectData?.locality }
                           { ...register("locality") } />

                        <Row>
                           <Col lg={6}>
                              <Input 
                                 label="State" 
                                 type="text" 
                                 maxLength="35" 
                                 placeholder="Enter State"
                                 defaultValue={ projectData?.state }
                                 { ...register("state") } />
                           </Col>
                           <Col lg={6} className="colPad" >
                              <Input 
                                 label="Division" 
                                 type="text" 
                                 maxLength="35" 
                                 placeholder="Enter Division" 
                                 defaultValue={ projectData?.division }
                                 { ...register("division") } />
                           </Col>

                           <Col lg={6}>
                              <Input 
                                 label="District" 
                                 type="text" 
                                 maxLength="35" 
                                 placeholder="Enter District" 
                                 defaultValue={ projectData?.district }
                                 { ...register("district") } />
                           </Col>
                           <Col lg={6} className="colPad" >
                              <Input 
                                 label="Taluka" 
                                 type="text" 
                                 maxLength="35" 
                                 placeholder="Enter Taluka" 
                                 defaultValue={ projectData?.taluka }
                                 { ...register("taluka") } />
                           </Col>

                           <Col lg={6}>
                              <Input 
                                 label="Village" 
                                 type="text" 
                                 maxLength="35" 
                                 placeholder="Enter Village" 
                                 defaultValue={ projectData?.village }
                                 {...register("village")} />
                           </Col>
                           <Col lg={6} className="colPad">
                              <Input 
                                 label="Pincode" 
                                 type="number" 
                                 min="0" 
                                 placeholder="Enter Pincode" 
                                 defaultValue={ projectData?.zipCode }
                                 {...register("zipCode")} />
                           </Col>
                        </Row>

                        <div className="mt-4-5"> </div>                       
                        <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Property Images" />

                        <div className="companyLogo mt-2">
                           <Image
                              name="consumerIcon"
                              src={Camera}
                           />
                           <Text
                              size="Small"
                              color="gray"
                              text="Upload Images"
                              className="fileSelectText ml-2"
                              fontWeight="regularbold"
                              />

                           <Form.File
                              id="exampleFormControlFile1"
                              className="fileSelect"
                              custom
                              accept=".png, .jpg, .jpeg"
                           />
                        </div>
                        <Row className="selectedImg mt-2">
                           <div className="position-relative selectedImgList">
                              <Image name="consumerIcon" src={UserImg} />
                              <span className="crossIcon">&#10005;</span>                              
                           </div>
                           <div className="position-relative selectedImgList">
                              <Image name="consumerIcon" src={UserImg} />
                              <span className="crossIcon">&#10005;</span>                              
                           </div>
                           <div className="position-relative selectedImgList">
                              <Image name="consumerIcon" src={UserImg} />
                              <span className="crossIcon">&#10005;</span>                              
                           </div>
                        </Row>

                        <div className="mt-4"></div>                       
                        <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Amenities" />

                        <Row className="amenitiesBox">
                           <Col lg={4}>
                              <div className="boxAmenities">
                                 <Image src={House} name="House" />
                                 <Text
                                    size="small"
                                    fontWeight="smbold"
                                    color="secondryColor"
                                    text="Club House"
                                 />
                              </div>
                           </Col>
                        </Row>
                        <Text 
                           size="Small" 
                           fontWeight="mediumbold" 
                           color="primaryColor" 
                           text="Add more amenities" className="mt-2" />


                     </Col>

                     <Col lg={8}>
                        <Text
                           size="regular"
                           fontWeight="mediumbold"
                           color="secondryColor"
                           text="Project Specifications"
                        />
                        <Row>
                           <Col lg={6}>
                              <Input 
                                 label="Total Building Count" 
                                 type="number" 
                                 placeholder="Enter Building Count" 
                                 defaultValue={ projectData?.totalBuildingCount }
                                 { ...register("totalBuildingCount") } />
                           </Col>
                           <Col lg={6}>
                              <Input 
                                 label="Sanctioned Count" 
                                 type="number" 
                                 placeholder="Enter Sanctioned Count" 
                                 defaultValue={ projectData?.sanctionedCount }
                                 {...register("sanctionedCount")} />
                           </Col>
                           <Col lg={6}>
                              <Input 
                                 label="Aggregate Area (Sq. ft)" 
                                 type="number" 
                                 placeholder="Enter Aggregate Area" 
                                 defaultValue={ projectData?.aggregateArea }
                                 { ...register("aggregateArea") } />
                           </Col>
                           <Col lg={6}>
                              <Input 
                                 label="Builtup Area As Per Approved FSI (Sq. ft)" 
                                 type="number" 
                                 placeholder="Enter Builtup Area" 
                                 defaultValue={ projectData?.buildUpAsPerFsi }
                                 { ...register("builtUpAreaAsPerApprovedFsi") } />
                           </Col>
                           <Col lg={6}>
                              <Input 
                                 label="Total FSI (Sq. ft)" 
                                 type="number" 
                                 placeholder="Enter Total FSI"  
                                 defaultValue={ projectData?.totalFsi }
                                 { ...register("totalFsi") } />
                           </Col>
                           <Col lg={6}>
                              <Input 
                                 label="Covered Parking" 
                                 type="number" 
                                 placeholder="Enter Covered Parking" 
                                 defaultValue={ projectData?.coveredParking }
                                 { ...register("coveredParking") } />
                           </Col>
                        </Row>

                        <TowerList />

                        <div className="submitBtn mt-3">
                           <Buttons
                              name="Get Approval"
                              varient="primary"
                              type="submit"
                              size="Small"
                              color="white"
                           />
                        </div>
                     </Col>
                  </Row>

				</div>				
			</form>
			);
}


export default BuilderProjectEdit;

