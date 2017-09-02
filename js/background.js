function createTab(){
	chrome.storage.local.get('urlList', function (result) {
			var listUrl = JSON.parse(result.urlList);
			chrome.tabs.create({
				 url: "http:"+listUrl[0]
			 });
	});
}

function fetchUserData(userId, tabId, sendResponse) {
	$.ajax({
		type: "GET",
		dataType: 'json',
		url: getAPIUrl(userId),
		success: function(data){
			if(data.length > 0){
				startForm(data, function() {
					chrome.tabs.sendMessage(tabId, {from: "background", data: data});
					sendResponse({"userData": data});
				});
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error " + textStatus);
		}
	});
}

function getAPIUrl(userId) {
	return "https://www.oliver.ai/process_users/" + userId + '.json';
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.from === 'popup' && msg.tabId && msg.userId) {
		fetchUserData(msg.userId, msg.tabId, sendResponse);
  } else if (msg.from === "content" && msg.data) {
		var missing_data = localStorage.getItem("missing_data");
		if (msg.data.length) {
			if (missing_data) {
				var firstData = JSON.parse(missing_data);
				var new_Data = [];
				for (var i in firstData) {
					 var shared = false;
					 for (var j in msg.data)
							 if (msg.data[j].interaction == firstData[i].interaction) {
									 shared = true;
									 break;
							 }
					 if(!shared) new_Data.push(firstData[i]);
				}
				new_Data = new_Data.concat(msg.data);
				localStorage.setItem("missing_data",JSON.stringify(new_Data));
			}else{
				localStorage.setItem("missing_data",JSON.stringify(msg.data));
			}
		}
  }

	return true;
});
