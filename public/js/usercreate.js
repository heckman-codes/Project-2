console.log("user create button function loaded");

$(function () {
    $("#signup-confirm-button").on("click", function () {
        event.preventDefault();

        var userEmail = $("#email-input").val().trim();
        var firstName = $("#fName-input").val().trim();
        var lastName = $("#lName-input").val().trim();
        var userPassword = $("#password-input").val().trim();
        var userPhoto = $("#user-photo-input").val().trim();

        var userData = {
            firstName: firstName,
            lastName: lastName,
            photoURL: userPhoto,
            email: userEmail,
            password: userPassword
        }

        console.log(userData);

        $.ajax("/api/usercreate", {
            type: "POST",
            url: "/usercreate",
            data: userData
        }).then(
            function () {
                console.log("Successfully created ");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    })
})