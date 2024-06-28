import { Link } from 'react-router-dom';

import Text from '../../../../shared/Text/Text';
import ActionButton from '../../../../shared/Buttons/ActionButton/ActionButton';

import { handleStatusElement, formateDate } from '../../../../common/helpers/Utils';

export const builderListingColumn = [
    {
      name: '#',
      maxWidth: '60px',
      selector: (row) => row['projectId'],
    },
    {
      name: 'Project Group',
      selector: (row) => row['projectGroup'],
    },
    {
      name: 'No. of Projects',
      center: true,
      selector: (row) => row['noOfProjects'],
    },
    {
      name: 'Builder Name',
      center: true,
      selector: (row) => row['builderName'],
    },
    {
      name: 'Builder Contact No.',
      center: true,
      selector: (row) => row['builderContactNo'],
    },
    {
      name: 'Assigned To',
      center: true,
      selector: (row) => row['assignTo'],
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
            id={ `datatable_${ row.projectId }` }
            iconClass="rotatable"
          />
        );
      },
    },
  ];



export const builderExpanderColumns = [
    {
      name: '#',
      maxWidth: '60px',
      center: true,
      selector: (row) => row['projectId']
    },
    {
      name: 'Project Name',
      center: true,
      selector: (row) => row['projectName'],
    },
    {
      name: 'Promoter Name',
      center: true,
      selector: (row) => row['promotorName'],
    },
    {
      name: 'Last Modified Date',
      center: true,
      selector: (row) => formateDate(row['lastModifiedDate']),
    },
    {
      name: 'View Details',
      center: true,
      cell: (row) => (
        <Link to={`/admin/builder-project/details/${row.projectId}`} className="viewAll">
          <Text size="Small" fontWeight="mediumbold" color="primaryColor" text="View" className = "ml-2 d-flex" />
        </Link>
      ),
    },
    {
      name: 'View on Map',
      center: true,
      cell: (row) => (
        <ActionButton 
          link={`/admin/builder-project/details/${row.projectId}`}
          icon='location'
          tooltipName="View on Map"
          iconColor="#8E878A" //#8E878A
        />
      ),
    },
    {
      name: 'Status',
      center: true,
      selector: (row) => handleStatusElement(row['status']),
    },
];

