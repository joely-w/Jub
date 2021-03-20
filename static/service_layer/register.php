<?php
/**
 * register.php:
 * Script to register a user, will return a JSON object with feedback (success or error)
 */
require('../database_layer/databaseInteraction.php');
/**
 * @param string $first_name
 * @param string $last_name
 * @param string $email
 * @return boolean Whether validation has been successful
 */
function validateForm($first_name, $last_name, $email)
{
    // Length check for first and last name
    if (strlen($first_name) > 35 || strlen($last_name) > 35) {
        echo(json_encode(["error" => "Name is too long!"]));
        return false;
        // Format check for email
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo(json_encode(["error" => "Email is invalid!"]));
        return false;
        // Length check for email
    } elseif (strlen($email) > 254) {
        echo(json_encode(["error" => "Email is too long!"]));
        return false;
    }
    return true;
}

/**
 * @param numeric $length - Length of random string
 * @return string Random salt
 */
function generateSalt($length)
{
    return substr(str_shuffle("0123456789abcdefghijklmnopqrstvwxyzABCDEFGHIJKLMNOPQRSTVWXYZ"), 0, $length);
}

/**
 * Register user in database
 * @param $first_name string First name
 * @param $last_name string Last name
 * @param $email string Email address
 * @param $password string Plaintext password
 * @param $salt string Password salt
 * @return numeric ID of registered user
 * @throws Exception
 */
function registerUser($first_name, $last_name, $email, $password, $salt)
{
    $database = new Database();
    return $database->Insert('INSERT INTO Users(firstName, lastName, emailAddress, passwordHash, salt) VALUES(?,?,?,?,?)',
        [$first_name, $last_name, $email, hash('sha256', $password . $salt), $salt]);
}

// Declare values
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$password = $_POST['password'];
$salt = generateSalt(6);

// Attempt to register user
if (validateForm($first_name, $last_name, $email)) {
    try {
        $result = registerUser($first_name, $last_name, $email, $password, $salt);
        echo json_encode(["success" => true, "id" => $result]);
    } catch (Exception $e) {
        echo $e;
    }
}
