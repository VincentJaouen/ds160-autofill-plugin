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
  if (!$('input[id$="' + boxName + '"]').prop("checked")) {
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
  var value = rawValue.trim(), maxLength;
  if (latinize) {
    value = value.latinize();
  }
  if (alphanumerize) {
    value = value.alphanumerize();
  }
  // Check if input has a character limit
  maxLength = $('input[name$="' + inputName + '"]').attr('maxlength');
  if (maxLength) {
    console.log(maxLength);
    value = value.substring(0, parseInt(maxLength));
    console.log(value);
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

function fillTextarea(selector, value) {
  $('textarea[name$="' + selector + '"]').text(value);
  return true;
}

function findInSelect(selectId, value) {
  var selector = 'select[id$="' + selectId + '"]';
  // Search for value in options
  $(selector).find('option').each(function() {
    if($(this).text().indexOf(value) != -1 ||
        typeof value === 'string' &&
        $(this).text().toUpperCase().indexOf(value.toUpperCase()) != -1) {
      $(selector).val($(this).val());
      $(selector).change();
      return true;
    }
  });

  return false;
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

  return true;
}

function setAddressValue(inputName, addressJSON) {
  var address = JSON.parse(addressJSON);

  if(address['street'].trim() != "") {
    fillTextInput(inputName + "_LN1", address['street']);
  } else {
    fillTextInput(inputName + "_LN1", "MISSING");
  }
  fillTextInput(inputName + "_LN2", address['line2']);
  if (address['city'].trim() != "") {
    fillTextInput(inputName + "_CITY", address['city']);
  } else {
    fillTextInput(inputName + "_CITY", "MISSING");
  }
  if (address['zip']) {
    fillTextInput(inputName + "_POSTAL_CD", address['zip'].numerize());
  } else {
    checkBox(inputName + "_POSTAL_CD_NA");
  }
  if (address['state']) {
    fillTextInput(inputName + "_STATE", address['state']);
  } else {
    checkBox(inputName + "_STATE_NA");
  }
  var country_status = setSelectValue("ddlCountry", address['country']);
  if(!country_status){
    setSelectValue("ddlCountry", "ARG");
  }
  return true;
}

function fillSSN(inputName, value) {
  var ssn_number = value.split("-");
  fillNumberInput(inputName + "1", ssl_number[0]);
  fillNumberInput(inputName + "2", ssl_number[1]);
  fillNumberInput(inputName + "3", ssl_number[2]);
  return true;
}
