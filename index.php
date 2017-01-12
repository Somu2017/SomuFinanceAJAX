<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>SomuFinance - Login</title>
	<link rel="stylesheet" type="text/css" href="css/indexStyle.css">
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
	<link rel="icon" href="favicon.ico" type="image/x-icon">
	<script src="scripts/jquery-3.1.1.min.js"></script>
</head>
<body>
	<div id="login">
		<h1>SomuFinance</h1>
		<form id="viewBills" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
			<div class="inp">
				<label for="calUnit">Username : </label>
				<input type="text" id="username" name="username" required>
			</div> <br>
			<div class="inp">
				<label for="calPrice">Password : </label>
				<input type="password" id="password" name="password" required>
			</div> <br>
			<div class="inp">
				<input id="signIn" class="button" type="button" name="signIn" value="Log In">
			</div>
		</form>
	</div>
</body>
</html>