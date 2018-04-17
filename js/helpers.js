var valueToBoxSuffix = {
  No: "_1",
  Yes: "_0",
  male: "_0",
  female: "_1"
};

function clickNext() {
  var nextButton = $('#ctl00_SiteContentPlaceHolder_UpdateButton3');
  nextButton.focus();
  nextButton.click();
}

function clickContinue() {
  var continueButton = $('#ctl00_SiteContentPlaceHolder_btnContinue');
  continueButton.focus();
  continueButton.click();
}

function getElementId(inputName, type, container, index) {
  var id = "ctl00_SiteContentPlaceHolder_FormView1_";
  if(container) {
    id += "_" + container;
  }
  if(index) {
    id += "_ctl0" + index;
  }
  return id + "_" + type + inputName;
}

function checkBox(boxName, container, index, radio=false) {
  var type = radio ? "rbl" : "cbex";
  var elementId = getElementId(boxName, type, container, index);
  if (!$('#' + elementId).is(':checked')) {
    $('label[for="' + elementId + '"]').click();
  }

  return true;
}

function checkYesNo(inputName, value, container, index) {
  return checkBox(inputName + valueToBoxSuffix[value], container, index);
}

function fillTextInput(inputName, rawValue, container, index, latinize=true, alphanumerize=true) {
  console.log('fillTextInput', inputName, rawValue);
  if (!rawValue) {
    console.log(inputName + " empty");
    return false;
  }

  var value = rawValue.trim().replace(/\s\s+/g, ' '), maxLength;
  if (latinize) {
    value = value.latinize();
  }
  if (alphanumerize) {
    value = value.alphanumerize();
  }
  var element = $('#' + getElementId(inputName, "tbx", container, index));
  // Check if input has a character limit
  var maxLength = element.attr('maxlength');
  if (maxLength) {
    value = value.substring(0, parseInt(maxLength));
  }

  element.val(value);
  return true;
}

function fillNumberInput(inputName, rawValue) {
  if (!rawValue) {
    console.log(inputName + " empty");
    return false;
  }

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
    fillTextInput(inputName + "Addr1", address['street']);
  } else {
    fillTextInput(inputName + "_LN1", "MISSING");
    fillTextInput(inputName + "StreetAddress1", "MISSING");
    fillTextInput(inputName + "Addr2", address['street']);
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
    fillTextInput(inputName + "PostalZIPCode", address['zip'].numerize());
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
    checkBox(secondSelector + "_ADDR_STATE_NA");
  }
  var country_status = setSelectValue("ddlCountry", address['country']);
  if(!country_status && setSelectValue(inputName + "Country", address['country']) && !setSelectValue("DropDownList2", address['country'])) {
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

function translate(query) {
  // https://translation.googleapis.com/language/translate/v2?key=AIzaSyDX9VA2TeIwFjX4buWpzzxIZ1djQUsR-L4&source=ES&target=EN&q=HOLA
  $.ajax({
    method: "GET",
    async: false,
    url: "https://translation.googleapis.com/language/translate/v2",
    data: {
      key: "AIzaSyDX9VA2TeIwFjX4buWpzzxIZ1djQUsR-L4",
      source: "ES",
      target: "EN",
      q: query
    },
    success: function(response){
      console.log(response);
		},
		error: function(error) {
			console.log(error);
		}
  });
}

function isAddressApproxSame(addr1, addr2) {
  var address1 = JSON.parse(addr1), address2 = JSON.parse(addr2);
  return address1['street'].alphanumerize().latinize().toUpperCase() == address2['street'].alphanumerize().latinize().toUpperCase();
}
