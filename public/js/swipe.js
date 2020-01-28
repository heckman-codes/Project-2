var dragItem = document.querySelector("#pet-card");
var dragBox = document.querySelector("#petContainer");
var swipeNum = 0;

var swipeNum = 0;

var active = false;
var currentX;
var initialX;
var xOffset = 0;

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
    active = true;
    initialX = e.touches[0].clientX - xOffset;
  } else {
    console.log("life is a drag");
    console.log(currentX);
    console.log(initialX);
    console.log(xOffset);
    active = true;
    initialX = e.clientX - xOffset;
  }

  if (e.target === dragItem) {
    console.log("it's true!!!");
    active = true;
  }
}

function dragEnd(e) {
  initialX = 0;
  currentX = 0;
  xOffset = 0;
  setTranslate(currentX, 0, dragItem);

  active = false;
}

function drag(e) {
  if (active) {
    e.preventDefault();
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
    } else {
      currentX = e.clientX - initialX;
    }

    xOffset = currentX;

    setTranslate(currentX, 0, dragItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

var container = document.querySelector("#petContainer");
var listener = SwipeListener(container);

if (container) {
  console.log("hi im container");
  container.addEventListener("swipe", function (e) {
    console.log(e);
    var directions = e.detail.directions;
    var x = e.detail.x;
    var y = e.detail.y;
    var swipeDistance = $(window).width() / 1.25;

    if (directions.left) {
      console.log("Swiped left.");
      document.querySelector("#pet-card").style.opacity = 0;

      anime({
        targets: "#pet-card",
        translateX: 0 - swipeDistance,
        direction: "alternate"
      });
      var petNumber = parseInt($("#pet-number").text());
      var petURL = new URL(window.location.href).pathname;
      console.log(petURL);

      var URLarr = petURL.split("/");
      var animal = URLarr[2];
      var location = URLarr[3];
      var distance = URLarr[4];

      console.log(URLarr);

      var searchQuery =
        "/api/adopt/" +
        animal +
        "/" +
        location +
        "/" +
        distance +
        "/" +
        (petNumber + 1);
      console.log(searchQuery);
      petNumber = parseInt(petNumber) + 1;
      $("#pet-number").text(petNumber);
      $.ajax({
        type: "GET",
        url: searchQuery,
        headers: {
          "Content-type": "application/json"
        }
      }).done(function (res) {
        console.log(res);
        $("#petProfilePic").attr("src", res.pet.photos[0].full);
        $("#pet-age").text(res.pet.age);
        $("#pet-name").text(res.pet.name);
        $("#pet-desc").text(res.pet.description);
        $("#pet-add1").text(res.pet.contact.address1);
      });

      swipeNum = swipeNum + 1;
      setTimeout(() => {
        document.querySelector("#pet-card").style.opacity = 1;
      }, 2000);

      $(".contact-container").css("display", "none");

    }

    if (directions.right) {
      console.log("Swiped right.");
      document.querySelector("#pet-card").style.opacity = 0;

      anime({
        targets: "#pet-card",
        translateX: swipeDistance,
        direction: "alternate"
      });

      var petNumber = parseInt($("#pet-number").text());
      var petURL = new URL(window.location.href).pathname;
      console.log(petURL);

      var URLarr = petURL.split("/");
      var animal = URLarr[2];
      var location = URLarr[3];
      var distance = URLarr[4];

      console.log(URLarr);

      var searchQuery =
        "/api/adopt/" +
        animal +
        "/" +
        location +
        "/" +
        distance +
        "/" +
        (petNumber + 1);
      console.log(searchQuery);
      petNumber = parseInt(petNumber) + 1;
      $("#pet-number").text(petNumber);
      
      $.ajax({
        type: "GET",
        url: searchQuery,
        headers: {
          "Content-type": "application/json"
        }
      }).done(function (res) {
        console.log(res);
        $("#petProfilePic").attr("src", res.pet.photos[0].full);
        $("#pet-age").text(res.pet.age);
        $("#pet-name").text(res.pet.name);
        $("#pet-desc").text(res.pet.description);
        $("#pet-add1").text(res.pet.contact.address1);
      });

      var savedPet = {
        animalID: petNumber,
        petName: $("#pet-name").text()
      }

      $.ajax({
        method: "POST",
        url: "/api/postpet",
        data: savedPet
      }).then(function (result) {
        console.log(result);
      })

      swipeNum = swipeNum + 1;
      setTimeout(() => {
        document.querySelector("#pet-card").style.opacity = 1;
      }, 2000);

      $(".contact-container").css("display", "none");

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

  });
}
