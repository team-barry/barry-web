import React from "react";
import TrackingCardList from "containers/TrackingCardList/TrackingCardList";
import DatePicker from "containers/DatePicker/DatePicker";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sideabr">
      <TrackingCardList />
      <DatePicker />
    </div>
  );
};

export default Sidebar;
