<?php
	if(!empty($_GET)&&$_GET['action']=='getDaysInMonth')
	{
		$year = $_GET['year'];
		$month = $_GET['month'];
		$days = 0;
		switch ($month) {
			case '1':
			case '3':
			case '5':
			case '7':
			case '8':
			case '10':
			case '12':
				$days=31;
				break;
			case '2':
				if($year%4==0)
					if($year%100==0)
						if($year%400==0)
							$days=29;
						else
							$days=28;
					else
						$days=29;
				else
					$days=28;
				break;
			default:
				$days=30;
				break;
		}
	}
	echo json_encode(array('days' => $days));
?>