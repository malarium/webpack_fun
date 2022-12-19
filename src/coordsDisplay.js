const wrapper = document.querySelector(".wrapper");

export const displayMouseCoords = ({ x, y }) => {
  wrapper.textContent = `X: ${x}, Y: ${y}`;
};
