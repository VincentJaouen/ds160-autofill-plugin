function fillForm(data) {
  // Get page parameter in order to determine which function to call
  var match = location.href.match(/\?node\=([A-Za-z0-9]*)$/gm);

  if (match.length > 0 && match[0]) {
    var parameter = match[0].split('=')[1];
    var callbackName = 'fillOutPage' + parameter;
    console.log(callbackName);
    // If function is found for this page, call it
    var fn = window[callbackName];
    if(typeof fn === 'function') {
        fn(data);
        clickNext();
    }
  }
}

$( document ).ready(function() {
  ifStarted(fillForm);

  chrome.runtime.onMessage.addListener(function(request, sender) {
    if(request.from == "background" && request.data) {
      var personalData = request.data;
       storeObject('userData', personalData, fillForm);
     }
   });
});
