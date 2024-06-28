/** @format */

import React from 'react';

// Component Lazy loading import
const BuilderProjectView = React.lazy(() =>
  import('./BuilderProjectDetailView/BuilderProjectView'),
);

// Route data for builder project
const routeData = [
  {
    path: '/builder/projects/detail',
    name: 'Builder Project',
    bradcrumb: [ 'Builder Projects', 'Project Details' ],
    excat: true,
    module: 'BUILDER',
    component: BuilderProjectView,
  },
  // { "path": "/builder/builder-property/new-builder-property", name:"Builder Project - Posting", bradcrumb: ["Builder Project",	"Add New"], excat:true, module: "BUILDER", component: BuilderProperty },
  // { "path": "/builder/projects", name:"Builder Project", excat:true, module: "BUILDER", component:  BuilderPropertyListing },
];

export default routeData;
