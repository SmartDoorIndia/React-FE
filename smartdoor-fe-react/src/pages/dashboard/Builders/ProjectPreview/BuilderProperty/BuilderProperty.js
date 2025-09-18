/** @format */

import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Text from "../../../../../shared/Text/Text";
import { formatPrice } from "../../../../../common/helpers/Utils";
import StarRating from "../../../../../shared/StarRating/StarRating";
import ExpandedBuilderProperty from "./ExpandedBuilderProperty";

const BuilderProperty = (props) => {
   const { builderPropertyDetailList, subProject } = props;
   const [selectedProperty, setSelectedProperty] = useState({ propertyId: 0 });

   console.log(props);

   return (
      <>
         <div className="row justify-content-center">
            {builderPropertyDetailList?.map((property) => (
               <Col lg={11}>
                  {selectedProperty?.propertyId !== property?.propertyId ? (
                     <Card
                        className="w-100 mb-3"
                        onClick={() => {
                           setSelectedProperty(property);
                        }}
                        style={{ cursor: "pointer" }}
                     >
                        <Card.Body>
                           <div className="d-flex">
                              <div className="col text-start p-0">
                                 <Text
                                    text={
                                       property?.compositionType?.trim()?.length === 0
                                          ? property?.propertySubType
                                          : property?.compositionType
                                    }
                                    style={{ fontSize: "16px", fontWeight: "700" }}
                                 />
                              </div>
                              <div className="col text-end p-0">
                                 <Text
                                    className=""
                                    text={
                                       "₹" +
                                       formatPrice(property?.minPrice) +
                                       " - " +
                                       "₹" +
                                       formatPrice(property?.maxPrice)
                                    }
                                    style={{
                                       fontSize: "18px",
                                       fontWeight: "800",
                                       color: "#BE1452",
                                    }}
                                 />
                              </div>
                           </div>
                           <div className="d-flex text-start">
                              <Text
                                 text={
                                    (property.minArea || 0) +
                                    "Sq. Ft - " +
                                    (property.maxArea || 0) +
                                    "Sq. Ft"
                                 }
                                 style={{ fontSize: "13px", fontWeight: "700" }}
                              />
                           </div>
                           <div className="d-flex">
                              <div className="text-start w-auto">
                                 <Text
                                    className="mt-1"
                                    text={"Amenities:"}
                                    style={{ fontSize: "13px", fontWeight: "700" }}
                                 />
                              </div>
                              <div
                                 style={{
                                    scale: "0.7",
                                    marginInlineStart: "-7%",
                                    marginTop: "-1%",
                                 }}
                              >
                                 <StarRating rating={subProject?.amenitiesRating} />
                              </div>
                           </div>
                        </Card.Body>
                        <Card.Footer style={{ backgroundColor: "#D1D1D1" }}>
                           <div className="d-flex">
                              <div className="col text-start p-0">
                                 <Text
                                    text={subProject.projectName}
                                    style={{ fontSize: "13px", fontWeight: "700" }}
                                 />
                              </div>
                              <div className="col text-end">
                                 <Text
                                    className=""
                                    text={"Total Floors: " + (subProject.totalFloors || 0)}
                                    style={{
                                       fontSize: "14px",
                                       fontWeight: "700",
                                       color: "#BE1452",
                                    }}
                                 />
                              </div>
                           </div>
                        </Card.Footer>
                     </Card>
                  ) : (
                     <div className="w-100 mb-3">
                        <ExpandedBuilderProperty
                           property={selectedProperty}
                           subProject={subProject}
                        />
                     </div>
                  )}
               </Col>
            ))}
         </div>
      </>
   );
};

export default BuilderProperty;
