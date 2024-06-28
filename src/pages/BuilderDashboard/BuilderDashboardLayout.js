/** @format */

import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

import BuilderDashboardRoute from './BuilderDashboardRoute';
import BuilderNav from '../../shared/Navigation/BuilderNav';
import Header from '../../shared/Header/Header';

const BuilderDashboardLayout = () => {
  return (
    <Container fluid>
      <div className="dashboard">
        <Row>
          <Col lg={ 3 } className="pt_15">
            <BuilderNav />
          </Col>
          <Col lg={ 9 } className="pt_15">
            <div className="rightBox">
              <div className="headerTop">
                <Header builder />
              </div>
            </div>
            <BuilderDashboardRoute />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default BuilderDashboardLayout;
