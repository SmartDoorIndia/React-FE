/** @format */

import DataTable from 'react-data-table-component';
import './DataTable.scss';
import { memo } from 'react';

import sortIocn from '../../assets/svg/sort-icon.svg';
import { TableLoader } from '../../common/helpers/Loader';

const DefaultSortIcon = <img src={ sortIocn } className="ml-1" width="10px" alt="SHORT_ICON" />;
const DefaultProgressComponent = <TableLoader />;

const DataTableComponent = ({
  title,
  columns,
  data,
  pagination,
  progressPending,
  onChangePage,
  paginationComponent,
  paginationRowsPerPageOptions,
  paginationPerPage,
  sortIcon,
  progressComponent,
  striped,
  ...rest
}) => {
  
  return (
    <DataTable
      title={ title }
      columns={ columns }
      data={ data }
      pagination={ pagination === false ? false : true }
      highlightOnHover
      progressPending={ progressPending }
      onChangePage={ onChangePage }
      striped={ striped === false ? false : true }
      paginationComponent={ paginationComponent }
      paginationRowsPerPageOptions={ paginationRowsPerPageOptions }
      paginationPerPage={ paginationPerPage }
      customStyles={ customStyles }
      sortIcon={ sortIcon || DefaultSortIcon }
      progressComponent={ progressComponent || DefaultProgressComponent }
      { ...rest }
    />
  );
};

const customStyles = {
  rows: {
    style: {
      // backgroundColor: '#f8f3f5',
      'borderBottomWidth': '0 !important',
      '&:nth-child(even)': {
        backgroundColor: '#fff',
      },
      '&:nth-child(odd)': {
        backgroundColor: '#f8f3f5',
      },
    },
  },
  headCells: {
    style: {
      'fontWeight': '700 !important',
      'fontSize': '.875rem',
      'color': '#252525',
      'justifyContent': 'center',
      '&:first-child': {
        minWidth: '65px',
        maxWidth: '200px',
      },
    },
  },
  cells: {
    style: {
      'fontSize': '.875rem',
      'color': '#252525',
      '&:first-child': {
        minWidth: '65px',
        maxWidth: '200px',
      },
    },
  },
};

export default memo(DataTableComponent);
