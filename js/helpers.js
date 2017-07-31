function clickNext() {
  setTimeout(function(){
    $('input[name$="UpdateButton3"]').click();
  }, 1000);
}

function clickContinue() {
  setTimeout(function(){
    $('input[name$="btnContinue"]').click();
  }, 500);
}

function checkBox(boxName) {
  if (!$('input[id$="' + boxName + '"]').is(':checked')) {
    $('label[for$="' + boxName + '"]').click();
  }

  return true;
}

function checkYesNo(inputName, value) {
  if (value == "No") {
    checkBox(inputName + "_1");
  } else {
    checkBox(inputName + "_0");
  }
  return true;
}

function checkGender(inputName, value) {
  if (value == "male") {
    checkBox(inputName + "_0");
  } else {
    checkBox(inputName + "_1");
  }
  return true;
}

function fillTextInput(inputName, rawValue, latinize=true, alphanumerize=true) {
  var value = rawValue.trim().replace(/\s\s+/g, ' '), maxLength;
  if (latinize) {
    value = value.latinize();
  }
  if (alphanumerize) {
    value = value.alphanumerize();
  }
  // Check if input has a character limit
  maxLength = $('input[name$="' + inputName + '"]').attr('maxlength');
  if (maxLength) {
    value = value.substring(0, parseInt(maxLength));
  }

  $('input[name$="' + inputName + '"]').val(value);
  return true;
}

function fillNumberInput(inputName, rawValue) {
  var value = rawValue.trim().numerize(), maxLength;
  // Check if input has a character limit
  maxLength = $('input[name$="' + inputName + '"]').attr('maxlength');
  if (maxLength) {
    value = value.substring(0, parseInt(maxLength));
  }

  $('input[name$="' + inputName + '"]').val(value.trim().numerize().substring(0, 20));
  return true;
}

function fillTextarea(selector, rawValue) {
  var value = rawValue.trim().replace(/\s\s+/g, ' ');
  $('textarea[name$="' + selector + '"]').text(value);
  return true;
}

function findInSelect(selectId, value) {
  var selector = 'select[id$="' + selectId + '"]', found = false;
  // Search for value in options
  $(selector).find('option').each(function() {
    var optionLabel = $(this).text();
    if(optionLabel.indexOf(value) != -1 ||
        typeof value === 'string' &&
        optionLabel.alphanumerize().toUpperCase().indexOf(value.alphanumerize().toUpperCase()) != -1) {
      $(selector).val($(this).val());
      $(selector).change();
      found = true;
      return false;
    }
  });

  return found;
}

function setSelectValue(selectId, value, fromIndex = false) {
  var selector = 'select[id$="' + selectId + '"]', found = false;
  // If fromIndex is set, search by value of index
  $(selector).find('option').each(function(index, optionValue) {
    if($(this).val() == value ||
        $(this).text() == value ||
        typeof value === 'string' && $(this).text() == value.toUpperCase().trim() ||
        fromIndex && index == parseInt(value)
      ) {

      $(selector).val($(this).val());
      $(selector).change();
      found = true;
      // If value is found, stop loop
      return false;
    }
  });

  return found;
}

function setDate(inputName, value) {
  var dates = value.split("/");
  setSelectValue(inputName + "Day", dates[0], true);
  setSelectValue(inputName + "_DTEDay", dates[0], true);
  setSelectValue(inputName + "Month", parseInt(dates[1]), true);
  setSelectValue(inputName + "_DTEMonth", parseInt(dates[1]), true);
  fillTextInput(inputName + "Year", dates[2]);
  fillTextInput(inputName + "_DTEYear", dates[2]);

  return true;
}

function setAddressValue(inputName, addressJSON, stateSelect=false, secondSelector=false) {
  var address = JSON.parse(addressJSON), value;

  if(address['street'].trim() != "") {
    fillTextInput(inputName + "_LN1", address['street']);
    fillTextInput(inputName + "StreetAddress1", address['street']);
  } else {
    fillTextInput(inputName + "_LN1", "MISSING");
    fillTextInput(inputName + "StreetAddress1", "MISSING");
  }
  fillTextInput(inputName + "_LN2", address['line2']);
  fillTextInput(inputName + "StreetAddress2", address['line2']);
  if (address['city'].trim() != "") {
    fillTextInput(inputName + "_CITY", address['city']);
    fillTextInput(inputName + "City", address['city']);
  } else {
    fillTextInput(inputName + "_CITY", "MISSING");
    fillTextInput(inputName + "City", "MISSING");
  }
  var zipSelector = inputName + "_POSTAL_CD";
  if (secondSelector) {
    zipSelector = secondSelector + "_POSTAL_CD";
  }
  if (address['zip']) {
    fillTextInput(zipSelector, address['zip'].numerize());
  } else {
    checkBox(zipSelector + "_NA");
  }
  var stateSelector = inputName + "_STATE";
  if (secondSelector) {
    stateSelector = secondSelector + "_STATE";
  }
  if (address['state']) {
    if (stateSelect) {
      setSelectValue(stateSelector, address['state']);
    } else {
      fillTextInput(stateSelector, address['state']);
    }
  } else {
    checkBox(stateSelector + "_NA");
  }
  var country_status = setSelectValue("ddlCountry", address['country']);
  if(!country_status && setSelectValue(inputName + "Country", address['country']) && !setSelectValue("DropDownList2", address['country'])) {
    setSelectValue("ddlCountry", "ARG");
  }
  return true;
}

function setSpecialAddress(inputName, addressJSON) {
  var address = JSON.parse(addressJSON);
  if(address['street'].trim() && address['street'].trim()!=""){
    $('input[name$="EmployerStreetAddress1"]').val(address['street'].trim());
  }else{
    $('input[name$="EmployerStreetAddress1"]').val("street");
  }
  $('input[name$="EmployerStreetAddress2"]').val(address['line2'].trim());
  $('input[name$="EmployerCity"]').val(address['city'].trim());
  if(address['city'].trim() && address['city'].trim()!=""){
    $('input[name$="EmployerCity"]').val(address['city'].trim());
  }else{
    $('input[name$="EmployerCity"]').val("city");
  }
  if(address['zip'] && address['zip'].trim()!=""){
    $('input[name$="PREV_EMPL_ADDR_POSTAL_CD"]').val(address['zip']);
  }else{
    $('input[id$="PREV_EMPL_ADDR_POSTAL_CD_NA"]').prop("checked", true);
  }
  if(address['state']){
    $('input[name$="PREV_EMPL_ADDR_STATE"]').val(address['state']);
  }else{
    $('input[id$="PREV_EMPL_ADDR_STATE_NA"]').prop("checked", true);
  }
  var country_status = false;
  $('select[id$="DropDownList2"]').find('option').each(function(){
    if($(this).text()==address['country'].toUpperCase().trim()){
      $('select[id$="DropDownList2"]').val($(this).val());
      $('select[id$="DropDownList2"]').change();
      country_status=true;
    }
  });
  if(!country_status){
    $('select[id$="DropDownList2"]').val("ARG");
    $('select[id$="DropDownList2"]').change();
  }
}

function fillSSN(inputName, value) {
  var ssn_number = value.split("-");
  fillNumberInput(inputName + "1", ssl_number[0]);
  fillNumberInput(inputName + "2", ssl_number[1]);
  fillNumberInput(inputName + "3", ssl_number[2]);
  return true;
}

function translate(value) {
  // https://translation.googleapis.com/language/translate/v2?key=AIzaSyDX9VA2TeIwFjX4buWpzzxIZ1djQUsR-L4&source=ES&target=EN&q=HOLA
}
