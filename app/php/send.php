<?php
	if(!empty($_POST['name']) and !empty($_POST['email']) and !empty($_POST['message']) and !empty($_POST['g-recaptcha-response'])){

	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];

	$to = "lisynok@yandex.ru"; 
	$headers = "Content-type: text/plain; charset = utf-8";
	$subject = "Сообщение с сайта lgweb.ru";
	$message ="
	ЗАЯВКА:\n 
	E-mail: $email \n 
	Имя: $name \n 
	Сообщение: $message";

	$sub = 'Отправка данных с сайта lgweb.ru';

	$send = mail($to, $subject, $message, $headers);

	exit ('Сообщение отправлено!');

	} else {
		exit ('Сообщение не отправлено!');

};

