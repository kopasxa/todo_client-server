<?php
    require('db_connect.php');
    $tmp = $_POST["task_check"] == "on" ? 1 : 0;

    try {
        $stmt = $conn->prepare("UPDATE `task` SET `isCompleted`= ? WHERE `id`= ?");
        $stmt->execute([$tmp, $_POST["id"]]);

        http_response_code(200);
    } catch(PDOException $e) {
        echo $e;
        http_response_code(400);
    } 
?>