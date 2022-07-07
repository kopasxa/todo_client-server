<?php
    require('db_connect.php');

    try {
        $stmt = $conn->prepare("INSERT INTO `task` (task_name, task_desc) VALUES (?, ?)");
        $stmt->execute([$_POST["task_name"], $_POST["task_description"]]);
        http_response_code(200);
    }
    catch (PDOException $e) {
        http_response_code(400);
    }
?>