import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Text from '../../shared/Text/Text';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Header.scss';
import { useHistory } from 'react-router-dom';

import Buttons from '../../shared/Buttons/Buttons';
import HeaderAction from './HeaderAction/HeaderAction';
import BuilderHeaderAction from './HeaderAction/BuilderHeaderAction';
import { Box, Stepper } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useState } from 'react';
import { useEffect } from 'react';

const Header = (props) => {
  const history = useHistory();
  // const location = useLocation();

  const { dashboardTitle: { name, bradcrumb, headerButton, stepper }, builder } = props;

  const [activeStep, setActiveStep] = useState(null);
  const [completed, setCompleted] = useState({});

  const steps = [1, 2, 3, 4, 5, 6]

  useEffect(() => {
    setActiveStep(parseInt(stepper, 10))
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  })
  // console.log("history@@", history);

  function handleHeaderButton(action) {
    if (action === 'Back') {
      history.goBack();
    } else if (action === 'Edit') {
      console.log('action is edit');
      history.push('/admin/property/edit-property');
    } else {
      console.log('action is nothing');
    }
  }

  const routeTo = (data) => {
    if (bradcrumb.length < 2) {
      history.goBack();
    } else {
      console.log("routeTo:", bradcrumb.length - bradcrumb.indexOf(data) - 1);
      const route_to = bradcrumb.length - bradcrumb.indexOf(data) - 1
      history.go(-route_to)
    }
  }

  return (
    <>
      <div className="heaerRow">
        <div>
          <Text size="medium" fontWeight="mediumbold" color="secondryColor" text={name} />
          <Text size="Small" color="TaupeGrey" text="" />
        </div>
        {
          builder ?
            <BuilderHeaderAction /> :
            <HeaderAction {...props} />
        }

      </div>
      <div className="d-flex justify-content-between">
        {
          bradcrumb ?
            <>
              <Breadcrumb>
                {
                  bradcrumb.map((data, index) =>
                  (
                    // <Breadcrumb.Item
                    //   key={ index }
                    //   onClick={ ()=>data === bradcrumb[ bradcrumb.length - 1 ] ? console.log() : history.goBack() }
                    //   active={ data === bradcrumb[ bradcrumb.length - 1 ] ? true : false } >
                    //   {data}
                    // </Breadcrumb.Item>),

                    //code tried
                    <Breadcrumb.Item
                      key={index}
                      onClick={() => routeTo(data)}
                      active={data === bradcrumb[bradcrumb.length - 1] ? true : false} >
                      {data}
                    </Breadcrumb.Item>),
                  )
                }
              </Breadcrumb>
            </> :
            null

        }
        {stepper !== null ?

          <Box className="mt-4" sx={{ width: '20%', marginInlineEnd: '5%' }}>
            <Stepper alternativeLabel activeStep={activeStep - 1} active={true} >
              {steps.map((label) => (
                <Step key={label} >
                  <StepLabel></StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          : null
        }
        {
          headerButton ?
            <div className="d-flex justify-content-end backButton align-self-center h-25">
              <Buttons
                name={headerButton}
                onClick={() => handleHeaderButton(headerButton)}
                varient="disable"
                type="submit"
                size="Small"
                color="disable"
                className="ml-3 header_btn" />

            </div> :
            null
        }
      </div>

    </>
  )
}

const mapStateToProps = ({ dashboardTitle }) => ({
  dashboardTitle,
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(Header);
