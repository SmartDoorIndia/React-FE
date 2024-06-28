/** @format */

import { useEffect, useState, useMemo } from "react";
import Image from "../../../../shared/Image/Image";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { getAllBuilderProjects } from "../../../../common/redux/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import Pagination from "../../../../shared/DataTable/Pagination";
import Buttons from "../../../../shared/Buttons/Buttons";
import contentIco from "../../../../assets/images/content-ico.svg";
import { ToolTip } from "../../../../common/helpers/Utils";
import ListingDataTable from "../../../../shared/DataTable/ListingDataTable";

const BuilderPropertyListing = (props) =>{
   const { getAllBuilderProjects, getAllBuilderProjectsData } = props;

   useEffect(() => {
      getAllBuilderProjects({
         records: "",
         pageNumber: "",
      });
      console.log("useEffect : getAllBuilderProjectsData :", getAllBuilderProjectsData);
   }, [getAllBuilderProjects]);

   const Columns = useMemo(() => [
      {
         name: "Id",
         selector: "reraId",
         center: true,
         sortable: true,
         maxWidth: "150px !important",
         cell: ({ reraId }) => <span>{`${reraId || ""}`}</span>,
      },

      {
         name: "Project Name",
         selector: "societyName",
         center: true,
         cell: ({ societyName }) => <span>{`${societyName || ""}`}</span>,
      },
      {
         name: " Builder Name",
         selector: "builderName",
         center: true,
         style: { padding: "0 !important" },
         // cell: ({locality,societyName})=>(<span>{`${locality||societyName}`}</span>),
      },
      {
         name: "Locality",
         wrap: true,
         // center:true,
         // selector: 'locality',
         // style:{"padding":"2px !important"},
         cell: ({ locality }) => (
            <ToolTip position="top" style={{ width: "100%" } } name={ locality }>
               <span className="cursor-pointer elipsis-text"> {locality || '-'}</span>
            </ToolTip>
         ),
      },
      {
         name: "City",
         selector: "city",
         center: true,
         maxWidth: "150px !important",
         cell: ({ city }) => <span>{`${city}`}</span>,
      },
      {
         name: "Action",
         selector: "year",
         sortable: false,
         center: true,
         maxWidth: '60px',
         cell: ({ row, reraId }) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                             <span> 
                     <Link
                        // `/admin/helpdesk/serviceRequest-details/${id}`
                        to={
                           props.module === "BUILDER"
                              ? {
                                   pathname: `/builder/projects/detail/${ reraId }`,
                                   // state: {propertyId : smartdoorPropertyId,
                                   //         userId : userData.userid}
                                }
                              : {
                                   pathname: '/admin/builder-project/builder-project-details',
                                   // state: {propertyId : smartdoorPropertyId,
                                   //         userId : userData.userid}
                                }
                        }>
                        <Image name="editIcon" src={ contentIco } />
                     </Link>
                     {/* <Image name="editIcon" src={contentIco} /> */}
                  </span>
               </ToolTip>
               {/* <span>
                            <Link  > 
                              <Image name="useraddIcon" src={cancleIco} />
                            </Link>  
                            </span> */}
            </div>
         ),
      },
   ]);

   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom">
          <Link  to="/admin/builder-property/new-builder-property"><Buttons name="Add New Entry" varient="success" type="submit" size="Small" color="white" /></Link>
      </div>
   );

   const PaginationComponent = (props) => (
      <Pagination {...props} PaginationActionButton={PaginationActionButton} />
   );

   return (
      <>
         <Link to={{ pathname: "/admin/builder-project/builder-project-details" }}></Link>

         <ListingDataTable
            title="Builder Projects"
            data={ getAllBuilderProjectsData.data }
            columns={ Columns }
            isLoading={ false }
            PaginationComponent={ PaginationComponent }
            perPageOptions={[4, 10, 20, 50 ] }
            paginationPerPage={ 10 }
            PaginationButton={<PaginationActionButton />}
         />
      </>
   );
};

// mapStateToProps
const mapStateToProps = ({ getAllBuilderProjectsData }) => ({
   getAllBuilderProjectsData,
});

// mapDispatchToProps
const actions = {
   getAllBuilderProjects,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect)(BuilderPropertyListing);
