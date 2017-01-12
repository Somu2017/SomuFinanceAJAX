$(document).ready(function() {
	$("#total_amount").val('0.00');
	$("#paid").val('0.00');
	$('.button').click(function(event){
		var checked = $("#viewBills input:checked").length > 0;
		if($(this).val()=="Delete"&&checked) //To confirm Delete
		{
			$("#deleteConfirmDialog").show(200).parent(".dialogBG").fadeIn(200);
			$("#action").val('confirmDelete');
		}
		else if($(this).val()=="Edit"&&checked) //To confirm Delete
		{
			$("#action").val('edit');
			var data = $("#viewBills :input").serialize();
			$("#viewBills").submit();
		}
		else if($(this).val()=="Search")
		{
			$("#searchDialog").show(200).parent(".dialogBG").fadeIn(200);
			$("#action").val('search');
			$("#field").change();
		}
	});

	$('#confirmDelete').click(function(){
		var data = $("#viewBills :input").serialize();
		$.post("viewBills", data);
		$parentTr = $("#billAdd :input:checked").parents('tr');
		$(".closeDialog").trigger("click");
		$parentTr.slideUp('400').delay('400').remove();
		$("#total_amount").val('0');
		getBill();
	});

	getBill();
	function getBill()
	{
		var grand_total_amount = parseFloat($("#total_amount").val());
		var total_paid = parseFloat($("#paid").val());
		$("#listDB").css('display', 'none');
		$("#listDB").find(".data").remove();
		$.get('viewBills?action=getBill', function(json) 
		{
			if(json.rowArr.length>0)
			{
				$.each(json.rowArr, function() {
					var $tr = $('<tr>',{
						class : "data"
					});
					
					var $td = $('<td>', {
						html    : '<input type="checkbox" class="itemCbox" id="selected[]" value="'+this.bill_no+'" name="selected[]" /></td>'
					});$tr.append($td);
					$td = $('<td>', {
						text    : this.bill_no
					});$tr.append($td);
					$td = $('<td>', {
						text    : this.slNo
					});$tr.append($td);
					$td = $('<td>', {
						text    : this.type
					});$tr.append($td);
					$td = $('<td>', {
						text    : this.exp_category
					});$tr.append($td);
					$td = $('<td>', {
						text    : moment(this.shopping_date).format('DD/MM/YYYY')
					});$tr.append($td);
					$td = $('<td>', {
						text    : this.shop
					});$tr.append($td);
					$td = $('<td>', {
						class 	: "desc", 
						text    : this.description
					});$tr.append($td);
					$td = $('<td>', {
						class 	: "rightAligned",
						text    : "₹"+(this.total_amount==null?"0.00":this.total_amount)
					});$tr.append($td);
					$td = $('<td>', {
						class 	: "rightAligned",
						text    : "₹"+(this.paid==null?"0.00":this.paid)
					});$tr.append($td);
					$td = $('<td>', {
						class 	: "rightAligned",
						text    : "₹"+(this.due==null?"0.00":this.due)
					});$tr.append($td);
					$td = $('<td>', {
						text    : this.mop
					});$tr.append($td);
					if(this.account!==null)
						switch(this.account)
						{
							case 'Joy_ESPL' :	$td = $('<td>', {
													text : 'Joydeb Sinha\'s Esplanade Savings Account'
												});
												break;
							case 'Joy_KON'	: 	$td = $('<td>', {
													text : 'Joydeb Sinha\'s Konnagar Savings Account'
												});
												break;
							case 'Somu_ESPL': 	$td = $('<td>', {
													text : 'Somenath Sinha\'s Esplanade Savings Account'
												});
												break;
						}
					else
						$td = $('<td>');
					$tr.append($td);
					grand_total_amount += parseFloat(this.total_amount==null?"0.00":this.total_amount);
					total_paid += parseFloat(this.paid==null?"0.00":this.paid);

					$("#listDB").append($tr);
				});
			}
			$("#total_amount").val((grand_total_amount).toFixed(2));
			$("#paid").val((total_paid).toFixed(2));
			$("#paid").change();
		},"json");
		$("#listDB").fadeIn(500);
	}

	/*	Code to POPULATE SEARCH DIALOG Begins --------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$("#field").change(function(event) {
		$("#inputHolder").slideUp().remove();
		var shopArr=[];
		var mopArr=[];
		var expCatArr=[];
		var accArr=[];
		var typeArr=[];
		reload_suggestions(shopArr,'shop');
		reload_suggestions(mopArr,'mode_of_payment');
		reload_suggestions(expCatArr,'exp_category');
		reload_suggestions(accArr,'account');
		reload_suggestions(typeArr,'type');

		$inputHolder = $("<div>",{
			id: "inputHolder",
		});
		$inputHolder.css('display', 'none');

		if($("#field").val()=="shop")
		{
			$label = $("<label>", {
				for: "criteria",
				text: "Shop Name : "
			});$inputHolder.append($label);
			$criteria = $("<input>", {
				type: "text",
				name: "criteria",
				id: "criteria"
			});$inputHolder.append($criteria);
		    $("#criteriaDiv").append($inputHolder);
		    $inputHolder.slideDown('400');
		    $criteria.autocomplete({
		      source: shopArr
		    });
		}
		else if($("#field").val()=="mode_of_payment")
		{
			$label = $("<label>", {
				for: "criteria",
				text: "Mode of Payment : "
			});$inputHolder.append($label);
			$criteria = $("<input>", {
				type: "text",
				name: "criteria",
				id: "criteria"
			});$inputHolder.append($criteria);
			$criteria.change(function(event){
				$("label[for='criteria2']").slideUp(400).remove();
				$("#criteria2").slideUp(400).remove();
				if(this.value=="Card"||this.value=="card"||this.value=="Online"||this.value=="online")
				{
					$criteria.css('margin-bottom', '7px');
					$label2 = $("<label>", {
						for: "criteria2",
						text: "Account : "
					});$inputHolder.append($label2);
					$criteria2 = $("<input>", {
						type: "text",
						name: "criteria2",
						id: "criteria2"
					});$inputHolder.append($criteria2);
					$criteria2.autocomplete({
						source: accArr
				    });
				}
			});
		    $("#criteriaDiv").append($inputHolder);
		    $inputHolder.slideDown('400');
		    $criteria.autocomplete({
		    	source: mopArr
		    });
		    $criteria.on('autocompletechange', function(event) {
		    	$criteria.change();
		    });
		}
		else if($("#field").val()=="exp_category")
		{
			$label = $("<label>", {
				for: "criteria",
				text: "Expenditure Category : "
			});$inputHolder.append($label);
			$criteria = $("<input>", {
				type: "text",
				name: "criteria",
				id: "criteria"
			});$inputHolder.append($criteria);
		    $("#criteriaDiv").append($inputHolder);
		    $inputHolder.slideDown('400');
		    $criteria.autocomplete({
		      source: expCatArr
		    });
		}
		else if($("#field").val()=="type")
		{
			$label = $("<label>", {
				for: "criteria",
				text: "Expenditure Type : "
			});$inputHolder.append($label);
			$criteria = $("<input>", {
				type: "text",
				name: "criteria",
				id: "criteria"
			});$inputHolder.append($criteria);
		    $("#criteriaDiv").append($inputHolder);
		    $inputHolder.slideDown('400');
		    $criteria.autocomplete({
		      source: typeArr
		    });
		}
		else if($("#field").val()=="shopping_date")
		{
			$label = $("<label>", {
				for: "criteria",
				text: "Shopping Date : "
			});$inputHolder.append($label);
			$criteria = $("<input>", {
				type: "date",
				name: "criteria",
				id: "criteria"
			});$inputHolder.append($criteria);
		    $("#criteriaDiv").append($inputHolder);
		    $inputHolder.slideDown('400');
		}
		else
		{
			$label = $("<label>", {
				for: "criteria",
				text: "Search For : "
			});$inputHolder.append($label);
			$criteria = $("<input>", {
				type: "text",
				name: "criteria",
				id: "criteria"
			});$inputHolder.append($criteria);
		    $("#criteriaDiv").append($inputHolder);
		    $inputHolder.slideDown('400');
		}
	});
	/*	Code to POPULATE SEARCH DIALOG Ends --------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	/*	Code to AUTOCOMPLETE IN SEARCH Begins ------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	function reload_suggestions(arr,field)
	{
		var data="field="+field;
		$.post("insertAutocomplete.php", data, function(json) {
			if(json.fieldArr.length>0)
				$.each(json.fieldArr, function() 
				{
					arr.push(this[field]);
				});
		}, 'json');

	}
	/*	Code to AUTOCOMPLETE IN SEARCH Ends --------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	/*	Code to SEARCH Begins ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$("#search").click(function(event) {
		var grand_total_amount = 0;
		var total_paid = 0;
		$("#listDB").css('display', 'none');
		$("#listDB").find(".catHead").remove();
		$("#listDB").find(".data").remove();
		$("#action").val('submitSearch');

		var data = $("#searchForm :input").serialize()+'&action=submitSearch';
		$.post($("#searchForm").attr('action'), data, function(json) 
		{
			if(json.rowArr.length>0)
			{
				$.each(json.rowArr, function() {
					var $tr = $('<tr>',{
						class : "data"
					});
					
					var $td = $('<td>', {
						html    : '<input type="checkbox" class="itemCbox" id="selected[]" value="'+this.bill_no+'" name="selected[]" /></td>'
					});$tr.append($td);
					$td = $('<td>', {
						text    : this.bill_no
					});$tr.append($td);
					$td = $('<td>', {
						text    : this.slNo
					});$tr.append($td);
					$td = $('<td>', {
						text    : this.type
					});$tr.append($td);
					$td = $('<td>', {
						text    : this.exp_category
					});$tr.append($td);
					$td = $('<td>', {
						text    : moment(this.shopping_date).format('DD/MM/YYYY')
					});$tr.append($td);
					$td = $('<td>', {
						text    : this.shop
					});$tr.append($td);
					$td = $('<td>', {
						class 	: "desc", 
						text    : this.description
					});$tr.append($td);
					$td = $('<td>', {
						class 	: "rightAligned",
						text    : "₹"+(this.total_amount==null?"0.00":this.total_amount)
					});$tr.append($td);
					$td = $('<td>', {
						class 	: "rightAligned",
						text    : "₹"+(this.paid==null?"0.00":this.paid)
					});$tr.append($td);
					$td = $('<td>', {
						class 	: "rightAligned",
						text    : "₹"+(this.due==null?"0.00":this.due)
					});$tr.append($td);
					$td = $('<td>', {
						text    : this.mop
					});$tr.append($td);
					if(this.account!==null)
						switch(this.account)
						{
							case 'Joy_ESPL' :	$td = $('<td>', {
													text : 'Joydeb Sinha\'s Esplanade Savings Account'
												});
												break;
							case 'Joy_KON'	: 	$td = $('<td>', {
													text : 'Joydeb Sinha\'s Konnagar Savings Account'
												});
												break;
							case 'Somu_ESPL': 	$td = $('<td>', {
													text : 'Somenath Sinha\'s Esplanade Savings Account'
												});
												break;
						}
					else
						$td = $('<td>');
					$tr.append($td);
					grand_total_amount += parseFloat(this.total_amount==null?"0.00":this.total_amount);
					total_paid += parseFloat(this.paid==null?"0.00":this.paid);
					$("#listDB").append($tr);
				});
			}
			$("#total_amount").val((grand_total_amount).toFixed(2));
			$("#paid").val((total_paid).toFixed(2));
			$("#paid").change();
		},"json");
		$("#listDB").fadeIn(500);
		setTimeout(function() {
			$(".cancelButton").click();
		},500);
	});	
	/*	Code to SEARCH Ends ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	/*	Code to CONTROL BUTTON AND DIALOG BEHAVIOUR Begins -----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(".closeDialog").click(function (e){
		$(this).parent(".dialog").hide('200').parent(".dialogBG").fadeOut('200');
		$('#searchForm')[0].reset();
	});
	$(".cancelButton").click(function (e){
		$("input:checkbox[name='selected[]']").prop('checked', false);
		$(".closeDialog").click();
	});

	$("#cancelEdit").click(function (e){
		$("input:checkbox[name='selected[]']").prop('checked', false);
		$(".closeDialog").click();
	});
	/*	Code to CONTROL BUTTON AND DIALOG BEHAVIOUR Ends -------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	$("#addBill").click(function(event) {
		window.location = "../create/";
	});
	$("#addExpense").click(function(event) {
		window.location = "../createExpense/";
	});

	$("#paid").change(function(event){
		$("#due").val(($("#total_amount").val()-$("#paid").val()).toFixed(2));
	});
});