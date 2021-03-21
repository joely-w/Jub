<?Php

require('../database_layer/databaseInteraction.php');
$database = new Database();
session_start();


if ($_SESSION["ID"]) {
    $userId = $_SESSION["ID"];
    try {

        $result = $database->Select('SELECT * FROM Teams t INNER JOIN Managing m ON t.ID = m.teamId WHERE m.userId = ?', [$userId]);

        if (count($result) > 0) {
            echo (json_encode(["result" => $result]));
        }  else{
            echo (json_encode(["error" => "No Teams Found"]));
        }

    } catch (Exception $e) {
        echo (json_encode(["error" => $e]));
    }

}
else{
    echo (json_encode(["error" => "Not Logged in"]));
}
