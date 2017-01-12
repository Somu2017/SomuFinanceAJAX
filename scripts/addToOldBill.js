$(document).ready(function() {
	/*	Code to Generate the categories in the dropdown list Begins ----------------------------------------------------------------------------------------------------------------------------------------------------*/
	var catArr=[];
	$search=null;
	$.get("addToBill.php?action=getCat", function(json) {
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
						colspan : 14,
						text    : this.category
					});
					$("#listDB").append($tr.append($td));

					$.each(this.value, function() {
						var $tr = $('<tr>',{
							class : "data"
						});
						
						var $td = $('<td>', {
							html    : '<input type="checkbox" class="itemCbox" id="selected[]" value="'+this.id+'" name="selected[]" /></td>'
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.id
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.catCount
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
							class 	: "rightBorder",
							text    : date
						});$tr.append($td);

						var $qf = $("<input>",{
							type 	: "text",
							class 	: "qfStyle",
							id 		: "text"+this.id,
							name 	: "text"+this.id,
							disabled: true
						});$td = $("<td>");$td.append($qf);$tr.append($td);

						var $qnty = $("<input>",{
							type 	: "text",
							class 	: "textStyle",
							id 		: "qnty"+this.id,
							name	: "qnty"+this.id,
							value   : "--",
							disabled: true,
							readonly: true
						});$td = $("<td>");$td.append($qnty);$tr.append($td);

						var $unit = $("<input>",{
							type 	: "text",
							class 	: "textStyle",
							id 		: "unit"+this.id,
							name	: "unit"+this.id,
							value    : "--",
							disabled: true,
							readonly: true
						});$td = $("<td>");$td.append($unit);$tr.append($td);

						var $price = $("<input>",{
							type 	: "text",
							class 	: "textStyle rightAligned",
							id 		: "price"+this.id,
							name	: "price"+this.id,
							value   : "0.00",
							disabled: true,
							readonly: true
						});$td = $("<td>₹</td>");$td.append($price);$tr.append($td);

						$("#listDB").append($tr);
					});
				});
			}
		},"json");
		$("#listDB").fadeIn(500);
	});	
	/*	Code to display items in the database Ends -------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	$("#listDB").on("click", ".itemCbox", function(event) {
		var id = this.value;
		$text = $("#text"+id);
		$qnty = $("#qnty"+id);
		$unit = $("#unit"+id);
		$price = $("#price"+id);

		if ($(this).is(':checked')) 
		{
			$text.css('background-color', '#fff');
			$text.attr('disabled', false);
			$qnty.attr('disabled', false);
			$unit.attr('disabled', false);
			$price.attr('disabled', false);
		}
		else
		{
			$text.css('background-color', 'rgba(0,0,0,0)');
			$text.attr('disabled', true);
			$qnty.attr('disabled', true);
			$unit.attr('disabled', true);
			$price.attr('disabled', true);
			$text.val('');
			$qnty.val('--');
			$unit.val('--');
			$price.val('0.00');
		}
	});

	$("#listDB").on("change", ".qfStyle", function(event) {
		var id = $(this).parents("tr").find('.itemCbox').val();
		var data="";
		$qnty = $("#qnty"+id);
		$unit = $("#unit"+id);
		$price = $("#price"+id);

		var value = this.value;
		if(($(this).parents("tr").find('.pbo').text()=="Kilos")&&($(this).parents("tr").find('.unit').text()=="kg"))
		{
			if(this.value<1)
			{
				$qnty.val((this.value*1000).toFixed(2));
				$unit.val("gm");

				data = "action=getPrice&id="+id;
				$.post("addToBill.php", data, function(json) {
					$price.val((json.price*value).toFixed(2));
				}, 'json');
			}
			else if(this.value>=1)
			{
				$qnty.val((this.value*1).toFixed(2));
				$unit.val($(this).parents("tr").find('.unit').text());

				data = "action=getPrice&id="+id;
				$.post("addToBill.php", data, function(json) {
					$price.val((json.price*value).toFixed(2));
				}, 'json');
			}
		}
		else if(($(this).parents("tr").find('.pbo').text()=="Kilos")&&($(this).parents("tr").find('.unit').text()=="gm"))
		{
			var calQnty = this.value*$(this).parents("tr").find('.qnty').text();
			if(calQnty>=1000)
			{
				$qnty.val((calQnty/1000).toFixed(2));
				$unit.val("kg");

				data = "action=getPrice&id="+id;
				$.post("addToBill.php", data, function(json) {
					$price.val((json.price*value).toFixed(2));
				}, 'json');
			}
			else
			{
				$qnty.val(calQnty.toFixed(2));
				$unit.val($(this).parents("tr").find('.unit').text());

				data = "action=getPrice&id="+id;
				$.post("addToBill.php", data, function(json) {
					$price.val((json.price*value).toFixed(2));
				}, 'json');
			}
		}
		else
		{
			$qnty.val((this.value*1).toFixed(2));
			$unit.val($(this).parents("tr").find('.pbo').text());

			data = "action=getPrice&id="+id;
			$.post("addToBill.php", data, function(json) {
				$price.val((json.price*value).toFixed(2));
			}, 'json');
		}
	});

	$("#add").click(function(event) {
		var checked = $("#list input:checked").length > 0;
		if(checked)
		{
			$("#action").val('addItems');
			var data = $("#list :input").serialize();
			$.post($("#list").attr('action'), data, function(json) 
			{
				if(json.status=="success")
				{
					$("#insertMessage").css('background-color', '#88CC88');
				}
				else
				{
					$("#insertMessage").css('background-color', '#e8a7ae');
				}
				$("#insertMessage").children('p').remove();
				$p = $("<p>");$p.append(json.message);
				$("#insertMessage").append($p);
			},"json");
			$("#insertMessage").show(400).parent(".dialogBG").fadeIn(200).delay(1500).fadeOut(400);
			setTimeout(function(){
				$("#cancelInsert").trigger('click');
			},1500);
		}	
	});

	$('.button').click(function(event){
		var checked = $("#list input:checked").length > 0;
		if($(this).val()=="Edit and Add"&&checked)
		{
			$("#editItemContainer").show(200).parent(".dialogBG").fadeIn(200);
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

	function reload_suggestions(arr,field)
	{
		var data="field="+field;
		$.post("../../insertItem/insertAutocomplete.php", data, function(json) {
			if(json.fieldArr.length>0)
				$.each(json.fieldArr, function() 
				{
					arr.push(this[field]);
				});
		}, 'json');

	}

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
							html    : '<input type="checkbox" class="itemCbox" id="selected[]" value="'+this.id+'" name="selected[]" /></td>'
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.id
						});$tr.append($td);
						$td = $('<td>', {
							text    : this.catCount
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
							class 	: "rightBorder",
							text    : date
						});$tr.append($td);

						var $qf = $("<input>",{
							type 	: "text",
							class 	: "qfStyle",
							id 		: "text"+this.id,
							name 	: "text"+this.id,
							disabled: true
						});$td = $("<td>");$td.append($qf);$tr.append($td);

						var $qnty = $("<input>",{
							type 	: "text",
							class 	: "textStyle",
							id 		: "qnty"+this.id,
							name	: "qnty"+this.id,
							value   : "--",
							disabled: true,
							readonly: true
						});$td = $("<td>");$td.append($qnty);$tr.append($td);

						var $unit = $("<input>",{
							type 	: "text",
							class 	: "textStyle",
							id 		: "unit"+this.id,
							name	: "unit"+this.id,
							value    : "--",
							disabled: true,
							readonly: true
						});$td = $("<td>");$td.append($unit);$tr.append($td);

						var $price = $("<input>",{
							type 	: "text",
							class 	: "textStyle rightAligned",
							id 		: "price"+this.id,
							name	: "price"+this.id,
							value   : "0.00",
							disabled: true,
							readonly: true
						});$td = $("<td>");$td.append($price);$tr.append($td);

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

	$(".closeDialog").click(function (e){
		$(this).parent(".dialog").hide('200').parent(".dialogBG").fadeOut('200');
		if($("#action").val()!='submitSearch'&&$search!==null)
			$search.remove();
		$('#searchForm')[0].reset();
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
			$("#price_based_on").val(currentRow.price_based_on);
			$("#mrp").val(currentRow.mrp);
			$("#sellers_price").val(currentRow.sellers_price);
			$("#last_updated_on").val(currentRow.last_updated_on);

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

			$("#action").val('edit');
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
			var calQnty = value*$("#qnty").val();
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
		$("#category_selector").trigger('change');
		$("#message").fadeIn(400).delay(1000).fadeOut(400);
		setTimeout(function() {
			$(".cancelButton").click();
		},1500);
	});

	var validator = $( "#data" ).validate({
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

	$("#back").click(function(event) {
		window.location = "../oldBill";
	});

	$("#cancelInsert").click(function(event){
		$("input:checked[name='selected[]']").each(function () {
			$(this).trigger('click');
			$(".closeDialog").trigger('click');
		});
	});
});