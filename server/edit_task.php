<?php
    require('db_connect.php');
    $sql = "UPDATE `task` SET `task_name`='".$_POST["edit_task_name"]."', `task_desc`='".$_POST["edit_task_desc"]."' WHERE `id`=".$_POST["id"];

    try {
        $conn->query($sql);

        http_response_code(200);
    } catch(PDOException $e) {
        http_response_code(400);
    } 
?>