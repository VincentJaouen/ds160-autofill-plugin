var embassyURLMapper = {
  "ARGENTINA, BUENOS AIRES": "https://ais.usvisa-info.com/en-ar/niv/information/niv_questions",
  "URUGUAY, MONTEVIDEO": "https://ais.usvisa-info.com/en-uy/niv/information/niv_questions",
  "COLOMBIA, BOGOTA": "https://ais.usvisa-info.com/en-co/niv/information/niv_questions"
}

function setEmbassyDOB(dob) {
  var dates = dob.split('/');
  $("#applicant_date_of_birth_3i").val(parseInt(dates[0]));
  $("#applicant_date_of_birth_2i").val(parseInt(dates[1]));
  $("#applicant_date_of_birth_1i").val(parseInt(dates[2]));
}

function fillEmbassy(info) {
  if (location.href == "https://ais.usvisa-info.com/") {
    window.location.href = embassyURLMapper[embassy_choice];
  }
  else if (location.href.indexOf("information/niv_questions") != -1) {
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
  else if (location.href.indexOf("applicants/new") != -1) {
    var email = "application+" + info.first_name.replace(/\s/g,'').latinize() + info.last_name.replace(/\s/g,'').latinize() + '@oliver.ai';
    fillTextInput("applicant[first_name]", info.first_name, false, false);
    fillTextInput("applicant[last_name]", info.last_name, false, false);
    findInSelect("applicant_passport_country_code", info.passport_country);
    findInSelect("applicant_birth_country_code", info.country_of_birth);
    fillTextInput("applicant[passport_number]", info.passport_number);
    setSelectValue("applicant_visa_class_id", "B1/B2 Business & Tourism (Temporary visitor)");
    setEmbassyDOB(info.DOB);
    findInSelect("applicant_gender", info.gender);
    fillTextInput("applicant[phone1]", info.phone_number, false, false);
    fillTextInput("applicant[email_address]", email, false, false);

    if (info.ustravel_yn == "No") {
      checkBox("applicant_is_a_renewal_false");
    }
    else {
      checkBox("applicant_is_a_renewal_true");
    }
  }
  else if (location.href.indexOf("courier") != -1) {
    findInSelect("group_delivery_address_id", info.pickup_location_Argentina);
    fillTextInput("group[care_of]", info.PickUp_Person);
  }

  return true;
}

function fillDS(data) {
  // If page is index, set location as Argentina
  var dropdown = document.getElementById('ctl00_SiteContentPlaceHolder_ucLocation_ddlLocation');
  if(dropdown && dropdown.value == '') {
    dropdown.value = "BNS";
    dropdown.dispatchEvent(new Event("change"));
  }
  
  var securityQuestionInput = document.getElementById('ctl00_SiteContentPlaceHolder_txtAnswer');
  console.log('elem', securityQuestionInput);

  if (securityQuestionInput) {
    securituQuestionInput.val('PASSPAL');
    clickContinue();
  }

  // Get page parameter in order to determine which function to call
  var match = location.href.match(/\?node\=([A-Za-z0-9]*)$/gm);

  if (match && match.length > 0 && match[0]) {
    var parameter = match[0].split('=')[1],
      mapper = InputMapper[parameter];
    if(mapper) {
      var iterator = new MapperIterator(inputMapper[parameter]);
      fillFromMapperIterator(iterator, data);
      clickNext();
    }
    else {
      console.log('No mapper');
    }
  }
}

function fillForm(info) {
  // If embassy page
  if (location.href.indexOf("ais.usvisa-info.com") != -1) {
    fillEmbassy(info);
  }

  if(location.href.indexOf("ceac.state.gov") != -1) {
    fillDS(info);
  }
}



$( document ).ready(function() {
  ifStarted(fillForm);

  chrome.runtime.onMessage.addListener(function(request, sender) {
    if(request.from == "background" && request.data) {
      var personalData = request.data;
      storeObject('data', personalData, fillForm);
    }
   });
});
