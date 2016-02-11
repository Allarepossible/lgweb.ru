<?php
	session_start();
	require_once '../db.php';
	$data = array();
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
			if($_SESSION['name'] !== $value['name'] or $_SESSION['pass'] !== $value['pass'])
				exit("Ошибка");

}

	exit('ok');

 