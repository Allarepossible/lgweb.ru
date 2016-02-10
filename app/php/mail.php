<?php

	function sendEmail($name, $email, $sub, $body){
	require_once '../libs/phpmailer/PHPMailerAutoload.php';

	$mail = new PHPMailer;

	
	$mail->setFrom($email, $name);
	$mail->addAddress('joe@example.net', 'Joe User');     


	$mail->isHTML(true);                                  

	$mail->Subject = $sub;
	$mail->Body    = $body;
	$mail->AltBody = $body;

	if(!$mail->send()) 
	    echo 'Message could not be sent.';
	else
		echo 'Message has been sent';

	}

