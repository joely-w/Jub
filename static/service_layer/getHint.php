<?php
require('../database_layer/databaseInteraction.php');
$database = new Database();
session_start();
$hint = "";
$q = $_REQUEST["q"];

if ($q !== "") {

    try {
        $name = $q."%";

        $result = $database->Select('SELECT * FROM Users WHERE firstName like ?', [$name]);

        if (count($result) > 0) {
            echo (json_encode($result));
        }  else{
            $err = array("No suggestion");
            echo (json_encode($err));
        }
        
    } catch (Exception $e) {
        echo (json_encode($e));
    }

}