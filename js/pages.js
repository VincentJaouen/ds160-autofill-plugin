function getData(allData, mapRow) {
  // If data function is given, get data from it
  if(mapRow.data && typeof mapRow.data == 'function') {
    return mapRow.data(allData);
  }

  // Otherwise, just get data from key
  return allData[mapRow.key];
}

function fillMultiple(mapRow, data) {
  var table = $('#ctl00_SiteContentPlaceHolder_FormView1_' + mapRow.selector),
    rowsButtons = table.find('.addremove'),
    diffRows = data.length - rowsButtons.length,
    addButton = rowsButtons.first().find('.addone a'),
    removeButton = rowsButtons.last().find('.removeone a'),
    actionEval = diffRows > 0 ? addButton.attr('href') : removeButton.attr('href');

  diffRows = Math.abs(diffRows);

  // Add or delete as many rows as needed
  while(diffRows > 0) {
    if(actionEval) {
      window.location = actionEval;
    }
    --diffRows;
  }

  for(var i = 0 ; i < data.length ; ++i) {
    var options = {
        container: mapRow.selector,
        controller: i
      },
      iterator = new MapperIterator(mapRow.type),
      dataRow = data[i];
    
    fillFromMapperIterator(iterator, dataRow, options);
  }
}


function fillFromMapperIterator(mapIterator, data, opts={}) {
  var mapRow = mapIterator.next();
  // If mapRow or data is empty, no more inputs to fill out.
  // We can leave the recursion
  if(!mapRow || !data) {
    console.log('map or data missing', mapRow, data);
    return;
  }

  var timer = (mapRow.timer || 200) * (opts.controller * 3 || 1);

  setTimeout(function() {
    var rowData = getData(data, mapRow);
    // If helper is array then row is multiple
    if (Array.isArray(mapRow.type)) {
      fillMultiple(mapRow, rowData);
    }
    else {
      var rowData = getData(data, mapRow);

      fillOutInput(mapRow.selector, rowData, mapRow.type, opts);
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
