<?php
	session_id("reloadBill");
	session_start();
	
	if(!empty($_GET)&&$_GET['action']=="getDate"&&!empty($_SESSION['billDate']))
	{
		echo json_encode(array('billDate' => $_SESSION['billDate']));
		exit;
	}

	if(!empty($_GET)&&$_GET['action']=="getData"&&!empty($_SESSION['billDate']))
	{
		$billDate = $_SESSION['billDate'];
		$datePHP = date("My",strtotime($billDate));
		$billIndexTableName = "MonthlyBillIndex_".$datePHP;

		$query1 = "SELECT DISTINCT exp_category FROM $billIndexTableName";
		$result1 = dbQuery($query1);

		$grand_total_amount = 0;
		$grand_total_paid = 0;
		$grand_total_due = 0;
		$listArr = array();
		$catArr = array();
		$slNo = 1;
		while ($row1=mysqli_fetch_array($result1)) 
		{
			$category_total_amount = 0;
			$category_total_paid = 0;
			$category_total_due = 0;

			$exp_category = $row1['exp_category'];
			$query2 = "SELECT exp_category, shop FROM $billIndexTableName WHERE exp_category = '$exp_category' GROUP BY exp_category, shop";
			$result2 = dbQuery($query2);
			$shopArr = array();
			while ($row2=mysqli_fetch_array($result2)) 
			{
				$shop_total_amount = 0;
				$shop_total_paid = 0;
				$shop_total_due = 0;

				$shop = $row2['shop'];
				$query3 = "SELECT * FROM $billIndexTableName WHERE (exp_category = '$exp_category' AND shop = '$shop')";
				$result3 = dbQuery($query3);
				while ($row3=mysqli_fetch_array($result3)) 
				{
					$shop_total_amount += $row3['total_amount'];
					$shop_total_paid += $row3['paid'];
					$shop_total_due += $row3['due'];
				}
				array_push($shopArr,array('slNo'=>$slNo, 'shop'=>$shop, 'shopTotalAmount'=>$shop_total_amount, 'shopTotalPaid'=>$shop_total_paid, 'shopTotalDue'=>$shop_total_due));
				$slNo++;

				$category_total_amount += $shop_total_amount;
				$category_total_paid += $shop_total_paid;
				$category_total_due += $shop_total_due;	
			}
			array_push($catArr,array('exp_category'=>$exp_category, 'categoryTotalAmount'=>$category_total_amount, 'categoryTotalPaid'=>$category_total_paid, 'categoryTotalDue'=>$category_total_due, 'shops' => $shopArr));

			$grand_total_amount += $category_total_amount;
			$grand_total_paid += $category_total_paid;
			$grand_total_due += $category_total_due;				
		}
		array_push($listArr,array('totalAmount'=>$grand_total_amount, 'totalPaid'=>$grand_total_paid, 'totalDue'=>$grand_total_due, 'categories' => $catArr));
		echo json_encode(array('list'=>$listArr));
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
?>