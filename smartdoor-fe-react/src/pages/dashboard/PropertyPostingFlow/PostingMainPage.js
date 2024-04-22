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
    const [saveBasicDetails, setSaveBasicDetails] = useState({propertyId : null, saveFlag: false});

    const handleBasicDetails = (value) => {
        console.log(value)
        setSaveBasicDetails(value)
    }

    return (
        <>
            <Text text={'Basic Details'} fontWeight='bold' style={{fontSize: '18px'}} />
            <BasicDetails saveBasicDetailsFields={handleBasicDetails} customerDetails={customerDetails}></BasicDetails>
            {saveBasicDetails.saveFlag ?
            <>
                <Text text={'Address'} fontWeight='bold' style={{fontSize: '18px'}} />
                <AddressSection></AddressSection>
                <Text text={'Specs'} fontWeight='bold' style={{fontSize: '18px'}} />
                <Specs></Specs>
                <Text text={'Pricing'} fontWeight='bold' style={{fontSize: '18px'}} />
                <Pricing></Pricing>
                <Text text={'Uploads'} fontWeight='bold' style={{fontSize: '18px'}} />
                <Uploads propertyId={saveBasicDetails.propertyId} ></Uploads>
                <Text text={'Terms and Conditions'} fontWeight='bold' style={{fontSize: '18px'}} />
                <TermsConditions propertyId={saveBasicDetails.propertyId} customerDetails={customerDetails} ></TermsConditions>
            </>
            :null}
        </>
    );
}

export default compose(PostingMainPage);