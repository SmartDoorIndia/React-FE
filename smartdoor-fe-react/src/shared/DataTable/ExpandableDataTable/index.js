/** @format */

import ListingDataTable from '../ListingDataTable';
import CollapseIcon from '../../../assets/images/collapse-icon.png';
import ExpandIcon from '../../../assets/images/expand-Icon.png';

const ExpandableDataTable = (props) => {
  return (
    <ListingDataTable
      expandableRows
      expandableIcon={ { collapsed: CollapseIcon, expanded: ExpandIcon } }
      expandableRowsHideExpander={ true }
      expandOnRowClicked={ true }
      { ...props }
    />
  );
};

export default ExpandableDataTable;
