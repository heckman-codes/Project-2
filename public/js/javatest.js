// var container = document.querySelector("#container");
// var listener = SwipeListener(container);
container.addEventListener("swipe", function(e) {
  var directions = e.detail.directions;
  var x = e.detail.x;
  var y = e.detail.y;

  if (directions.left) {
    console.log("Swiped left.");
  }

  if (directions.right) {
    console.log("Swiped right.");
  }

  if (directions.top) {
    console.log("Swiped top.");
  }

  if (directions.bottom) {
    console.log("Swiped bottom.");
  }

  if (directions.top && directions.right) {
    console.log("Swiped top-right.");
  }

  if (directions.top && directions.left) {
    console.log("Swiped top-left.");
  }

  if (directions.bottom && directions.right) {
    console.log("Swiped bottom-right.");
  }

  if (directions.bottom && directions.left) {
    console.log("Swiped bottom-left.");
  }

  console.log("Started horizontally at", x[0], "and ended at", x[1]);
  console.log("Started vertically at", y[0], "and ended at", y[1]);
});
