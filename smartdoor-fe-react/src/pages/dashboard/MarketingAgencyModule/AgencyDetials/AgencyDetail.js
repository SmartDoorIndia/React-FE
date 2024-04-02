import { useEffect } from "react";
import { compose } from "redux";
import Text from "../../../../shared/Text/Text";
import { Col, Row } from "react-bootstrap";

const AgencyDetail = (props) => {

    useEffect(() => {

    },[]);

    return(
        <>
            <div className="whiteBg">
                <Row className="d-flex">
                    <Col lg='3'>
                        <Text text={'Agency Name'} />
                        <Text text={'Agency Name'} />
                    </Col>
                    <Col lg='3'>
                        <Text text={'Total Spent'} />
                        <Text text={'0'} />
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default compose(AgencyDetail);