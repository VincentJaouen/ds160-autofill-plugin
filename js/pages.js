function getData(allData, mapRow) {
  // If data function is given, get data from it
  if(mapRow.data && typeof mapRow.data == 'function') {
    return mapRow.data(allData);
  }

  // Otherwise, just get data from key
  return allData[mapRow.key];
}

function fillMultiple(mapRow, data) {
  if(!data) {
    data = [];
  }

  var table = $('#ctl00_SiteContentPlaceHolder_FormView1_' + mapRow.selector),
    rowsButtons = table.find('.addremove'),
    diffRows = data.length - rowsButtons.length,
    addButton = rowsButtons.first().find('.addone a'),
    removeButton = rowsButtons.last().find('.removeone a'),
    actionEval = diffRows > 0 ? addButton.attr('href') : removeButton.attr('href');

  diffRows = Math.abs(diffRows);

  for(var ctl = 0 ; ctl < data.length ; ++ctl) {
    addRowAndFillOut(actionEval, data[ctl], mapRow, ctl);
  }
}

function addRowAndFillOut(actionEval, dataRow, mapRow, ctl) {
  var iterator = new MapperIterator(mapRow.type);
  setTimeout(function() {
    // If row doesn't exist, add it
    var selector = '[id*="' + mapRow.selector + '_ctl0' + ctl + '"]';
    if(!document.querySelector(selector) && actionEval) {
      window.location = actionEval;
    }
    fillFromMapperIterator(iterator, dataRow, {
        container: mapRow.selector,
        ctl
      });
  }, 1000 * ctl);
}

function fillFromMapperIterator(mapIterator, data, opts={}) {
  var mapRow = mapIterator.next();
  // If mapRow or data is empty, no more inputs to fill out.
  // We can leave the recursion
  if(!mapRow || !data) {
    console.log('map or data missing', mapRow, data);
    return;
  }

  var timer = (mapRow.timer || 200) * (opts.ctl || 1);

  setTimeout(function() {
    // If condition is given, continue only if it is fulfilled
    if(!mapRow.condition || mapRow.condition(data)) {
      var rowData = getData(data, mapRow);
      // If helper is array then row is multiple
      if (Array.isArray(mapRow.type)) {
        fillMultiple(mapRow, rowData);
      }
      else {
        fillOutInput(mapRow.selector, rowData, mapRow.type, opts);
      }
    }
    
    fillFromMapperIterator(mapIterator, data, opts);
  }, timer);
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
