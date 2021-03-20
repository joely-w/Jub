<?php
/**
 * login.php:
 * Script to login a user, and return session data
 */
require('../database_layer/databaseInteraction.php');

function getSalt($email)
{
    $database = new Database();
    try {
        return $database->Select('SELECT salt FROM Users WHERE emailAddress = ?', [$email])[0];
    } catch (Exception $e) {
    }
}

$email = $_POST['email'];
$password = $_POST['password'];
echo json_encode(["salt" => getSalt($email)]);

