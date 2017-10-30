import React from "react";

import styles from "./Loading.css";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";

const Loading = () => {
  return (
    <div className="page" style={styles}>
      <section className="main">
        <LoadingCircle />
      </section>
    </div>
  );
};

export default Loading;
