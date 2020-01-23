console.log("search.js has loaded")

$('#area-code').val('95826');

$(function () {
    $(".submit").on("click", function (event) {
        event.preventDefault();

        var animal = $("#animal-type").val().trim().toString();
        var location = $("#area-code").val().trim().toString();
        var distance = $("#distance").val().trim().toString();

        console.log(animal);
        console.log(location);
        console.log(distance);

        var searchQuery = "/adopt/" + animal + "/" + location + "/" + distance;

        $.ajax(searchQuery, {
            type: "GET",
        }).then(
            function () {
                window.location.replace(searchQuery);
            }
        );
    });
});