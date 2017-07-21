const DS160_FIRST_PAGE_URL = "https://ceac.state.gov/GenNIV/General/complete/complete_personal.aspx?node=Personal1";

jQuery(document).ready(function () {
	var tabId = "";
	chrome.tabs.query({active : true, currentWindow: true}, function (tabs) {
		if(tabs[0].url == DS160_FIRST_PAGE_URL){
			$("#submit_container").show();
			tabId = tabs[0].id;
		}
		if(tabs[0].url.indexOf("ceac.state.gov/GenNIV")!=-1){
			var missing_data = JSON.parse(localStorage.getItem("missing_data"));
			if(missing_data && missing_data.length > 0) {
				$("#tbl_results tbody").empty();
				for(var i in missing_data){
					var row = $('<tr><td class="w-5">' + missing_data[i].interaction + '</td><td class="w-5">' + missing_data[i].value + '</td></tr>');
					$("#tbl_results tbody").append(row);
				}
				$("#submit_container").show();
				$("div.container").show();
			}else {
				$("#tbl_results tbody").empty();
				var row = $('<span style="text-align:center">There is no missing results.</span>');
				$("#tbl_results tbody").append(row);
				$("div.container").show();
			}
		}
	});

	chrome.storage.sync.get("startStatus", function (obj) {
		console.log(obj);
		if (obj.startStatus=="true") {
			$("#btn_stop").show();
			$("#btn_restart").hide();
		} else if(obj.startStatus=="pause") {
			$("#btn_restart").show();
			$("#btn_stop").hide();
		} else {
			$("#btn_restart").hide();
			$("#btn_stop").hide();
		}
	});

	$("#btn_stop").click(function() {
		chrome.storage.sync.set({'startStatus': 'pause'});
		$("#btn_stop").hide();
		$("#btn_restart").show();
	});

	$("#btn_restart").click(function(){
		chrome.storage.sync.set({'startStatus': 'true'});
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    var tab = tabs[0];
	    console.log(tab.url, tab.title);
	    chrome.tabs.getSelected(null, function(tab) {
	    	chrome.extension.sendMessage({from: "restart", tabId: tab.id});
	    });
		});

		$("#btn_stop").show();
		$("#btn_restart").hide();
	});

	function ConvertToCSV(objArray) {
     var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     var str = '';
     for (var i = 0; i < array.length; i++) {
         var line = '';
         for (var index in array[i]) {
             if (line != '') line += ','

             line += array[i][index];
         }
         str += line + '\r\n';
     }
     return str;
  }

	$("#btn_csv").click(function(){
		var missing_data = JSON.parse(localStorage.getItem("missing_data"));
		if(missing_data){
		 window.total = [];
		 total.push({
			 interactionname: "Interaction Name",
			 type: "Example Data"
		 });

		 for (var i=0 ; i < missing_data.length ; i++) {
			 total.push({
				 interactionname: missing_data[i].interaction,
				 type: missing_data[i].value
			 });
		 }
		 var csv = (ConvertToCSV(total));
		 var date = (new Date()).toString().split('(')[0].split(' ');
		 var dateX = date[1]+' '+date[2]+' '+date[3]+' '+date[4];
		 var link = '<a href="data:text/csv;charset=utf-8,\uFEFF'+encodeURI(csv)+'" download="'+dateX+'.csv">Download CSV</a>';
		 downloadLink = document.createElement('a');
		 downloadLink.download = dateX+".csv";
		 downloadLink.href = 'data:text/csv;charset=utf-8,\uFEFF'+encodeURI(csv);
		 document.body.appendChild(downloadLink);
		 downloadLink.click();
		 document.body.removeChild(downloadLink);
		 localStorage.removeItem("missing_data");
		}
	});

	$("#btn_submit").click(function(){
		if(!$("#user_id").val()){
			$( "#user_id" ).focus();
			return false;
		} else {
			var user_id = $('#user_id').val();
			chrome.extension.sendMessage({from: "popup", tabId: tabId, url: getAPIUrl(user_id)}, function (response) {
				console.log('response:');
				showUserName(response.userData);
				$("#btn_stop").show();
				$("#btn_restart").hide();
			});
		}
	});
});

function showUserName(userData) {
	var name = '';
	for (var i = 0 ; i < userData.length ; ++i) {
		var interaction = userData[i].interaction;
		if (interaction == "first_name" || interaction == "last_name") {
			name += userData[i].value;
		}
	}
	$('#user_name').html('<h3>' + name + '</h3>');
}

function getAPIUrl(user_id) {
	return "https://www.oliver.ai/process_users/" + user_id + '.json';
}
