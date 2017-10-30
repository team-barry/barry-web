import React from "react";
import CommentPost from "containers/CommentPost/CommentPost";
import TrackingCardList from "containers/TrackingCardList/TrackingCardList";
import DatePicker from "containers/DatePicker/DatePicker";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sideabr">
      <CommentPost />
      <TrackingCardList />
      <DatePicker />
    </div>
  );
};

export default Sidebar;
