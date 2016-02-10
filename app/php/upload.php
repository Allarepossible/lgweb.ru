<?php
	namespace abeautifulsite;
	use Exception;
	require_once '../config.php';
	require_once '../db.php';
	require_once '../libs/SimpleImage/src/abeautifulsite/SimpleImage.php';

	if (empty($_FILES) or empty($_POST))
		exit('Нет данных');

	// ReCaptcha
	if(empty($_POST['g-recaptcha-response']))
		exit('Где рекапча?');
	$recaptcha = $_POST['g-recaptcha-response'];
	$url = $google_url."?secret=".$private_key."&response=".$recaptcha."&remoteip=".$ip;
	$google_res = file_get_contents($url);
	$google_res = json_decode($google_res, true);
	if($google_res['success'] != 1)
		exit('Не верна гугла капча');



	$file  = $_FILES['photo'];

	//  Определяем формат
	if($file['type'] != 'image/gif' and $file['type'] != 'image/jpeg' and $file['type'] != 'image/png')
		exit('Не верный формат');

	//Определяем Mime тип
	 $imageinfo = getimagesize($file['tmp_name']);
	 if($imageinfo['mime'] != 'image/gif' and $imageinfo['mime'] != 'image/jpeg' and $imageinfo['mime'] != 'image/png')
	 	exit('Не верный mime тип!');

	//  Проверка на размер файла
	if($file['size'] == 0 or $file['size'] > 2097152)
		exit('Загрузите файл нужного размера!');

	//  Проверяем есть ли папка для файлов
	if (!file_exists('../files')) {
		mkdir('../files/', 777);
	};
	// Выводим данные файла
	//print_r($_FILES);


	//  Задаем уникальное название для файла
	$type = strtolower(strrchr($file['name'], '.'));
	//echo $type;
	$filename = md5(uniqid(rand(10000, 99999)));
	$filename_copy = $filename.'_copy';

	//  Загружаем файл в папку
	$file_dist = $_SERVER['DOCUMENT_ROOT'].'/files/'.$filename.$type;
	$file_copy_dist = $_SERVER['DOCUMENT_ROOT'].'/files/'.$filename_copy.$type;
	if (!move_uploaded_file($file['tmp_name'], $file_dist))
		exit('Файл не загружен');

	// file simple
	$img = new SimpleImage();
	$img->load($file_dist)->resize(450, 450)->save($file_copy_dist);


	//	// Добавление данных в базу.
	if(!empty($_POST)){
		$data = array();
		foreach($_POST as $key => $value){
			$data[$key] = strip_tags(trim($value));
		}

		$data['photo'] = $file_dist;

		// Простой запрос
		// $sql = 'INSERT INTO `users`(
		// 			`name`,
		// 			`email`,
		// 			`photo`,
		// 			`date`
		// 		  ) VALUES (
		// 			"'.$data['name'].'",
		// 			"'.$data['email'].'",
		// 			"'.$data['photo'].'",
		// 			NOW()
		// 		  )';
		// $res = $DB -> query($sql);
		// Именнованные плейсхолдеры
		$ar = array( 'name' => $data['name'], 'email' => $data['email'], 'photo' => $data['photo']);
		//print_r($ar);
		$sql = 'INSERT INTO `users` (`name`, `email`, `photo`, `date`) VALUES (:name, :email, :photo, NOW())';

		$res = $DB->prepare($sql);
		$res->execute($ar);
		//echo $sql;
		if(!$res)
			exit('запрос не прошел');
}
	exit('Все отлично');