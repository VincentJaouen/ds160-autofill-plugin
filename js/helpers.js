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
  email: fillOutTextInput,
  radio: checkYesNo,
  dropdown: fillOutSelect,
  checkbox: checkBox,
  date: setDate,
  address: fillOutAddress,
  ssn: fillSSN,
  default: fillOutTextInput
};

const typeToDefaultOptions = {
  text: { latinize: true, alphanumerize: true },
  number: { numerize: true },
  email: { latinize: true },
  radio: { radio: true },
  address: { json: true },
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

function setElementValue(element, value) {
  element.value = value;
  element.dispatchEvent(new Event("change"));
}

function sanitizeValue(value, opts) {
  if(!value) {
    return '';
  }

  if(opts.json) {
    return JSON.parse(value);
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
  console.log('fill out', name, value, type);
  // Needs to copy opts to not modify for the other rows
  var helper = mapKeyToValue(type, typeToHelper),
    opts = {
      ...mapKeyToValue(type, typeToDefaultOptions),
      ...opts
    },
    value = sanitizeValue(value, opts);

  if (!value || value == "NA") {
    // If value is empty or says "NA",
    // try to check does not apply box
    checkBox(name + "_NA", value, opts.container, opts.ctl);
    console.log("value empty, check ", name + "_NA");
    return false;
  }

  helper(name, value, opts.container, opts.ctl);
}

function errorsPresent() {
  var errorDiv = getElement('ctl00_SiteContentPlaceHolder_FormView1_ValidationSummary').html();
  // If error div is not empty, don't click next
  if(errorDiv && errorDiv.trim() != '') {
    return true;
  }

  return false;
}

function clickNext(timer = 0) {
  var nextButton = getElement('ctl00_SiteContentPlaceHolder_UpdateButton3');
  setTimeout(function() {
    nextButton.focus();
    nextButton.click();
  }, timer);
}

function clickContinue() {
  var continueButton = getElement('ctl00_SiteContentPlaceHolder_btnContinue');
  continueButton.focus();
  continueButton.click();
}

function checkBox(name, value, container, ctl) {
  // Check for 'cbex'
  var  elementId = getElementId(name, "cbex", container, ctl);
  checkElement(elementId);
  // Check for 'cbx'
  var  elementId = getElementId(name, "cbx", container, ctl);
  console.log(name, elementId);
  checkElement(elementId);
}

function checkYesNo(inputName, value, container, ctl) {
  var elementId = getElementId(inputName + valueToBoxSuffix[value], 'rbl', container, ctl);
  checkElement(elementId);
}

function checkElement(elementId) {
  if (!getElement(elementId).is(':checked')) {
    var labelElem = $('label[for="' + elementId + '"]');
    labelElem.click();
    labelElem.focusout();
  }
}

function fillOutTextInput(name, value, container, ctl) {
  var elementId = getElementId(name, 'tbx', container, ctl),
    element = getElement(elementId);

  // If element is not found, try with "tb"
  if(element.length <= 0) {
    elementId = getElementId(name, 'tb', container, ctl);
    console.log('TRY WITH', elementId);
    element = getElement(elementId);
  }

  // Check if input has a character limit
    maxLength = parseInt(element.attr('maxlength'));
  if (value && maxLength) {
    value = value.substring(0, maxLength);
  }

  element.val(value);
  element.focusout();
}

function fillTextarea(name, value, container, ctl) {
  var elementId = getElementId(name, 'txt', container, ctl);
  getElement(elementId).text(value);
}

function fillOutSelect(name, value, container, ctl) {
  var elementId = getElementId(name, 'ddl', container, ctl),
    element = document.getElementById(elementId);

  if(!element) {
    console.log('Could not find', elementId);
    return false;
  }
  fillOutSelectElement(element, value);
}

function fillOutSelectElement(element, value) {
  var valueUpperCase = value.toUpperCase(),
    currentValue = element.value;

  if(valueUpperCase == currentValue) {
    console.log('value already set');
    return true;
  }
  
  // Check first if value is in option values
  for(var i = 0 ; i < element.options.length ; ++i) {
    var optionValue = element.options[i].value;
    if(optionValue == valueUpperCase) {
      setElementValue(element, optionValue);
      return true;
    }
  }

  for(var i = 0 ; i < element.options.length ; ++i) {
    var optionValue = element.options[i].value,
      label = element.options[i].text.alphanumerize().toUpperCase();

    if(currentValue == optionValue) continue;

    if(label.indexOf(value) != -1 ||
      typeof value == "string" &&
      label.indexOf(value.alphanumerize().toUpperCase()) != -1) {

      setElementValue(element, optionValue);
      return true;
    }
  }
}

function setDate(name, value, container, ctl) {
  var dates = value.split("/");
  setSelectValue(name + "Day", dates[0], container, ctl, true);
  setSelectValue(name + "_DTEDay", dates[0], container, ctl, true);
  setSelectValue(name + "Month", parseInt(dates[1]), container, ctl, true);
  setSelectValue(name + "_DTEMonth", parseInt(dates[1]), container, ctl, true);
  fillOutTextInput(name + "Year", dates[2], container, ctl);
  fillOutTextInput(name + "_DTEYear", dates[2], container, ctl);
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

function fillOutAddress(inputName, address, container, ctl) {
  var opts = { container, ctl };
  console.log('filloutAddress', inputName, address, opts);
  fillOutInput(inputName + "_LN1", address['street'], 'text', opts);
  fillOutInput(inputName + "StreetAddress1", address['street'], 'text', opts);
  fillOutInput(inputName + "Addr1", address['street'], 'text', opts);

  fillOutInput(inputName + "_LN2", address['line2'], 'text', opts);
  fillOutInput(inputName + "StreetAddress2", address['line2'], 'text', opts);

  fillOutInput(inputName + "_CITY", address['city'], 'text', opts);
  fillOutInput(inputName + "City", address['city'], 'text', opts);

  fillOutInput(inputName + "_POSTAL_CD", address['zip'], 'number', opts);
  fillOutInput(inputName + "ZIPCode", address['zip'], 'number', opts);
  
  fillOutInput(inputName + "_STATE", address['state'], 'text', opts);
  
  fillOutInput(inputName + "Country", address['country'], 'dropdown', opts);
  fillOutInput("Country", address['country'], 'dropdown', opts);
}

function fillSSN(inputName, value) { 
  if(!value) {
    checkBox(inputName);
    return false;
  }

  var ssn_number = value.split("-");
  fillOutTextInput(inputName + "1", ssn_number[0]);
  fillOutTextInput(inputName + "2", ssn_number[1]);
  fillOutTextInput(inputName + "3", ssn_number[2]);
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
