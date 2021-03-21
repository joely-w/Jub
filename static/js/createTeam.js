
function showHint(str) {
    if (str.length === 0) {
        window.document.getElementById("userHint").innerHTML = "";

    } else {
        $.ajax({
            type: 'GET',
            url: '/service_layer/getHint.php?q=' + str,
            dataType: 'json',
            success: (response) => {
                console.log(response);
               // var user = JSON.parse(response);
                const name = response[0].firstName + " " + response[0].lastName;
                window.document.getElementById("userHint").innerHTML = name;
                console.log(response[0].firstName);
            }
        })
  }
}

function createTeam(name, description) {
    $.ajax({
        type: 'POST',
        url: '/service_layer/createTeam.php',
        data: {
            name, description,
        },
        dataType: 'json',
        success: (response) => {
            if (response.success) {
                confirmTeamCreation();
            }
        }
    })
}

function confirmTeamCreation(){
    $("#form").fadeOut(1200);
    $("#py-3").text("Successfully created!");
    $("#details").text("You can now view your new team.")
}
