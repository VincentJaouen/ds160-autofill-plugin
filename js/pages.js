var inputMapper = {
  personal1: [
    { key: "last_name", helper: "fillTextInput", selector: "APP_SURNAME" },
    { key: "first_name", helper: "fillTextInput", selector: "APP_GIVEN_NAME" },
    { key: "gender", helper: "checkGender", selector: "APP_GENDER" },
    { key: "full_name", data: function(data) { return data['first_name'] + ' ' + data['last_name']; }, helper: "fillTextInput", selector: "APP_FULL_NAME_NATIVE" },
    { key: "alias_yn", helper: "checkYesNo", selector: "OtherNames" },
    { key: "alias", selector: "DListAlias", timer: 1000, helper: [
      { key: "given_names", helper: "fillTextInput", selector: "SURNAME" },
      { key: "surnames", helper: "fillTextInput", selector: "GIVEN_NAME" }
    ] },
    { key: "telecode", data: function(data) { return "No"; }, selector: "TelecodeQuestion", helper: "checkYesNo" },
    { key: "marital_status", selector: "APP_MARITAL_STATUS", helper: "findInSelect" },
  ],
  findByKey: function(key, mapper = null) {
    if (!mapper) {
      mapper = currentMapper;
    }

    return mapper.find(function(mapRow) { return mapRow.key == key; });
  },
  currentDomain: "personal1",
  currentMapper: function() { return this[this.currentDomain]; }
};

function fillOutPageSecureQuestionOld(personalData) {
  $("#ctl00_SiteContentPlaceHolder_txtAnswer").val('PASSPAL');
  clickContinue();
}

function getData(allData, mapRow) {
  // If data function is given, get data from it
  if(mapRow.data && typeof mapRow.data == 'function') {
    return mapRow.data(allData);
  }

  // Otherwise, just get data from key
  return allData[mapRow.key];
}

function fillInput(helperName, data, selector, container, index) {
  var helperFunc = window[helperName];
  if(typeof helperFunc == 'function') {
    helperFunc(selector, data, container, index);
  }
}

function timeFill(index, mapper, allData, container, index) {
  console.log('timeFill', index, mapper);
  var mapRow = mapper[index];
  if(!mapRow) {
    return;
  }

  setTimeout(function() {
    console.log(mapRow, allData);
    var data;
    // If helper is array then row is multiple
    if (Array.isArray(mapRow.helper)) {
      data = getData(allData, mapRow);
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
        var dataRow = data[i];
        timeFill(0, mapRow.helper, dataRow, mapRow.selector, i);
      }
     
    }
    else {
      data = getData(allData, mapRow);
      fillInput(mapRow.helper, data, mapRow.selector);
    }
    
    timeFill(index + 1, mapper, allData);
  }, mapRow.timer ? mapRow.timer : 100);
}

function fillOutPagePersonal1(data) {
  timeFill(0, inputMapper.currentMapper(), data);

  return;
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
