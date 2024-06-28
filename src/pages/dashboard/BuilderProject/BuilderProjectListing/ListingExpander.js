import './ListingExpander.scss'
import { useReducer, useMemo, useCallback, useEffect, memo } from 'react';

import ListingDataTable from '../../../../shared/DataTable/ListingDataTable';
import { getAdminBuilderProjectById } from '../../../../common/redux/actions/builder.action';


function reducer(state, action = []) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true };

    case 'UPDATE_DATA':
      return { ...state, isLoading: false, data: action.data };

    default:
      return { ...state, isLoading: false, data: action.data };
  };
};

const ListingExpander = ({ projectId, data, columns: tableColumns, userId }) => {
	const initialState = { data: data || [] };
	const [state, dispatch] = useReducer(reducer, initialState);

	const columns = useMemo(() => [
		...tableColumns
	]);

	const _handleApiCall = useCallback( async () => {
		dispatch({ type: 'LOADING' });

		const response = await getAdminBuilderProjectById({
	  		userId: userId, 
	  		id: projectId
	  	});
	  	await dispatch({ type: 'UPDATE_DATA', data: response });

	}, [userId, projectId]);


	useEffect( () => {
		if(!data) {
			_handleApiCall();
		} 

	}, [_handleApiCall, data]);

	return (
			<>
				<div className="listingExpander">
					<ListingDataTable 
						data={ state.data }
						columns={ columns }
						isLoading={ state.isLoading }
						pagination = { false }
					/>
				</div>
			</>
	);
}

export default memo(ListingExpander);

