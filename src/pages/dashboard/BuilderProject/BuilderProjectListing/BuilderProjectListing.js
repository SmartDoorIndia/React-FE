/** @format */

import './BuilderProjectListing.scss';

import { useMemo, useEffect, useReducer } from 'react';

import ListingExpander from './ListingExpander';
import ExpandableDataTable from '../../../../shared/DataTable/ExpandableDataTable';

import { useUserContext } from '../../../../common/helpers/Auth';
import { rotateTableIcon } from '../../../../common/helpers/Utils';
import { getAdminBuilderProject } from '../../../../common/redux/actions/builder.action';
import { builderListingColumn, builderExpanderColumns } from './BuilderListingColumnData';
 
const initialState = { isLoading: false, builderProjectList: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true };

    case 'UPDATE_DATA':
      return { ...state, isLoading: false, builderProjectList: action.data };

    default:
      return initialState;
  };
};

const BuilderProjectListing = () => {

  const listingColumns = useMemo( () => [ ...builderListingColumn ]);
  const expanderColumns = useMemo( () => [ ...builderExpanderColumns ]);

  const { auth: { userData } } = useUserContext();
  const [ state, updateState ] = useReducer(reducer, initialState);

  // The row data is composed into this custom expandable component via the data prop
  const MyExpander = ({ data }) => {

    return (
        <ListingExpander 
          columns={ expanderColumns }
          userId={ userData.userid }
          projectId={ data.projectId }
        />
      );
  };

  useEffect(async () => {
    updateState({ type: 'LOADING' });

    const response = await getAdminBuilderProject({
      userId: userData.userid, 
      location: "" 
    });

    await updateState({ type: 'UPDATE_DATA', data: response });

  }, []);

  return (
    <>
      <ExpandableDataTable
        columns={ listingColumns }
        data={ state.builderProjectList }
        expandableRowsComponent={ MyExpander }
        onRowExpandToggled={ (toggleState, row) =>
          rotateTableIcon('datatable_' + row.projectId, toggleState)
        }
        title="Listed Builder"
        filter
        isLoading={ state.isLoading }
        striped={false}
      />
    </>
  );
};


export default BuilderProjectListing;

