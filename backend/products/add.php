<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Include DB connection
include_once("../config/db.php");

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode JSON input
    $data = json_decode(file_get_contents("php://input"), true);

    // Basic validation
    if (isset($data['name'], $data['price'])) {
        $name = $data['name'];
        $price = $data['price'];

        // Use prepared statement
        $stmt = $conn->prepare("INSERT INTO products (name, price) VALUES (?, ?)");
        $stmt->bind_param("sd", $name, $price);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Product added successfully."]);
        } else {
            echo json_encode(["error" => "Failed to add product."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Missing required fields."]);
    }
} else {
    echo json_encode(["error" => "Invalid request method."]);
}
