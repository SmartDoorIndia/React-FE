/** @format */

import './BuilderProjectView.scss';

import { Row, Col } from 'react-bootstrap';
import { useParams, useHistory, Link } from 'react-router-dom';
import { ShimmerText, ShimmerTitle } from "react-shimmer-effects";
import { useState, useEffect, useCallback } from 'react';

import ImageSliderComponent from '../../../../shared/ImageSlider/ImageSliderComponent';
import Buttons from '../../../../shared/Buttons/Buttons';
import MapComponent from '../../../../shared/Map/MapComponent';
import Text from '../../../../shared/Text/Text';
import Image from '../../../../shared/Image/Image';
import ExpandableDataTable from '../../../../shared/DataTable/ExpandableDataTable';
import ListingDataTable from '../../../../shared/DataTable/ListingDataTable';
import TextWrap from '../../../../shared/Common/TextWrap';

import { useUserContext } from '../../../../common/helpers/Auth';
import { rotateTableIcon, formateDate } from '../../../../common/helpers/Utils';
import { getAdminBuilderProjectDetailById } from '../../../../common/redux/actions/builder.action';
import { builderListingColumns, projectResidentialColumn, projectCommercialColumn } from './BuilderProjectViewColumn';


const BuilderProject = () => {
  const { builderProjectId } = useParams();
  const { auth: { userData } } = useUserContext();
  const history = useHistory();

  if(!builderProjectId) {
    history.push('/admin/builder-project/')
  };

  const [ projectData, setProjectData ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const getBuilderProject = useCallback( async () => {
    setLoading(true);

    const response = await getAdminBuilderProjectDetailById({
      builderProjectId: builderProjectId,
      userId: userData.userid
    });

    if (response) {
      setProjectData(response);  
    }

    setLoading(false);   
  }, [ builderProjectId, userData]);

  useEffect(()=>{
    getBuilderProject();

  },[ getBuilderProject ]);
  

  // The row data is composed into your custom expandable component via the data prop
  const MyExpander = ({ data }) => {

    return (
      <div className="expander ml-5 mr-5 mb-3">
        <Row className="mt-2">
          <TextWrap text="Construct Type" subText="Residential, Commercial" lg={3} />
          <TextWrap text="No. Of Open Parkings" subText="26" lg={2} />
          <TextWrap text="No. Of Closed Parkings" subText="24" lg={2} />
        </Row>

        {
          data?.listOfTowerResp?.length && 
          data.listOfTowerResp.map(( item ) => (
            <ListingDataTable
              data={ item.listPropertyDetailResp }
              columns={ 
                  item.constuctionType === "Residential" ?  projectResidentialColumn
                  : projectCommercialColumn
              }
              pagination={ false }
              title={ item?.towerName }
              textComponent={
                <Text
                  size="Small"
                  text={`Type: ${ item?.constuctionType }`} />
              }
            />))
        }
      </div>
    );
  };


  return (
    <>
      <div>
        <Row>
          <Col md={ 8 }>
            <ImageSliderComponent />
            {
              loading ?
                <ShimmerTitle line={2} gap={10} variant="primary" />
              :          
                <div className="d-flex justify-content-between border-bottom">
                  <div className="my-0 pb-3 ">
                    <Text
                      size="large"
                      fontWeight="mediumbold"
                      color="secondryColor"
                      text={ projectData?.projectGroup || "N/A" }
                    />
                    <Text
                      size="Small"
                      fontWeight="smbold"
                      color="secondryColor"
                      text={ projectData?.projectName || "-" }
                    />
                  </div>

                  <div>
                    <div className="d-flex justify-content-end">
                      <Text
                        size="Small"
                        fontWeight="smbold"
                        color="secondryColor"
                        text="Organization Type: "
                      />
                      <Text
                        size="Small"
                        fontWeight="mediumbold"
                        color="secondaryColor"
                        text={ projectData?.organizationType || "" }
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <Text
                        size="Small"
                        fontWeight="smbold"
                        color="secondryColor"
                        text="Project Type:"
                      />
                      <Text
                        size="Small"
                        fontWeight="mediumbold"
                        color="secondaryColor"
                        text={ projectData?.projectType || "" }
                      />
                    </div>
                  </div>
                </div>
            }

            <div className="windsorDetails mt-4 border-bottom pb-4">
              <Row>
                <TextWrap 
                  text="Sanctioned Count"
                  subText={ projectData?.totalBuildingCount || "-" } 
                  />
                <TextWrap 
                  text="Total Building Count" 
                  subText={ projectData?.totalBuildingCount || "-" } 
                  />
                <TextWrap 
                  text="Aggregate Area" 
                  subText={ projectData?.aggregateArea ? projectData?.aggregateArea +" Sq. Ft." : "-" } 
                  />
              </Row>
              <Row className="mt-4">
                <TextWrap 
                  text="Builtup Area As Per Approved FSI"
                  subText={ projectData?.buildUpAsPerFsi ? projectData?.buildUpAsPerFsi +" Sq. Ft." : "-" } 
                  />
                <TextWrap 
                  text="Total FSI" 
                  subText={ projectData?.totalFsi ? projectData?.totalFsi +" Sq. Ft." : "-" } 
                  />
                <TextWrap 
                  text="Covered Parking" 
                  subText={ projectData?.coveredParking ? projectData?.coveredParking +" Sq. Ft." : "-" } 
                  />
              </Row>
              <Row className="mt-4">
                <TextWrap 
                  text="Proposed Date Of Completion"
                  subText={ projectData?.proposedDateOfCompletion ? formateDate(projectData?.proposedDateOfCompletion) : "-" } 
                  />
                <TextWrap 
                  text="Revised Proposed Date Of Completion" 
                  subText={ projectData?.revisedDateOfCompletion ? formateDate(projectData?.revisedDateOfCompletion) : "-" } 
                  />
                <TextWrap 
                  text="Extention Date" 
                  subText={ projectData?.extensionDate ? formateDate(projectData?.extensionDate) : "-" }
                  />
              </Row>
            </div>
            <div className="windsorDetails mt-4 border-bottom pb-4">
              <Row className="mt-4">
                <Col lg={ 4 } md={ 4 } col={ 12 }>
                  <Text
                    size="regular"
                    fontWeight="mediumbold"
                    color="secondryColor"
                    text="Builder Info"
                  />
                  <Text
                    size="Small"
                    fontWeight="smbold"
                    color="secondryColor"
                    text={ projectData?.builderInfo?.builderName || "-" }
                    className="mt-2"
                  />
                  <Text
                    size="xSmall"
                    fontWeight="smbold"
                    color="secondryColor"
                    className="mt-2"
                    text={ projectData?.builderInfo?.address || "-" }
                  />
                  <div className="contactDetails">
                    <Text
                      size="xSmall"
                      fontWeight="smbold"
                      color="secondryColor"
                      text="Phone:"
                    />
                    <a href={`tel: ${projectData?.builderInfo?.builderContactNo || "-"}`} > 
                      { projectData?.builderInfo?.builderContactNo || "-" }
                    </a>
                  </div>
                  <div className="contactDetails">
                    <Text
                      size="xSmall"
                      fontWeight="smbold"
                      color="secondryColor"
                      text="Email:"
                    />
                    <a href={`mailto:${ projectData?.builderInfo?.email || "-" }`} target="_blank"> 
                      { projectData?.builderInfo?.email || "-" }
                    </a>
                  </div>
                  <div className="contactDetails">
                    <Text
                      size="xSmall"
                      fontWeight="smbold"
                      color="secondryColor"
                      text="Website:"
                    />
                    <a href={ projectData?.builderInfo?.website || "-" } target="_blank">
                      { projectData?.builderInfo?.website || "-" }
                    </a>
                  </div>
                </Col>

                <Col lg={ 4 } md={ 4 } col={ 12 }>
                  <Text
                    size="regular"
                    fontWeight="mediumbold"
                    color="secondryColor"
                    text="Promoter Info"
                  />
                  <Text
                    size="Small"
                    fontWeight="smbold"
                    color="secondryColor"
                    text={ projectData?.promotorInfo?.promotorName || "-" }
                    className="mt-2"
                  />

                  <div className="contactDetails">
                    <Text
                      size="xSmall"
                      fontWeight="smbold"
                      color="secondryColor"
                      text="Phone:"
                    />
                    <a href={`tel: ${ projectData?.promotorInfo?.contactNo || "-" }`}> 
                      { projectData?.promotorInfo?.contactNo || "-" }
                    </a>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <Col md={ 4 }>
            <Link 
              className="float-right builderEditButton" 
              to={ { 
                pathname: '/admin/builder-project/edit', 
                state: { projectData: projectData } } }>
              <Buttons
                name="Edit Details"
                type="submit"
                size="Small"
                color="lightBtn"
                className="w-100"
              />
            </Link>

            {
              loading ?
                <ShimmerText line={5} gap={10} />
              :
                <div className="bg-white rounded px-3 py-3 border">
                  <div className="border-bottom">
                    <Text
                      size="medium"
                      fontWeight="mediumbold"
                      color="secondryColor"
                      text={`Last Modified: ${formateDate(projectData?.lastModifiedDate || "" )}`}
                      className="pb-3"
                    />
                  </div>
                  <Text
                    size="body"
                    fontWeight="smbold"
                    color="secondryColor"
                    className="mt-3"
                    text={ projectData?.description || ""}
                  />
                  <Text
                    size="medium"
                    fontWeight="mediumbold"
                    color="secondryColor"
                    text="Site Location"
                    className="mt-3"
                  />
                  <Text
                    size="body"
                    fontWeight="smbold"
                    color="secondryColor"
                    className="mt-2"
                    text={ projectData?.siteLocation || "-"}
                  />
                  <div className="mapLocation my-3">
                    <div style={ { height: '120px', overflow: 'hidden' } }>
                      {
                        projectData?.mapLattitude && projectData?.mapLongitude ?
                          <MapComponent p_lat={ projectData?.mapLattitude || 0 } p_lng={ projectData?.mapLongitude || 0 } />
                        : <Text 
                            size="Small"
                            fontWeight="smbold"
                            color="TaupeGrey"
                            text="No location available" />
                      }
                    </div>
                    <div className="separator mt-4 mb-2"></div>
                    <div className="amenitiesList">
                      < Text
                        size="medium"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="Amenities"
                        className="pb-3"
                      />

                      {
                        projectData?.amenities?.length && 
                        projectData.amenities.map(( _items, index) => {
                          return (
                              <div className="d-flex align-items-center" key={index}>
                                <Image src={ _items.amenityURL || "" } name={_items.amenityName || "amenitiesIcon"} />
                                <Text
                                  size="Small"
                                  fontWeight="smbold"
                                  color="secondryColor"
                                  text={_items.amenityName}
                                  className="pl-2 pb-3"
                                />
                              </div>
                            )

                        })
                      }

                    </div>
                  </div>
                </div>
              }
          </Col>
        </Row>

        <div>
          <Text
            size="regular"
            fontWeight="mediumbold"
            color="secondryColor"
            text="Building Details"
            className="mt-4"
          />

          {
            loading ?
              <ShimmerTitle />
            :
              <ExpandableDataTable
                columns={ builderListingColumns }
                data={ 
                  projectData?.buildingDetailResponse && 
                  projectData?.buildingDetailResponse.length && 
                  projectData?.buildingDetailResponse || [] }
                expandableRowsComponent={ MyExpander }
                onRowExpandToggled={ (toggleState, row) =>
                  rotateTableIcon('datatable_' + row.towerId, toggleState)
                }
                striped={false} />
          }

        </div>
      </div>
    </>
  );
};

export default BuilderProject;

