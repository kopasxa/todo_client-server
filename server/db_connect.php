<?php
$servername = "localhost";
$username = "root";
$password = "root";


try {
    $conn = new PDO("mysql:host=$servername;dbname=todo_app", $username, $password);

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e) {
    http_response_code(400);
}