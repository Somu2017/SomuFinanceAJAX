<?php
	ini_set('display_errors', '1');
	error_reporting(E_ALL);

	ob_start();

	session_id("reloadBill");
	session_start();

	if(!empty($_POST)&&($_POST['action']=='edit'))
	{
		foreach ($_POST['selected'] as $bill_no) 
		{
			$_SESSION['bill_no'] = $bill_no;
			break;
		}
		header("Location: ../oldBill/");
		exit;
	}

	if(!empty($_POST)&&($_POST['action']=='confirmDelete')&&!empty($_SESSION['billDate'])) // Deletes an item from the DB
	{
		$billDate = $_SESSION['billDate'];
		$datePHP = date("My",strtotime($billDate));
		$billsTableName = "Bills_".$datePHP;
		$billIndexTableName = "MonthlyBillIndex_".$datePHP;

		foreach ($_POST['selected'] as $delete_id) 
		{
			$query = "DELETE FROM $billsTableName WHERE bill_no = $delete_id";
			dbQuery($query);

			$query = "DELETE FROM $billIndexTableName WHERE bill_no = $delete_id";
			dbQuery($query);
		}
	}

	if(!empty($_GET)&&$_GET['action']=="getBill")
	{
		$billDate = $_SESSION['billDate'];
		$datePHP = date("My",strtotime($billDate));
		$billIndexTableName = "MonthlyBillIndex_".$datePHP;

		$query1 = "SELECT * FROM $billIndexTableName ORDER BY shopping_date ASC, bill_no ASC";
		$result1 = dbQuery($query1);

		$rowArr = array();
		$slNo=1;
		while($row = mysqli_fetch_array($result1))
		{
			$bill_no = $row['bill_no'];
			$type = $row['type'];
			$exp_category = $row['exp_category'];
			$shopping_date = $row['shopping_date'];
			$shop = $row['shop'];
			$description = $row['description'];
			$description = htmlspecialchars_decode($description, ENT_QUOTES);
			$total_amount = $row['total_amount'];
			$paid = $row['paid'];
			$due = $row['due'];
			$mop = $row['mode_of_payment'];
			$account = $row['account'];

			array_push($rowArr, array('bill_no' => $bill_no, 'slNo' => $slNo, 'type' => $type, 'exp_category' => $exp_category, 'shopping_date' => $shopping_date, 'shop' => $shop, 'description' => $description, 'total_amount' => $total_amount, 'paid' => $paid, 'due' => $due, 'mop' => $mop, 'account' => $account));

			$slNo++;
		}
		echo json_encode(array('rowArr' => $rowArr));
		exit;
	}


	if(!empty($_POST)&&$_POST['action']=='submitSearch')	// Provides Searching facility on the DB records.
	{
		$rowArr=array();

		$billDate = $_SESSION['billDate'];
		$datePHP = date("My",strtotime($billDate));
		$billIndexTableName = "MonthlyBillIndex_".$datePHP;

		$field = $_POST['field'];
		$criteria = $_POST['criteria'];
		if(!empty($_POST['criteria2']))
			$criteria2=$_POST['criteria2'];

		if($field=='mode_of_payment')
			$query = "SELECT * FROM $billIndexTableName WHERE (mode_of_payment='$criteria' AND account='$criteria2') ORDER BY shopping_date ASC, bill_no ASC";
		else
			$query = "SELECT * FROM $billIndexTableName WHERE ($field='$criteria') ORDER BY shopping_date ASC, bill_no ASC";
		$result = dbQuery($query);

		$slNo=1;
		while($row = mysqli_fetch_array($result))
		{
			$bill_no = $row['bill_no'];
			$type = $row['type'];
			$exp_category = $row['exp_category'];
			$shopping_date = $row['shopping_date'];
			$shop = $row['shop'];
			$description = $row['description'];
			$description = htmlspecialchars_decode($description, ENT_QUOTES);
			$total_amount = $row['total_amount'];
			$paid = $row['paid'];
			$due = $row['due'];
			$mop = $row['mode_of_payment'];
			$account = $row['account'];

			array_push($rowArr, array('bill_no' => $bill_no, 'slNo' => $slNo, 'type' => $type, 'exp_category' => $exp_category, 'shopping_date' => $shopping_date, 'shop' => $shop, 'description' => $description, 'total_amount' => $total_amount, 'paid' => $paid, 'due' => $due, 'mop' => $mop, 'account' => $account));

			$slNo++;
		}
		echo json_encode(array('rowArr' => $rowArr));
		exit;
	}

	function dbQuery($query)
	{
		$dbc =	mysqli_connect('localhost','root','atlantis2016','itemDB')
					or die("Error Connecting to Database");
		$result = mysqli_query($dbc,$query)
					or die("Error Querying Database for query : $query");
		return $result;
	}
	function fail($message) 
	{
		die(json_encode(array('status' => 'fail', 'message' => $message)));
	}
	function success($message) 
	{
		die(json_encode(array('status' => 'success', 'message' => $message)));
	}
?>