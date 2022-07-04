<?php
    require('db_connect.php');

    $sql = "DELETE FROM `task` WHERE `id`=".$_POST["id"].";";

    try {
        $conn->exec($sql);

        http_response_code(200);
    } catch(PDOException $e) {
        http_response_code(400);
    } 
?>