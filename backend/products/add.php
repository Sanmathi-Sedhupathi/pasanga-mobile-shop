<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$price = $data['price'];

$sql = "INSERT INTO products (name, price) VALUES ('$name', '$price')";

if ($conn->query($sql)) {
    echo json_encode(["message" => "Product added successfully."]);
} else {
    echo json_encode(["error" => "Failed to add product."]);
}
