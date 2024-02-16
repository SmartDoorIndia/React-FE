import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const SMALL = 599;
const MEDIUM = 959;
const LARGE = 1280;

const media = {
  sm: (...args) => css`
    @media screen and (max-width: ${ SMALL }px) {
      ${ css(...args) }
    }
  `,
  md: (...args) => css`
    @media screen and (max-width: ${ MEDIUM }px) {
      ${ css(...args) }
    }
  `,
  lg: (...args) => css`
    @media screen and (max-width: ${ LARGE }px) {
      ${ css(...args) }
    }
  `,
  custom: (value) => (...args) => css`
    @media screen and (max-width: ${ value }px) {
      ${ css(...args) }
    }
  `,
};

const SelectControl = styled.select`
  cursor: pointer;
  height: 24px;
  min-width: 24px;
  user-select: none;
  padding-left: 8px;
  padding-right: 12px;
  box-sizing: content-box;
  font-size: inherit;
  color: inherit;
  border: none;
  background-color: transparent;
  appearance: none;
  direction: ltr;
  &::-ms-expand {
    display: none;
  }
  &:disabled::-ms-expand {
    background: #f60;
  }
  option {
    color: initial;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  font-size: inherit;
  color: inherit;
  margin-top: 1px;
  svg {
    top: 0;
    right: 0;
    color: inherit;
    position: absolute;
    fill: currentColor;
    width: 24px;
    height: 24px;
    display: inline-block;
    user-select: none;
    pointer-events: none;
  }
`;
const defaultComponentOptions = {
  rowsPerPageText: 'Rows per page:',
  rangeSeparatorText: 'of',
  noRowsPerPage: true,
  selectAllRowsItem: false,
  selectAllRowsItemText: 'All',
};

const PaginationWrapper = styled.nav`
  display: flex;
  flex: 1 1 auto;
  // justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding-right: 8px;
  padding-left: 8px;
  width: 100%;
  ${ (props) => props.theme.pagination.style };
`;

const Button = styled.button`
  position: relative;
  display: block;
  user-select: none;
  border: none;
  ${ (props) => props.theme.pagination.pageButtonsStyle };
  ${ (props) => props.isRTL && 'transform: scale(-1, -1)' };
`;

const PageList = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  white-space: nowrap;
  ${ media.sm`
    width: 100%;
    justify-content: space-around;
  ` };
`;

const Span = styled.span`
  flex-shrink: 1;
  user-select: none;
`;

const Range = styled(Span)`
  margin: 0 24px;
`;

const RowLabel = styled(Span)`
  margin: 0 4px;
`;

const Div = styled.div`
  margin: ${ (props) => props.margin };
  display: ${ (props) => props.display };

  `;

const getNumberOfPages = (rowCount, rowsPerPage) => Math.ceil(rowCount / rowsPerPage);

const Select = (props) => (
  <SelectWrapper>
    <SelectControl { ...props } />
  </SelectWrapper>
);

const Pagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
  direction,
  paginationRowsPerPageOptions,
  paginationIconLastPage,
  paginationIconFirstPage,
  paginationIconNext,
  paginationIconPrevious,
  paginationComponentOptions,
  PaginationActionButton,
}) => {
  const shouldShow = true;
  const isRTL = false;
  const numPages = getNumberOfPages(rowCount, rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = (lastIndex - rowsPerPage) + 1;
  const disabledLesser = currentPage === 1;
  const disabledGreater = currentPage === numPages;
  const options = { ...defaultComponentOptions, ...paginationComponentOptions };
  const range = currentPage === numPages ?
    `${ firstIndex }-${ rowCount } ${ options.rangeSeparatorText } ${ rowCount }` :
    `${ firstIndex }-${ lastIndex } ${ options.rangeSeparatorText } ${ rowCount }`;

  const handlePrevious = useCallback(() => onChangePage(currentPage - 1), [ currentPage, onChangePage ]);
  const handleNext = useCallback(() => onChangePage(currentPage + 1), [ currentPage, onChangePage ]);
  const handleFirst = useCallback(() => onChangePage(1), [ onChangePage ]);
  const handleLast = useCallback(() => onChangePage(getNumberOfPages(rowCount, rowsPerPage)), [ onChangePage, rowCount, rowsPerPage ]);
  const handleRowsPerPage = useCallback(({ target }) => onChangeRowsPerPage(Number(target.value), currentPage), [ currentPage, onChangeRowsPerPage ]);

  const selectOptions = paginationRowsPerPageOptions.map((num) => (
    <option
      key={ num }
      value={ num }
    >
      {num}
    </option>
  ));

  if (options.selectAllRowsItem) {
    selectOptions.push(
        (
          <option
            key={ -1 }
            value={ rowCount }
          >
            {options.selectAllRowsItemText}
          </option>
        ),
    );
  }

  const select = (
    <Select onChange={ handleRowsPerPage } defaultValue={ rowsPerPage } aria-label={ options.rowsPerPageText }>
      {selectOptions}
    </Select>
  );

  return (
    <PaginationWrapper className="rdt_Pagination">

      <Div margin="0 auto"> </Div>

      <Div margin="0 auto">
        { PaginationActionButton ? <PaginationActionButton /> : null }
      </Div>

      <Div style={ { display: 'contents' } }>

        {!options.noRowsPerPage && shouldShow && (
          <>
            <RowLabel>{options.rowsPerPageText}</RowLabel>
            {select}
          </>
        )}
        {shouldShow && (
          <Range>
            {range}
          </Range>
        )}
        <PageList>
          <Button
            id="pagination-first-page"
            type="button"
            aria-label="First Page"
            aria-disabled={ disabledLesser }
            onClick={ handleFirst }
            disabled={ disabledLesser }
            isRTL={ isRTL }
          >
            {paginationIconFirstPage}
          </Button>

          <Button
            id="pagination-previous-page"
            type="button"
            aria-label="Previous Page"
            aria-disabled={ disabledLesser }
            onClick={ handlePrevious }
            disabled={ disabledLesser }
            isRTL={ isRTL }
          >
            {paginationIconPrevious}
          </Button>

          {!shouldShow && select}

          <Button
            id="pagination-next-page"
            type="button"
            aria-label="Next Page"
            aria-disabled={ disabledGreater }
            onClick={ handleNext }
            disabled={ disabledGreater }
            isRTL={ isRTL }
          >
            {paginationIconNext}
          </Button>

          <Button
            id="pagination-last-page"
            type="button"
            aria-label="Last Page"
            aria-disabled={ disabledGreater }
            onClick={ handleLast }
            disabled={ disabledGreater }
            isRTL={ isRTL }
          >
            {paginationIconLastPage}
          </Button>
        </PageList>

      </Div>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
