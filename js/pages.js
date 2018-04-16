var inputMapper = [
  { data: "first_name", helper: "fillTextInput", selector: "APP_GIVEN_NAME" },
  { data: "gender", helper: "checkGender", selector: "APP_GENDER" },
  { data: function(data) { return data['first_name'] + ' ' + data['last_name']; }, helper: "fillTextInput", selector: "APP_FULL_NAME_NATIVE" },
  { data: "alias_yn", helper: "checkYesNo", selector: "OtherNames" },
  { data: "alias", multiple: true, selector: "DListAlias", interactions: [
    { data: "given_names", helper: "fillTextInput", selector: "SURNAMES" },
    { data: "surnames", helper: "fillTextInput", selector: "GIVEN_NAMES" }
  ] }
];

function fillOutPageSecureQuestionOld(personalData) {
  fillTextInput("txtAnswer", 'PASSPAL');
  clickContinue();
}

function getData(allData, dataAttr) {
  var data;

  if(typeof dataAttr == 'function') {
    data = dataAttr(allData);
  }
  else {
    data = allData[dataAttr];
  }

  return data;
}

function fillInput(helperName, data, selector) {
  var helperFunc = window[helperName];
  if(typeof helperFunc == 'function') {
    helperFunc(selector, data);
  }
}

function timeFill(index, allData) {
  var mapRow = inputMapper[index];
  if(!mapRow) {
    return;
  }

  setTimeout(function() {
    console.log(mapRow);
    var data;
    if (mapRow.multiple) {
      data = allData[mapRow.data];
      var table = $('table[id*="'+mapRow.selector+'"]'),
        rowsPresent = table.find('tr'),
        diffRows = data.length - rowsPresent.length,
        addButton = rowsPresent.first().find('.addone a');

      // If not enough rows, add as many as needed
      while(diffRows > 0) {
        window.location = addButton.attr('href');
        console.log('add row', mapRow.selector);
        --diffRows;
      }
      // If too many rows, remove as many as needed
      while(diffRows < 0) {
        removeButton = rowsPresent.first().find('.removeone a');
        console.log('remove row', mapRow.selector);
        window.location = removeButton.attr('href');
        ++diffRows;
      }

      for(var i = 0 ; i < data.length ; ++i) {
        console.log(data[i]);
      }
     
    }
    else {
      data = getData(allData, mapRow.data);
      fillInput(mapRow.helper, data, mapRow.selector);
    }
    
    timeFill(index + 1, allData);
  }, 500);
}

function fillOutPagePersonal1(data) {
  timeFill(0, data);

  return;

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
