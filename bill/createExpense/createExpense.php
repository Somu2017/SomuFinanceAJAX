<?php
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
		$description = $_POST['description'];
		$description = htmlspecialchars($description, ENT_QUOTES);
		$billDate = $_POST['billDate'];
		$total_amount = $_POST['total_amount'];
		$paid = $_POST['paid'];
		$due = $_POST['due'];
		$modeOfPayment = $_POST['modeOfPayment'];
		if(!empty($_POST['account']))
			$account = $_POST['account'];

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
			$insertBillIndexQuery = "INSERT INTO $billIndexTableName (type, exp_category, shopping_date, shop, description, total_amount, paid, due, mode_of_payment) VALUES ('Expense', '$exp_category', '$billDate', '$shop', '$description', '$total_amount', '$paid', '$due', '$modeOfPayment')";
		else
			$insertBillIndexQuery = "INSERT INTO $billIndexTableName (type, exp_category, shopping_date, shop, description, total_amount, paid, due, mode_of_payment, account) VALUES ('Expense', '$exp_category', '$billDate', '$shop', '$description', '$total_amount', '$paid', '$due' , '$modeOfPayment', '$account')";

		$insertBillIndexResult = dbQuery($insertBillIndexQuery);
		header("Location: ../viewBills/");
	}
	else
		header("Location: ../createExpense/");
?>