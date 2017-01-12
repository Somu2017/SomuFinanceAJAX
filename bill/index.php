<?php

	session_id("newBill");
	session_start();

	function dbQuery($query)
	{
		$dbc =	mysqli_connect('localhost','root','atlantis2016','itemDB')
					or die("Error Connecting to Database");
		$result = mysqli_query($dbc,$query)
					or die("Error Querying Database for $query");
		return $result;
	}

	if(!empty($_POST))
	{
		/*	Sample Request: category=More&shop=Subhash&billDate=2016-12-21&modeOfPayment=Card&account=Joy_ESPL&submitButton=Create+Bill */

		$account = null;
		$exp_category = $_POST['category'];
		$shop = $_POST['shop'];
		$billDate = $_POST['billDate'];
		$modeOfPayment = $_POST['modeOfPayment'];
		if(!empty($_POST['account']))
			$account = $_POST['account'];

		/*	Storing billDate to provide during GET phase of PRG */
		$_SESSION['billDate']=$billDate;

		/*	Creating Monthly Bill Index Table */

		$datePHP = date("My",strtotime($billDate));
		$billIndexTableName = "MonthlyBillIndex_".$datePHP;

		$createBillIndexQuery = "CREATE TABLE IF NOT EXISTS $billIndexTableName ( 	
									bill_no int NOT NULL AUTO_INCREMENT, 
									type varchar(100) NOT NULL,
									exp_category varchar(100) NOT NULL,
									shopping_date date NOT NULL,
									shop varchar(100) NOT NULL, 
									description varchar(200),
									total_amount decimal(7,2),
									paid decimal(7,2),
									due decimal(7,2),
									mode_of_payment varchar(20) NOT NULL,
									account varchar(20),
									PRIMARY KEY (bill_no)
								)";

		$billIndexResult = dbQuery($createBillIndexQuery);

		if(empty($_POST['account']))
			$insertBillIndexQuery = "INSERT INTO $billIndexTableName (type, exp_category, shopping_date, shop, mode_of_payment) VALUES ('Bill', '$exp_category', '$billDate', '$shop', '$modeOfPayment')";
		else
			$insertBillIndexQuery = "INSERT INTO $billIndexTableName (type, exp_category, shopping_date, shop, mode_of_payment, account) VALUES ('Bill', '$exp_category', '$billDate', '$shop', '$modeOfPayment', '$account')";

		$insertBillIndexResult = dbQuery($insertBillIndexQuery);


		/*	Creating Table of Bills for the month */

		$billsTableName = "Bills_".$datePHP;
		$createBillTableQuery = "CREATE TABLE IF NOT EXISTS $billsTableName ( 	
									bill_id int NOT NULL AUTO_INCREMENT, 
									bill_no int NOT NULL, 
									id int NOT NULL,
									qf int NOT NULL,
									quantity int NOT NULL,
									unit varchar(20) NOT NULL,
									price decimal(7,2) NOT NULL,
									PRIMARY KEY (bill_id),
									FOREIGN KEY (bill_no) REFERENCES $billIndexTableName(bill_no),
									FOREIGN KEY (id) REFERENCES grocery(id)
								)";
		$billsTableResult = dbQuery($createBillTableQuery);
		header("Location: billMaker/");
	}
	else
		header("Location: create/");
?>