<?php
/**
 * account.php: Endpoint to manage user account
 */
require('../database_layer/databaseInteraction.php');
$database = new Database();
session_start();
/**
 * By making a POST request with "status" in its body, this will send back the login status
 */
if (isset($_POST['status'])) {
    if (isset($_SESSION['email'])) {
        echo json_encode(["logged_in" => true, "details" => $_SESSION]);
    } else echo json_encode(["logged_in" => false]);
}
