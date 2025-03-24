import React, { useState } from 'react'
import BuilderProjectList from './BuilderProjects/BuilderProjectList';
import BuilderDetails from './BuilderDetails/BuilderDetails';
import Buttons from '../../../../shared/Buttons/Buttons';
import { Button, Row } from 'react-bootstrap';
import Text from '../../../../shared/Text/Text';

const BuilderInfo = (props) => {

    const [projectFlag, setProjectFlag] = useState(true);
    const [detailsFlag, setDetailsFlag] = useState(false);
    // console.log(props)
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
                    <div className='me-3 w-100' style={{justifyItems: 'end'}}>
                        <Button
                            className="d-flex px-2 ml-3"
                            style={{
                                color: "#949494",
                                backgroundColor: "#FFF",
                                borderColor: "#DED6D9",
                            }}
                        >
                            <Text
                                text={"In-Active"}
                                fontWeight="bold"
                                style={{ fontSize: "12px", color: "#949494" }}
                            />
                        </Button>
                    </div>
            </div>

            {projectFlag ?
                <>
                    <BuilderProjectList builderId = {props?.location?.state?.builderId} />
                </>
                :
                null}
            {detailsFlag ?
                <>
                    <BuilderDetails builderId = {props?.location?.state?.builderId} />
                </>
                :
                null}
        </>
    )
}

export default BuilderInfo