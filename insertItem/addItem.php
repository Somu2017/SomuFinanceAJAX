<?php
	if(!empty($_POST)&&$_POST['action']=="addItem")
	{
		$shop = $_POST['shop'];
		$category = $_POST['category'];
		$item = $_POST['item'];
		$qnty = $_POST['qnty'];
		$unit = $_POST['unit'];
		$price_based_on = $_POST['price_based_on'];
		$mrp = $_POST['mrp'];
		$sellers_price = $_POST['sellers_price'];
		$last_updated_on = $_POST['last_updated_on'];
		$result=null;

		$dbc =	mysqli_connect('localhost','root','atlantis2016','itemDB')
					or die("Error Connecting to Database");

		$query = "INSERT INTO grocery VALUES ('0', '$shop', '$category', '$item', '$qnty', '$unit', '$price_based_on', '$mrp', '$sellers_price', '$last_updated_on')";

		if(!empty($shop)&&!empty($category)&&!empty($item)&&is_numeric($qnty)&&!empty($unit)&&is_numeric($mrp)&&is_numeric($sellers_price)&&!empty($last_updated_on))
		{
			$result = mysqli_query($dbc, $query)
								or die(mysqli_error($dbc));
		}

		if($result)
		{
			success("Item Inserted Successfully");
		}
		else
		{
			fail("Failed to Insert Item");
		}
	}

	if(!empty($_GET)&&$_GET['action']='getDate')
	{
		date_default_timezone_set('Asia/Kolkata'); 
		echo json_encode(array('date' => date("Y-m-d")));
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