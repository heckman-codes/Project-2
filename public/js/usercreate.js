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
        console.log(userPhoto);

        $.ajax({
            method: "POST",
            url: "/api/user/usercreate",
            data: userData
        }).then(function (res) {
            console.log(res);
            window.location.replace("/");
        })
    })
})