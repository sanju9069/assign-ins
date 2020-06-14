import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
const Gallery = () => {
  const getItem = localStorage.getItem("savedImg");
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([JSON.parse(getItem)]);
  }, [getItem]);

  if (!getItem) {
    return <Redirect to="/" />;
  }
  return (
    <>
      {data.length > 0
        ? data.map((val, key) => (
            <div key={key}>
              {val.vertical && <img src={val.vertical} alt="test" />}
              {val.horizontal && <img src={val.horizontal} alt="test" />}
              {val.horizontalSmall && (
                <img src={val.horizontalSmall} alt="test" />
              )}
              {val.gallery && <img src={val.gallery} alt="test" />}
            </div>
          ))
        : "No Data Found"}
    </>
  );
};

export default Gallery;
