<?php
    require('db_connect.php');

    try {
        $stmt = $conn->prepare("UPDATE `task` SET `task_name`= ?, `task_desc`= ? WHERE `id`= ?");
        $stmt->execute([$_POST["edit_task_name"], $_POST["edit_task_desc"], $_POST["id"]]);

        http_response_code(200);
    } catch(PDOException $e) {
        http_response_code(400);
    } 
?>