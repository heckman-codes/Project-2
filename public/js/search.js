console.log("search.js has loaded")

$('#area-code').val('95826');

function userValidate() {
    if (!valid) {
        $(".login-signup-splash").show();
        $("#search-section").hide();
    } else {
        $("#search-section").show();
        $(".login-signup-splash").hide();

    }
}
$(document).ready(function () {
    console.log($.cookie("token"));
});


function accountPage() {
    if (!valid) {
        $("#login-div").show();
        $("#account-div").hide();
    } else {
        $("#login-div").hide();
        $("#account-div").show();
    }
}

accountPage();

$(function () {
    userValidate();

    $(".submit").on("click", function (event) {
        event.preventDefault();

        var animal = $("#animal-type").val().trim().toString();
        var location = $("#area-code").val().trim().toString();
        var distance = $("#distance").val().trim().toString();

        console.log(animal);
        console.log(location);
        console.log(distance);

        var searchQuery = "/adopt/" + animal + "/" + location + "/" + distance + "/0";

        $.ajax(searchQuery, {
            type: "GET",
        }).then(
            function () {
                window.location.replace(searchQuery);
            }
        );
    });
});