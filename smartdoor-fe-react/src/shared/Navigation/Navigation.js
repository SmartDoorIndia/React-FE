/** @format */

import React, { useState, useEffect } from "react";
import * as ReactBoostrap from "react-bootstrap";
import Image from "../Image/Image";
import sideLogo from "../../assets/images/sidebar-logo.svg";
import buildingIcon from "../../assets/images/building-icon.svg";
import dashboard from "../../assets/images/dashboard-ico.svg";
import user from "../../assets/svg/user.svg";
import "./Navigation.scss";
import { Link, useLocation } from "react-router-dom";
import brokerActive from "../../assets/svg/broker-active.svg";
import societyActive from "../../assets/svg/society-active.svg";
import userActive from "../../assets/svg/user-Active.svg";
import propertyAdvisorIcon from "../../assets/svg/propertyAdvisor.svg";
import propertyAdvisorActive from "../../assets/svg/property-advisor-active.svg";
import propertyActive from "../../assets/svg/property-active.svg";
import houseIcon from "../../assets/images/house-icon.svg";
import borkerIcon from "../../assets/images/broker-icon.png";
import { getLocalStorage } from "../../common/helpers/Utils";

const Nav = () => {
   const { pathname } = useLocation();
   const [isOpen, setIsOpen] = useState(true);
   const [isActive, setIsActive] = useState(false);
   const [isPropertyDDOpen, setisPropertyDDOpen] = useState(true);
   const [isPropertyActive, setIsPropertyActive] = useState(false);

   const userData = getLocalStorage("authData");

   useEffect(() => {
      if (
         pathname.includes("sales") ||
         pathname.includes("execution") ||
         pathname.includes("helpdesk") ||
         pathname.includes("finance") ||
         pathname.includes("transaction")
      ) {
         setIsOpen(true);
         setIsActive(true);
         setIsPropertyActive(false);
         setisPropertyDDOpen(false);
      } else if (pathname.includes("/admin/property") || pathname.includes("builder-property")) {
         setisPropertyDDOpen(true);
         setIsPropertyActive(true);
         setIsOpen(false);
         setIsActive(false);
      } else if (
         pathname.includes("/admin/societies") ||
         pathname.includes("/admin/consumer-management") ||
         pathname.includes("/admin/user-management")
      ) {
         setIsActive(false);
         setIsOpen(false);
         setIsPropertyActive(false);
         setisPropertyDDOpen(false);
      }
   }, [pathname]);

   function checkNavActive() {
      setIsOpen(!isOpen);
   }

   // function checkPropertyNavActive() {
   //    setisPropertyDDOpen(!isPropertyDDOpen);
   // }

   return (
      <div className="mainMenu">
         <ReactBoostrap.Navbar expand="lg">
            <ReactBoostrap.Navbar.Brand href="/admin/sales">
               <Image name="Logo" src={sideLogo} />
            </ReactBoostrap.Navbar.Brand>
            <ReactBoostrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <ReactBoostrap.Navbar.Collapse id="basic-navbar-nav">
               <ReactBoostrap.Nav className="mr-auto">
                  <ReactBoostrap.NavDropdown
                     show={isOpen}
                     onClick={() => {
                        checkNavActive();
                     }}
                     title="Dashboard"
                     id="basic-nav-dropdown"
                     name="basic-nav-dropdown"
                     className={isActive ? "dashboardActiveIcon" : "dashboardIcon"}
                  >
                     {/* <Link to='/admin/sales' className={ `dropdown-item  ${ pathname.includes('analytics') ? 'active':'' }` } >Analytics & Management</Link> */}
                     <Link
                        to="/admin/sales"
                        className={`dropdown-item  ${pathname.includes("sales") ? "active" : ""}`}
                     >
                        Society Sales Team
                     </Link>
                     <Link
                        to="/admin/execution"
                        className={`dropdown-item  ${
                           pathname.includes("execution") ? "active" : ""
                        }`}
                     >
                        Installation Team
                     </Link>
                     <Link
                        to="/admin/helpdesk"
                        className={`dropdown-item  ${
                           pathname.includes("helpdesk") ? "active" : ""
                        }`}
                     >
                        Helpdesk Team
                     </Link>
                     {/* /admin/finance */}
                     <Link
                        to="/admin/finance"
                        className={`dropdown-item  ${pathname.includes("finance") ? "active" : ""}`}
                     >
                        Finance Team
                     </Link>
                     <Link
                        to="/admin/transaction"
                        className={`dropdown-item  ${
                           pathname.includes("/transaction") && !pathname.includes("transactions")
                              ? "active"
                              : ""
                        }`}
                     >
                        Transaction Team
                     </Link>
                  </ReactBoostrap.NavDropdown>

                  {/* <ReactBoostrap.NavDropdown
              show={ isPropertyDDOpen }
              onClick={ ()=> {
                checkPropertyNavActive()
              } }
              title="Properties" id="basic-nav-dropdown"
              name="basic-nav-dropdown"
              className={ (isPropertyActive) ? 'propertyActive': 'houseIcon' }>

              <Link to='/admin/property' className={ `dropdown-item  ${ pathname.includes('/admin/property') ? 'active':'' }` }
              >Consumer Property</Link>
              <Link to='/admin/builder-project' className={ `dropdown-item  ${ pathname.includes('/admin/builder-project') ? 'active':'' }` }
              >Builder Project</Link>

            </ReactBoostrap.NavDropdown> */}

                  <Link
                     to="/admin/property"
                     className={`nav-link ${
                        pathname.includes("/admin/property") ? "nav-active" : ""
                     }`}
                  >
                     <Image
                        name="houseIcon"
                        src={pathname.includes("/admin/property") ? propertyActive : houseIcon}
                     />
                     Properties
                  </Link>

                  <Link
                     to="/admin/deleted-unlisted-property"
                     className={`nav-link ${
                        pathname.includes("/admin/deleted-unlisted-property") ? "nav-active" : ""
                     }`}
                  >
                     <Image
                        name="houseIcon"
                        src={pathname.includes("/admin/deleted-unlisted-property") ? propertyActive : houseIcon}
                     />
                     Deleted/ Unlisted Properties
                  </Link>

                  <Link
                     to="/admin/societies"
                     className={`nav-link ${
                        pathname.includes("/admin/societies") ? "nav-active" : ""
                     }`}
                  >
                     <Image
                        name="buildingIcon"
                        src={pathname.includes("/admin/societies") ? societyActive : buildingIcon}
                     />
                     Societies
                  </Link>

                  <Link
                     to="/admin/consumer-management"
                     className={`nav-link ${
                        pathname.includes("consumer-management") ? "nav-active" : ""
                     }`}
                  >
                     <Image
                        name="user"
                        src={pathname.includes("consumer-management") ? userActive : user}
                     />
                     Consumer Management
                  </Link>

                  <Link
                     to="/admin/user-management"
                     className={`nav-link ${
                        pathname.includes("user-management") ? "nav-active" : ""
                     }`}
                  >
                     <Image
                        name="teamGroup"
                        src={pathname.includes("user-management") ? brokerActive : dashboard}
                     />
                     User Management
                  </Link>

                  <Link
                     to="/admin/realtor-advisor-management"
                     className={`nav-link ${
                        pathname.includes("realtor-advisor-management") ? "nav-active" : ""
                     }`}
                  >
                     <Image
                        name="teamGroup"
                        src={
                           pathname.includes("realtor-advisor-managementt")
                              ? propertyAdvisorActive
                              : propertyAdvisorIcon
                        }
                     />
                     Realtor Advisor Management
                  </Link>

                  {userData.roleName === "SUPER ADMIN" && (
                     <>
                        <Link
                           to="/admin/nonsdproperty"
                           className={`nav-link ${
                              pathname.includes("nonsdproperty") ? "nav-active" : ""
                           }`}
                        >
                           <Image
                              name="houseIcon"
                              src={
                                 pathname.includes("/admin/nonsdproperty")
                                    ? propertyActive
                                    : houseIcon
                              }
                           />
                           Non SmartDoor Properties
                        </Link>
                        <Link
                           to="/admin/addCity"
                           className={`nav-link ${
                              pathname.includes("addCity") ? "nav-active" : ""
                           }`}
                        >
                           <Image
                              name="teamGroup"
                              src={
                                 pathname.includes("addCity")
                                    ? propertyAdvisorActive
                                    : propertyAdvisorIcon
                              }
                           />
                           Add New City
                        </Link>
                        <Link
                           to="/admin/addPlans"
                           className={`nav-link ${
                              pathname.includes("addPlans") ? "nav-active" : ""
                           }`}
                        >
                           <Image
                              name="teamGroup"
                              src={
                                 pathname.includes("addPlans")
                                    ? propertyAdvisorActive
                                    : propertyAdvisorIcon
                              }
                           />
                           Manage Plans
                        </Link>
                     </>
                  )}
                     <Link
                        to="/admin/advisors"
                        className={`nav-link ${
                           pathname.includes("advisors") ? "nav-active" : ""
                        }`}
                     >
                        <Image
                           name="teamGroup"
                           src={
                              pathname.includes("advisors")
                                 ? borkerIcon
                                 : borkerIcon
                           }
                        />
                        Advisors
                     </Link>
                     <Link
                        to="/admin/static-mobile-numbers"
                        className={`nav-link ${
                           pathname.includes("static-mobile-numbers") ? "nav-active" : ""
                        }`}
                     >
                        <Image
                           name="teamGroup"
                           src={
                              pathname.includes("static-mobile-numbers")
                                 ? borkerIcon
                                 : borkerIcon
                           }
                        />
                        Static Mobile Numbers
                     </Link>
               </ReactBoostrap.Nav>
            </ReactBoostrap.Navbar.Collapse>
         </ReactBoostrap.Navbar>
      </div>
   );
};

export default Nav;
