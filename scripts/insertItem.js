$(document).ready(function() {

	reload_date();
	function reload_date()
	{
		$.get('addItem.php?action=getDate', function(json) {
			$('#last_updated_on').val(json.date);
		},'json');
	}

	$("#insertButton").click(function(event) {
		var data = $("#data :input").serialize()+"&action=addItem";
		$.post($("#data").attr('action'), data, function(json)
		{
			if(json.status == 'success')
			{
				$("#message").html('<span class="success">'+json.message+'</span>');
				$('#data')[0].reset();
				reload_date();
			}
			else
				$("#message").html('<span class="failure">'+json.message+'</span>');
			$("#message").fadeIn(400).delay(3000).fadeOut(400);					
		},"json");
	});

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

	var shopArr=[];
	var catArr=[];
	var itemArr=[];
	var unitArr=[];

	reload_suggestions(shopArr,'shop');
	reload_suggestions(catArr,'category');
	reload_suggestions(itemArr,'item');
	reload_suggestions(unitArr,'unit');

	$("#shop").autocomplete({
      source: shopArr
    });
    $("#category").autocomplete({
      source: catArr
    });
    $("#item").autocomplete({
      source: itemArr
    });
    $("#unit").autocomplete({
      source: unitArr
    });
});