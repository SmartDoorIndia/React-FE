/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import docIcon from '../../assets/svg/doc-icon.svg';
import pdfImg from '../../assets/svg/pdf-icon.svg';
import crossIcon from '../../assets/images/Vector.png';
import './DocumentDetail.scss';
import { Modal } from 'react-bootstrap';
import { fileExtension, getLocalStorage } from '../../common/helpers/Utils';
import CheckBoxComponent from '../CheckBox/CheckBoxComponent';
import FileViewerComponent from '../FileViewerComponent/FileViewer';
import Image from '../Image/Image';
import { getPropertyDetails, unverifyDoc, verifyDoc } from '../../common/redux/actions';
import Buttons from '../Buttons/Buttons';

const DocumentDetail = (props) => {
  // console.log(props.doc_imgArr[0].verify,"pppppppppppppppppppppppppppppp");

  // const propertyDocsResp = props.location?.state?.propertyDocsResp ? props.location?.state?.propertyDocsResp : null
  const propertyId = props?.propertyId ? props?.propertyId : null
  const userId = props?.userId ? props?.userId : null
  const [propertydocument, setPropertydocument] = useState([])
  const userData = getLocalStorage("authData")
  const [status, setStatus] = useState('')
  const [ doc, setDoc ] = useState({
    d_name: '',
    d_url: '',
    d_verify: '',
  });
  const [ show, setShow ] = useState(false);

  // const [isChecked, setIsChecked] = useState(false)

  // const checkboxHandler = () => {

  //   setIsChecked(!isChecked);
  // };
  
  const unverifyDocs = useCallback((doc) => {
    console.log(doc, "unverify docs");
    // const updatedDocs = propertydocument.map((d) => {
    //   if (d.docId === doc.d_id) {
    //     d.documentApprovedByAdmin = !d.documentApprovedByAdmin;
    //   }
    //   return d;
    // });
    // setPropertydocument(updatedDocs);
    // setShow(false)
    unverifyDoc({ docId: doc.d_id })
       .then((response) => {
          if (response.data) {
            setShow(false);
            const updatedDocs = propertydocument.map((d) => {
              if (d.docId === doc.d_id) {
                d.documentApprovedByAdmin = !d.documentApprovedByAdmin;
              }
              return d;
            });
            setPropertydocument((prevState) => updatedDocs);
          }
       })
       .catch((error) => {
          console.log("error", error);
       });
  }, [propertydocument]);

  const verifyDocs = useCallback((doc) => {
    console.log(doc, "verify docs");
    // const updatedDocs = propertydocument.map((d) => {
    //   if (d.docId === doc.d_id) {
    //     d.documentApprovedByAdmin = !d.documentApprovedByAdmin;
    //   }
    //   return d;
    // });
    // setPropertydocument(updatedDocs);
    // setShow(false)
    verifyDoc({ docId: doc.d_id })
       .then((response) => {
          if (response.data) {
            setShow(false);
            const updatedDocs = propertydocument.map((d) => {
              if (d.docId === doc.d_id) {
                d.documentApprovedByAdmin = !d.documentApprovedByAdmin;
              }
              return d;
            });
            setPropertydocument(updatedDocs);
          }
       })
       .catch((error) => {
          console.log("error", error);
       });
  }, [propertydocument]);


  const handleImgSrc = (urlStr) => {
    console.log('urlstr', urlStr);

    if (fileExtension(urlStr).includes('pdf')) {
      return pdfImg; // iframe
    } else if (fileExtension(urlStr).includes('docx' || 'doc' || 'xls' || 'xlsx' || 'txt')) {
      return docIcon; // fileviewer
    } else {
      return urlStr; // img
    }
  };

  const handleShowDocument = (_doc_url) => {
    console.log('handleShowDocument');
    if (fileExtension(_doc_url).includes('pdf')) {
      return (
        <iframe
          title="Document"
          loading="lazy"
          width="100%"
          height="600px"
          frameBorder="0"
          src={ `https://docs.google.com/gview?url=${ _doc_url }&embedded=true` }></iframe>
      );
    } else if (fileExtension(_doc_url).includes('docx' || 'doc' || 'xls' || 'xlsx' || 'txt')) {
      return <FileViewerComponent fileType={ fileExtension(_doc_url) } filePath={ _doc_url } />;
    } else {
      return <Image name="DocumentImage" src={ _doc_url } />;
    }
  };

  const _getPropertyDetails = useCallback((propertyId,userId) => {
    getPropertyDetails({ propertyId: propertyId, userId: userId })
       .then((response) => {
          if (response.data) {
            console.log(response.data.resourceData.propertyDocsResp,"rrrrrrrrrrrrrrrrrrrrrr");
              setPropertydocument(response.data.resourceData.propertyDocsResp)
              setStatus(response.data.resourceData.status)
          }

       })
       .catch((error) => {
          console.log("error", error);
       });
 }, [propertyId, getPropertyDetails]);

  useEffect(() => {
    console.log(propertydocument,"propertydocument");
    _getPropertyDetails(propertyId,userId);

 }, [propertyId, _getPropertyDetails]);  

  return (
    <>
    {/* <div>
      <div>Document</div>
      <div>Verified by Admin</div>
      <div>Verified by Executive</div>
    </div> */}
      {
      propertydocument.length > 0 ? (
            propertydocument.map((cVal, indx) => {
              return (
                <div
                  key={ indx }
                  className="d-flex justify-content-between align-items-center doc_strip p-3">
                  <div
                    className="d-flex align-items-center cursor-pointer"
                    onClick={ () => {
                      setShow(true);
                      setDoc({
                        d_id: cVal.docId,
                        d_name: cVal.docName,
                        d_url: cVal.docURL,
                        d_verify: cVal.verify,
                        d_documentApprovedByAdmin: cVal.documentApprovedByAdmin
                      });
                    } }>
                    <Image
                      name="DocumentImage"
                      src={ handleImgSrc(cVal.docURL) }
                      className="Document_img"
                    />

                    <div className="ml-3">
                      <p className="mb-0 fs-14 font-weight-bold">{cVal.docName}</p>
                    </div>
                  </div>

                  <div>
                    {/* <span className="text-muted mr-3 fs-14">{cVal.verify ? "Verified" : ''}</span> */}
                    {cVal?.documentApprovedByAdmin ? 
                  <>
                    <span className="text-muted mr-3 fs-14">{cVal.documentApprovedByAdmin ? "Verified by Admin" : ''}</span>
                      <CheckBoxComponent
                      id={ cVal.docId }
                      value={ `verify${ indx + 1 }` }
                      checked={ cVal.documentApprovedByAdmin }
                    /> 
                    </>: null}
                  </div>

                  <div>
                    <span className="text-muted mr-3 fs-14">{cVal.verify ? "Verified by Executive" : ''}</span>
                    {cVal?.verify ? 
                      <CheckBoxComponent
                      id={ cVal.docId }
                      value={ `verify${ indx + 1 }` }
                      checked={ cVal.verify }
                    /> : null}
                  </div>
                </div>
              );
            })
         ) : (
           <div className="p-3">
             <h5> No Documents to display </h5>{' '}
           </div>
         )}

      <Modal
        show={ show }
        onHide={ () => setShow(false) }
        className="vid_modal"
        centered
        style={ { height: '100%' } }>
        <Modal.Header style={ { margin: '5px', } }>
          <p style={ { margin: '10px' } }>{doc.d_name}</p>
          <button className="modalcross-btn" onClick={ () => setShow(false) }>
            <Image name="CROSS_ICON" src={ crossIcon } />
          </button>
        </Modal.Header>
        <Modal.Body
          style={ {
            marginLeft: '10px',
            marginRight: '10px',
            paddingLeft: '10px',
            paddingRight: '10px',
          } }>
          {handleShowDocument(doc.d_url)}
        </Modal.Body>
        <Modal.Footer style={ { margin: '5px', display: 'flex', justifyContent: "center"  } }>
          <div>
            {/* <span className="text-muted mr-3 fs-14">Verify</span>
            <CheckBoxComponent id={ doc.d_id } checked={ doc.d_verify } /> */}
            {/* <span className="text-muted mr-3 fs-14">Verify</span>
            <CheckBoxComponent id={ doc.d_id } checked={ isChecked } onChange={checkboxHandler} /> */}
            {(userData.roleId===3 || userData.roleId===16) &&  status!=='PUBLISHED' ? 
            doc.d_documentApprovedByAdmin===false ? 
            <Buttons 
            name="Verify"
            varient="primary"
            type="submit"
            size="Small"
            color="white"
            onClick={()=>verifyDocs(doc)}
            />
            : 
            <Buttons 
            name="Unverify"
            varient="primary"
            type="submit"
            size="Small"
            color="white"
            onClick={()=>unverifyDocs(doc)}
            /> 
          : null }
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocumentDetail;
