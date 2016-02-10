<?

	require_once 'config.php';

	if(empty($_POST['data']))
		exit('Все плохо');


		$data = json_decode($_POST['data'], true);
		
		if(empty($data['name']) or empty($data['email']) or empty($data['message']))
			exit('Нет обязательных  данных');		
		
		foreach ($data as $key => $value) {
			$data[$key] = strip_tags(trim($value));
			$body .= '<p><strong>'.$key.'</strong>'.$value.'</p>';
		}


		$result = sendEmail($data['name'], $data['email'], 'Theme', $body);



		print_r($result);


