import PhotographerPage from "./PhotographerPage.js";

(async function () {
  const pathId = parseInt(location.href.split("?id=")[1]);
  let photographerPage = new PhotographerPage();
  await photographerPage.getPhotographer(pathId);
  photographerPage.displayMedia();
})();
