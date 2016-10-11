<?php

$riddle_file = "riddles.txt";
$riddles = explode("\n", file_get_contents($riddle_file));
$data;
$riddle_count = 0;
$answer_count = 0;
$riddle_number = 1;
foreach ($riddles as $riddle) {
	$data[] = array (
		"riddle" => $riddle[$riddle_count],
		"answer" => $riddle[$answer_count],
		"number" => $riddle_number,
		
	);
	$riddle_count += 2;
	$answer_count += 2;
	$riddle_number++;
}
header("Content-type: application/json");
print json_encode($data);

?>