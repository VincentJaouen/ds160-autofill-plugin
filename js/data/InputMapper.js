const InputMapper = {
  Personal1: [
    { key: "last_name", selector: "APP_SURNAME" },
    { key: "first_name", selector: "APP_GIVEN_NAME" },
    { key: "gender", type: "radio", selector: "APP_GENDER" },
    { key: "full_name", data: (data) => data['first_name'] + ' ' + data['last_name'], selector: "APP_FULL_NAME_NATIVE" },
    { key: "alias_yn", type: "radio", selector: "OtherNames" },
    { key: "alias", selector: "DListAlias", timer: 1500, type: [
      { key: "given_names", selector: "SURNAME", timer: 1000 },
      { key: "surnames", selector: "GIVEN_NAME", timer: 1000 }
    ] },
    { key: "telecode_yn", selector: "TelecodeQuestion", type: "radio" },
    { key: "telecode_surname", selector: "APP_TelecodeSURNAME", data: (data) => (data['telecode'] || '').split(' ').pop() }, 
    { key: "telecode_given_names", selector: "APP_TelecodeGIVEN_NAME", data: (data) => (data['telecode'] || '').split(' ').shift() },
    { key: "marital_status", selector: "APP_MARITAL_STATUS", type: "dropdown" },
    { key: "DOB", selector: "DOB", type: "date" },
    { key: "city_of_birth", selector: "APP_POB_CITY" },
    { key: "state_of_birth", selector: "APP_POB_ST_PROVINCE" },
    { key: "country_of_birth", selector: "APP_POB_CNTRY", type: "dropdown" }
  ],
  Personal2: [
    { key: "nationality", selector: "APP_NATL", type: "dropdown" },
    { key: "othernationality_yn", selector: "APP_OTH_NATL_IND", type: "radio" },
    { key: "other_nationality_page", selector: "dtlOTHER_NATL", timer: 800, type: [
      { key: "other_nationality", selector: "OTHER_NATL", type: "dropdown" },
      { key: "other_passport_y/n", selector: "OTHER_PPT_IND", type: "radio"},
      { key: "other_passport_number", selector: "OTHER_PPT_NUM" }
    ] },
  ],
};
