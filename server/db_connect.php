<?php
$servername = "localhost";
$username = "root";
$password = "root";


try {
    $conn = new PDO("mysql:host=$servername;dbname=todo_app", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(400);
}

$sql = "
        CREATE TABLE `task` (
            `id` int(11) NOT NULL,
            `task_name` varchar(255) NOT NULL,
            `task_desc` text NOT NULL,
            `isCompleted` tinyint(1) NOT NULL DEFAULT '0'
        );
        
        ALTER TABLE `task`
            ADD PRIMARY KEY (`id`);
            
        ALTER TABLE `task`
            MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
    ";


try {
    $conn->prepare($sql)->execute();
}
catch (PDOException $e) {
    //echo $e;
}