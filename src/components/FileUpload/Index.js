import React, { useState, useEffect } from "react";
import style from "../FileUpload/FileUpload.module.css";

const FileUpload = () => {
  const url = window.URL || window.webkitURL;
  const [src, setSrc] = useState("");
  const [cropVal, setCropVal] = useState({ cordXVal: "", cordYVal: "" });
  const [savedImg, setSavedImg] = useState({
    horizontal: "",
    vertical: "",
    horizontalSmall: "",
    gallery: "",
  });
  const getItem = localStorage.getItem("savedImg");
  const [drVal, setDrVal] = useState("");
  const [saveBtn, setSaveBtn] = useState(false);

  // Function for finding image width and height
  const imgDim = (fileName) => {
    let file, img;
    if ((file = fileName)) {
      img = new Image();
      img.onload = function () {
        if (this.width !== 1024 || this.height !== 1024) {
          alert("Please upload image size of 1024px*1024px");
          return false;
        } else {
          reader(file);
        }
      };
      img.src = url.createObjectURL(file);
    }
  };

  // Upload image function
  const imageUpload = (e) => {
    let fileType = e.target.files[0].type
      .replace(/^.*[\\\/]/, "")
      .toLowerCase();
    if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
      imgDim(e.target.files[0]);
    } else {
      alert("Please Upload Image file Only");
    }
  };

  // Read/Preview image url function
  const reader = (input) => {
    let reader = new FileReader();
    reader.onload = () => {
      setSrc(reader.result);
    };
    reader.readAsDataURL(input);
  };

  //Redraw crop image
  const reDraw = () => {
    let c = document.querySelector(".canvas");
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
  };

  //change function for getting values
  const getValues = (e) => {
    setCropVal({ ...cropVal, [e.target.name]: e.target.value });
    reDraw();
    setSaveBtn(false);
  };

  //Crop Image function
  const cropImg = async (cordX, cordY, width, height, nameVal) => {
    let c = document.querySelector(".canvas");
    let ctx = c.getContext("2d");
    let img = new Image();
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 3;
    let renderedImg;
    img.onload = function () {
      ctx.drawImage(
        img,
        cordX,
        cordY,
        width,
        height,
        cordX,
        cordY,
        width,
        height
      );
      ctx.strokeRect(cordX, cordY, width, height);

      //getting new image after cropping the element
      let imgData = ctx.getImageData(cordX, cordY, width, height);
      let tc = document.createElement("canvas");
      tc.width = imgData.width;
      tc.height = imgData.height;
      let tctx = tc.getContext("2d");
      tctx.putImageData(imgData, 0, 0);
      renderedImg = tc.toDataURL("image/jpg");
      setSavedImg({ ...savedImg, [nameVal]: renderedImg });
    };
    img.src = src;
  };

  //get dropdown value
  const getDpDwVal = (e) => {
    setDrVal(e.target.value);
  };

  // store image in an object
  const saveImg = (e) => {
    if (drVal === "755x450") {
      cropImg(
        parseInt(cropVal.cordXVal),
        parseInt(cropVal.cordYVal),
        755,
        450,
        "horizontal"
      );
    } else if (drVal === "365x450") {
      cropImg(
        parseInt(cropVal.cordXVal),
        parseInt(cropVal.cordYVal),
        365,
        450,
        "vertical"
      );
    } else if (drVal === "365x212") {
      cropImg(
        parseInt(cropVal.cordXVal),
        parseInt(cropVal.cordYVal),
        365,
        212,
        "horizontalSmall"
      );
    } else if (drVal === "380x380") {
      cropImg(
        parseInt(cropVal.cordXVal),
        parseInt(cropVal.cordYVal),
        380,
        380,
        "gallery"
      );
    } else if (drVal === "Select Option" || undefined) {
      alert("Please Select one option");
    }
    setSaveBtn(true);
  };

  // store image locally on browser
  const savedLocal = (e) => {
    localStorage.setItem("savedImg", JSON.stringify(savedImg));
  };

  useEffect(() => {
    if (getItem) {
      setSavedImg(JSON.parse(getItem));
    }
  }, [getItem]);

  return (
    <React.Fragment>
      <select onChange={getDpDwVal}>
        <option default>Select Option</option>
        <option value="755x450">Horizontal</option>
        <option value="365x450">Vertical</option>
        <option value="365x212">Horizontal Small</option>
        <option value="380x380">Gallery</option>
      </select>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={imageUpload}
      />
      <label>Select X Cordinates</label>
      <input
        type="text"
        onChange={getValues}
        name="cordXVal"
        value={cropVal.cordXVal}
      />
      <label>Select Y Cordinates</label>
      <input
        type="text"
        onChange={getValues}
        name="cordYVal"
        value={cropVal.cordYVal}
      />

      <button onClick={saveImg} disabled={saveBtn}>
        Crop
      </button>
      <button onClick={savedLocal}>Save Images</button>

      <div>
        <canvas className="canvas" width="1024" height="1024">
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        {src && <img src={src} alt="test" className={style.previewImg} />}
      </div>
    </React.Fragment>
  );
};

export default FileUpload;
