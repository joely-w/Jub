function loginUser(email, password) {
    $.ajax({
        type: 'POST',
        url: '/service_layer/login.php',
        data: {
            email, password
        },
        dataType: 'json',
        success: (response) => {
            if (response.success) {
                $("#form").html(`<h4 class="pb-4">Login successful!</h4>
<p>Click <a href="javascript:window.location.reload(${document.referrer})">here</a> to continue with your session</p>`)
            }
        }
    })
}

/**
 * response.logged_in == true
 * response.details == account details
 * @param callback
 */
function checkLogin(callback) {
    $.ajax({
        type: 'POST',
        url: '/service_layer/account.php',
        data: {
            status: true
        },
        dataType: 'json',
        success: (response) => {
            callback(response);
        }
    })
}


checkLogin((response) => {
    if (!response.logged_in) {
        $(".login_content").html(`<div id="login_container"><iframe scrolling="no" src='signin.html#form'></iframe></div>`);
        $(".login").hide();
        $("#profile").hide();
    } else {
        $(".non-login").hide();
        $("#profile_name").text(`${response.details.firstName} ${response.details.lastName}`)
    }
});
function logOut(){
    $.ajax({
        type: 'GET',
        url: '/service_layer/logout.php',
        dataType: 'json',
        success: (response) => {
            if (response.success) {
                window.location.href('/index.html');
            }
        }
    })
}
$("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
    $(this).toggleClass("active");
});


