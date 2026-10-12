import React from "react";
import { OrbitProgress } from "react-loading-indicators";

const loading = () => {
  return (
    <div className="flex justify-center py-2">
      <OrbitProgress
        variant="split-disc"
        color="#32cd32"
        size="large"
        text="Loading.."
        textColor=""
      />
    </div>
  );
};

export default loading;
