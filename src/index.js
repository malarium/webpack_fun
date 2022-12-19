import _ from "lodash";
import { displayMouseCoords } from "./coordsDisplay";
import "./style.css";

document.addEventListener(
  "mousemove",
  _.throttle((e) => {
    displayMouseCoords({
      x: e.x,
      y: e.y,
    });
  }, 333)
);
