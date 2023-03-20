import React, { useEffect, useState } from "react";
import "./SelectSize.scss"

export const SelectSize = ({ sizes, selectedSize, showSizeError }) => {
  const [currentSize, setCurrenSize] = useState(null);

  useEffect(() => {
    selectedSize(currentSize);
  }, [currentSize]);

  return (
    <div className="SelectSize">
      <p>Select Size</p>
      {showSizeError && <span>Please select a size</span>}
      <div className="sizes">
        {sizes.map((size, index) => {
          return (
            <div
              key={index}
              className={size === currentSize ? "circle outline" : "circle"}
              onClick={() => setCurrenSize(size)}
            >
              {size}
            </div>
          );
        })}
      </div>
    </div>
  );
};
