import Homepage from "./Homepage.js";

(async function () {
  let homepage = new Homepage();
  await homepage.getPhotographers();
  homepage.displayPhotographers();
  homepage.getTags();
  homepage.displayTags();
})();
