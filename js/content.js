var embassyURLMapper = {
  "ARGENTINA, BUENOS AIRES": "https://ais.usvisa-info.com/en-ar/niv/information/niv_questions",
  "URUGUAY, MONTEVIDEO": "https://ais.usvisa-info.com/en-uy/niv/information/niv_questions",
  "COLOMBIA, BOGOTA": "https://ais.usvisa-info.com/en-co/niv/information/niv_questions"
}

function setEmbassyDate(date, elementPartialId) {
  var dates = date.split('/');
  $("#" + elementPartialId + "_3i").val(parseInt(dates[0]));
  $("#" + elementPartialId + "_2i").val(parseInt(dates[1]));
  $("#" + elementPartialId + "_1i").val(parseInt(dates[2]));
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

    getElement("applicant_first_name").val(info.first_name);
    getElement("applicant_last_name").val(info.last_name);

    var countrySelect = document.getElementById("applicant_passport_country_code");
    fillOutSelectElement(countrySelect, info.passport_country);
    var birthCountrySelect = document.getElementById("applicant_birth_country_code");
    fillOutSelectElement(birthCountrySelect, info.country_of_birth);
    getElement("applicant_passport_number").val(info.passport_number);

    var visaTypeSelect = document.getElementById("applicant_visa_class_id");
    visaTypeSelect.value = 2; 

    setEmbassyDate(info.DOB, "applicant_date_of_birth");

    var genderSelect = document.getElementById("applicant_gender");
    genderSelect.value = info.gender == "male" ? "M" : "F";

    getElement("applicant_phone1").val(info.phone_number);
    getElement("applicant_email_address").val(email);

    if (info.previous_visa_yn == "No") {
      checkElement("applicant_is_a_renewal_false");
    }
    else {
      checkElement("applicant_is_a_renewal_true");
      setEmbassyDate(info.previousvisa_issuedate, "applicant_visa_issue_date");
      setEmbassyDate(info.previousvisa_expiration, "applicant_visa_expiration_date");
    }
  }

  return true;
}

function fillDS(data) {
  console.log(data);
  // If page is index, set location as Argentina
  var dropdown = document.getElementById('ctl00_SiteContentPlaceHolder_ucLocation_ddlLocation');
  if(dropdown && dropdown.value == '') {
    dropdown.value = "BNS";
    dropdown.dispatchEvent(new Event("change"));
  }
  
  var securityQuestionInput = document.getElementById('ctl00_SiteContentPlaceHolder_txtAnswer');
  if (securityQuestionInput) {
    securityQuestionInput.value = 'PASSPAL';
    clickContinue();
  }

  // Get page parameter in order to determine which function to call
  var match = location.href.match(/\?node\=([A-Za-z0-9]*)$/gm);

  if (match && match.length > 0 && match[0]) {
    var parameter = match[0].split('=')[1],
      mapper = InputMapper[parameter],
      errors = errorsPresent();
    if(mapper && !errors) {
      var iterator = new MapperIterator(InputMapper[parameter]);
      fillFromMapperIterator(iterator, data);
      //clickNext(mapper.length * 1000);
    }
    else if(!mapper && !errors) {
      clickNext();
      console.log('No mapper, clickNext');
    }
    else {
      console.log('Error in page');
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
