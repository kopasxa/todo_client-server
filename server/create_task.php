<?php
    require('db_connect.php');

    $sql = "
        INSERT INTO `task` (task_name, task_desc)
        VALUES ('". $_POST["task_name"] ."', '". $_POST["task_description"] ."')
    ";


    try {
        $conn->exec($sql);
        http_response_code(200);
    }
    catch (PDOException $e) {
        http_response_code(400);
    }
?>