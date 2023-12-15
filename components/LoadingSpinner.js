import React from "react";
import { Oval } from "react-loader-spinner";

function LoadingSpinner() {
  return (
    <div className="absolute top-60 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
      <Oval
        color="#FFFFFF"
        secondaryColor="#808080"
        height={80}
        width={80}
        visible={true}
      />
    </div>
  );
}

export default LoadingSpinner;
