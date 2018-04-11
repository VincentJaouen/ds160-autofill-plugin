var inputMapper = {
  "APP_GIVEN_NAME": { data: "first_name", helper: "fillTextInput" },
  "APP_GENDER": { data: "gender", helper: "checkGender" }
};

function fillPageFromMapper(mapper, data) {
  console.log(data);
  for (var interaction in mapper) {
    var value = data[interaction], input = mapper[interaction];
    // If data is given and not empty, fill out input in form
    if (value && value != '') {
      // find helper function and call it with the value
      var fn = window[input.helper];
      if(typeof fn === 'function') {
        // If helper return true, filling was successful
        if (fn(input.selector, value)) {
          missing = false;
        }
      }
      else {
        console.log('HELPER ' + input.helper + ' NOT FOUND !!!!');
      }
    }
    // If value is missing, set default value
    // if (missing) {
    //   fn(input.selector, null);
    // }
  }
}

function fillOutPageSecureQuestionOld(personalData) {
  fillTextInput("txtAnswer", 'PASSPAL');
  clickContinue();
}

function fillOutPagePersonal1(personalData) {
  $('#aspnetForm').find(":input").each(function() {
    var elementId = $(this).attr('id');
    if (!elementId) return false;

    // Get input key in mapper from element's id attribute.
    // Since the element's ids are very long, we just get the input
    // if the ID contains the key
    var inputKey = Object.keys(inputMapper).find(function(name) {
      return elementId.indexOf(name) != -1;
    });

    // If input key is found, retrieve input's attributes from mapper
    if (inputKey) {
      var input = inputMapper[inputKey];
      console.log(input, personalData[input['data']]);
      // Get the helper
      var helper = window[input['helper']];
      if (helper) {
        helper($(this).attr('name'), personalData[input['data']]);
      }
    }
  });

  // Click if there are no errors
  var errorElement = $('#ctl00_SiteContentPlaceHolder_FormView1_ValidationSummary');
  if(errorElement.children().length <= 0) {
    clickNext();
  }

  // setTimeout(function() { console.log('click next'); clickNext(); }, 2000);

  return;

  var mapper = {
    first_name: { selector: "APP_GIVEN_NAME", helper: "fillTextInput" },
    last_name: { selector: "APP_SURNAME", helper: "fillTextInput" },
    gender: { selector: "APP_GENDER", helper: "checkGender" },
    marital_status: { selector: "APP_MARITAL_STATUS", helper: "setSelectValue" },
    city_of_birth: { selector: "APP_POB_CITY", helper: "fillTextInput" },
    state_of_birth: { selector: "APP_POB_ST_PROVINCE", helper: "fillTextInput" },
    country_of_birth: { selector: "APP_POB_CNTRY", helper: "setSelectValue" },
    DOB: { selector: "DOB", helper: "setDate" },
    alias_yn: { selector: "OtherNames", helper: "checkYesNo" },
    telecode_yn: { selector: "TelecodeQuestion", helper: "checkYesNo" },
  };

  fillPageFromMapper(mapper, personalData);
  // Fill full name
  fillTextInput("APP_FULL_NAME_NATIVE", personalData['first_name'] + ' ' + personalData['last_name']);

  // clickNext();
}

function fillOutPagePersonal2(personalData) {
  var mapper = {
    nationality: { selector: "APP_NATL", helper: "setSelectValue" },
    othernationality_yn: { selector: "APP_OTH_NATL_IND", helper: "checkYesNo" },
    other_residence_yn: { selector: "PermResOtherCntryInd", helper: "checkYesNo" },
    national_id: { selector: "APP_NATIONAL_ID", helper: "fillNumberInput" },
    ssn: { selector: "APP_SSN", helper: "fillSSN" },
    taxidnumber: { selector: "APP_TAX_ID", helper: "fillNumberInput" }
  };

  fillPageFromMapper(mapper, personalData);
}

function fillOutPageAddressPhone(personalData) {
  var mapper = {
    user_address: { selector: "APP_ADDR", helper: "setAddressValue" },
    same_mailing_address_yn: { selector: "MailingAddrSame", helper: "checkYesNo" },
    phone_number: { selector: "APP_HOME_TEL", helper: "fillNumberInput" },
    second_phone_number: { selector: "APP_MOBILE_TEL", helper: "fillNumberInput" },
    ssn: { selector: "APP_SSN", helper: "fillSSN" },
    taxidnumber: { selector: "APP_TAX_ID", helper: "fillNumberInput" }
  };

  fillPageFromMapper(mapper, personalData);
}

function fillOutPageReviewPersonalOld(personalData) {
  clickNext();
}

function fillOutPageReviewTravelOld(personalData) {
  clickNext();
}

function fillOutPageReviewUSContactOld(personalData) {
  clickNext();
}

function fillOutPageReviewFamilyOld(personalData) {
  clickNext();
}

function fillOutPageReviewWorkEducationOld(personalData) {
  clickNext();
}

function fillOutPageReviewSecurityOld(personalData) {
  clickNext();
}

function fillOutPageReviewLocationOld(personalData) {
  clickNext();
}

function fillOutPageSignCertifyOld(personalData) {
  checkBox("rblPREP_IND_0");

  setTimeout(function(){
    checkBox("PREP_NAME_NA");
    fillTextInput("PREP_ORGANIZATION", 'OLIVER VISAS');
    fillTextInput("PREP_ADDR_LN1", "456 JOHNSON AVENUE");
    fillTextInput("PREP_ADDR_LN2", "STUDIO 200");
    fillTextInput("PREP_ADDR_CITY", "Brooklyn");
    fillTextInput("PREP_ADDR_STATE", "New York");
    fillTextInput("PREP_ADDR_POSTAL_CD", "11237");
    setSelectValue("ddlCountry", "UNITED STATES OF AMERICA");
    fillTextInput("PREP_REL_TO_APP", "CONSULTANT");
  }, 1000);
}
