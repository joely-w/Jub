<?php
/**
 * Script to log a user out via a GET request
 */
session_start();
if (isset($_GET)) {
    session_destroy();
    echo json_encode(["success" => true]);
}
