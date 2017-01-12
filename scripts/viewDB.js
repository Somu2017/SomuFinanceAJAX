$(document).ready(function() {

	/*	Code to Generate the categories in the dropdown list Begins ----------------------------------------------------------------------------------------------------------------------------------------------------*/
	var catArr=[];
	$search=null;
	$.get("viewData.php?action=getCat", function(json) {
		if(json.catArr.length>0)
			$.each(json.catArr, function() 
			{
				catArr.push(this.category);
			});

		$.each(catArr, function(index, el) {
			$("#category_selector").append($('<option>', { 
		        value: el,
		        text : el
		    }));
		});

		$("#category_selector").trigger('change');

	}, 'json');
	/*	Code to Generate the categories in the dropdown list Ends ----------------------------------------------------------------------------------------------------------------------------------------------------*/

	/*	Code to SWITCH BETWEEN BUTTON CLICKS Begins ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$('.button').click(function(event){
		var checked = $("#list input:checked").length > 0;
		if($(this).val()=="Delete"&&checked) //To confirm Delete
		{
			$("#deleteConfirmDialog").show(200).parent(".dialogBG").fadeIn(200);
			$("#action").val('confirmDelete');
		}
		else if($(this).val()=="Edit"&&checked)
		{
			$("#addItemContainer").show(200).parent(".dialogBG").fadeIn(200);
			$("#action").val('edit');
		}
		else if($(this).val()=="Search")
		{
			if($search!==null)
				$search.remove();
			$("#unitDiv").slideUp();
			$("#dateDiv").slideUp();
			$("#criteriaDiv").slideDown();
			$("#searchDialog").show(200).parent(".dialogBG").fadeIn(200);
			$("#action").val('search');
				$search = $('<option>',{
				value: "Search",
				selected : 'true',
				text : "Search..."
			});
			$("#category_selector").append($search);
		}
	});
	/*	Code to SWITCH BETWEEN BUTTON CLICKS Ends --------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	/*	Code to DISPLAY ITEMS IN THE DATABASE Begins -----------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$("#category_selector").change(function(event) {
		if($search!==null)
		{
			$search.remove();
			$search = null;
		}
		$("#listDB").css('display', 'none');
		$("#listDB").find(".catHead").remove();
		$("#listDB").find(".data").remove();
		if($(this).val()=="Search")
			if(!$("#searchDialog").is(":visible"))
			{
				$("#showSearch").trigger('click');
				return;
			}

		$("#action").val('getList');
		var data = $("#list :input").serialize();
		$.post($("#list").attr('action'), data, function(json) 
		{
			if(json.listArr.length>0)
			{
				$.each(json.listArr, function() {
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
							html    : '<input type="checkbox" id="selected[]" value="'+this.id+'" name="selected[]" /></td>'
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.id
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.catCount
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.shop
						});$tr.append($td);
						$td = $('<td>', {
							class : "leftAligned",
							text    : this.item
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.qnty
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.unit
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.price_based_on
						});$tr.append($td);
						$td = $('<td>', {
							class 	: "rightAligned",
							text    : "₹"+this.mrp
						});$tr.append($td);
						$td = $('<td>', {
							class 	: "rightAligned",
							text    : "₹"+this.sellers_price
						});$tr.append($td);

						var formattedDate = new Date(this.last_updated_on);
						var d = formattedDate.getDate();
						var m =  formattedDate.getMonth();
						m += 1;  // JavaScript months are 0-11
						var y = formattedDate.getFullYear();
						var date = (d<10?"0":"")+d+"-"+(m<10?"0":"")+m+"-"+y;
						$td = $('<td>', {
							text    : date
						});$tr.append($td);

						$("#listDB").append($tr);
					});
				});
			}
		},"json");
		$("#listDB").fadeIn(500);
	});	
	/*	Code to display items in the database Ends -------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	/*	Code to CONFIRM DELETE Begins --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$('#confirmDelete').click(function(){
		var data = $("#list :input").serialize();
		$.post($("#list").attr('action'), data);
		$parentTr = $("#list :input:checked").parents('tr');
		$(".closeDialog").trigger("click");
		$parentTr.slideUp('400').delay('400').remove();
	});
	/*	Code to CONFIRM DELETE Ends ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	/*	Code to Edit Begins ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$('#edit').click(function(){
		var data = $("#list :input").serialize();
		$.post($("#list").attr('action'), data, function(json) 
		{
			currentRow = json.rowArr[0];
			$("#id").val(currentRow.id);
			$("#id_disp").val(currentRow.id);
			$("#shop").val(currentRow.shop);
			$("#category").val(currentRow.category);
			$("#item").val(currentRow.item);
			$("#qnty").val(currentRow.qnty);
			$("#unit").val(currentRow.unit);

			$("#price_based_on").children('option').each(function(index, el) {
				if(this.value.toUpperCase()==currentRow.price_based_on.toUpperCase())
					$(this).attr("selected", true);
			});

			$("#mrp").val(currentRow.mrp);
			$("#sellers_price").val(currentRow.sellers_price);
			$("#last_updated_on").val(currentRow.last_updated_on);

		},"json");
		$("#action").val('submitEdit');
	});

	$("#update").click(function(event) {
		var data = $("#data :input").serialize()+"&action=submitEdit";
		$.post($("#data").attr('action'), data, function(json)
		{
			if(json.status == 'success')
				$("#message").html('<span class="success">'+json.message+'</span>');
			else
				$("#message").html('<span class="failure">'+json.message+'</span>');
			$("#message").fadeIn(400).delay(1000).fadeOut(400);
			$("#category_selector").trigger('change');
			setTimeout(function() {
				$(".cancelButton").click();
			},1500);
		},"json");
	});
	/*	Code to Edit Ends --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	/*	Code to POPULATE SEARCH DIALOG Begins ------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$("#field").change(function(event) {
		var shopArr=[];
		var itemArr=[];
		var unitArr=[];
		var pboArr=[];
		reload_suggestions(shopArr,'shop');
		reload_suggestions(itemArr,'item');
		reload_suggestions(unitArr,'unit');
		reload_suggestions(pboArr,'price_based_on');

		$unit=null;
		$date=null;
		if($("#field").val()=="qnty")
		{
			$("#dateDiv").slideUp();
			$("#criteriaDiv").slideDown();
			$("#unitDiv").slideDown();
			$("#unitCriteria").autocomplete({
		      source: unitArr
		    });
		}
		else if($("#field").val()=="last_updated_on")
		{
			$("#criteriaDiv").slideUp();
			$("#unitDiv").slideUp();
			$("#dateDiv").slideDown();
		}
		else if($("#field").val()=="shop")
		{
			$("#unitDiv").slideUp();
			$("#dateDiv").slideUp();
			$("#criteria").autocomplete({
		      source: shopArr
		    });
		}
		else if($("#field").val()=="item")
		{
			$("#unitDiv").slideUp();
			$("#dateDiv").slideUp();
			$("#criteria").autocomplete({
		      source: itemArr
		    });
		}
		else if($("#field").val()=="price_based_on")
		{
			$("#unitDiv").slideUp();
			$("#dateDiv").slideUp();
			$("#criteria").autocomplete({
		      source: pboArr
		    });
		}
		else
		{
			$("#unitDiv").slideUp();
			$("#dateDiv").slideUp();
			$("#criteriaDiv").slideDown();
		}
	});
	/*	Code to POPULATE SEARCH DIALOG Ends --------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	/*	Code to AUTOCOMPLETE IN SEARCH Begins ------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	function reload_suggestions(arr,field)
	{
		var data="field="+field;
		$.post("../insertItem/insertAutocomplete.php", data, function(json) {
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
		$("#listDB").css('display', 'none');
		$("#listDB").find(".catHead").remove();
		$("#listDB").find(".data").remove();
		$("#action").val('submitSearch');

		var data = $("#searchForm :input").serialize()+'&action=submitSearch';
		$.post($("#searchForm").attr('action'), data, function(json) 
		{
			if(json.listArr.length>0)
			{
				$.each(json.listArr, function() {
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
							html    : '<input type="checkbox" id="selected[]" value="'+this.id+'" name="selected[]" /></td>'
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.id
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.catCount
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.shop
						});$tr.append($td);
						$td = $('<td>', {
							class : "leftAligned",
							text    : this.item
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.qnty
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.unit
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.price_based_on
						});$tr.append($td);
						$td = $('<td>', {
							class 	: "rightAligned",
							text    : "₹"+this.mrp
						});$tr.append($td);
						$td = $('<td>', {
							class 	: "rightAligned",
							text    : "₹"+this.sellers_price
						});$tr.append($td);

						var formattedDate = new Date(this.last_updated_on);
						var d = formattedDate.getDate();
						var m =  formattedDate.getMonth();
						m += 1;  // JavaScript months are 0-11
						var y = formattedDate.getFullYear();
						var date = (d<10?"0":"")+d+"-"+(m<10?"0":"")+m+"-"+y;
						$td = $('<td>', {
							text    : date
						});$tr.append($td);

						$("#listDB").append($tr);
					});
				});
			}
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
		if($("#action").val()!='submitSearch'&&$search!==null)
			$search.remove();
		$('#searchForm')[0].reset();
	});
	$(".cancelButton").click(function (e){
		$("input:checkbox[name='selected[]']").prop('checked', false);
		$(".closeDialog").click();
	});

	$("#cancelEdit").click(function (e){
		alert("working");
		$("input:checkbox[name='selected[]']").prop('checked', false);
		$(".closeDialog").click();
	});
	/*	Code to CONTROL BUTTON AND DIALOG BEHAVIOUR Ends -------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	/*	Code to VALIDATE DATA IN FORM - DATA Begins ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$( "#data" ).validate({
		rules: {
			qnty: {
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
			qnty : {
				number: '<br> <span class="failure err">Enter a valid quantity</span>'
			},
			mrp : {
				number: '<br> <span class="failure err">Enter a valid MRP</span>'
			},
			sellers_price : {
				number: '<br> <span class="failure err">Enter a valid Price</span>'
			}
		}
	});
	/*	Code to VALIDATE DATA IN FORM - DATA Ends --------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

});