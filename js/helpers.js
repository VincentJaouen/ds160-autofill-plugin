const valueToBoxSuffix = {
  No: "_1",
  Yes: "_0",
  male: "_0",
  female: "_1"
};

const typeToCodeMap = {
  text: "tbx",
  radio: "rbl",
  dropdown: "ddl",
  checkbox: "cbex",
  date: "composite",
  default: "tbx"
};

const typeToHelper = {
  text: fillOutTextInput,
  number: fillOutTextInput,
  radio: checkYesNo,
  dropdown: findInSelect,
  checkbox: checkBox,
  date: setDate,
  default: fillOutTextInput
};

const typeToDefaultOptions = {
  text: { latinize: true, alphanumerize: true },
  number: { numerize: true },
  radio: { radio: true },
  default: {}
};

function mapKeyToValue(key, mapper) {
  return mapper[key] || mapper['default'];
}

function getElementId(inputName, typeCode, opts={}) {
  var id = "ctl00_SiteContentPlaceHolder_FormView1";
  if(opts.container) {
    id += "_" + opts.container;
  }
  if(opts.controller || opts.controller == 0) {
    id += "_ctl0" + opts.controller;
  }
  return id + "_" + typeCode + inputName;
}

function getElement(elementId) {
  return $('#' + elementId);
}

function sanitizeValue(value, opts) {
  console.log('sanitize', value);
  if(!value) {
    return '';
  }

  value = value.trim().replace(/\s\s+/g, ' ');
  if(opts.latinize) {
    value = value.latinize();
  }
  if(opts.alphanumerize) {
    value = value.alphanumerize();
  }
  if(opts.numerize) {
    value = value.numerize();
  }

  return value;
}

function fillOutInput(name, value, type = 'text', opts={}) {
  // Needs to copy opts to not modify for the other rows
  var typeCode = mapKeyToValue(type, typeToCodeMap),
    helper = mapKeyToValue(type, typeToHelper);

  if(typeCode == "composite") {
    helper(name, value, opts);
    return;
  }

  var elementId = getElementId(name, typeCode, opts),
    opts = {
      ...mapKeyToValue(type, typeToDefaultOptions),
      ...opts
    },
    value = sanitizeValue(value, opts);

  helper(elementId, value);
}

function errorsPresent() {
  var errorDiv = getElement('ctl00_SiteContentPlaceHolder_FormView1_ValidationSummary');
  // If error div is not empty, don't click next
  if(errorDiv.html().trim() != '') {
    return true;
  }

  return false;
}

function clickNext() {
  var nextButton = getElement('ctl00_SiteContentPlaceHolder_UpdateButton3');
  setTimeout(function() {
    nextButton.focus();
    //nextButton.click();
  }, 5000);
}

function clickContinue() {
  var continueButton = getElement('ctl00_SiteContentPlaceHolder_btnContinue');
  continueButton.focus();
  continueButton.click();
}

function checkBox(elementId) {
  if (!getElement(elementId).is(':checked')) {
    $('label[for="' + elementId + '"]').click();
  }
}

function checkYesNo(elementId, value) {
  return checkBox(elementId + valueToBoxSuffix[value]);
}

function fillOutTextInput(elementId, value) {
  if (!value || value == "NA") {
    // If value is empty or says "NA",
    // try to check does not apply box
    checkBox(elementId + "_NA");
    console.log(elementId + " empty");
    return false;
  }

  var element = getElement(elementId),
  // Check if input has a character limit
    maxLength = parseInt(element.attr('maxlength'));
  if (maxLength) {
    value = value.substring(0, maxLength);
  }

  element.val(value);
}

function fillTextarea(selector, rawValue) {
  var value = rawValue.trim().replace(/\s\s+/g, ' ');
  $('textarea[name$="' + selector + '"]').text(value);
  return true;
}

function findInSelect(selectId, value) {
  var selector = getElement(selectId),
    found = false;
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

function setDate(elementName, value, opts) {
  var dates = value.split("/"),
    dropdownId = getElementId(elementName, mapKeyToValue("dropdown", typeToCodeMap)),
    textInputId = getElementId(elementName, mapKeyToValue("text", typeToCodeMap));
  console.log('setDate', dropdownId, textInputId);
  setSelectValue(dropdownId + "Day", dates[0], true);
  setSelectValue(dropdownId + "_DTEDay", dates[0], true);
  setSelectValue(dropdownId + "Month", parseInt(dates[1]), true);
  setSelectValue(dropdownId + "_DTEMonth", parseInt(dates[1]), true);
  fillOutTextInput(textInputId + "Year", dates[2]);
  fillOutTextInput(textInputId + "_DTEYear", dates[2]);
}

function setSelectValue(selectId, value, fromIndex = false) {
  var element = getElement(selectId);
  // If fromIndex is set, search by value of index
  element.find('option').each(function(index, optionValue) {
    if($(this).val() == value ||
        $(this).text() == value ||
        typeof value === 'string' && $(this).text() == value.toUpperCase().trim() ||
        fromIndex && index == parseInt(value)
      ) {

      element.val($(this).val());
      element.change();
      // If value is found, stop loop
      return false;
    }
  });
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
