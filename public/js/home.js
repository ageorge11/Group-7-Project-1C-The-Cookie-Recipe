
var currentUser = {};
var logHistory = {};


$(document).ready(function () {

    var user = JSON.parse(localStorage.getItem("user"));
    //console.log(user);
    if (user) {
        currentUser = user;
        setUserName(currentUser.user_name);

        displayCookies();

        logHistory = getLogHistory(user.user_id);
        // console.log("date time : ");
        //console.log(logHistory[0].logtime);
        var date = logHistory[1].logtime;
        // console.log(newDate(date));

        $("#lastLogin").html(toDate(date, 2));
        addlogHistory();

        $("#profname").val(currentUser.first_name);
        $("#prolname").val(currentUser.last_name);
        $("#prouserName").val(currentUser.user_name);
        $("#proemail").val(currentUser.email);

        $("#profname").prop('disabled', true);
        $("#prolname").prop('disabled', true);
        $("#prouserName").prop('disabled', true);
        $("#proemail").prop('disabled', true);


    }
    else {
        window.location.href = "index.html";
    }

    $('#profileModal').on('hide.bs.modal', function () {
        editUserCancel();
    });

});

function setUserName(userName) {
    $(".userName").html(userName);
}

function toDate(date, mode) {
    date = toLocalDate(date).toString();  
    var dateParts = date.split(" ");

    if (mode == 1) {
        var jsDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[3] + "";
        return jsDate

    } else if (mode == 2) {
        var jsDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[3] + " @ " + dateParts[4];
        return jsDate;
    }
    return date;
}

function toLocalDate(date) {
    var d = new Date(date);
    var offset = (new Date().getTimezoneOffset() / 60) * -1;
    var n = new Date(d.getTime() + offset);
    return n;
};

function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

function displayCookies() {
    var data = {};
    var cookies = {};

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: " http://localhost:3000/api/cookie/get",
        data: JSON.stringify(data),
        dataType: 'json',
        async: false,
        timeout: 600000,
        success: function (data) {
            cookies = data.cookies
        },
        error: function (e) {
            console.log("error : ", e)
        }
    });

    //console.log(cookies);

    cookies.forEach(function (cookie) {
        // console.log(cookie.recipe_name);
        //console.log(getUser(cookie.user_id).user_name);

        rate = getRating(cookie.recipe_id);
        likeVal = rate.like;
        dislikeVal = rate.dislike;

        $(".cookiesList").append(getCookieDiv(cookie, getUser(cookie.user_id).user_name, likeVal, dislikeVal));

    })
}

function getCookieDiv(cookie, userName, like, dislike) {

    var date = toDate(cookie.post_date, 1);

    return " <div class=\"card cookie\"> "
        + " <div class=\"card-header font-weight-bold H2\"> " + cookie.recipe_name + " </div> "
        + " <div class=\"card-body\"> "
        + " <h5 class=\"card-title \"> Description </h5> "
        + " <p class=\"card-text cookieDesc\"> " + cookie.recipe_desc + " </p> "
        + " <div class=\"card-footer\"> "
        + " <div class=\"left\"> "
        + " <img id =\"likebtn\" class=\"mr-2 ml-2\" src=\"./img/like.png\" onclick=\"like( " + cookie.recipe_id + " , this )\"/><span class=\"blockquote\" id =\"likeVal\">" + like + "</span> "
        + " <img id =\"dislikebtn\" class=\"mr-2 ml-2\" src=\"./img/dislike.png\" onclick=\"dislike( " + cookie.recipe_id + " , this )\"/><span class=\"blockquote\" id =\"dislikeVal\">" + dislike + "</span> "
        + " </div> "
        + " <div class=\"right\"> "
        + " <span  class=\"text-muted\"> Created by <span  class=\"text-monospace font-weight-bold font-italic\"> " + userName + " </span> On <span class=\"text-monospace font-weight-bold font-italic\"> " + date + " </span> </span> "
        + " </div> "
        + " </div> "
        + " </div> "
        + " </div> "
}

function getUser(userID) {

    var data = {};
    data["user_id"] = userID;
    var user = {};

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: " http://localhost:3000/api/user",
        data: JSON.stringify(data),
        dataType: 'json',
        async: false,
        timeout: 600000,
        success: function (data) {
            // console.log(data.user);
            user = data.user;
        },
        error: function (e) {
            console.log("error : ", e);
        }
    });

    return user;
}

function addRecipes(event) {

    event.preventDefault();
    //console.log(currentUser.user_id);


    var data = {}
    data["recipe_name"] = $("#recipe_name").val();
    data["recipe_desc"] = $("#recipe_desc").val();
    data["user_id"] = currentUser.user_id;


    if (!data["recipe_name"] || !data["recipe_desc"]) {
        console.log("Fields Missing");
    }
    else {

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: " http://localhost:3000/api/cookie/add",
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

    }

    window.location.href = "home.html";
}

function getLogHistory(userID) {

    var data = {};
    data["user_id"] = userID;
    var history = {};

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: " http://localhost:3000/api/user/logHistory",
        data: JSON.stringify(data),
        dataType: 'json',
        async: false,
        timeout: 600000,
        success: function (data) {
            // console.log(data);
            history = data.history;
        },
        error: function (e) {
            console.log("error : ", e);
        }
    });

    return history;
}

function addlogHistory() {

    logHistory.forEach(function (history) {
        //console.log(date);
        var div = "<div> " + toDate(history.logtime, 2) + "</div><hr/>";
        $("#logHistoryBody").append(div);
    });

}

function editUser() {
    $('#updateUser').show();
    $('#editBtn').hide();
    $('#editCancelBtn').show();

    $("#profname").prop('disabled', false);
    $("#prolname").prop('disabled', false);
    $("#prouserName").prop('disabled', false);
    $("#proemail").prop('disabled', false);


}

function editUserCancel() {
    $('#updateUser').hide();
    $('#editBtn').show();
    $('#editCancelBtn').hide();

    $("#profname").prop('disabled', true);
    $("#prolname").prop('disabled', true);
    $("#prouserName").prop('disabled', true);
    $("#proemail").prop('disabled', true);

}


function updateUserInfo(event) {
    event.preventDefault();
    //console.log(event);

    var data = {}
    data["first_name"] = $("#profname").val();
    data["last_name"] = $("#prolname").val();
    data["user_name"] = $("#prouserName").val();
    data["email"] = $("#proemail").val();
    data["user_id"] = currentUser.user_id;


    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: " http://localhost:3000/api/user/update",
        data: JSON.stringify(data),
        dataType: 'json',
        async: false,
        timeout: 600000,
        success: function (data) {
            console.log("User Updated");
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });

    $('#profileModal').modal('toggle');

    user = getUser(currentUser.user_id);
    currentUser = user;
    setUserName(currentUser.user_name);

}

function like(recipe_id, div) {
    if ($(div).hasClass("clicked")) {
        var likeVal = $(div).siblings("#likeVal").text();
        $(div).siblings("#likeVal").text(parseInt(likeVal) - 1);
        $(div).removeClass("clicked");
    }
    else {
        if ($(div).siblings("#dislikebtn").hasClass("clickedp")) {
            var disLikeVal = $(div).siblings("#dislikeVal").text();
            $(div).siblings("#dislikeVal").text(parseInt(disLikeVal) - 1);
            $(div).siblings("#dislikebtn").removeClass("clickedp");
        }
        var likeVal = $(div).siblings("#likeVal").text();
        $(div).siblings("#likeVal").text(parseInt(likeVal) + 1);
        $(div).addClass("clicked");
    }
}



function dislike(recipe_id, div) {
    if ($(div).hasClass("clickedp")) {
        var disLikeVal = $(div).siblings("#dislikeVal").text();
        $(div).siblings("#dislikeVal").text(parseInt(disLikeVal) - 1);
        $(div).removeClass("clickedp");
    }
    else {
        if ($(div).siblings("#likebtn").hasClass("clicked")) {
            var likeVal = $(div).siblings("#likeVal").text();
            $(div).siblings("#likeVal").text(parseInt(likeVal) - 1);
            $(div).siblings("#likebtn").removeClass("clicked");
        }
        var disLikeVal = $(div).siblings("#dislikeVal").text();
        $(div).siblings("#dislikeVal").text(parseInt(disLikeVal) + 1);
        $(div).addClass("clickedp");
    }
}

function getRating(recipe_id) {

    var data = {};
    data["recipe_id"] = recipe_id;

    var rate = {};

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: " http://localhost:3000/api/cookie/getRating",
        data: JSON.stringify(data),
        dataType: 'json',
        async: false,
        timeout: 600000,
        success: function (data) {
            //console.log(data.rating);
            rate = data.rating;
            //user = data.user;
        },
        error: function (e) {
            console.log("error : ", e);
        }
    });

    return rate;
}