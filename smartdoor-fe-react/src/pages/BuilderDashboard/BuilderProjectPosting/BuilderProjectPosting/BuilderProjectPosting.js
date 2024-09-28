/** @format */
import React, { useCallback, useEffect, useState } from "react";
import "./BuilderProjectPosting.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import { getBuilderById } from "../../../../common/redux/actions";
import { useUserContext } from "../../../../common/helpers/Auth";

const BuilderProjectPosting = (props) => {
   const {
      auth: { userData },
   } = useUserContext();
   console.log("LeaddetailsPage", props);
   const leadId = props.location.state ? props.location.state.leadId : "";

   const [loading, setLoading] = useState(true);
   const [data, setData] = useState({});
   const [error, setError] = useState(null);
   const [selectedSelection, setSelect] = useState("");
   const _getBuilderById = useCallback(() => {
      getBuilderById({ leadId: leadId })
         .then((response) => {
            if (response.data) {
               if (response.data.resourceData) setData(response.data.resourceData);
               if (response.data.error) setError(response.data.error);
            }
            setLoading(false);
            console.log("response", response);
         })
         .catch((error) => {
            setLoading(false);
            console.log("error", error);
         });
   }, [getBuilderById, leadId]);

   useEffect(() => {
      _getBuilderById();
   }, [_getBuilderById]);

   return (
      <div className="container-fluid mt-2 p-0">
         <div className="form-section p-2 d-flex flex-column justify-content-center align-items-center">
            <h4>You haven’t added any property yet</h4>
            <button type="button" className="new-posting-btn ">
               <FontAwesomeIcon icon={faCirclePlus} />
               Add New Posting
            </button>
         </div>
      </div>
   );
};

export default BuilderProjectPosting;
