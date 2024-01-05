/** @format */

import DataTable from 'react-data-table-component';
import arrow from '../../assets/svg/sort-icon.svg';

const sortIcon = <img src={ arrow } />;
const columns = [
  {
    name: '#',
    selector: 'societyId',
    sortable: true,
  },

  {
    name: 'Added On',
    selector: 'addedOnDate',
    sortable: true,
  },
  {
    name: 'Society name ',
    selector: 'societyName',
    sortable: true,
  },
  {
    name: 'Contact Person',
    selector: 'societyContactPerson',
    sortable: true,
    right: true,
  },
  {
    name: 'Phone Number',
    selector: 'societyContactNumber',
    sortable: true,
    right: true,
  },
  {
    name: 'Properties',
    selector: 'noOfProperties',
    sortable: true,
    right: true,
  },
  {
    name: 'Actions',
    selector: 'year',
    sortable: true,
    right: true,
  },
];

const DataTableComponent = (props) => {
  return (
    <DataTable
      title="Arnold Movies"
      columns={ columns }
      data={ props.data }
      pagination
      highlightOnHover
      sortIcon={ sortIcon }
    />
  );
};

export default DataTableComponent;
