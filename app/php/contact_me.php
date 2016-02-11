<?php
	require_once '../config.php';
	$data = array();


	if(empty($_POST['name']) or empty($_POST['email']) or empty($_POST['message']) or empty($_POST['g-recaptcha-response'])) {
		$data['mes'] = 'Поля не заполнены или не введена Recaptcha!';
		$data['st'] = 'error';
	} else {
		$recaptcha = $_POST['g-recaptcha-response'];
		$url = $google_url."?secret=".$private_key."&response=".$recaptcha."&remoteip=".$ip;
		$google_res = file_get_contents($url);
		$google_res = json_decode($google_res, true);
		
		if($google_res['success'] != 1)
			$data['mes'] = 'Не верна гугла капча';
		$data['st']	= 'ok';
		$data['mes'] = 'Сообщение успешно отправлено, мы обязательно с Вами свяжемся.';
	};

	header("Content-Type: applicatiion/json");
	echo json_encode($data);





