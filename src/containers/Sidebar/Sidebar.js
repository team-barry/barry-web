import React from "react";
import CommentPost from "containers/CommentPost/CommentPost";
import TrackingCardList from "containers/TrackingCardList/TrackingCardList";
import DatePicker from "containers/DatePicker/DatePicker";
import UserProfileCard from "containers/UserProfileCard/UserProfileCard";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <UserProfileCard />
      <CommentPost />
      <TrackingCardList />
      <DatePicker />
    </div>
  );
};

export default Sidebar;
