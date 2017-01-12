<?php 
	session_id("reloadBill");
	session_start();

	if(!empty($_POST)&&($_POST['action']=='reloadBill')) // Deletes an item from the DB
	{
		$billMonth = $_POST['billMonth'];
		$billDate = $billMonth."-01";
		$_SESSION['billDate'] = $billDate;
		header("Location: ../viewBills/");
	}
?>