<?php
    //Подключение к базе
    try {
        $DB = new PDO("mysql:host=localhost;dbname=lgweb", "root", "");
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }
