import React from "react";

const Loading = (props) => {
  const { type } = props;
  return (
    <div id="loader">
      {type === "circle" ? (
        <>
          <div className="content-loader-circle"></div>
        </>
      ) : (
        <>
          <div className="content-loader">
            <div className="loader1"></div>
            <div className="loader2"></div>
            <div className="loader3"></div>
            <div className="loader4"></div>
          </div>
          <div className="text-load">Loading...</div>
        </>
      )}
    </div>
  );
};

export default Loading;
