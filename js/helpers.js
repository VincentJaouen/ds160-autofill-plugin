const valueToBoxSuffix = {
  No: "_1",
  Yes: "_0",
  male: "_0",
  female: "_1"
};

const typeCodeMap = {
  text: "tbx",
  radio: "rbl",
  dropdown: "ddl",
  checkbox: "cbex",
  date: "composite",
  ssn: "composite",
  default: "tbx"
};

const typeToHelper = {
  text: fillOutTextInput,
  number: fillOutTextInput,
  radio: checkYesNo,
  dropdown: findInSelect,
  checkbox: checkBox,
  date: setDate,
  ssn: fillSSN,
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

function getElementId(inputName, typeCode, container, ctl) {
  var id = "ctl00_SiteContentPlaceHolder_FormView1";
  if(container) {
    id += "_" + container;
  }
  if(ctl || ctl == 0) {
    id += "_ctl0" + ctl;
  }
  return id + "_" + typeCode + inputName;
}

function getElement(elementId) {
  return $('#' + elementId);
}

function sanitizeValue(value, opts) {
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
  var helper = mapKeyToValue(type, typeToHelper);

  if(typeCode == "composite") {
    helper(name, value, opts.container, opts.ctl);
    return;
  }

  var opts = {
      ...mapKeyToValue(type, typeToDefaultOptions),
      ...opts
    },
    value = sanitizeValue(value, opts);

  if (!value || value == "NA") {
    // If value is empty or says "NA",
    // try to check does not apply box
    checkBox(name + "_NA");
    console.log(name + " empty");
    return false;
  }

  helper(name, value, opts.container, opts.ctl);
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

function checkBox(name, container, ctl, radio=false) {
  var type = radio ? 'rbl' : 'cbex';
  var elementId(name, type, container, ctl);
  console.log('CHECK BOX', elementId);
  if (!getElement(elementId).is(':checked')) {
    $('label[for="' + elementId + '"]').click();
  }
}

function checkYesNo(inputName, value, container, ctl) {
  checkBox(inputName + valueToBoxSuffix[value]);
}

function fillOutTextInput(name, value, container, ctl) {
  var elementId = getElementId(name, 'tbx', container, ctl),
    element = getElement(elementId),
  // Check if input has a character limit
    maxLength = parseInt(element.attr('maxlength'));
  if (maxLength) {
    value = value.substring(0, maxLength);
  }

  console.log('fill text ', element, value);

  element.val(value);
}

function fillTextarea(name, value, container, ctl) {
  var elementId = getElementId(name, 'txt', container, ctl);
  getElement(elementId).text(value);
}

function findInSelect(name, value, container, ctl) {
  var elementId = getElement(selectId, 'ddl', container, ctl),
    found = false;
  // Search for value in options
  getElement(elementId).find('option').each(function() {
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

function setDate(name, value, container, ctl) {
  var dates = value.split("/");
  setSelectValue(name + "Day", dates[0], true);
  setSelectValue(name + "_DTEDay", dates[0], true);
  setSelectValue(name + "Month", parseInt(dates[1]), true);
  setSelectValue(name + "_DTEMonth", parseInt(dates[1]), true);
  fillOutTextInput(name + "Year", dates[2]);
  fillOutTextInput(name + "_DTEYear", dates[2]);
}

function setSelectValue(name, value, container, ctl, fromIndex = false) {
  var elementId = getElementId(name, 'ddl', container, ctl),
    element = getElement(elementId);
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
  if(!value) {
    checkBox(inputName);
    return false;
  }

  var ssn_number = value.split("-"),
    elementId = getElementId(inputName, 'tbx');
  fillOutTextInput(elementId + "1", ssl_number[0]);
  fillOutTextInput(elementId + "2", ssl_number[1]);
  fillOutTextInput(elementId + "3", ssl_number[2]);
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
