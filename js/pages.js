const DEFAULT_HELPER = "fillTextInput";

function getData(allData, mapRow) {
  // If data function is given, get data from it
  if(mapRow.data && typeof mapRow.data == 'function') {
    return mapRow.data(allData);
  }

  // Otherwise, just get data from key
  return allData[mapRow.key];
}

function fillInput(mapRow, data, opts={}) {
  opts = {...opts};
  var helperName = mapRow.helper || DEFAULT_HELPER;
  var helperFunc = window[helperName];
  if(typeof helperFunc == 'function') {
    helperFunc(mapRow.selector, data, opts);
  }
}

function fillMultiple(mapRow, data) {
  var table = $('table[id*="'+mapRow.selector+'"]'),
    rowsPresent = table.find('tr'),
    diffRows = data.length - rowsPresent.length,
    addButton = rowsPresent.first().find('.addone a'),
    removeButton = rowsPresent.first().find('.removeone a'),
    actionEval = diffRows > 0 ? addButton.attr('href') : removeButton.attr('href');

  // If not enough rows, add as many as needed
  while(diffRows > 0) {
    if(actionEval) {
      window.location = actionEval;
    }
    --diffRows;
  }
  // If too many rows, remove as many as needed
  while(diffRows < 0) {
    if(actionEval) {
      window.location = actionEval;
    }
    ++diffRows;
  }

  for(var i = 0 ; i < data.length ; ++i) {
    var options = { container: mapRow.selector, controller: i },
      iterator = new MapperIterator(mapRow.helper);
    fillFromMapperIterator(iterator, data[i], options);
  }
}

function fillFromMapperIterator(mapIterator, data, opts={}) {
  var mapRow = mapIterator.next();
  // If mapRow or data is empty, no more inputs to fill out.
  // We can leave the recursion
  if(!mapRow || !data) {
    return;
  }

  setTimeout(function() {
    var rowData = getData(data, mapRow);
    // If helper is array then row is multiple
    if (Array.isArray(mapRow.helper)) {
      fillMultiple(mapRow, rowData);
    }
    else {
      var rowData = getData(data, mapRow);
      fillInput(mapRow, rowData, opts);
    }
    
    fillFromMapperIterator(mapIterator, data, opts);
  }, mapRow.timer ? mapRow.timer : 100);
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
