<?php
	$data = array();


	if(empty($_POST['name']) or empty($_POST['url']) or empty($_POST['description'])) {
		$data['mes'] = 'Поля не заполнены';
	} else {
		$data['mes'] = 'ok';
	};


	header("Content-Type: applicatiion/json");
	echo json_encode($data);




 