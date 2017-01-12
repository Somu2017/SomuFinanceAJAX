<?php
	session_id("reloadBill");
	session_start();
	
	if(!empty($_GET)&&$_GET['action']=="getData"&&!empty($_SESSION['billDate'])&&!empty($_SESSION['bill_no']))
	{
		$billDate = $_SESSION['billDate'];
		$datePHP = date("My",strtotime($billDate));
		$billIndexTableName = "MonthlyBillIndex_".$datePHP;
		$bill_no = $_SESSION['bill_no'];

		$query = "SELECT * FROM $billIndexTableName WHERE bill_no=$bill_no";
		$result = dbQuery($query);

		$billIdx=array();
		$row = mysqli_fetch_array($result);

		$account = null;
		$billDate = $row['shopping_date'];
		$exp_category = $row['exp_category'];
		$shop = $row['shop'];
		$modeOfPayment = $row['mode_of_payment'];
		if(!empty($row['account']))
			$account = $row['account'];

		$billIdx = array('bill_no' => $bill_no, 'exp_category' => $exp_category, 'billDate' => $billDate , 'shop' => $shop, 'modeOfPayment' => $modeOfPayment, 'account' => $account);
		echo json_encode(array('billIdx' => $billIdx));
		exit;
	}

	if(!empty($_POST)&&($_POST['action']=='confirmDelete')&&!empty($_SESSION['billDate'])) // Deletes an item from the DB
	{
		$billDate = $_SESSION['billDate'];
		$datePHP = date("My",strtotime($billDate));
		$billsTableName = "Bills_".$datePHP;

		foreach ($_POST['selected'] as $delete_id) 
		{
			$query = "DELETE FROM $billsTableName WHERE bill_id = $delete_id";
			dbQuery($query);
		}
	}

	if(!empty($_GET)&&$_GET['action']=="getBill"&&!empty($_SESSION['billDate'])&&!empty($_SESSION['bill_no']))
	{
		$billDate = $_SESSION['billDate'];
		$datePHP = date("My",strtotime($billDate));
		$billIndexTableName = "MonthlyBillIndex_".$datePHP;
		$bill_no = $_SESSION['bill_no'];
		$billsTableName = "Bills_".$datePHP;

		$query1 = "SELECT DISTINCT category FROM grocery";
		$result1 = dbQuery($query1);

		$listArr = array();
		$slNo=1;
		while($row = mysqli_fetch_array($result1))
		{
			$category = $row['category'];
			$query2 = "SELECT bill_id, grocery.id, item, grocery.quantity, grocery.unit, grocery.price_based_on, qf, $billsTableName.quantity AS calQuantity, $billsTableName.unit AS calUnit, $billsTableName.price FROM grocery INNER JOIN $billsTableName ON grocery.id=$billsTableName.id WHERE (bill_no='$bill_no' AND category='$category') ORDER BY bill_id ASC";
			$result2 = dbQuery($query2);

			$rowArr=array();
			while($inRow = mysqli_fetch_array($result2))
			{
				$bill_id = $inRow['bill_id'];
				$id = $inRow['id'];
				$item = $inRow['item'];
				$qnty = $inRow['quantity'];
				$unit = $inRow['unit'];
				$price_based_on = $inRow['price_based_on'];
				$qf = $inRow['qf'];
				$calQnty = $inRow['calQuantity'];
				$calUnit = $inRow['calUnit'];
				$price = $inRow['price'];

				array_push($rowArr, array('bill_id' => $bill_id, 'id' => $id, 'slNo' => "$slNo", 'item' => $item, 'qnty' => $qnty, 'unit' => $unit, 'price_based_on' => $price_based_on, 'qf' => $qf, 'calQnty' => $calQnty, 'calUnit' => $calUnit, 'price' => $price));

				$slNo++;
			}
			array_push($listArr, array('category' => $category, 'value' => $rowArr));
		}
		echo json_encode(array('listArr' => $listArr));
		exit;
	}

	if(!empty($_POST)&&($_POST['action']=='editExternal')&&!empty($_SESSION['billDate']))
	{
		$billDate = $_SESSION['billDate'];
		$datePHP = date("My",strtotime($billDate));
		$billsTableName = "Bills_".$datePHP;

		foreach ($_POST['selected'] as $bill_id) 
		{
			$_SESSION['bill_id'] = $bill_id;
			$query = "SELECT * FROM $billsTableName WHERE bill_id = $bill_id";
			$result = dbQuery($query);
			break;
		}

		$rowArr=array();
		$inRow = mysqli_fetch_array($result);
	
		$id = $inRow['id'];
		$qf = $inRow['qf'];
		$calQnty = $inRow['quantity'];
		$calUnit = $inRow['unit'];
		$price = $inRow['price'];

		$query = "SELECT * FROM grocery WHERE id = $id";
		$result = dbQuery($query);

		$inRow = mysqli_fetch_array($result);
		$shop = $inRow['shop'];
		$category = $inRow['category'];
		$item = $inRow['item'];
		$qnty = $inRow['quantity'];
		$unit = $inRow['unit'];
		$price_based_on = $inRow['price_based_on'];
		$mrp = $inRow['MRP'];
		$sellers_price = $inRow['sellers_price'];
		$last_updated_on = $inRow['last_updated_on'];
		array_push($rowArr, array('id' => $id, 'shop' => $shop, 'category' =>$category, 'item' => $item, 'qnty' => $qnty, 'unit' => $unit, 'price_based_on' => $price_based_on, 'mrp' => $mrp, 'sellers_price' => $sellers_price, 'last_updated_on' => $last_updated_on, 'qf' => $qf, 'calQnty' => $calQnty, 'calUnit' => $calUnit, 'price' => $price));	
		echo json_encode(array('rowArr' => $rowArr));
	}

	if(!empty($_POST)&&($_POST['action']=='submitEdit')&&!empty($_SESSION['billDate'])&&!empty($_SESSION['bill_no']))
	{
		$id = $_POST['id'];
		$mrp = $_POST['mrp'];
		$sellers_price = $_POST['sellers_price'];
		$last_updated_on = $_POST['last_updated_on'];
		$qf = $_POST['qf'];
		$calQnty = $_POST['calQnty'];
		$calUnit = $_POST['calUnit'];
		$calPrice = $_POST['calPrice'];
		$result1=null;
		$result2=null;

		$query = "UPDATE grocery SET mrp='$mrp', sellers_price='$sellers_price', last_updated_on='$last_updated_on' WHERE id=$id";

		if(is_numeric($mrp)&&is_numeric($sellers_price)&&!empty($last_updated_on))
		{
			$result1 = dbQuery($query);
		}

		$billDate = $_SESSION['billDate'];
		$datePHP = date("My",strtotime($billDate));
		$billIndexTableName = "MonthlyBillIndex_".$datePHP;
		$bill_no = $_SESSION['bill_no'];
		$billsTableName = "Bills_".$datePHP;

		$edit_bill_id = $_SESSION['bill_id'];
		$query = "UPDATE $billsTableName SET qf='$qf', quantity='$calQnty', unit='$calUnit', price='$calPrice' WHERE bill_id=$edit_bill_id";
		$result2 = dbQuery($query);

		if($result1&&$result2)
			success('Item Updated and Inserted Successfully.');
		else if($result1)
			fail('Item Updated, but failed to Insert into Bill.');
		else if ($result2)
			fail('Item Inserted into Bill, but failed to Update');
		else
			fail('Failed to Update and Insert Item.');
	}

	if(!empty($_GET)&&$_GET['action']=="getPaid"&&!empty($_SESSION['billDate'])&&!empty($_SESSION['bill_no']))
	{
		$billDate = $_SESSION['billDate'];
		$datePHP = date("My",strtotime($billDate));
		$billIndexTableName = "MonthlyBillIndex_".$datePHP;
		$bill_no = $_SESSION['bill_no'];

		$query = "SELECT * FROM $billIndexTableName WHERE bill_no=$bill_no";
		$result = dbQuery($query);

		$billIdx=array();
		$row = mysqli_fetch_array($result);
		$paid = $row['paid'];
		
		echo json_encode(array('paid' => $paid));
		exit;
	}

	if(!empty($_POST)&&($_POST['action']=='submitBillAmount')&&!empty($_SESSION['billDate'])&&!empty($_SESSION['bill_no']))
	{
		$total_amount = $_POST['total_amount'];
		$paid = $_POST['paid'];
		$due = $_POST['due'];
		$billDate = $_SESSION['billDate'];
		$datePHP = date("My",strtotime($billDate));
		$billIndexTableName = "MonthlyBillIndex_".$datePHP;
		$bill_no = $_SESSION['bill_no'];
		$result=null;

		$query = "UPDATE $billIndexTableName SET total_amount='$total_amount', paid='$paid', due='$due' WHERE bill_no=$bill_no";

		if(is_numeric($paid))
		{
			$result = dbQuery($query);
		}

		if($result)
			success('Billed Amounts Updated Successfully');
		else
			fail('Failed to Update Billed Amounts.');
	}

	function dbQuery($query)
	{
		$dbc =	mysqli_connect('localhost','root','atlantis2016','itemDB')
					or die("Error Connecting to Database");
		$result = mysqli_query($dbc,$query)
					or die("Error Querying Database for $query");
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