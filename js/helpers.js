const valueToBoxSuffix = {
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

function getElementId(inputName, type, opts={}) {
  var id = "ctl00_SiteContentPlaceHolder_FormView1";
  if(opts.container) {
    id += "_" + opts.container;
  }
  if(opts.controller || opts.controller == 0) {
    id += "_ctl0" + opts.controller;
  }
  return id + "_" + type + inputName;
}

function getElement(elementId) {
  return $('#' + elementId);
}

function checkBox(boxName, opts={}) {
  var type = opts.radio ? "rbl" : "cbex";
  var elementId = getElementId(boxName, type, opts);
  console.log('check', elementId, opts);
  console.log(elementId);
  if (!$('#' + elementId).is(':checked')) {
    $('label[for="' + elementId + '"]').click();
  }

  return true;
}

function checkYesNo(inputName, value, opts) {
  opts['radio'] = true;
  return checkBox(inputName + valueToBoxSuffix[value], opts);
}

function fillTextInput(inputName, rawValue, opts) {
  opts = Object.assign({ latinize: true, alphanumerize: true }, opts);
  if (!rawValue || rawValue == "NA") {
    // If value is empty or says "NA",
    // try to check does not apply box
    console.log(inputName + "_NA");
    checkBox(inputName + "_NA", opts);
    console.log(inputName + " empty");
    return false;
  }

  var value = rawValue.trim().replace(/\s\s+/g, ' '), maxLength;
  if (opts.latinize) {
    value = value.latinize();
  }
  if (opts.alphanumerize) {
    value = value.alphanumerize();
  }
  var elementId = getElementId(inputName, "tbx", opts),
    element = getElement(elementId);
  // Check if input has a character limit
  var maxLength = element.attr('maxlength');
  if (maxLength) {
    value = value.substring(0, parseInt(maxLength));
  }

  element.val(value);
  return true;
}

function fillNumberInput(inputName, rawValue, opts) {
  if (!rawValue) {
    console.log(inputName + " empty");
    return false;
  }

  var value = rawValue.trim().numerize(),
    element = getElement(getElementId(inputName, opts));
    maxLength;
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
