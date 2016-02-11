<?php

	session_start();

	require_once '../db.php';

	$_SESSION = array();
	$_SESSION['name'] = $_POST['name'];
	$_SESSION['pass'] = $_POST['pass'];

	// остаем данные пользователя из базы
	$sql = 'SELECT * FROM auth';
	$res = $DB->query($sql);
	if($res -> rowCount() > 0){
		$users = array();
		while($row = $res -> fetch()){
			$users[] = $row;
		}
	}

		foreach($users as $value){
			if($_SESSION['name'] == $value['name'] and $_SESSION['pass'] == $value['pass']){
				header('location:../my_work.html');
			} else {
				header('location:../lk.html');
			};


		}



	//

