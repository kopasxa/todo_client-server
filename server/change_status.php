<?php
    require('db_connect.php');
    $tmp = $_POST["task_check"] == "on" ? 1 : 0;
    $sql = "UPDATE `task` SET `isCompleted`='".$tmp."' WHERE `id`=".$_POST["id"];

    try {
        $conn->query($sql);

        http_response_code(200);
    } catch(PDOException $e) {
        echo $e;
        http_response_code(400);
    } 
?>