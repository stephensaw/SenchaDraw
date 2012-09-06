<?php
	$link = mysql_connect("localhost","root","root");

	mysql_select_db("SenchaDraw",$link);

	$query = "select * from Drawing where userid = " .$_REQUEST["to"]. " order by id desc limit 1";
	
	$result = mysql_query($query);

	if(mysql_affected_rows() > 0) {
		$row = mysql_fetch_array($result);
		$output = array("success" => true, "echoes" => $row["echoes"]);
	}
	else
		$output = array("success" => false, "message" => mysql_error(), "query" => $query);

	mysql_close();

	header("Content-Type: application/x-json");
	echo json_encode($output);
?>