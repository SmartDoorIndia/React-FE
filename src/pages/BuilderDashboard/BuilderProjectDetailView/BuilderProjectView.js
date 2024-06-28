/** @format */

import React, { useEffect } from 'react';

import { Row, Col } from 'react-bootstrap';
import ImageSliderComponent from '../../../shared/ImageSlider/ImageSliderComponent';

import MapComponent from '../../../shared/Map/MapComponent';

// import './PropertyDoc.scss';
import Text from '../../../shared/Text/Text';
import ExpandIcon from '../../../assets/images/expand-Icon.png';
import Image from '../../../shared/Image/Image';
import './BuilderProjectView.scss';
import ExpandableDataTable from '../../../shared/DataTable/ExpandableDataTable';
import ListingDataTable from '../../../shared/DataTable/ListingDataTable';

const BuilderProject = () => {
  // const [ transform, setTransform ] = useState(false);
  // const [ icon, setIcon ] = useState(ExpandIcon);
  // const imgRef = useRef();
  // const imgRef = React.createRef();

  const data = [
    {
      id: 1,
      towername: 'building/Tower1',
      startDate: '21/05/2020',
      ProposedCompletion: '20/06/23',
    },
    {
      id: 2,
      towername: 'building/Tower2',
      startDate: '22/05/2020',
      ProposedCompletion: '21/06/23',
    },
    {
      id: 3,
      towername: 'building/Tower3',
      startDate: '23/05/2020',
      ProposedCompletion: '22/06/23',
    },
    {
      id: 4,
      towername: 'building/Tower4',
      startDate: '24/05/2020',
      ProposedCompletion: '23/06/23',
    },
    {
      id: 5,
      towername: 'building/Tower5',
      startDate: '25/05/2020',
      ProposedCompletion: '24/06/23',
    },
  ];

  const data1 = [
    {
      id: 1,
      build: 'office',
      area: 'complex',
      type: 'furnished',
      BHK: '1',
      carpetArea: '2100',
      totalUnits: '10',
      availableUnits: '5',
      minPrice: '202300',
      maxPrice: '963852',
      floorPlan: '1',
    },
    {
      id: 2,
      build: 'office',
      area: 'complex',
      type: 'furnished',
      BHK: '2',
      carpetArea: '2200',
      totalUnits: '10',
      availableUnits: '6',
      minPrice: '250000',
      maxPrice: '789546',
      floorPlan: '2',
    },
    {
      id: 3,
      build: 'office',
      area: 'complex',
      type: 'furnished',
      BHK: '3',
      carpetArea: '2300',
      totalUnits: '10',
      availableUnits: '1',
      minPrice: '355000',
      maxPrice: '74152',
      floorPlan: '5',
    },
    {
      id: 4,
      build: 'office',
      area: 'complex',
      type: 'furnished',
      BHK: '4',
      carpetArea: '2400',
      totalUnits: '10',
      availableUnits: '2',
      minPrice: '123456',
      maxPrice: '1234578',
      floorPlan: '7',
    },
    {
      id: 5,
      build: 'office',
      area: 'complex',
      type: 'furnished',
      BHK: '5',
      carpetArea: '2500',
      totalUnits: '10',
      availableUnits: '3',
      minPrice: '789456',
      maxPrice: '745789',
      floorPlan: '8',
    },
  ];

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      maxWidth: '60px',
    },
    {
      name: 'Building/Tower',
      selector: 'towername',
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: 'startDate',
      sortable: true,
    },
    {
      name: 'Proposed Completion',
      selector: 'ProposedCompletion',
      sortable: true,
    },
    {
      name: 'More Information',
      selector: 'moreInformation',
      sortable: true,
      cell: (row) => (
        <div className="moreInformation" data-tag="allowRowEvents">
          <span
            className="marginSpace"
            onClick={ () => {
              console.log('cliecked!!!!!');
            } }
            data-tag="allowRowEvents"
            // className = {transform?"transform":"not-transform"}
          >
            {/* className = {transform?"img":"trnasform-img"} */}
            <Image
              name="moreInformation"
              className={ 'img_moreInfo' }
              id={ `icon${ Math.random() }` }
              src={ ExpandIcon }
              data-tag="allowRowEvents"
            />
          </span>
        </div>
      ),
    },
  ];

  const builderttowerresidential = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      maxWidth: '60px',
    },
    {
      name: 'BHK',
      selector: 'BHK',
      sortable: true,
    },
    {
      name: 'Carpet Area',
      selector: 'carpetArea',
      sortable: true,
    },
    {
      name: 'Total Units',
      selector: 'totalUnits',
      sortable: true,
    },
    {
      name: 'Available Units',
      selector: 'availableUnits',
      sortable: true,
    },
    {
      name: 'Min Price',
      selector: 'minPrice',
      sortable: true,
    },
    {
      name: 'Max Price',
      selector: 'maxPrice',
      sortable: true,
    },
    {
      name: 'Floor Plan',
      selector: 'floorPlan',
      sortable: true,
      // cell: (row) =>( <div className="moreInformation" data-tag= "allowRowEvents">
      //             <span onClick = {()=>{console.log("cliecked!!!!!")

      //             }}  data-tag = "allowRowEvents"
      //             //className = {transform?"transform":"not-transform"}
      //             >
      //               {/* className = {transform?"img":"trnasform-img"} */}
      //                 <Image name="moreInformation" className = {"img_moreInfo"} id = {`icon${Math.random()}`} src={ExpandIcon} data-tag = "allowRowEvents"/>
      //             </span>
      //         </div>)
    },
  ];

  const builderttowerCommercial = [
    {
      name: 'Build',
      selector: 'build',
      sortable: true,
      maxWidth: '60px',
    },
    {
      name: 'Area',
      selector: 'area',
      sortable: true,
    },
    {
      name: 'Type',
      selector: 'type',
      sortable: true,
    },
    {
      name: 'Carpet Area',
      selector: 'carpetArea',
      sortable: true,
    },
    {
      name: 'Total Units',
      selector: 'totalUnits',
      sortable: true,
    },
    {
      name: 'Available Units',
      selector: 'availableUnits',
      sortable: true,
    },
    {
      name: 'Min Price',
      selector: 'minPrice',
      sortable: true,
    },
    {
      name: 'Max Price',
      selector: 'maxPrice',
      sortable: true,
    },
    {
      name: 'Floor Plan',
      selector: 'floorPlan',
      sortable: true,
      // cell: (row) =>( <div className="moreInformation" data-tag= "allowRowEvents">
      //             <span onClick = {()=>{console.log("cliecked!!!!!")

      //             }}  data-tag = "allowRowEvents"
      //             //className = {transform?"transform":"not-transform"}
      //             >
      //               {/* className = {transform?"img":"trnasform-img"} */}
      //                 <Image name="moreInformation" className = {"img_moreInfo"} id = {`icon${Math.random()}`} src={ExpandIcon} data-tag = "allowRowEvents"/>
      //             </span>
      //         </div>)
    },
  ];

  // The row data is composed into your custom expandable component via the data prop
  const MyExpander = (props) => (
    <div className="expander ml-5 mr-5 mb-3">
      <ListingDataTable
        title="Building Tower 1"
        data={ data1 }
        columns={ builderttowerresidential }
        isLoading={ false }
        textComponent={
          <Text
            size="Small"
            fontWeight="smbold"
            // color="dangerText"
            text="Type: Residential"
            className="cursor-pointer"
          />
        }
      />

      <ListingDataTable
        title="Building Tower 1"
        data={ data1 }
        columns={ builderttowerCommercial }
        isLoading={ false }
        textComponent={
          <Text
            size="Small"
            fontWeight="smbold"
            // color="dangerText"
            text="Type: Commercial"
            className="cursor-pointer"
          />
        }
      />
    </div>
  );

  useEffect(() => {
    const imgg = document.querySelector('.img_moreInfo');
    imgg.addEventListener(
        'click',
        function(ev) {
          if (ev.target.tagName === 'IMG') {
            ev.target.classList.toggle('done');
          }
        },
        false,
    );
  }, []);

  return (
    <>
      <div>
        <Row>
          <Col md={ 8 }>
            <ImageSliderComponent />
          </Col>

          {/* <div className="my-0 pb-3 border-bottom">
                <h5 className="d-flex justify-content-between font-weight-bold mb-0">
                    <div className="d-grid">
                        <span>Building/Society</span>
                        <small className="fs-12"><span>Winsdore lane, Pune</span></small>
                    </div>

                    <div className="d-grid">
                        <span>50,200</span>
                        <small className="fs-12"><span>Residential/Commercial</span></small>
                    </div>
                </h5>
          </div> */}

          <Col md={ 4 }>
            <div className="bg-white rounded px-3 py-3 border">
              <span className="text-muted fs-12">Description</span>
              <p className="mb-0 fs-13">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book
              </p>
              <div className="mapLocation my-3">
                {/* <div style={{height: '120px',overflow: 'hidden'}}>
                    <MapComponent p_lat ="22.7196" p_lng ="75.8577" />
                </div> */}
                <div style={ { height: '120px', overflow: 'hidden' } }>
                  <MapComponent p_lat={ 22.75 } p_lng={ 75.34 } />
                </div>
                <div className="separator mt-4 mb-2"></div>

                <div>
                  <span className="text-muted fs-12">Amenities</span>
                </div>

                <div className="separator mt-4 mb-2"></div>
                <div>
                  <span className="text-muted fs-12">External Links</span>
                  <Text
                    size="regular"
                    fontWeight="smbold"
                    color="secondryColor"
                    text="https://abcabc.com"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div className="w-65 my-0 pb-3 border-bottom">
          <h5 className="d-flex justify-content-between font-weight-bold mb-0">
            <div className="d-grid">
              <span>Building/Society</span>
              <small className="fs-12">
                <span>Winsdore lane, Pune</span>
              </small>
            </div>

            <div className="d-grid">
              <span>50,200</span>
              <small className="fs-12">
                <span>Residential/Commercial</span>
              </small>
            </div>
          </h5>
        </div>

        {/* <div className="separator mt-4 mb-2"></div> */}

        <table className="w-65">
          <tr>
            <td className="p-2">
              <div className="text-muted fs-12">Area</div>
              <p className="mb-0 fs-14 font-weight-bold">{'12000  Sq. Ft.'}</p>
            </td>

            <td className="p-2">
              <div className="text-muted fs-12">Area</div>
              <p className="mb-0 fs-14 font-weight-bold">{'12000  Sq. Ft.'}</p>
            </td>

            <td className="p-2">
              <div className="text-muted fs-12">Area</div>
              <p className="mb-0 fs-14 font-weight-bold">{'12000  Sq. Ft.'}</p>
            </td>
          </tr>

          <tr>
            <td className="p-2">
              <div className="text-muted fs-12">Area</div>
              <p className="mb-0 fs-14 font-weight-bold">{'12000  Sq. Ft.'}</p>
            </td>

            <td className="p-2">
              <div className="text-muted fs-12">Area</div>
              <p className="mb-0 fs-14 font-weight-bold">{'12000  Sq. Ft.'}</p>
            </td>

            <td className="p-2">
              <div className="text-muted fs-12">Area</div>
              <p className="mb-0 fs-14 font-weight-bold">{'12000  Sq. Ft.'}</p>
            </td>
          </tr>

          <tr>
            <td className="p-2">
              <div className="text-muted fs-12">Area</div>
              <p className="mb-0 fs-14 font-weight-bold">{'12000  Sq. Ft.'}</p>
            </td>

            <td className="p-2">
              <div className="text-muted fs-12">Area</div>
              <p className="mb-0 fs-14 font-weight-bold">{'12000  Sq. Ft.'}</p>
            </td>

            <td className="p-2">
              <div className="text-muted fs-12">Area</div>
              <p className="mb-0 fs-14 font-weight-bold">{'12000  Sq. Ft.'}</p>
            </td>
          </tr>

          <tr>
            <td className="p-2">
              <div className="text-muted fs-12">Area</div>
              <p className="mb-0 fs-14 font-weight-bold">{'12000  Sq. Ft.'}</p>
            </td>

            <td className="p-2">
              <div className="text-muted fs-12">Area</div>
              <p className="mb-0 fs-14 font-weight-bold">{'12000  Sq. Ft.'}</p>
            </td>

            <td className="p-2">
              <div className="text-muted fs-12">Area</div>
              <p className="mb-0 fs-14 font-weight-bold">{'12000  Sq. Ft.'}</p>
            </td>
          </tr>
        </table>

        <ExpandableDataTable
          columns={ columns }
          data={ data }
          expandableRowsComponent={ MyExpander }
        />
      </div>
    </>
  );
};

export default BuilderProject;
