<?php
$riddle_file = "riddles.txt";
$riddles = explode("\n", file_get_contents($riddle_file));
$data;
$riddle_count = 0;
$answer_count = 1;
$riddle_number = 1;
$count = 0;

foreach ($riddles as $riddle) {
	$count++;
}

for ($i = 0; $i < $count; $i++) {
	$data[] = array (
		"riddle" => $riddles[$riddle_count],
		"answer" => $riddles[$answer_count],
		"number" => $riddle_number,
		
	);
	$riddle_count += 2;
	$answer_count += 2;
	$riddle_number++;
}
header("Content-type: application/json");
print json_encode($data);

?>