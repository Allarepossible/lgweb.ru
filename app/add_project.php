<?php
	$name = $_POST;
	$data = array();

	if ($name == '') {
		$data['status'] = 'error';
		$data['text'] = ' full name';
	}else{
		$data['status'] = 'ok';
		$data['text'] = 'you is ok';		
	}

	header('Content-Type: application.json');
	echo json_decode($data);
	exit;

?>
