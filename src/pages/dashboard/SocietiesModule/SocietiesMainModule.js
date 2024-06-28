import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Text from '../../../shared/Text/Text';
import Form from 'react-bootstrap/Form'
import Image from '../../../shared/Image/Image';
import contentIco from '../../../assets/images/content-ico.svg';
import './SocietiesModule.scss';
import { getAllCity, getAllSociety, getAllSocietyCity, } from '../../../common/redux/actions';
import { Link } from 'react-router-dom';
import DataTableComponent from '../../../shared/DataTable/DataTable';
import Pagination from '../../../shared/DataTable/Pagination';

import { formateDate, ToolTip } from '../../../common/helpers/Utils';
import SearchInput from '../../../shared/Inputs/SearchInput/SearchInput';

const SocietiesModule = (props) => {
  const { getAllSociety, allSocietyData, getAllSocietyCity, getAllCity, allCities } = props;

  const [ societyCity, setCity ] = useState('');
  const [ societyLocation, setLocation] = useState('');

  const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  useEffect(() => {
    getAllSociety({ city: '',
      records: '',
      pageNumber: '',
    });
    // getAllSocietyCity();
    getAllCity();
  }, [ getAllSociety, getAllSocietyCity, getAllCity ]);

  function _filterSocietyData(city) {
    getAllSociety({ city: city,
      records: '',
      pageNumber: '',
    });
  }

  const PaginationActionButton = () => (
    <div className="d-flex justify-content-between">
    </div>
  );

  const PaginationComponent = (props) => (<Pagination { ...props } PaginationActionButton={ PaginationActionButton } />);

  const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
		return (
			<SearchInput onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} placeholder="Search here"/>
		);
	}, [filterText, resetPaginationToggle]);

  const filteredItems = allSocietyData.data.length ? 
  allSocietyData.data.filter(item => { 
  return  item?.societyId === filterText || 
  item?.societyContactNumber?.includes(filterText) ||
  item?.societyName?.toLowerCase().includes(filterText.toLowerCase()) ||
  item?.societyContactPerson?.toLowerCase().includes(filterText.toLowerCase()) ||
  item?.city?.toLowerCase().includes(filterText.toLowerCase()) ||
  item?.noOfProperties === filterText ;
  }):[];

  return (
    <>
      <div className="tableBox">
        <div className="d-flex justify-content-between align-items-center tableHeading">
      <div>
        <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Societies on Smartdoor" />
      </div>
      <div className="locationSelect ml-3 d-flex">
      {subHeaderComponentMemo} 
        <Form.Group className='ml-3' controlId="exampleForm.SelectCustom" >
          <Form.Control as="select" 
            onChange={ (e)=>{
            _filterSocietyData(e.target.value); 
            setCity(e.target.value)
            setLocation('')
          } } value={ societyCity } >
            <option value="">Select City</option>
            {allCities?.data?.cities?.length>0?
                              allCities?.data?.cities.map((c_value, indx)=>
                                <option key={ indx } value={ c_value }>{c_value}</option>):null}
          </Form.Control>
        </Form.Group>
      </div>
    </div>
    <div className="societiesTableWrapper">
        <DataTableComponent
          data={ filteredItems }
          columns={ columns }
          progressPending={ allSocietyData.isLoading }
          paginationComponent={ PaginationComponent }

          added
          perPageOptions={ [ 8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
          paginationPerPage={ 8 }
          paginationRowsPerPageOptions={ [ 8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
          filterText = {filterText}
          subHeaderComponent={subHeaderComponentMemo} 
          persistTableHead
          filterComponent={ subHeaderComponentMemo }
        />
      </div>
        {
        allSocietyData.data.length ? null :
        <div className="d-flex justify-content-center tableBottom">
          <PaginationActionButton />
        </div>

        }

      </div>
    </>
  )
}

const columns = [
  {
    name: 'Id',
    selector: 'societyId',
    center: true,
    sortable: true,
  },

  {
    name: 'Added On',
    selector: 'addedOnDate',
    sortable: true,
    center: true,
    minWidth: '120px',
    cell: ({ addedOnDate })=>(<span>{formateDate(addedOnDate)}</span>),
  },
  {
    name: 'Society name ',
    selector: 'societyName',
    center: true,
    minWidth: '140px',
    style: { 'white-space': 'nowrap' },
    cell: ({ societyName })=>(<ToolTip position="top" style={ { width: '100%' } } name={ societyName || '' }>
      <span className="cursor-pointer elipsis-text"> {societyName||'-'}</span>
    </ToolTip>
    ),
  },
  {
    name: 'Contact Person',
    selector: 'societyContactPerson',
    center: true,
    minWidth: '170px',
    cell: ({ societyContactPerson, profileImageUrl }) => ( <div className="userName">
      <Text size="Small" color="secondryColor" text={ societyContactPerson?societyContactPerson.split(' ', 2).join(' '):'-' } />
    </div>
    ),
  },
  {
    name: 'Phone No',
    selector: 'societyContactNumber',
    center: true,
    minWidth: '140px'
  },
  {
    name: 'City',
    selector: 'city',
    center: true,
  },
  {
    name: 'Properties',
    selector: 'noOfProperties',
    center: true,
    maxWidth: '150px',
    minWidth: '110px',
  },
  {
    name: 'Action',
    selector: 'year',
    center: true,
    maxWidth: '60px',
    minWidth: '80px',
    cell: (row) =>( <div className="action">
      <ToolTip position="left" name="View Details">
        <span>
          <Link to={ { pathname: '/admin/societies/details', state: { societyId: row.societyId } } }>
            <Image name="editIcon" src={ contentIco } />
          </Link>
        </span>
      </ToolTip>
    </div>
    ),
  },
];

const mapStateToProps = ({ allSocietyData, getAllSocietyCityData, allCities }) => ({
  allSocietyData,
  getAllSocietyCityData,
  allCities,
});

const actions = {
  getAllSociety,
  getAllSocietyCity,
  getAllCity,
};

const withConnect = connect(
    mapStateToProps,
    actions,
);

export default compose(
    withConnect,
    memo,
)(SocietiesModule);
