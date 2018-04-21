const InputMapper = {
  Personal1: [
    { key: "last_name", selector: "APP_SURNAME" },
    { key: "first_name", selector: "APP_GIVEN_NAME" },
    { key: "gender", type: "radio", selector: "APP_GENDER" },
    { key: "full_name", data: (data) => data['first_name'] + ' ' + data['last_name'], selector: "APP_FULL_NAME_NATIVE" },
    { key: "alias_yn", type: "radio", selector: "OtherNames" },
    { key: "alias", selector: "DListAlias", timer: 3500, type: [
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
      { key: "other_passport_number", selector: "OTHER_PPT_NUM", timer: 600 }
    ] },
    { key: "other_residence_yn", selector: "PermResOtherCntryInd", type: "radio" },
    { key: "other_residence_page", selector: "dtlOthPermResCntry", timer: 1200, type: [
      { key: "other_residence", selector: "OthPermResCntry", type: "dropdown" }
    ] },
    { key: "national_id", selector: "APP_NATIONAL_ID" },
    { key: "social_number", selector: "APP_SSN", type: "ssn" },
    { key: "tax_ID", selector: "APP_TAX_ID" }
  ],
  AddressPhone: [
    { key: "user_address", selector: "APP_ADDR", type: "address" },
    { key: "same_mailing_address_yn", selector: "MailingAddrSame", type: "radio" },
    { key: "mailing_address", selector: "MAILING_ADDR", type: "address", timer: 400 },
    { key: "phone_number", selector: "APP_HOME_TEL", type: "number" },
    { key: "secondary_phone_number", selector: "APP_MOBILE_TEL" },
    { key: "work_phone_number", selector: "APP_BUS_TEL" },
    { key: "email", selector: "APP_EMAIL_ADDR", data: (data) => "application@passpal.co", type: "email" }
  ]
};
