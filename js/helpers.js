function checkYesNo(inputName, value) {
  if(value == "No"){
    checkBox(inputName + "_1");
  }else{
    checkBox(inputName + "_0");
  }
}

function checkBox(boxName) {
  $('label[for$="' + boxName + '"]').click();
}

function fillTextInput(inputName, value, latinize=true) {
  $('input[name$="' + inputName + '"]').val(value.trim().latinize());
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
  var selector = 'select[id$="' + selectId + '"]';
  // If fromIndex is set, search by value of index
  $(selector).find('option').each(function(index, optionValue) {
    if($(this).text() == value ||
        typeof value === 'string' && $(this).text() == value.toUpperCase().trim() ||
        fromIndex && index == parseInt(value)
      ) {

      $(selector).val($(this).val());
      $(selector).change();
      // If value is found, return true
      return true;
    }
  });
  return false;
}

function setDate(inputName, value) {
  var dates = value.split("/");
  setSelectValue(inputName + "Day", dates[0], true);
  setSelectValue(inputName + "Month", parseInt(dates[1]), true);
  fillTextInput(inputName + "Year", dates[2]);
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
