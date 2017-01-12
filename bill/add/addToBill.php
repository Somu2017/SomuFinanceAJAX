<?php
	ob_start();
	session_id("newBill");
	session_start();

	if(!empty($_POST)&&($_POST['action']=='quickAdd'))
	{
		$_SESSION['shopName'] = $_POST['shopName'];
		header("Location: index.html");
	}

	if(!empty($_GET)&&($_GET['action']=='getCat')&&!empty($_SESSION['shopName'])) // Provides list of Categories as JSON
	{
		$shopName = $_SESSION['shopName'];
		$query1 = "SELECT DISTINCT category FROM (SELECT category FROM grocery WHERE shop='$shopName') AS q1";
		$result1 = dbQuery($query1);

		$catArr=array();
		while($row = mysqli_fetch_array($result1))
			array_push($catArr, array('category' => $row['category']));

		echo json_encode(array('catArr' => $catArr));
		exit;
	}

	if(!empty($_POST)&&($_POST['action']=='addItems')&&!empty($_SESSION['billDate']))
	{
		$billDate = $_SESSION['billDate'];

		$datePHP = date("My",strtotime($billDate));
		$billIndexTableName = "MonthlyBillIndex_".$datePHP;

		$query = "SELECT bill_no FROM $billIndexTableName WHERE type='bill' ORDER BY bill_no DESC LIMIT 1";
		$result = dbQuery($query);

		$row = mysqli_fetch_array($result);
		$bill_no = $row['bill_no'];

		$billsTableName = "Bills_".$datePHP;
		
		foreach ($_POST['selected'] as $add_id) 
	    {
	    	$qf = $_POST["text$add_id"];
	    	$qnty = $_POST["qnty$add_id"];
	    	$unit = $_POST["unit$add_id"];
	    	$price = $_POST["price$add_id"];

	    	$query = "INSERT INTO $billsTableName VALUES('0', '$bill_no', '$add_id', '$qf', '$qnty', '$unit', '$price')";
	    	$result = dbQuery($query);
	    }
	    if($result)
	    	success("Items Added to Bill Successfully");
	    else
	    	fail("Failed to Add Items to Bill");
	}

	if(!empty($_POST)&&($_POST['action']=='editExternal')&&!empty($_SESSION['billDate']))
	{
		$billDate = $_SESSION['billDate'];
		$datePHP = date("My",strtotime($billDate));
		$billsTableName = "Bills_".$datePHP;

		foreach ($_POST['selected'] as $edit_id) 
	    {
	    	$query = "SELECT * FROM $billsTableName WHERE bill_id = $edit_id";
	        $result = dbQuery($query);
	        break;
	    }

		$inRow = mysqli_fetch_array($result);
		$id = $inRow['id'];

    	$query = "SELECT * FROM grocery WHERE id = $id";
        $result = dbQuery($query);

        $inRow = mysqli_fetch_array($result);
	    $rowArr=array();
		$shop = $inRow['shop'];
		$category = $inRow['category'];
		$item = $inRow['item'];
		$qnty = $inRow['quantity'];
		$unit = $inRow['unit'];
		$price_based_on = $inRow['price_based_on'];
		$mrp = $inRow['MRP'];
		$sellers_price = $inRow['sellers_price'];
		$last_updated_on = $inRow['last_updated_on'];
		array_push($rowArr, array('id' => $id, 'shop' => $shop, 'category' =>$category, 'item' => $item, 'qnty' => $qnty, 'unit' => $unit, 'price_based_on' => $price_based_on, 'mrp' => $mrp, 'sellers_price' => $sellers_price, 'last_updated_on' => $last_updated_on));	
		echo json_encode(array('rowArr' => $rowArr));
	}

	if(!empty($_POST)&&($_POST['action']=='edit'))
	{
		foreach ($_POST['selected'] as $edit_id) 
	    {
	    	$query = "SELECT * FROM grocery WHERE id = $edit_id";
	        $result = dbQuery($query);
	        break;
	    }

		$rowArr=array();
		$inRow = mysqli_fetch_array($result);
		$id = $inRow['id'];
		$shop = $inRow['shop'];
		$category = $inRow['category'];
		$item = $inRow['item'];
		$qnty = $inRow['quantity'];
		$unit = $inRow['unit'];
		$price_based_on = $inRow['price_based_on'];
		$mrp = $inRow['MRP'];
		$sellers_price = $inRow['sellers_price'];
		$last_updated_on = $inRow['last_updated_on'];
		array_push($rowArr, array('id' => $id, 'shop' => $shop, 'category' =>$category, 'item' => $item, 'qnty' => $qnty, 'unit' => $unit, 'price_based_on' => $price_based_on, 'mrp' => $mrp, 'sellers_price' => $sellers_price, 'last_updated_on' => $last_updated_on));	
		echo json_encode(array('rowArr' => $rowArr));
	}

	if(!empty($_POST)&&($_POST['action']=='submitEdit'))
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
		$query = "SELECT * FROM $billIndexTableName WHERE type='bill' ORDER BY bill_no DESC LIMIT 1";
		$result2 = dbQuery($query);
		$row = mysqli_fetch_array($result2);
		$bill_no = $row['bill_no'];
		$billsTableName = "Bills_".$datePHP;

		$query = "INSERT INTO $billsTableName VALUES('0', '$bill_no', '$id', '$qf', '$calQnty', '$calUnit', '$calPrice')";
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

	if(!empty($_POST)&&($_POST['action']=='getList')&&!empty($_SESSION['shopName']))	// Provides entire DB of a selected category or all categories based on category_selector
	{
		$shopName = $_SESSION['shopName'];
		$listArr=array();
		if($_POST['category_selector']!='All')
		{
			$category = $_POST['category_selector'];
			$query = "SELECT * FROM grocery WHERE (category='$category' AND shop='$shopName') ORDER BY item ASC";
			$result = dbQuery($query);

			$rowArr=array();
			$catCount=1;
			while($inRow = mysqli_fetch_array($result))
			{
				$id = $inRow['id'];
				$shop = $inRow['shop'];
				$item = $inRow['item'];
				$qnty = $inRow['quantity'];
				$unit = $inRow['unit'];
				$price_based_on = $inRow['price_based_on'];
				$mrp = $inRow['MRP'];
				$sellers_price = $inRow['sellers_price'];
				$last_updated_on = $inRow['last_updated_on'];

				array_push($rowArr, array('id' => $id, 'catCount' => "$catCount", 'shop' => $shop, 'item' => $item, 'qnty' => $qnty, 'unit' => $unit, 'price_based_on' => $price_based_on, 'mrp' => $mrp, 'sellers_price' => $sellers_price, 'last_updated_on' => $last_updated_on));

				$catCount++;
			}

			array_push($listArr, array('category' => $category, 'value' => $rowArr));
			echo json_encode(array('listArr' => $listArr));
			exit;
		}
		else
		{
			$query1 = "SELECT DISTINCT category FROM (SELECT category FROM grocery WHERE shop='$shopName') AS q1";
			$result1 = dbQuery($query1);

			while($row = mysqli_fetch_array($result1))
			{
				$category = $row['category'];
				$query2 = "SELECT * FROM grocery WHERE (category='$category' AND shop='$shopName') ORDER BY item ASC";
				$result2 = dbQuery($query2);

				$rowArr=array();
				$catCount=1;
				while($inRow = mysqli_fetch_array($result2))
				{
					$id = $inRow['id'];
					$shop = $inRow['shop'];
					$item = $inRow['item'];
					$qnty = $inRow['quantity'];
					$unit = $inRow['unit'];
					$price_based_on = $inRow['price_based_on'];
					$mrp = $inRow['MRP'];
					$sellers_price = $inRow['sellers_price'];
					$last_updated_on = $inRow['last_updated_on'];

					array_push($rowArr, array('id' => $id, 'catCount' => "$catCount", 'shop' => $shop, 'item' => $item, 'qnty' => $qnty, 'unit' => $unit, 'price_based_on' => $price_based_on, 'mrp' => $mrp, 'sellers_price' => $sellers_price, 'last_updated_on' => $last_updated_on));

					$catCount++;
				}
				array_push($listArr, array('category' => $category, 'value' => $rowArr));
			}
			echo json_encode(array('listArr' => $listArr));
			exit;
		}
	}


	if(!empty($_POST)&&$_POST['action']=='submitSearch')	// Provides Searching facility on the DB records.
	{
		$listArr=array();
		$query1 = "SELECT DISTINCT category FROM grocery";
		$result1 = dbQuery($query1);

		$field = $_POST['field'];
		$criteria = $_POST['criteria'];
		if(!empty($_POST['unitCriteria']))
			$unit=$_POST['unitCriteria'];
		else if(!empty($_POST['dateCriteria']))
			$dateCriteria=$_POST['dateCriteria'];

		while($row = mysqli_fetch_array($result1))
		{
			$category = $row['category'];
			if($field=='item')
				$query2 = "SELECT * FROM grocery WHERE (category='$category' AND MATCH item AGAINST ('$criteria' IN NATURAL LANGUAGE MODE))";
			else if($field=='qnty')
				$query2 = "SELECT * FROM grocery WHERE (category='$category' AND quantity='$criteria' AND unit='$unit') ORDER BY item ASC";
			else if($field=='last_updated_on')
				$query2 = "SELECT * FROM grocery WHERE (category='$category' AND last_updated_on='$dateCriteria') ORDER BY item ASC";
			else
				$query2 = "SELECT * FROM grocery WHERE (category='$category' AND $field='$criteria') ORDER BY item ASC";

			$result2 = dbQuery($query2);

			$rowArr=array();
			$catCount=1;
			while($inRow = mysqli_fetch_array($result2))
			{
				$id = $inRow['id'];
				$shop = $inRow['shop'];
				$item = $inRow['item'];
				$qnty = $inRow['quantity'];
				$unit = $inRow['unit'];
				$price_based_on = $inRow['price_based_on'];
				$mrp = $inRow['MRP'];
				$sellers_price = $inRow['sellers_price'];
				$last_updated_on = $inRow['last_updated_on'];

				array_push($rowArr, array('id' => $id, 'catCount' => "$catCount", 'shop' => $shop, 'item' => $item, 'qnty' => $qnty, 'unit' => $unit, 'price_based_on' => $price_based_on, 'mrp' => $mrp, 'sellers_price' => $sellers_price, 'last_updated_on' => $last_updated_on));

				$catCount++;
			}
			if(!empty($rowArr))
				array_push($listArr, array('category' => $category, 'value' => $rowArr));
		}
		echo json_encode(array('listArr' => $listArr));
		exit;
	}

	if(!empty($_POST)&&$_POST['action']=="getPrice")
	{
		$id = $_POST['id'];
		$query = "SELECT sellers_price FROM grocery WHERE id=$id";
		$result1 = dbQuery($query);

		$row = mysqli_fetch_array($result1);
		echo json_encode(array('price' => $row['sellers_price']));
		exit;
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