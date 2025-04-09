import React, { useEffect, useState } from 'react'
import BuilderProjectList from './BuilderProjects/BuilderProjectList';
import BuilderDetails from './BuilderDetails/BuilderDetails';
import Buttons from '../../../../shared/Buttons/Buttons';
import { Button, Row } from 'react-bootstrap';
import Text from '../../../../shared/Text/Text';
import { getBuilderById } from '../../../../common/redux/actions';

const BuilderInfo = (props) => {

    const [projectFlag, setProjectFlag] = useState(true);
    const [detailsFlag, setDetailsFlag] = useState(false);
    const [builderDetails, setBuilderDetails] = useState({});

    console.log(props)

    useEffect(() => {
        getBuilderById({ builderId: props?.location?.state?.builderId })
            .then((response) => {
                // console.log(response)
                setBuilderDetails(response?.data?.resourceData);
            });
    }, []);

    return (
        <>
            <div className='d-flex mb-2'>
                <Buttons
                    color={projectFlag ? '#252525' : '#BCBCBC'}
                    name='Projects'
                    style={{ color: projectFlag ? '#252525' : '#BCBCBC', backgroundColor: 'unset', borderBottomColor: '#BE1452', borderBottomWidth: projectFlag ? 'thick' : '0', fontWeight: 'bolder' }}
                    onClick={() => { setProjectFlag(true); setDetailsFlag(false) }} ></Buttons>
                <Buttons
                    color={detailsFlag ? '#252525' : '#BCBCBC'}
                    name='Details'
                    style={{ color: detailsFlag ? '#252525' : '#BCBCBC', backgroundColor: 'unset', borderBottomColor: '#BE1452', borderBottomWidth: detailsFlag ? 'thick' : '0', fontWeight: 'bolder' }}
                    onClick={() => { setDetailsFlag(true); setProjectFlag(false) }}></Buttons>

                {/* <Buttons
                    name={builderDetails?.status}
                    varient="secondary"
                    style={{}}
                /> */}
            </div>

            {projectFlag ?
                <>
                    <BuilderProjectList builderId={props?.location?.state?.builderId} builderDetails={builderDetails} />
                </>
                :
                null}
            {detailsFlag ?
                <>
                    <BuilderDetails builderId={props?.location?.state?.builderId} />
                </>
                :
                null}
        </>
    )
}

export default BuilderInfo