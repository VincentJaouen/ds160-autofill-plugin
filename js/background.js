function createTab(){
	chrome.storage.local.get('urlList', function (result) {
			var listUrl = JSON.parse(result.urlList);
			chrome.tabs.create({
				 url: "http:"+listUrl[0]
			 });
	});
}

function fetchApplicationData(applicationId, tabId, sendResponse) {
	$.ajax({
		type: "GET",
		dataType: 'json',
		url: "https://www.passpal.co/applications/" + applicationId + '.json',
		success: function(application) {
			fetchGroupData(application.user_id, application.data, tabId, sendResponse);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error " + textStatus);
		}
	});
}

function fetchGroupData(userId, appData, tabId, sendResponse) {
  $.ajax({
    type: "GET",
    dataType: 'json',
    url: "https://www.passpal.co/users/data?user_id=" + userId,
    success: function(userData) {
      var data = Object.assign(appData, userData);
			startForm(data, function() {
			  chrome.tabs.sendMessage(tabId,
          { from: "background", data: data});
				sendResponse({"data": data});
			});
    }
  });
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.from === 'popup' && msg.tabId && msg.applicationId) {
		fetchApplicationData(msg.applicationId, msg.tabId, sendResponse);
  }

	return true;
});
