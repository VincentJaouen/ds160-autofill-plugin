const DS160_FIRST_PAGE_URL = "https://ceac.state.gov/GenNIV/General/complete/complete_personal.aspx?node=Personal1";

jQuery(document).ready(function () {
	// chrome.storage.local.clear();

	console.log('ready popupjs');
	ifStarted(showStopButton, showStartButton);

	var tabId = "";
	chrome.tabs.query({active : true, currentWindow: true}, function (tabs) {
		if (isOnDS160Form(tabs[0])) {
			$("#submit_container").show();
			tabId = tabs[0].id;
			var missing_data = JSON.parse(localStorage.getItem("missing_data"));
			if (missing_data && missing_data.length > 0) {
				$("#tbl_results tbody").empty();
				for (var i in missing_data) {
					var row = $('<tr><td class="w-5">' + missing_data[i].interaction + '</td><td class="w-5">' + missing_data[i].value + '</td></tr>');
					$("#tbl_results tbody").append(row);
				}
				$("#submit_container").show();
				$("div.container").show();
			} else {
				$("#tbl_results tbody").empty();
				var row = $('<span style="text-align:center">There is no missing results.</span>');
				$("#tbl_results tbody").append(row);
				$("div.container").show();
			}
		}
	});

	$("#btn_submit").click(function(){
		var userId = $('#user_id').val();
		if(!userId){
			$("#user_id").focus();
			return false;
		} else {
			chrome.extension.sendMessage({from: "popup", tabId: tabId, userId: userId}, function (response) {
				showUserName(response.userData);
				showStopButton();
			});
		}
	});

	$("#btn_stop").click(function() {
		stopForm(function() {
			showStartButton();
		});
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

function isOnDS160Form(tab) {
	return tab.url.indexOf("ceac.state.gov/GenNIV") != -1;
}

function showStopButton() {
	$("#btn_submit").hide();
	$("#btn_stop").show();
}

function showStartButton() {
	$("#btn_submit").show();
	$("#btn_stop").hide();
}
