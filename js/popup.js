jQuery(document).ready(function () {
	ifStarted(showStopButton, showStartButton);

	var tabId = "";
	chrome.tabs.query({active : true, currentWindow: true}, function (tabs) {
		if (isOnDS160Form(tabs[0])) {
			$("#submit_container").show();
			tabId = tabs[0].id;
		}
	});

	$("#btn_submit").click(function(){
		var applicationId = $('#application-id').val();
		if(!applicationId) {
			$("#application-id").focus();
			return false;
		}
    else {
			chrome.extension.sendMessage({from: "popup", tabId: tabId, applicationId: applicationId}, function (response) {
				showUserName(response.data);
				showStopButton();
			});
		}
	});

	$("#btn_stop").click(function() {
		stopForm(function() {
			showStartButton();
		});
	});

});

function showUserName(data) {
	var name = data.first_name + ' ' + data.last_name;
  $('#user-name').html(name);
	return name;
}

function isOnDS160Form(tab) {
	return (tab.url.indexOf("ceac.state.gov/GenNIV") != -1 || tab.url.indexOf("ais.usvisa-info.com") != -1);
}

function showStopButton() {
	$("#btn_submit").hide();
	$("#btn_stop").show();
}

function showStartButton() {
	$("#btn_submit").show();
	$("#btn_stop").hide();
}
