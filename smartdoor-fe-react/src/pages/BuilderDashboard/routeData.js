/** @format */

import React from "react";

// Component Lazy loading import
const BuilderProjectView = React.lazy(() =>
   import("./BuilderProjectDetailView/BuilderProjectView")
);
const BuilderProfileDetails = React.lazy(() =>
   import("./BuilderProfileDetails/BuilderProfileDetails")
);
const BuilderProjectPosting = React.lazy(() =>
   import("./BuilderProjectPosting/BuilderProjectPosting/BuilderProjectPosting")
);
const ProjectsPostings = React.lazy(() =>
   import("./BuilderProjectPosting/ProjectsPostings/ProjectsPostings")
);
const NewProjectPost = React.lazy(() =>
   import("./NewProjectPost/AddNewProjectPost/AddNewProjectPost")
);
const ProjectDetails = React.lazy(() => import("./NewProjectPost/ProjectDetails/ProjectDetails"));
const ProjectPostingDetails = React.lazy(() =>
   import("./BuilderProjectPosting/ProjectPostingDetails/ProjectPostingDetails")
);
const BuilderList = React.lazy(() => import("./BuilderList/BuilderList"));

// Route data for builder project
const routeData = [
   {
      path: "/builder/projects/detail",
      name: "Builder Project",
      bradcrumb: ["Builder Projects", "Project Details"],
      excat: true,
      module: "BUILDER",
      component: BuilderProjectView,
   },
   {
      path: "/builder/builderList",
      name: "Builder List",
      bradcrumb: ["Project Posting", "Add New Post"],
      excat: true,
      module: "BUILDER",
      component: BuilderList,
   },
   {
      path: "/builder/detail",
      name: "Profile",
      // bradcrumb: [ 'Profile Details' ],
      excat: true,
      module: "BUILDER",
      component: BuilderProfileDetails,
   },
   {
      path: "/builder/project/Posting",
      name: "Projects Postings",
      breadcrumb: ["Total Projects", "Total Property"],
      excat: true,
      module: "BUILDER",
      component: ProjectsPostings,
   },
   {
      path: "/builder/Posting-Property",
      name: "Add New Projects Post",
      bradcrumb: ["Posting Property", "Add New Post"],
      excat: true,
      module: "BUILDER",
      component: NewProjectPost,
   },
   {
      path: "/builder/Project-details",
      name: "Add New Projects Post",
      bradcrumb: ["Project Details", "Add New Post"],
      excat: true,
      module: "BUILDER",
      component: ProjectDetails,
   },
   {
      path: "/builder/Project-Posting-Details",
      name: localStorage.getItem("projectName"),
      bradcrumb: ["Project Postings", "Project Details"],
      excat: true,
      module: "BUILDER",
      component: ProjectPostingDetails,
   },
   // { "path": "/builder/builder-property/new-builder-property", name:"Builder Project - Posting", bradcrumb: ["Builder Project",	"Add New"], excat:true, module: "BUILDER", component: BuilderProperty },
   // { "path": "/builder/projects", name:"Builder Project", excat:true, module: "BUILDER", component:  BuilderPropertyListing },
];

export default routeData;
