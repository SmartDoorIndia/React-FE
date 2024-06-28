import './ListingDatatable.scss';

import Form from 'react-bootstrap/Form'
import { memo } from 'react';

import DataTableComponent from '../DataTable';
import Text from '../../Text/Text';


const ListingDataTable = ({
  title,
  textComponent,
  filterComponent,
  filter,
  filterCity,
  data,
  columns,
  isLoading,
  PaginationComponent,
  perPageOptions,
  paginationPerPage,
  ProgressComponent,
  pagination,
  isPaginationButton,
  PaginationButton,
  handleFilterChange,
  className,
  ...rest
}) => {
  return (
    <div className={className === 'finance-table' ? 'finance-tableBox tableBox bg-white' : "tableBox bg-white"}>
      {
        title ?
          <div className="d-flex justify-content-between align-items-center tableHeading">
            <div>
              <Text size="regular" fontWeight="mediumbold" color="secondryColor" text={title} />
            </div>
            <div className="locationSelect">
              {textComponent ? textComponent : null}

              {filterComponent ? filterComponent : null}

              {
                filter ?
                  <Form.Group controlId="exampleForm.SelectCustom">
                    {/* <Form.Label> City: </Form.Label> */}
                    <Form.Control as="select" onChange={(e) => handleFilterChange(e.target.value)}>
                      <option value="">Select City</option>
                      {
                        filterCity ? filterCity?.length ?
                          filterCity.map((_value, index) =>
                            <option key={index} value={_value}>{_value}</option>,
                          ) :
                          null :
                          null
                      }
                    </Form.Control>
                  </Form.Group> :
                  null
              }
            </div>
          </div> :
          null
      }

      <DataTableComponent
        data={data}
        columns={columns}
        progressPending={isLoading}
        paginationComponent={PaginationComponent}
        paginationRowsPerPageOptions={perPageOptions}
        paginationPerPage={paginationPerPage}
        progressComponent={ProgressComponent}
        pagination={pagination}
        {...rest}
      />

      {
        isPaginationButton ?
          <div className="d-flex justify-content-center">
            {PaginationButton || ''}
          </div> :
          data?.length ? null :
            PaginationButton ?
              <div className="d-flex justify-content-center">
                {PaginationButton}
              </div> :
              null
      }

    </div>
  );
}

export default memo(ListingDataTable);
