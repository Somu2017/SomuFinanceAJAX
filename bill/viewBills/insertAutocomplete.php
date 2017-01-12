<?php
	session_id("reloadBill");
	session_start();
	if(!empty($_POST))
	{
		$field = $_POST['field'];
		if($field=="exp_category"||$field=="shop"||$field=="mode_of_payment"||$field=="account"||$field="type")
		{
			$billDate = $_SESSION['billDate'];
			$datePHP = date("My",strtotime($billDate));
			$billIndexTableName = "MonthlyBillIndex_".$datePHP;

			$query = "SELECT DISTINCT $field FROM $billIndexTableName";
			$result = dbQuery($query);

			$fieldArr=array();
			while($row = mysqli_fetch_array($result))
				if($row[$field]!=null)
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