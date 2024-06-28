/** @format */

import React from 'react';
import './PropertyDoc.scss';
import DocumentDetail from '../../../shared/DocumentDetailsComponent/DocumentDetail';

const PropertyDoc = (props) => {
  const propertyDocsResp = props.location.state ?
      props.location.state.propertyDocsResp ?
         props.location.state.propertyDocsResp :
         [] :
      [];
      const propertyId =  
      props.location.state.propertyId ? 
        props.location.state.propertyId : 
          null
    const userId = props.location.state.userId ? 
        props.location.state.userId : 
          null

  return (
    <div className="doc_container bg-white rounded my-0">
      {/* {(doc_imgArr.length > 0)? */}
      <DocumentDetail doc_imgArr={ propertyDocsResp } propertyId={propertyId} userId={userId} />
      {/* :null} */}
    </div>
  );
};

export default PropertyDoc;
