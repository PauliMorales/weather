import React from "react";

const Loading = () => {
  return (
    <div id="loader">
      <div className="content-loader">
        <div className="loader1"></div>
        <div className="loader2"></div>
        <div className="loader3"></div>
        <div className="loader4"></div>
      </div>
      <div className="text-load">Loading...</div>
    </div>
  );
};

export default Loading;
