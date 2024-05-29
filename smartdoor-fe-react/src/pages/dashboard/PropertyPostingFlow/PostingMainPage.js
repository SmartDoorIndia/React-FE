import { compose } from "redux"
import Text from "../../../shared/Text/Text";
import BasicDetails from "./BasicDetails";
import TermsConditions from "./TermsConditions";
import Uploads from "./Uploads";
import { useState } from "react";
import Specs from "./Specs";
import AddressSection from "./AddressSection";
import Pricing from "./Pricing";

const PostingMainPage = (props) => {
    const customerDetails = props.location.state.customerDetails;
    const miscellaneousDetails = props.location.state.miscellaneousDetails;
    const [editPropertyDetails, setEditPropertyDetails] = useState(props?.location?.state?.existingDetails)
    const [saveBasicDetails, setSaveBasicDetails] = useState({ propertyId: editPropertyDetails?.propertyId || null, saveFlag: editPropertyDetails?.saveFlag || false });
    const [saveAddressDetails, setSaveAddressDetails] = useState({ saveFlag: false });
    const [saveSpecDetails, setSaveSpecDetails] = useState({ saveFlag: false });
    const [savePricingDetails, setSavePricingDetails] = useState({ saveFlag: false });
    const [saveUploads, setSaveUploads] = useState({ propertyId: editPropertyDetails?.propertyId || null, saveFlag: false });

    const handleBasicDetails = (value) => {
        setSaveBasicDetails(value)
    }
    const handleAddressDetails = (value) => {
        setSaveAddressDetails(value)
    }
    const handleSpecDetails = (value) => {
        setSaveSpecDetails(value)
    }
    const handlePricingDetails = (value) => {
        setSavePricingDetails(value)
    }
    const handleUploads = (value) => {
        setSaveUploads(value)
    }

    return (
        <>
            <Text text={'Basic Details'} fontWeight='bold' style={{ fontSize: '18px' }} />
            <BasicDetails saveBasicDetailsFields={handleBasicDetails} editPropertyFlag={editPropertyDetails?.saveFlag || false} customerDetails={customerDetails} miscellaneousDetails={miscellaneousDetails}></BasicDetails>
            {saveBasicDetails.saveFlag ?
                <>
                    <Text text={'Address'} fontWeight='bold' style={{ fontSize: '18px' }} />
                    <AddressSection saveAddressDetailsFields={handleAddressDetails} customerDetails={customerDetails} editPropertyFlag={editPropertyDetails?.saveFlag || false}
                        propertyId={saveBasicDetails.propertyId} miscellaneousDetails={miscellaneousDetails}></AddressSection>
                </>
                : null}
            {saveAddressDetails.saveFlag ? 
            <>
                <Text text={'Specs'} fontWeight='bold' style={{ fontSize: '18px' }} />
                <Specs saveSpecDetailsFields={handleSpecDetails} customerDetails={customerDetails} editPropertyFlag={editPropertyDetails?.saveFlag || false}
                    propertyId={saveBasicDetails.propertyId} miscellaneousDetails={miscellaneousDetails} ></Specs>
            </>
            :null}
            {saveSpecDetails.saveFlag ?
            <>
                <Text text={'Pricing'} fontWeight='bold' style={{ fontSize: '18px' }} />
                <Pricing savePricingDetailsFields={handlePricingDetails} customerDetails={customerDetails} editPropertyFlag={editPropertyDetails?.saveFlag || false}
                    propertyId={saveBasicDetails.propertyId} miscellaneousDetails={miscellaneousDetails} ></Pricing>
            </>
            :null}
            {savePricingDetails.saveFlag ?
            <>
                <Text text={'Uploads'} fontWeight='bold' style={{ fontSize: '18px' }} />
                <Uploads saveUploadsFields={handleUploads} propertyId={saveBasicDetails.propertyId} customerDetails={customerDetails} editPropertyFlag={editPropertyDetails?.saveFlag || false} miscellaneousDetails={miscellaneousDetails} ></Uploads>
            </>
            :null}
            {saveUploads.saveFlag ?
            <>
                <Text text={'Terms and Conditions'} fontWeight='bold' style={{ fontSize: '18px' }} />
                <TermsConditions propertyId={saveBasicDetails.propertyId} miscellaneousDetails={miscellaneousDetails} editPropertyFlag={editPropertyDetails?.saveFlag || false} customerDetails={customerDetails} ></TermsConditions>
            </>
            :null}
        </>
    );
}

export default compose(PostingMainPage);