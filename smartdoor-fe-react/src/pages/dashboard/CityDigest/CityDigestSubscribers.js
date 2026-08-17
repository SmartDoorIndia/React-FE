/** @format */

import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { formateDate, ToolTip } from "../../../common/helpers/Utils";
import Text from "../../../shared/Text/Text";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import "./CityDigestSubscribers.scss";
import { getAllCityDigestSubscribers } from "../../../common/redux/actions";

const StatCard = ({ value, label, color = "#BE1452" }) => (
   <Card className="stat-card h-100">
      <Card.Body className="text-center p-3">
         <Text text={value ?? 0} className="stat-value" style={{ color, fontSize: "28px", fontWeight: "700" }} />
         <Text text={label} className="stat-label" style={{ color: "#6c757d", fontSize: "14px", fontWeight: "500" }} />
      </Card.Body>
   </Card>
);

const CityDigestSubscribers = () => {
   const [subscriberList, setSubscriberList] = useState([]);
   const [loading, setLoading] = useState(false);

   const getSubscriberList = async () => {
      setLoading(true);
      const response = await getAllCityDigestSubscribers();
      setLoading(false);
      if (response?.status === 200) {
         setSubscriberList([...(response?.data?.resourceData || [])]);
      }
   };

   useEffect(() => {
      getSubscriberList();
   }, []);

   const stats = useMemo(() => {
      const activeCount = subscriberList.filter((row) => row.isActive).length;
      return {
         total: subscriberList.length,
         active: activeCount,
         inactive: subscriberList.length - activeCount,
      };
   }, [subscriberList]);

   const subscriberColumns = [
      {
         name: "User ID",
         selector: (row) => row.userId,
         sortable: false,
         center: true,
         maxWidth: "100px",
         cell: ({ userId }) => <Text size="Small" color="secondryColor" text={userId} />,
         id: 1,
      },
      {
         name: "Name",
         selector: (row) => row.userName,
         sortable: false,
         center: false,
         maxWidth: "210px",
         cell: ({ userName }) => <Text size="Small" color="secondryColor wrap-text" text={userName} />,
         id: 2,
      },
      {
         name: "Mobile",
         selector: (row) => row.mobile,
         sortable: false,
         center: true,
         maxWidth: "150px",
         cell: ({ mobile }) => <Text size="Small" color="secondryColor" text={mobile} />,
         id: 3,
      },
      {
         name: "Subscribed Email",
         selector: (row) => row.email,
         sortable: false,
         center: false,
         minWidth: "230px",
         cell: ({ email }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={email}>
               <Text size="Small" color="secondryColor elipsis-text" text={email} />
            </ToolTip>
         ),
         id: 4,
      },
      {
         name: "Cities",
         selector: (row) => row.cityNames,
         sortable: false,
         center: false,
         minWidth: "170px",
         cell: ({ cityNames }) => {
            if (!cityNames?.length) {
               return <Text size="Small" color="secondryColor" text="-" />;
            }
            return (
               // strategy: "fixed" keeps the menu from being clipped by the table body's own
               // overflow:hidden/scroll (rdt_TableBody) when a row near the edge opens it.
               <Dropdown popperConfig={{ strategy: "fixed" }}>
                  <Dropdown.Toggle as="span" className="cityDropdownToggle">
                     {cityNames[0]}
                     {cityNames.length > 1 ? ` +${cityNames.length - 1}` : ""}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="cityDropdownMenu">
                     <div className="cityChipsWrap">
                        {cityNames.map((city) => (
                           <span className="cityChip" key={city}>
                              {city}
                           </span>
                        ))}
                     </div>
                  </Dropdown.Menu>
               </Dropdown>
            );
         },
         id: 5,
      },
      {
         name: "Plan Status",
         selector: (row) => row.isActive,
         sortable: false,
         center: true,
         maxWidth: "130px",
         cell: ({ isActive }) => (
            <span className={`defaultTag ${isActive ? "tagSuccess" : "tagDangerous"}`}>
               {isActive ? "Active" : "Inactive"}
            </span>
         ),
         id: 6,
      },
      {
         name: "Emails",
         selector: (row) => row.emailEnabled,
         sortable: false,
         center: true,
         maxWidth: "130px",
         cell: ({ emailEnabled }) => (
            <span className={`defaultTag ${emailEnabled ? "tagSuccess" : "tagAlert"}`}>
               {emailEnabled ? "Enabled" : "Paused"}
            </span>
         ),
         id: 7,
      },
      {
         name: "Start Date",
         selector: (row) => row.startDate,
         sortable: false,
         center: true,
         maxWidth: "140px",
         cell: ({ startDate }) => (
            <Text size="Small" color="secondryColor" text={startDate ? formateDate(startDate) : "-"} />
         ),
         id: 8,
      },
      {
         name: "Expiry Date",
         selector: (row) => row.expiryDate,
         sortable: false,
         center: true,
         maxWidth: "140px",
         cell: ({ expiryDate }) => (
            <Text size="Small" color="secondryColor" text={expiryDate ? formateDate(expiryDate) : "-"} />
         ),
         id: 9,
      },
   ];

   return (
      <div className="cityDigestSubscribersPage">
         <Row className="g-3 mt-3">
            <Col md={4}>
               <StatCard value={stats.total} label="Total Subscribers" color="#BE1452" />
            </Col>
            <Col md={4}>
               <StatCard value={stats.active} label="Active Subscribers" color="#40C52B" />
            </Col>
            <Col md={4}>
               <StatCard value={stats.inactive} label="Inactive Subscribers" color="#FF1919" />
            </Col>
         </Row>
         <div className="mt-3 tableBox">
            <div className="align-items-center tableHeading">
               <Text
                  size="regular"
                  fontWeight="mediumbold"
                  color="secondryColor"
                  text="Weekly City Digest Subscribers"
               />
            </div>
            <DataTableComponent
               className="cityDigestSubscribersTableWrapper"
               progressPending={loading}
               columns={subscriberColumns}
               data={subscriberList}
               persistTableHead={true}
               paginationServer={false}
               pagination={"off"}
            />
         </div>
      </div>
   );
};

export default CityDigestSubscribers;
