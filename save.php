<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $device = $_POST["device"];
    $userAgent = $_POST["userAgent"];
    
    $data = "Name: $name, Device: $device, User-Agent: $userAgent\n";
    
    file_put_contents("names.txt", $data, FILE_APPEND);
    
    echo "Data saved successfully!";
} else {
    echo "Invalid request!";
}
?>
