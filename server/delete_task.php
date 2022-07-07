<?php
    require('db_connect.php');
    
    try {
        $stmt = $conn->prepare("DELETE FROM `task` WHERE `id`= ?");
        $stmt->execute([$_POST["id"]]);

        http_response_code(200);
    } catch(PDOException $e) {
        http_response_code(400);
    } 
?>