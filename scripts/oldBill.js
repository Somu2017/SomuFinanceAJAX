$(document).ready(function() {
	$.get('dataLoader?action=getData', function(json) {
		var bill_no = json.billIdx.bill_no;
		$("#spanExpCat").html(json.billIdx.exp_category);
		$("#spanShop").html(json.billIdx.shop);
		$("#spanDate").html(moment(json.billIdx.billDate, "YYYY/MM/DD").format("Do MMM YYYY"));
		$("#spanMOP").html(json.billIdx.modeOfPayment);
		if(json.billIdx.account!==null)
			switch(json.billIdx.account)
			{
				case 'Joy_ESPL' :	$("#spanAcc").html('debited from <span class="bold"> Joydeb Sinha\'s Esplanade Savings Account </span>');
									break;
				case 'Joy_Kon'	: 	$("#spanAcc").html('debited from <span class="bold"> Joydeb Sinha\'s Konnagar Savings Account </span>');
									break;
				case 'Somu_ESPL': 	$("#spanAcc").html('debited from <span class="bold"> Somenath Sinha\'s Esplanade Savings Account </span>');
									break;
			}
		$("#shopName").val($("#spanShop").text());
	},"json");

	$("#dateDiv").hide(0);
	$("#unitDiv").hide(0);

	/*	Code to CONFIRM DELETE Begins --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$('#confirmDelete').click(function(){
		var data = $("#billAdd :input").serialize();
		$.post("dataLoader", data);
		$parentTr = $("#billAdd :input:checked").parents('tr');
		$(".closeDialog").trigger("click");
		$parentTr.slideUp('400');
		$parentTr.prev('.catHead').slideUp('400').delay('400').remove();
		$parentTr.delay('400').remove();
		$("#total_amount").val('0');
		getBill();
	});
	/*	Code to CONFIRM DELETE Ends ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	$("#editPrice").change(function(event){
		if($(this).is(":checked")) {
			$("#mrp").attr('readonly',false);
			$("#sellers_price").attr('readonly',false);
			$("#last_updated_on").attr('readonly',false);
		}
		else
		{
			$("#mrp").attr('readonly',true);
			$("#sellers_price").attr('readonly',true);
			$("#last_updated_on").attr('readonly',true);
		}
	});

	$("#add").click(function(event) {
		var checked = $("#billAdd input:checked").length > 0;
		if(!checked)
		{
			$("#action").val('quickAdd');
			$("#billAdd").submit();
		}
	});

	/*	Code to load the list of items in bill */
	getBill();
	function getBill()
	{
		var total_amount = parseFloat($("#total_amount").val());
		$("#listDB").css('display', 'none');
		$("#listDB").find(".catHead").remove();
		$("#listDB").find(".data").remove();
		$.get('dataLoader?action=getBill', function(json) 
		{
			if(json.listArr.length>0)
			{
				$.each(json.listArr, function() {
					if(this.value.length>0)
					{
						var $tr = $('<tr>', {
							class   : "catHead",
						});
						var $td = $('<td>', {
							class   : "catHead",
							colspan : 11,
							text    : this.category
						});
						$("#listDB").append($tr.append($td));
						
						$.each(this.value, function() {
							var $tr = $('<tr>',{
								class : "data"
							});
							
							var $td = $('<td>', {
								html    : '<input type="checkbox" class="itemCbox" id="selected[]" value="'+this.bill_id+'" name="selected[]" /></td>'
							});$tr.append($td);
							$td = $('<td>', {
								text    : this.id
							});$tr.append($td);
							$td = $('<td>', {
								text    : this.slNo
							});$tr.append($td);
							$td = $('<td>', {
								class : "leftAligned",
								text    : this.item
							});$tr.append($td);
							$td = $('<td>', {
								class 	: "qnty",
								text    : this.qnty
							});$tr.append($td);
							$td = $('<td>', {
								class 	: "unit",
								text    : this.unit
							});$tr.append($td);
							$td = $('<td>', {
								class 	: "pbo",
								text    : this.price_based_on
							});$tr.append($td);
							$td = $('<td>', {
								class 	: "qf",
								text    : this.qf
							});$tr.append($td);
							$td = $('<td>', {
								class 	: "calQnty",
								text    : this.calQnty
							});$tr.append($td);
							$td = $('<td>', {
								class 	: "calUnit",
								text    : this.calUnit
							});$tr.append($td);
							$td = $('<td>', {
								class 	: "price rightAligned",
								text    : "₹"+this.price
							});$tr.append($td);
							total_amount += parseFloat(this.price);

							$("#listDB").append($tr);
						});
					}
				});
			}
			$("#total_amount").val((total_amount).toFixed(2));
		},"json");

		$.get('dataLoader?action=getPaid', function(json) 
		{
			$("#paid").val(json.paid);
			$("#paid").change();
		},"json");

		$("#listDB").fadeIn(500);
	}

	$('.button').click(function(event){
		var checked = $("#billAdd input:checked").length > 0;
		if($(this).val()=="Delete"&&checked) //To confirm Delete
		{
			$("#deleteConfirmDialog").show(200).parent(".dialogBG").fadeIn(200);
			$("#action").val('confirmDelete');
		}
		else if($(this).val()=="Edit"&&checked)
		{
			$("#editItemContainer").show(200).parent(".dialogBG").fadeIn(200);
			$("#action").val('editExternal');
		}
	});

	$(".closeDialog").click(function (e){
		$(this).parent(".dialog").hide('200').parent(".dialogBG").fadeOut('200');
		$('#data')[0].reset();
		validator.resetForm();
	});
	$(".cancelButton").click(function (e){
		$("input:checkbox[name='selected[]']").prop('checked', false);
		$(".closeDialog").click();
	});

	$("#cancelEdit").click(function (e){
		$("input:checkbox[name='selected[]']").prop('checked', false);
		$(".closeDialog").click();
	});

	$('#edit').click(function(){
		$("#action").val("editExternal");
		var data = $("#billAdd :input").serialize();
		$.post("dataLoader", data, function(json) 
		{
			currentRow = json.rowArr[0];
			$("#id").val(currentRow.id);
			$("#id_disp").val(currentRow.id);
			$("#shop").val(currentRow.shop);
			$("#category").val(currentRow.category);
			$("#item").val(currentRow.item);
			$("#qnty").val(currentRow.qnty);
			$("#unit").val(currentRow.unit);
			$("#price_based_on").val(currentRow.price_based_on);
			$("#mrp").val(currentRow.mrp);
			$("#sellers_price").val(currentRow.sellers_price);
			$("#last_updated_on").val(currentRow.last_updated_on);
			$("#qf").val(currentRow.qf);
			$("#calQnty").val(currentRow.calQnty);
			$("#calUnit").val(currentRow.calUnit);
			$("#calPrice").val(currentRow.price);

		},"json");
		$("#action").val('submitEdit');
		$("#editPrice").change();
	});

	$("#editPrice").change(function(event){
		if($(this).is(":checked")) {
			$("#mrp").attr('readonly',false);
			$("#sellers_price").attr('readonly',false);
			$("#last_updated_on").attr('readonly',false);
		}
		else
		{
			$("#mrp").attr('readonly',true);
			$("#sellers_price").attr('readonly',true);
			$("#last_updated_on").attr('readonly',true);

			$("#action").val('editExternal');
			var data = $("#billAdd :input").serialize();
			$.post($("#billAdd").attr('action'), data, function(json) 
			{
				currentRow = json.rowArr[0];
				$("#id").val(currentRow.id);
				$("#id_disp").val(currentRow.id);
				$("#shop").val(currentRow.shop);
				$("#category").val(currentRow.category);
				$("#item").val(currentRow.item);
				$("#qnty").val(currentRow.qnty);
				$("#unit").val(currentRow.unit);
				$("#price_based_on").val(currentRow.price_based_on);
				$("#mrp").val(currentRow.mrp);
				$("#sellers_price").val(currentRow.sellers_price);
				$("#last_updated_on").val(currentRow.last_updated_on);

			},"json");
			$("#action").val('submitEdit');
		}
		calc();
	});

	$("#qf").change(calc);
	$("#sellers_price").change(calc);

	function calc()
	{
		var data="";
		$qnty = $("#calQnty");
		$unit = $("#calUnit");
		$price = $("#calPrice");

		var value = $("#qf").val();
		if(($("#price_based_on").val()=="Kilos")&&($("#unit").val()=="kg"))
		{
			if(value<1)
			{
				$qnty.val((value*1000).toFixed(2));
				$unit.val("gm");
				$price.val(($("#sellers_price").val()*value).toFixed(2));
			}
			else if(value>=1)
			{
				$qnty.val((value*1).toFixed(2));
				$unit.val($("#unit").val());
				$price.val(($("#sellers_price").val()*value).toFixed(2));
			}
		}
		else if(($("#price_based_on").val()=="Kilos")&&($("#unit").val()=="gm"))
		{
			var calQnty = value*$(this).parents("tr").find('.qnty').text();
			if(calQnty>=1000)
			{
				$qnty.val((calQnty/1000).toFixed(2));
				$unit.val("kg");
				$price.val(($("#sellers_price").val()*value).toFixed(2));
			}
			else
			{
				$qnty.val(calQnty.toFixed(2));
				$unit.val($("#unit").val());
				$price.val(($("#sellers_price").val()*value).toFixed(2));
			}
		}
		else
		{
			$qnty.val((value*1).toFixed(2));
			$unit.val($("#price_based_on").val());
			$price.val(($("#sellers_price").val()*value).toFixed(2));
		}
	}

	$("#insertBill").click(function(event) {
		var data = $("#data :input").serialize()+'&action=submitEdit';
		$.post($("#data").attr('action'), data, function(json) 
		{
			if(json.status == 'success')
				$("#message").html('<span class="success">'+json.message+'</span>');
			else
				$("#message").html('<span class="failure">'+json.message+'</span>');
		},'json');
		getBill();
		$("#message").fadeIn(400).delay(1000).fadeOut(400);
		setTimeout(function() {
			$(".cancelButton").click();
		},1500);
	});

	var validator = $("#data").validate({
		rules: {
			qf: {
				number: true
			},
			mrp: {
				number: true
			},
			sellers_price: {
				number: true
			}
		},
		messages: {
			qf : {
				number: '<br> <span class="failure">Enter a valid Quantity Factor</span>'
			},
			mrp : {
				number: '<br> <span class="failure">Enter a valid MRP</span>'
			},
			sellers_price : {
				number: '<br> <span class="failure">Enter a valid Price</span>'
			}
		}
	});

	$("#total_amount").change(function(event){
		$("#due").val(($("#total_amount").val()-$("#paid").val()).toFixed(2));
	});
	$("#paid").change(function(event){
		$("#due").val(($("#total_amount").val()-$("#paid").val()).toFixed(2));
	});

	$("#updateAmounts").click(function(event){
		var data = $("#billAmount :input").serialize()+'&action=submitBillAmount';
		$.post($("#billAmount").attr('action'), data, function(json) 
		{
			if(json.status == 'success')
				$("#billMessage").html('<span class="success">'+json.message+'</span>');
			else
				$("#billMessage").html('<span class="failure">'+json.message+'</span>');
		},'json');
		$("#billMessage").fadeIn(400).delay(2000).fadeOut(400);
	});

});