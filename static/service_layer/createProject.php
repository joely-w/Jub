<?php
/**
 * createTeam.php:
 * Script to create new Team, will return a JSON object with feedback (success or error)
 */
require('../database_layer/databaseInteraction.php');
session_start();
/**
 * @param string $name
 * @param string $description
 * @return boolean Whether validation has been successful
 */
function validateForm($name, $description)
{
    // Length check for name
    if (strlen($name) > 75 ) {
        echo(json_encode(["error" => "Name is too long!"]));
        return false;
        // Format check for description
    } elseif (strlen($description) > 256 ) {

        echo(json_encode(["error" => "Description is too long!"]));
        return false;
    }
    return true;
}



/**
 * Register user in database
 * @param $name string
 * @param $description string
 * @param $managerID int
 * @param $employeeIDs integer array
 * @return numeric ID of created team
 * @throws Exception
 */
function createTeam($name, $description)
{
    $database = new Database();
    return $database->Insert('INSERT INTO Teams(name, description) VALUES(?,?)',[$name, $description]);
}

// Declare values
$name = $_POST['name'];
$description = $_POST['description'];

// Attempt to register user
if (validateForm($name, $description)) {
    try {
        $result = createTeam($name, $description);
        echo json_encode(["success" => true, "id" => $result]);
    } catch (Exception $e) {
        echo $e;
    }
}
