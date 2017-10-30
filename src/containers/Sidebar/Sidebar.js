import React from "react";
import CommentPostView from "containers/CommentPostView/CommentPostView";
import TrackingCardList from "containers/TrackingCardList/TrackingCardList";
import DatePicker from "containers/DatePicker/DatePicker";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sideabr">
      <CommentPostView />
      <TrackingCardList />
      <DatePicker />
    </div>
  );
};

export default Sidebar;
