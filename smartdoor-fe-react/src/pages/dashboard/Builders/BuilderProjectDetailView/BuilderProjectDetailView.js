/** @format */

import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaMapMarkerAlt, FaVideo } from "react-icons/fa"; // Icons for location and video
import Text from "../../../../shared/Text/Text";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./BuilderProjectDetailView.scss";
import image1 from "../../../../assets/images/demo/1.png";
import image2 from "../../../../assets/images/demo/2.png";
import image3 from "../../../../assets/images/demo/3.png";
import image4 from "../../../../assets/images/demo/4.png";
import image5 from "../../../../assets/images/demo/video.png";
import image6 from "../../../../assets/images/demo/map.png";

const BuilderProjectDetailView = () => {
   const [isOpen, setIsOpen] = useState(true);
   const toggleDetails = () => {
      setIsOpen(!isOpen);
   };
   return (
      <>
         <div className=" builderprojectview-container">
            <div className="builderProjectViewDetialsMain mb-4">
               <div className="projectDetailTitle p-1 mb-2">
                  <Row>
                     <Col lg="12 d-flex justify-content-between align-items-center">
                        <Text text="Project Detail" />
                        <IoIosArrowDown style={{ color: "#fff", fontWeight: 700 }} />
                     </Col>
                  </Row>
               </div>
               <div className="builderProjectViewDetials">
                  {/* Left Section: Main Image and Thumbnails */}
                  <div className="flex-container1">
                     <img
                        src={image1} // Replace with the actual image
                        alt="Project"
                        className="img-fluid rounded"
                     />
                     <div className="d-flex mt-2 image-thumbnail">
                        {/* Thumbnail images */}
                        <img
                           src={image2}
                           alt="Thumbnail 1"
                           className=" mr-2"
                           style={{ cursor: "pointer" }}
                        />
                        <img
                           src={image3}
                           alt="Thumbnail 2"
                           className=" mr-2"
                           style={{ cursor: "pointer" }}
                        />
                        <img
                           src={image5}
                           alt="Thumbnail 2"
                           className=" mr-2"
                           style={{ cursor: "pointer" }}
                        />
                        <img
                           src={image4}
                           alt="Thumbnail 4"
                           className=" mr-2"
                           style={{ cursor: "pointer" }}
                        />
                     </div>
                  </div>

                  {/* Right Section: Project Details */}
                  <div className="flex-container2">
                     <div className="mb-2 d-flex justify-content-end">
                        <span className="badge badge-secondary">Inactive</span>
                     </div>
                     <div className="flex-container2-detail">
                        <div className="flex-item">
                           <p className="column-style">
                              <strong>Project Name</strong>
                              <span>25 Karat Glitterati</span>
                           </p>
                        </div>
                        <div className="flex-item">
                           <p className="column-style">
                              <strong>General Amenities:</strong>
                              <span>Club House, Swimming Pool, Gym, Tennis Court ... more</span>
                           </p>
                        </div>
                        <div className="flex-item">
                           <p className="column-style">
                              <strong>Total Tower / Plotted Planned: </strong>
                              <span>10</span>
                           </p>
                        </div>
                        <div className="flex-item">
                           <p className="column-style">
                              <strong>Land Area: </strong>
                              <span>12,000 Acre</span>
                           </p>
                        </div>
                        <div className="flex-item">
                           <p className="column-style">
                              <strong>Total Area To Develop: </strong>
                              <span>25,000 Sq. Ft</span>
                           </p>
                        </div>
                        <div className="flex-item">
                           <p className="column-style">
                              <strong>Open Area: </strong>
                              <span>35%</span>
                           </p>
                        </div>
                        <div className="flex-item">
                           <p className="column-style">
                              <strong>Possession: </strong>
                              <span>March 2025 - December 2026</span>
                           </p>
                        </div>
                        <br />
                        <div className="flex-item">
                           <p className="column-style">
                              <strong>Location: </strong>
                              <span>Pimple Nilakh, Pune</span>
                           </p>
                        </div>
                     </div>
                     <div>
                        <img
                           src={image6}
                           alt="Thumbnail 4"
                           className=" mr-2"
                           style={{ cursor: "pointer" }}
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className="tower-details">
               <div className="tower-header p-2">
                  <Row>
                     <Col lg="12 d-flex justify-content-between align-items-center">
                        <h4>
                           TOWER <span className="badge">1</span>
                        </h4>
                        {isOpen ? (
                           <IoIosArrowUp
                              style={{ color: "#be1452", fontWeight: 800 }}
                              onClick={toggleDetails}
                           />
                        ) : (
                           <IoIosArrowDown
                              style={{ color: "#be1452", fontWeight: 800 }}
                              onClick={toggleDetails}
                           />
                        )}{" "}
                     </Col>
                  </Row>
               </div>
               {isOpen && (
                  <>
                     <div className="unit-spec">
                        <h5>Unit Basic Specification</h5>
                        <div className="flex-row">
                           <div>
                              <strong>Tower Name</strong>
                              <p>Arihant</p>
                           </div>
                           <div>
                              <strong>Rara Number</strong>
                              <p>AJRINS23151</p>
                           </div>
                           <div>
                              <strong>Total Area To Develop</strong>
                              <p>25,000 Sq. Ft.</p>
                           </div>
                           <div>
                              <strong>Total Floors</strong>
                              <p>32</p>
                           </div>
                           <div>
                              <strong>Units Per Floor</strong>
                              <p>4</p>
                           </div>
                           <div>
                              <strong>Contact Person Name</strong>
                              <p>Bhabhuti Mishra</p>
                           </div>
                           <div>
                              <strong>Contact Person Mobile Number</strong>
                              <p>+91 989 898 9898</p>
                           </div>
                        </div>
                        <div className="flex-row">
                           <div>
                              <strong>Highlights / USP</strong>
                              <p>
                                 Lorem ipsum dolor sit amet consectetur. Pellentesque at orci tempor
                                 nulla tristique bibendum dictum fauci...
                              </p>
                           </div>
                           <div>
                              <strong>Separate Amenities</strong>
                              <p>--</p>
                           </div>
                           <div>
                              <strong>Possession</strong>
                              <p>March 2025 - December 2026</p>
                           </div>
                        </div>
                     </div>

                     <div className="other-details">
                        <h5>Other Details</h5>

                        <Row className="mb-3">
                           <Col lg="3">
                              <strong>Furnishing Type</strong>
                              <p>Semi Furnished</p>
                           </Col>
                           <Col lg="9">
                              <strong>Furnishing Description</strong>
                              <p>
                                 Lorem ipsum dolor sit amet consectetur. Varius natoque sed viverra
                                 arcu etiam eget. Nec non dui nunc quis eu feugiat. Tortor enim
                                 posuere ultrices aliquet purus congue nunc eget. At non dolor ac eu
                                 vel nec. Sodales orci eget pharetra tincidunt nisl.
                              </p>
                           </Col>
                        </Row>

                        <Row className="mb-3">
                           <Col lg="3">
                              <strong>Unit Entrance Facing & View</strong>
                              <p>Garden</p>
                           </Col>
                           <Col lg="5">
                              <strong>Internal Amenities Within The Unit</strong>
                              <p>Club House, Swimming Pool, Gym, Tennis Court, Security Services</p>
                           </Col>
                        </Row>
                        <Row>
                           <Col lg="12">
                              <strong>Property Description</strong>
                              <p>
                                 Lorem ipsum dolor sit amet consectetur. Varius natoque sed viverra
                                 arcu etiam eget. Nec non dui nunc quis eu feugiat. Tortor enim
                                 posuere ultrices aliquet purus congue nunc eget. At non dolor ac eu
                                 vel nec. Sodales orci eget pharetra tincidunt nisl.
                              </p>
                           </Col>
                        </Row>
                     </div>

                     <div className="units-available">
                        <h5>Units Available</h5>
                        <div className="unit" style={{ borderBottom: "1px solid #ddd" }}>
                           <div className="flex-item">
                              <strong>Configuration</strong>
                              <p>2BHK</p>
                           </div>
                           <div className="flex-item">
                              <strong>Total Units</strong>
                              <p>Enter</p>
                           </div>
                           <div className="flex-item">
                              <strong>Size</strong>
                              <p>800 Sq. Ft - 2,500 Sq. Ft</p>
                           </div>
                           <div className="flex-item">
                              <strong>Price Range</strong>
                              <p>₹2.1Cr - ₹2.5Cr</p>
                           </div>
                           <div className="flex-item">
                              <strong>Comments</strong>
                              <p>--</p>
                           </div>
                        </div>
                        <div className="unit">
                           <div className="flex-item">
                              <strong>Configuration</strong>
                              <p>3BHK</p>
                           </div>
                           <div className="flex-item">
                              <strong>Total Units</strong>
                              <p>Enter</p>
                           </div>
                           <div className="flex-item">
                              <strong>Size</strong>
                              <p>1,200 Sq. Ft - 2,700 Sq. Ft</p>
                           </div>
                           <div className="flex-item">
                              <strong>Price Range</strong>
                              <p>₹2.4Cr - ₹3.5Cr</p>
                           </div>
                           <div className="flex-item">
                              <strong>Comments</strong>
                              <p>--</p>
                           </div>
                        </div>
                     </div>
                  </>
               )}
            </div>
         </div>
      </>
   );
};

export default BuilderProjectDetailView;
