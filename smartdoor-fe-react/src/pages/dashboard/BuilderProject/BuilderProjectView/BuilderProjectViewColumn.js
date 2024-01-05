
import Text from '../../../../shared/Text/Text';
import ActionButton from '../../../../shared/Buttons/ActionButton/ActionButton';

export const builderListingColumns = [
  {
    name: '#',
    maxWidth: '60px',
    center: true,
    selector: (row) => row['towerId']
  },
  {
    name: 'Building/Tower',
    center: true,
    selector: (row) => row['towerName'],
    cell: ({ towerName }) => <span>{ towerName || "-" }</span>
  },
  {
    name: 'No. of Floors',
    center: true,
    selector: (row) => row['noOfFloors'],
    cell: ({ noOfFloors }) => <span>{ noOfFloors || "-" }</span>
  },
  {
    name: 'Completion Status',
    center: true,
    selector: (row) => row['completionStatus'],
    cell: ({ completionStatus }) => <span>{ completionStatus || "-" }</span>
  },
  {
    name: 'More Information',
    center: true,
    cell: (row) => {
      return (
        <ActionButton 
          icon='arrow-circle'
          data-tag="allowRowEvents"
          iconsSize={30}
          iconColor="#252525"
          iconOnly
          id={ `datatable_${ row.towerId }` }
          iconClass="rotatable"
        />
      );
    },
  },
];


export const projectResidentialColumn = [
  {
    name: '#',
    maxWidth: '60px',
    center: true,
    selector: (row) => row['id']
  },
  {
    name: 'BHK',
    center: true,
    selector: (row) => row['bhk'],
    cell: ({ bhk }) => <span>{ bhk || "-" }</span>
  },
  {
    name: 'Carpet Area',
    center: true,
    selector: (row) => row['carpetArea'],
    cell: ({ carpetArea }) => <span>{ carpetArea || "-" }</span>
  },
  {
    name: 'Total Units',
    center: true,
    selector: (row) => row['totalUnits'],
    cell: ({ totalUnits }) => <span>{ totalUnits || "-" }</span>
  },
  {
    name: 'Available Units',
    center: true,
    selector: (row) => row['availableUnits'],
    cell: ({ availableUnits }) => <span>{ availableUnits || "-" }</span>
  },
  {
    name: 'Min Price',
    center: true,
    selector: (row) => row['minPrice'],
    cell: ({ minPrice }) => <span>{ minPrice || "-" }</span>
  },
  {
    name: 'Max Price',
    center: true,
    selector: (row) => row['maxPrice'],
    cell: ({ maxPrice }) => <span>{ maxPrice || "-" }</span>
  },
  {
    name: 'Floor Plan',
    center: true,
    cell: (row) => {
      return (
          <Text 
            size="Small" 
            fontWeight="mediumbold" 
            color="primaryColor" 
            text="View" 
            className = "ml-2 d-flex" />
      );
    },
  },
];


export const projectCommercialColumn = [
  {
    name: '#',
    maxWidth: '60px',
    center: true,
    selector: (row) => row['id']
  },
  {
    name: 'Build',
    center: true,
    selector: (row) => row['bhk'],
    cell: ({ bhk }) => <span>{ bhk || "-" }</span>
  },
  {
    name: 'Type',
    center: true,
    selector: (row) => row['type'],
    cell: ({ type }) => <span>{ type || "-" }</span>
  },
  {
    name: 'Carpet Area',
    center: true,
    selector: (row) => row['carpetArea'],
    cell: ({ carpetArea }) => <span>{ carpetArea || "-" }</span>
  },
  {
    name: 'Total Units',
    center: true,
    selector: (row) => row['totalUnits'],
    cell: ({ totalUnits }) => <span>{ totalUnits || "-" }</span>
  },
  {
    name: 'Available Units',
    center: true,
    selector: (row) => row['availableUnits'],
    cell: ({ availableUnits }) => <span>{ availableUnits || "-" }</span>
  },
  {
    name: 'Min Price',
    center: true,
    selector: (row) => row['minPrice'],
    cell: ({ minPrice }) => <span>{ minPrice || "-" }</span>
  },
  {
    name: 'Max Price',
    center: true,
    selector: (row) => row['maxPrice'],
    cell: ({ maxPrice }) => <span>{ maxPrice || "-" }</span>
  },
  {
    name: 'Floor Plan',
    center: true,
    cell: (row) => {
      return (
          <Text 
            size="Small" 
            fontWeight="mediumbold" 
            color="primaryColor" 
            text="View" 
            className = "ml-2 d-flex" />
      );
    },
  },
];


