<?php
	if(!empty($_POST))
	{
		$field = $_POST['field'];
		if($field=="shop"||$field=="category"||$field=="item"||$field=="unit"||$field=="price_based_on")
		{
			$query = "SELECT DISTINCT $field FROM grocery";
			$result = dbQuery($query);

			$fieldArr=array();
			while($row = mysqli_fetch_array($result))
				array_push($fieldArr, array($field => $row[$field]));

			echo json_encode(array('fieldArr' => $fieldArr));
			exit;
		}
	}

	function dbQuery($query)
	{
		$dbc =	mysqli_connect('localhost','root','atlantis2016','itemDB')
					or die("Error Connecting to Database");
		$result = mysqli_query($dbc,$query)
					or die("Error Querying Database");
		return $result;
	}
?>