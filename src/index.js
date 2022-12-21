import _ from "lodash";
import { displayMouseCoords } from "./coordsDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Player from "@vimeo/player";
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

// const myJson = {
//   name: "Josh",
//   weight: 175,
//   age: 30,
//   eyecolor: "brown",
//   isHappy: true,
//   cars: ["Chevy", "Honda"],
//   favoriteBook: {
//     title: "The Last Kingdom",
//     author: "Bernard Cornwell",
//     rating: 8.38,
//   },
// };

// console.log(myJson);

// const stringified = JSON.stringify(myJson);

// console.log(stringified);

// const parsedAgain = JSON.parse(stringified);

// console.log(parsedAgain);

// console.log(myJson === parsedAgain);

// try {
//   JSON.parse('{"test":"val"}');
// } catch (err) {
//   alert("careful!");
// }

// sessionStorage.setItem("name", "Mickey Mouse");
// localStorage.setItem("name", "Donald Duck");
// sessionStorage.clear();

const formElement = document.querySelector(".container form");

window.addEventListener("load", () => {
  Array.from(formElement.elements).forEach((el) => {
    if (el.id) {
      const prevVal = localStorage.getItem(el.id);
      el.value = prevVal;
    }
  });
});

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  Array.from(formElement.elements).forEach((el) => {
    if (el.id) {
      localStorage.setItem(el.id, el.value);
    }
  });
});

const iframe = document.querySelector("#vimeo-player");
const player = new Player(iframe);

const STORAGE_KEY = "vimeo-time";

const onSaveTimeUpdate = ({ seconds } = 0) => {
  localStorage.setItem(STORAGE_KEY, seconds);
};

const getVideoPlayerCurrentTime = () => {
  return localStorage.getItem(STORAGE_KEY);
};

player
  .setCurrentTime(getVideoPlayerCurrentTime())
  // .then(function (data) {
  //   console.log(data);
  // })
  .catch(function (err) {
    switch (err.name) {
      case "RangeError":
        // the time was less than 0 or greater than the video's length
        break;
      default:
        //some error
        break;
    }
  });

player.on("timeupdate", _.throttle(onSaveTimeUpdate, 1000));
