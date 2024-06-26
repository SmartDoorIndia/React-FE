/** @format */

import React, { useState, useEffect, memo } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import Text from "../../../shared/Text/Text";
import Form from "react-bootstrap/Form";
import Image from "../../../shared/Image/Image";
import Buttons from "../../../shared/Buttons/Buttons";
import actionIcon from "../../../assets/images/action-icon.svg";
import "./ManagePlan.scss";
import {
   getPlansForAdmin,
   getPlanDetailsById,
} from "../../../common/redux/actions";
import { Link } from "react-router-dom";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import Pagination from "../../../shared/DataTable/Pagination";
import {  ToolTip } from "../../../common/helpers/Utils";
import { TableLoader } from "../../../common/helpers/Loader";

const PaginationComponent = (props) => <Pagination {...props} />;
const ProgressComponent = <TableLoader />;
const getModalActionData = (row) => {
   return { userData: row};
};

const ManagePlan = (props) => {
   const history = useHistory();

   const { allPlanData, getPlansForAdmin } = props;

   // MODAL DATA STATE
   const [planData, setPlanData] = useState();

   useEffect(() => {
      getPlansForAdmin();
      if (planData) {
         history.push({
            pathname: "/admin/manage-plan/add-new-plan",
            state: { planData },
         });
      }
   }, [getPlansForAdmin, planData, history]);

   const columns = [
      {
         name: "Id",
         selector: "planId",
         center: true,
      },

      {
         name: "Is Active",
         selector: "joiningDate",
         maxWidth: "120px",
         center: true,
         cell: ({ active }) => <span>{active ? "Yes" : "No"}</span>,
      },
      {
         name: "Is SmartDoor Property ",
         selector: "smartLockPlan",
         center: true,
         cell: ({ smartLockPlan }) => <span>{smartLockPlan ? "Yes" : "No"}</span>,
      },
      {
         name: "Plan Name",
         selector: "planName",
         center: true,
         maxWidth: "150px",
      },
      {
         name: "Amount",
         selector: "amount",
         center: true,
         maxWidth: "170px",
      },
      {
         name: "GST Value",
         selector: "gstValue",
         center: true,
         minWidth: "200px",
      },

      {
         name: "Total",
         center: true,
         minWidth: "200px",
         cell: ({ amount, gstValue }) => <span>{amount + amount * (gstValue / 100)}</span>,
      },

      {
         name: "Action",
         center: true,
         cell: (row) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                  <span
                     onClick={async () => {
                        const makeData = getModalActionData(row);

                        const userDetails = await getPlanDetailsById({
                           planId: makeData.userData.planId,
                        });
                        if (userDetails.data.resourceData !== undefined) {
                           setPlanData(userDetails.data.resourceData);
                        }
                     }}
                  >
                     <Image name="editIcon" src={actionIcon} />
                  </span>
               </ToolTip>
            </div>
         ),
      },
   ];

   const filteredItems = allPlanData.data.length
      ? allPlanData.data.filter((item) => {
           return item.smartLockPlan || item.planName;
        })
      : [];

   return (
      <>
         <div className="tableBox mb-5">
            <div className="d-flex flex-md-column flex-xl-row justify-content-xl-between align-items-xl-center align-items-left tableHeading">
               <div className="text-nowrap mb-2">
                  <Text
                     size="regular"
                     fontWeight="mediumbold"
                     color="secondryColor"
                     text="Existing Plans"
                  />
               </div>
               <div className="locationSelect d-flex align-items-xl-center align-items-left">
                  <Form.Group controlId="exampleForm.SelectCustom" className="w-40 userGrp ml-0">
                     <Link to="/admin/manage-plan/add-new-plan">
                        <Buttons
                           name="Add New Plan"
                           varient="success"
                           type="submit"
                           size="Small"
                           color="white"
                        />
                     </Link>
                  </Form.Group>
               </div>
            </div>

            <DataTableComponent
               data={filteredItems}
               columns={columns}
               progressPending={allPlanData.isLoading}
               paginationComponent={PaginationComponent}
               perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
               paginationPerPage={8}
               paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
               progressComponent={ProgressComponent}
            />
         </div>
      </>
   );
};

const mapStateToProps = ({ allPlanData }) => ({
   allPlanData,
   getPlanDetailsById,
});

const actions = {
   getPlansForAdmin,
   getPlanDetailsById,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(ManagePlan);
