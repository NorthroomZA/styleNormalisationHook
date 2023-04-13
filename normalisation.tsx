import { useState, useEffect } from "react";
import { Dimensions, PixelRatio } from "react native";
/*
we extract the screen height and width using Dimensions from the react-native package and use that to calculate the base scales.
The base scale is then used to calculate the most suitable size
*/
const useStyleNormalisation = (widthBase_scale: number, heightBase_scale:number) => {
  const [data, setData] = useState(null);

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  //values bases on iphone11 scale and will need to be passing in
  const widthBaseScale = SCREEN_WIDTH / widthBase_scale || 414;
  const heightBaseScale = SCREEN_HEIGHT / heightBase_scale || 896;

  function normalize(size, based = "width") {
    const newSize =
      based === "height" ? size * heightBaseScale : size * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }

  //for width  pixel
  const widthPixel = (size) => {
    return normalize(size, "width");
  };
  //for height  pixel
  const heightPixel = (size) => {
    return normalize(size, "height");
  };
  //for font  pixel
  const fontPixel = (size) => {
    return heightPixel(size);
  };
  //for Margin and Padding vertical pixel
  const pixelSizeVertical = (size) => {
    return heightPixel(size);
  };
  //for Margin and Padding horizontal pixel
  const pixelSizeHorizontal = (size) => {
    return widthPixel(size);
  };
  return {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
  };
};

export default useStyleNormalisation;
