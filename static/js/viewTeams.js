function fetchTeams() {
    $.ajax({
        type: 'POST',
        url: '../service_layer/viewTeams.php',
        dataType: 'json',
        success: (response) => {
            displayTeams(response.result);
        }
    })
}

function displayTeams(teams) {
    for (let i = 0; i < teams.length; i++) {
        const content = `<div class="col-md-5 portlet" id="${teams[i].ID}">
                            <div class="portlet-header">${teams[i].name}</div>
                            <div class="portlet-body">${teams[i].description}</div>
                            <button class="btn btn-primary" onclick="loadEmployeeForm(${teams[i].ID})">Add members</button>
                        </div>`
        $("#teams").append(content)
    }
    initialise();
}

function initialise() {
    $(".portlet")
        .addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
        .find(".portlet-header")
        .addClass("ui-widget-header ui-corner-all")
        .prepend("<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
    $(document).on('click', '.portlet-toggle', function () {
        const icon = $(this);
        icon.toggleClass("ui-icon-minusthick ui-icon-plusthick");
        icon.closest(".portlet").find(".portlet-content").toggle();
    });

}

$(document).ready(() => {
    fetchTeams();

});
function loadPerson(name, id){
    $("#username").val(name);

}
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
                $("#userHint").html(`<a href="javascript: loadPerson('${name}', ${response[0].ID})">+ ${name}</a>`);
            }
        })
    }
}


function loadEmployeeForm(teamId) {
    $("#teamID").val(teamId);
    $('#addEmployeeModal').modal('toggle')
}
