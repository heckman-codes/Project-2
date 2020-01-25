$(document).ready(function () {
    $('#sign-in-button').on('click', function (e) {
        e.preventDefault();
        console.log('test');

        const userData = {
            email: $('#email-login-input')
                .val()
                .trim(),
            password: $('#password-login-input')
                .val()
                .trim()
        };

        $.ajax({
            method: 'POST',
            url: '/api/user/login',
            data: userData
        });
    });
});