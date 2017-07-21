function createTab(){
	chrome.storage.local.get('urlList', function (result) {
			var listUrl = JSON.parse(result.urlList);
			chrome.tabs.create({
				 url: "http:"+listUrl[0]
			 });
	});
}
chrome.runtime.onMessage.addListener(function (msg, sender,sendResponse) {
	console.log(msg.from);
	console.log(msg.tabId);
  if ((msg.from === 'popup') && (msg.tabId) && msg.url) {
  	$.ajax({
	    type: "GET",  
	    dataType: 'json',
	    url: msg.url,
	    success: function(data){
	    	console.log(data);
	    	if(data.length){
	    		localStorage.setItem("personalData", JSON.stringify(data));
	    		chrome.tabs.sendMessage(msg.tabId, {from: "background", data: data});
	    	}
    	},
    	error: function(XMLHttpRequest, textStatus, errorThrown) { 
        	//alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        	console.log("error");
    	}
	});
  }else if(msg.from==="restart" && (msg.tabId)){
  	chrome.tabs.sendMessage(msg.tabId, {from: "restart"});
  }else if(msg.from=="content" && msg.data){
		console.log(msg.data);
		var missing_data = localStorage.getItem("missing_data");
		console.log(missing_data);
		if(msg.data.length){
			if(missing_data){
				var firstData = JSON.parse(missing_data);
				var new_Data = [];
				for(var i in firstData){
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
});


