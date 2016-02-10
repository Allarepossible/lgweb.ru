<?php
    //Подключение к базе
    try {
        $DB = new PDO("mysql:host=localhost;dbname=cm47485_lgweb", "root", "Amur1076703");
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }
