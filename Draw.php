<?php
	$link = mysql_connect("localhost","root","root");

	mysql_select_db("SenchaDraw",$link);

	$query = "insert into Drawing values(NULL, " .$_REQUEST["to"]. ", '".$_REQUEST["echoes"]."')";
	
	$result = mysql_query($query);

	if(mysql_affected_rows() > 0)
		$output = array("success" => true);
	else
		$output = array("success" => false);

	mysql_close();

	header("Content-Type: application/x-json");
	echo json_encode($output);
?>