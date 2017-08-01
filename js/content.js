var embassyURLMapper = {
  "ARGENTINA, BUENOS AIRES": "https://ais.usvisa-info.com/en-ar/niv/information/niv_questions",
  "URUGUAY, MONTEVIDEO": "https://ais.usvisa-info.com/en-uy/niv/information/niv_questions",
  "COLOMBIA, BOGOTA": "https://ais.usvisa-info.com/en-co/niv/information/niv_questions"
}

function fillForm(data) {
  // If embassy page
  if (location.href.indexOf("ais.usvisa-info.com") != -1) {
    var info = formatData(data);

    if (location.href == "https://ais.usvisa-info.com/") {
      console.log('embassy');
      window.location.href = embassyURLMapper[embassy_choice];
    }
    else if (location.href.indexOf("information/niv_questions") != -1) {
      console.log('hello');
      $('label[for="answer_completed_ds160_form"]').click();
      $('input[name="commit"]').click();
    }
    else if (location.href.indexOf("niv/signup") != -1) {
      var email = "application+" + info.first_name.replace(/\s/g,'').latinize() + info.last_name.replace(/\s/g,'').latinize() + '@oliver.ai';
      $('#user_first_name').val(info.first_name.latinize());
      $('#user_last_name').val(info.last_name.latinize());
      $('#user_email').val(email);
      $('#user_email_confirmation').val(email);
      $('#user_password').val('oliverai');
      $('#user_password_confirmation').val('oliverai');
      $('label[for="policy_confirmed"]').click();
      $('.recaptcha-checkbox-checkmark').click();
    }

    return true;
  }

  // Get page parameter in order to determine which function to call
  var match = location.href.match(/\?node\=([A-Za-z0-9]*)$/gm);

  if (match && match.length > 0 && match[0]) {
    var parameter = match[0].split('=')[1];
    var callbackName = 'fillOutPage' + parameter + 'Old';

    console.log(callbackName);

    // If function is found for this page, call it
    var fn = window[callbackName];
    if(typeof fn === 'function') {
        fn(data);
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
