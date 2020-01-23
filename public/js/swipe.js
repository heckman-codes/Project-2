var dragItem = document.querySelector("#pet-card");
var dragBox = document.querySelector("#petContainer");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

dragBox.addEventListener("touchstart", dragStart, false);
dragBox.addEventListener("touchend", dragEnd, false);
dragBox.addEventListener("touchmove", drag, false);

dragBox.addEventListener("mousedown", dragStart, false);
dragBox.addEventListener("mouseup", dragEnd, false);
dragBox.addEventListener("mousemove", drag, false);

function dragStart(e) {
  if (e.type === "touchstart") {
    console.log("lets drag");
    console.log(e);
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    console.log("life is a drag");
    active = true;
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === dragItem) {
    console.log("it's true!!!");
    active = true;
  }
}

function dragEnd(e) {
  currentX = 0;
  currentY = 0;
  active = false;
}

function drag(e) {
  if (active) {
    e.preventDefault();
    console.log("lets go");
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, dragItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

var container = document.querySelector("#petContainer");
var listener = SwipeListener(container);
console.log("AAAAHHH");
console.log(container);
setTimeout(() => {
  console.log(container);
  if (container) {
    console.log("hi im container");
    container.addEventListener("swipe", function(e) {
      console.log(e);
      var directions = e.detail.directions;
      var x = e.detail.x;
      var y = e.detail.y;
      var swipeDistance = $(window).width() / 1.5;

      if (directions.left) {
        console.log("Swiped left.");
        console.log(x);
        anime({
          targets: "#pet-card",
          translateX: 0 - swipeDistance,
          direction: "alternate"
        });
      }

      if (directions.right) {
        console.log("Swiped right.");
        anime({
          targets: "#pet-card",
          translateX: swipeDistance,
          direction: "alternate"
        });
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
  }
}, 100);
