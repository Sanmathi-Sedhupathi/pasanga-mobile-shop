<?php
// ✅ Allow CORS from your frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// ✅ Then connect to DB
include_once("./../config/db.php");




$category = isset($_GET['category']) ? $conn->real_escape_string($_GET['category']) : '';

$sql = "SELECT id, name, content, image, actual_price AS actualPrice, price, 
        ((actual_price - price) / actual_price) * 100 AS discount 
        FROM products";

if ($category !== '') {
    $sql .= " WHERE category = '$category'";
}

$result = $conn->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
    $row['discount'] = round($row['discount']);
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
