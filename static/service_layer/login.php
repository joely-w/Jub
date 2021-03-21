<?php
/**
 * login.php:
 * Script to login a user, and return session data
 */
require('../database_layer/databaseInteraction.php');
$database = new Database();
session_start();

function getSalt($email, $connection)
{
    try {
        $result = $connection->Select('SELECT salt FROM Users WHERE emailAddress = ?', [$email]);
        if (count($result) > 0) {
            return $result[0]["salt"];
        } else return false;
    } catch (Exception $e) {
        return false;
    }
}

function authenticateUser($email, $password, $connection)
{
    $result = $connection->Select('SELECT * FROM Users WHERE emailAddress = ? AND passwordHash = ?', [$email, $password]);
    if (count($result) > 0) {
        return $result[0];
    } else return false;
}

$email = $_POST['email'];
$password = $_POST['password'];
$salt = getSalt($email, $database);
$password = hash('sha256', $password . $salt);
$login = authenticateUser($email, $password, $database);
if ($login) {
    $_SESSION['email'] = $login["emailAddress"];
    $_SESSION['firstName'] = $login["firstName"];
    $_SESSION['lastName'] = $login["lastName"];
    $_SESSION['ID'] = $login["ID"];
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}

