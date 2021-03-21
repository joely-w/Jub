function fetchUserData(status) {
    console.log("fetch");
    $.ajax({
        type: 'POST',
        url: '../service_layer/account.php',
        data: {
            status,
        },
        dataType: 'json',
        success: (response) => {
            if (response.success) {
                console.log(response);
                return response;
            }
            return false;
        }
    })
}

console.log("link");
fetchUserData('status');
