<?php
	ini_set('display_errors', '1');
	error_reporting(E_ALL);

	ob_start();

	
	if(!empty($_GET)&&$_GET['action']=='getCat') // Provides list of Categories as JSON
	{
		$query1 = "SELECT DISTINCT category FROM grocery";
		$result1 = dbQuery($query1);

		$catArr=array();
		while($row = mysqli_fetch_array($result1))
			array_push($catArr, array('category' => $row['category']));

		echo json_encode(array('catArr' => $catArr));
		exit;
	}

	if(!empty($_POST)&&($_POST['action']=='confirmDelete')) // Deletes an item from the DB
	{
		foreach ($_POST['selected'] as $delete_id) 
	    {
	        $query = "DELETE FROM grocery WHERE id = $delete_id";
	        dbQuery($query);
	    }
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

	if(isset($_POST)&&($_POST['action']=='submitEdit'))
	{
		$id = $_POST['id'];
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

		$query = "UPDATE grocery SET shop='$shop', category='$category', item='$item', quantity='$qnty', unit='$unit', price_based_on='$price_based_on', mrp='$mrp', sellers_price='$sellers_price', last_updated_on='$last_updated_on' WHERE id=$id";

		if(!empty($shop)&&!empty($category)&&!empty($item)&&is_numeric($qnty)&&!empty($unit)&&is_numeric($mrp)&&is_numeric($sellers_price)&&!empty($last_updated_on))
		{
			$result = dbQuery($query);
		}

		if($result)
			success('Item Updated Successfully.');
		else
			fail('Failed to Update Item.');
	}

	if(!empty($_POST)&&$_POST['action']=='getList')	// Provides entire DB of a selected category or all categories based on category_selector
	{
		$listArr=array();
		if($_POST['category_selector']!='All')
		{
			$category = $_POST['category_selector'];
			$query = "SELECT * FROM grocery WHERE category='$category' ORDER BY item ASC";
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
			$query1 = "SELECT DISTINCT category FROM grocery";
			$result1 = dbQuery($query1);

			while($row = mysqli_fetch_array($result1))
			{
				$category = $row['category'];
				$query2 = "SELECT * FROM grocery WHERE category='$category' ORDER BY item ASC";
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

	function dbQuery($query)
	{
		$dbc =	mysqli_connect('localhost','root','atlantis2016','itemDB')
					or die("Error Connecting to Database");
		$result = mysqli_query($dbc,$query)
					or die("Error Querying Database");
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