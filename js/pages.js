function fillPageFromMapper(mapper, data) {
  console.log(data);
  for (var interaction in mapper) {
    var input = mapper[interaction], value = data[interaction], missing = true;
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
  // clickContinue();
}

function fillOutPagePersonal1(personalData) {
  console.log('fillOutPagePersonal1');
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
  fillTextInput("APP_FULL_NAME_NATIVE", first_name + ' ' + last_name);

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
