const InputMapper = {
  Personal1: [
    { key: "last_name", selector: "APP_SURNAME" },
    { key: "first_name", selector: "APP_GIVEN_NAME" },
    { key: "gender", helper: "checkYesNo", selector: "APP_GENDER" },
    { key: "full_name", data: (data) => data['first_name'] + ' ' + data['last_name'], selector: "APP_FULL_NAME_NATIVE" },
    { key: "alias_yn", helper: "checkYesNo", selector: "OtherNames" },
    { key: "alias", selector: "DListAlias", timer: 1500, helper: [
      { key: "given_names", helper: "fillTextInput", selector: "SURNAME" },
      { key: "surnames", helper: "fillTextInput", selector: "GIVEN_NAME" }
    ] },
    { key: "telecode_yn", selector: "TelecodeQuestion", helper: "checkYesNo" },
    { key: "telecode_surname", selector: "APP_TelecodeSURNAME", data: (data) => (data['telecode'] || '').split(' ').pop() }, 
    { key: "telecode_given_names", selector: "APP_TelecodeGIVEN_NAME", data: (data) => (data['telecode'] || '').split(' ').shift() },
    { key: "marital_status", selector: "APP_MARITAL_STATUS", helper: "findInSelect" },
    { key: "DOB", selector: "DOB", helper: "setDate" },
    { key: "city_of_birth", selector: "APP_POB_CITY" },
    { key: "state_of_birth", selector: "APP_POB_ST_PROVINCE" },
    { key: "country_of_birth", selector: "APP_POB_CNTRY", helper: "findInSelect" }
  ],
  findByKey: function(key, mapper = null) {
    if (!mapper) {
      mapper = currentMapper;
    }

    return mapper.find(function(mapRow) { return mapRow.key == key; });
  },
  currentDomain: "personal1",
  currentMapper: function() { return this[this.currentDomain]; }
};
