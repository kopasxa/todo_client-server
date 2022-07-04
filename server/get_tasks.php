<?php
require('db_connect.php');

$sql = "
        SELECT * FROM `task`;
    ";

$stmt = $conn->prepare($sql);
$stmt->execute();

$result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

echo json_encode($stmt->fetchAll());