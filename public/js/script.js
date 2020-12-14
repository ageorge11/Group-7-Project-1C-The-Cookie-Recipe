
function goLogin() {
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
    document.getElementById("forgotPass").style.display = "none";
}

function goForgetPass() {
    document.getElementById("forgotPass").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
}

function goRegister() {
    document.getElementById("register").style.display = "block";
    document.getElementById("forgotPass").style.display = "none";
    document.getElementById("login").style.display = "none";
}


function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function login(event) {

    event.preventDefault();
    console.log("login clicked");
    //$('.alert').hide();

    var data = {}

    data["email"] = $("#login_email").val();
    data["password"] = $("#login_password").val();

    if (!data["email"] || !data["password"]) {
        console.log("Fields Missing");
    }
    else {

        $("#loginbtn").prop("disabled", true);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: " http://localhost:3000/api/user/login",
            data: JSON.stringify(data),
            dataType: 'json',
            timeout: 600000,
            success: function (data) {
                console.log("Login Success");
                //console.log(data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user",JSON.stringify(data.user));

                window.location.href = "home.html";
            },
            error: function (e) {

                console.log("error : ", e)

                if (e.readyState == 0) {
                    $('.alert-body').html('<strong>Error !</strong> Can\'t connet to Server');
                }
                else if (e.status == 401) {
                    $('.alert-body').html('<strong>Login Failed! - Invalid Email/Password</strong> <p>Please enter a valid Email / Password and try again </p>');
                }

                $('.alert').show()
                setTimeout(function () {
                    $('.alert').hide();
                }, 3500);
            }
        });

        $("#loginbtn").prop("disabled", false);
    }
}

function forgetPass(event) {

    event.preventDefault();
    // console.log("register clicked");

    var data = {}

    data["email"] = $("#fp").val();

    if (!data["email"]) {
        console.log("Fields Missing");
    }
    else {

        $("#FPbtn").prop("disabled", true);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: " http://localhost:3000/api/user/forgotPass",
            data: JSON.stringify(data),
            dataType: 'json',
            timeout: 600000,
            success: function (data) {
                console.log("Reset Success");
                console.log(data);
            },
            error: function (e) {
                console.log("ERROR: ", e);
            }
        });

        $("#FPbtn").prop("disabled", false);
    }
}

function register(event) {
    event.preventDefault();

    // console.log("register clicked");

    var data = {}
    data["fname"] = $("#fname").val();
    data["lname"] = $("#lname").val();
    data["email"] = $("#email").val();
    data["userName"] = $("#userName").val();
    data["password"] = $("#psw").val();

    if (!data["email"] || !data["userName"] || !data["password"] || !data["password"] || !$("#psw").val()) {
        console.log("Fields Missing");
    }
    else if ($("#pswRepeat").val() != data["password"]) {
        console.log("Password not matching");
    }
    else {

        $("#registerbtn").prop("disabled", true);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: " http://localhost:3000/api/user/register",
            data: JSON.stringify(data),
            dataType: 'json',
            timeout: 600000,
            success: function (data) {
                console.log("DONE");
            },
            error: function (e) {
                console.log("ERROR: ", e);
            }
        });

        goLogin();
        $("#registerbtn").prop("disabled", false);
    }
}
