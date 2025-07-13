<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once("../config/db.php");

$sql = "SELECT * FROM products";
$result = $conn->query($sql);

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
