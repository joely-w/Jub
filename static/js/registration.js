function registerUser(first_name, last_name, email, password) {
    $.ajax({
        type: 'POST',
        url: '/service_layer/register.php',
        data: {
            first_name, last_name, email, password,
        },
        dataType: 'json',
        success: (response) => {
            if (response.success) {
                confirmRegistration();
            }
        }
    })
}
function confirmRegistration(){
    $("#form").fadeOut(1200);
    $("#py-3").text("Successfully registered!");
    $("#details").html("You can now <a href='index.html'> access </a> your organisations Jub.")
}
function loginUser(email, password){
    $.ajax({
        type: 'POST',
        url: '/service_layer/login.php',
        data: {
            email, password
        },
        dataType: 'json',
        success: (response) => {
            if (response.success) {
                window.location = '/'
            }
        }
    })
}

