import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import "./FinanceInvoice.scss";
import { emailInvoice, financeInvoice, getConsumerDetailsFinance } from '../../../../common/redux/actions';
import Text from '../../../../shared/Text/Text';
import Buttons from '../../../../shared/Buttons/Buttons';
import Loader from '../../../../common/helpers/Loader';

const FinanceInvoice = props =>{
    const [loading, setLoading] = useState(true)
    const [invoiceData, setInvoiceData] = useState([])
    const [invoiceUserData,setInvoiceUserData] = useState()
    const transactionId = props?.location?.state?.transactionId ? props?.location?.state?.transactionId : null
    const userId = props?.location?.state?.userId ? props?.location?.state?.userId : null

    const _getConsumerDetails = useCallback(() => {
        getConsumerDetailsFinance({ userId: userId, transactionId: transactionId })
          .then((response) => {
            setLoading(false);
            if (response.data) {
              if (response.data.resourceData) setInvoiceUserData(response.data.resourceData);
            }
            // console.log('consumerDetails',response.data.resourceData);
          })
          .catch((error) => {
            setLoading(false);
            console.log('error', error);
          });
      }, [getConsumerDetailsFinance]);
      
    const _financeInvoice = useCallback(() => {
        financeInvoice({ transactionId: transactionId })
          .then((response) => {
            setLoading(false);
            if (response.data) {
              if (response.data.resourceData) setInvoiceData(response.data.resourceData);
            }
            console.log('consumerDetails',response.data.resourceData);
          })
          .catch((error) => {
            setLoading(false);
            console.log('error', error);
          });
      }, [financeInvoice]);

      const downloadInvoice = useCallback(() => {
        emailInvoice({ transactionId: transactionId })
          .then((response) => {
            // setLoading(false);
            if (response.data) {
            //   if (response.data.resourceData) 
            //   setInvoiceData(response.data.resourceData);
            }
            // console.log('consumerDetails',response.data.resourceData);
          })
          .catch((error) => {
            setLoading(false);
            console.log('error', error);
          });
      }, [emailInvoice]);

    useEffect(()=> {
        // getRefundRequestDetails({ "userId": Number(userid)})
        _getConsumerDetails();
        _financeInvoice();
      }, [])
    console.log(props,"invoice");

    return(
        <>
            <div class="tableBox bg-white financeInvoiceMainWrap mt-0">
                { loading ? <Loader /> : 
                <>
                <div class="tableHeading mb-4 pb-3">
                    <div className='d-flex justify-content-between align-items-center '>
                        <div>
                            <Text size="large" className='pl-4' fontWeight="mediumbold" color="secondry-color" text={invoiceData?.userName} />
                            <Text size="Small" className='pl-4 fw500' color="secondry-color" text={invoiceData?.address} />
                        </div>
                        {invoiceData.status==="FAILED" ? null :
                            <div class="downloadBtn">
                            <Buttons onClick={downloadInvoice} className="mediumbold" size="xSmall" type="submit" name={invoiceData.planName === "Security Deposit For Visit" ? "Send Deposit Receipt" : "Send Invoice"} alt="Download Invoice" />
                        </div>}
                    </div>
                    <Row className="mt-3 pl-4">
                        <Col md={4} sm={6} lg={3}>
                            <div>
                            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Phone Number" />
                            <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={invoiceData?.phoneNumber} />
                            </div>
                        </Col>
                    </Row>
                    
                </div>
                
                <div className='financeInvoiceWrap'>
                    <div className='row'>
                        <div className='col-md-11 financeInvoiceData m-5'>
                            <div className='row'>
                                <div className='col-md-12 p-0'>
                                    <Text size="xregular" fontWeight="mediumbold" className='pl-4 invoiceDataWrapheading' text={'Invoice'} />
                                </div>
                            </div>
                            <div className='row p-2 invoiceHeading mb-2'>
                                <div className="col-md-6">
                                    <Text className='text-left' size="xxSmall" fontWeight="mediumbold" text={'ITEM NAME'} />
                                </div>
                                <div className="col-md-3">
                                    <Text className='' size="xxSmall" fontWeight="mediumbold" text={'QUANTITY'} />
                                </div>
                                <div className="col-md-3">
                                    <Text className='' size="xxSmall" fontWeight="mediumbold" text={'PRICE'} />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-md-6'>
                                    <div className='invoiceDataWrapheadingsub'>
                                        {/* <p>
                                            <span className='d-inline-block'>
                                                <Image name="lockIcon" src={lockIcon} className='img-fluid mr-1'/>
                                            </span>Smartlock
                                        </p> */}
                                        {/* <p>Buyback option available <a className='termcondition' href="#">T & C</a></p> */}
                                        <Text size="Small" fontWeight="mediumbold" text={invoiceData.planName === "Security Deposit For Visit"} />
                                        
                                        <div className='invoiceTC'>
                                            <Text size="Small" fontWeight="semibold" color="TaupeGrey" text={invoiceData.description} />
                                            {/* <Text size="Small" fontWeight="regularbold" className='pl-1' color="primaryColor" text={'T & C'} /> */}
                                        </div>

                                    </div>
                                </div>
                                <div className='col-md-3'>
                                    {/* <Text className='invoiceDataWrapheadingsub pl-4 ml-2' size="xxSmall" fontWeight="bold" text={'1'} /> */}
                                </div>
                                <div className='col-md-3'>
                                    <Text className='invoiceDataWrapheadingsub' size="xxSmall" fontWeight="bold" text={invoiceData.amount} />
                                </div>
                            </div>
                            {/* <div className='row mb-3'>
                                <div className='col-md-6'>
                                    <div className='invoiceDataWrapheadingsub'>
                                        <Text size="xxSmall" fontWeight="bold" text={'Camera'} />
                                        <Text size="Small" fontWeight="regularbold" color="TaupeGrey" text={'Monthly rental'} />
                                    </div>
                                </div>                                
                                <div className='col-md-3'>
                                    <Text className='invoiceDataWrapheadingsub pl-4 ml-2' size="xxSmall" fontWeight="mediumbold" text={'2'} />
                                </div>
                                <div className='col-md-3'>
                                    <Text className='invoiceDataWrapheadingsub' size="xxSmall" fontWeight="bold" text={invoiceData.camera} />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-md-6'>
                                    <div className='invoiceDataWrapheadingsub'>
                                        <Text size="xxSmall" fontWeight="bold" text={'Contact Sensors'} />
                                        <Text size="Small" fontWeight="regularbold" color="TaupeGrey" text={'Monthly rental'} />
                                    </div>
                                </div>                                
                                <div className='col-md-3'>
                                    <Text className='invoiceDataWrapheadingsub pl-4 ml-2' size="xxSmall" fontWeight="mediumbold" text={'3'} />
                                </div>
                                <div className='col-md-3'>
                                    <Text className='invoiceDataWrapheadingsub' size="xxSmall" fontWeight="bold" text={invoiceData.contactSensors} />
                                </div>
                            </div> */}
                            {/* <div className='row mb-3'>
                                <div className='col-md-6'>
                                    <div className='invoiceDataWrapheadingsub'>
                                        <Text size="xxSmall" fontWeight="bold" text={'Plan Charges (Total Cost x 6)'} />
                                    </div>
                                </div>                                
                                <div className='col-md-3'>
                                    <Text className='invoiceDataWrapheadingsub pl-4 ml-2' size="xxSmall" fontWeight="mediumbold" text={'4'} />
                                </div>
                                <div className='col-md-3'>
                                    <Text className='invoiceDataWrapheadingsub' size="xxSmall" fontWeight="bold" text={invoiceData.planCharges} />
                                </div>
                            </div> */}
                            <div className='row mb-3'>
                                {invoiceData?.gstValue===null ? null :
                                <>
                                    <div className='col-md-6'>
                                    <div className='invoiceDataWrapheadingsub'>
                                        <Text size="xxSmall" fontWeight="bold" text={`GST(${invoiceData?.gstValue})`} />
                                    </div>
                                </div> 
                                                           
                                <div className='col-md-3'>
                                    {/* <Text className='invoiceDataWrapheadingsub pl-4 ml-2' size="xxSmall" fontWeight="mediumbold" text={'1'} /> */}
                                </div>
                                <div className='col-md-3'>
                                    <Text className='invoiceDataWrapheadingsub' size="xxSmall" fontWeight="bold" text={invoiceData.gstAmount} />
                                </div>
                                </> }
                            </div>
                            <div className='row total border-top'>
                                <div className='col-md-6'>
                                    <div className='invoiceDataWrapheadingsub'>
                                        <Text size="xxSmall" fontWeight="bold" text={'Total Price'} />
                                    </div>
                                </div>                                
                                <div className='col-md-3'></div>
                                <div className='col-md-3'>
                                    <Text className='invoiceDataWrapheadingsub' size="xxSmall" fontWeight="bold" color="primaryColor" text={invoiceData.netPayAmount} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
}

            </div>
        </>
    );
}

export default FinanceInvoice;