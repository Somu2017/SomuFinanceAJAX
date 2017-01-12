<?php
	$dbc =	mysqli_connect('localhost','root','atlantis2016','itemDB')
						or die("Error Connecting to Database");

	$query = 'CREATE TABLE grocery ( 	id int NOT NULL AUTO_INCREMENT, 
										shop varchar(100) NOT NULL, 
										category varchar(100) NOT NULL,
										item varchar(150) NOT NULL, 
										quantity int NOT NULL,
										unit varchar(20) NOT NULL,
										price_based_on varchar(50) NOT NULL,
										MRP decimal(6,2) NOT NULL,
										sellers_price dec(6,2) NOT NULL, 
										last_updated_on date NOT NULL,
										PRIMARY KEY (id))';

	$result = mysqli_query($dbc, $query)
							or die("Error Querying Database");

	if($result)
		echo "Table Created!";

	mysqli_close($dbc);

?>