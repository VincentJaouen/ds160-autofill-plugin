const InputMapper = {
  Personal1: [
    { key: "last_name", selector: "APP_SURNAME" },
    { key: "first_name", selector: "APP_GIVEN_NAME" },
    { key: "gender", type: "radio", selector: "APP_GENDER" },
    { key: "full_name", data: (data) => data['first_name'] + ' ' + data['last_name'], selector: "APP_FULL_NAME_NATIVE" },
    { key: "alias_yn", type: "radio", selector: "OtherNames" },
    { key: "alias", selector: "DListAlias", timer: 1500, type: [
      { key: "given_names", selector: "SURNAME" },
      { key: "surnames", selector: "GIVEN_NAME" }
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
    { key: "mailing_address", selector: "MAILING_ADDR", type: "address", timer: 800 },
    { key: "phone_number", selector: "APP_HOME_TEL", type: "number" },
    { key: "secondary_phone_number", selector: "APP_MOBILE_TEL" },
    { key: "work_phone_number", selector: "APP_BUS_TEL" },
    { key: "emeil", selector: "APP_EMAIL_ADDR", data: (data) => "application@passpal.co", type: "email" }
  ],
  PptVisa: [
    { key: "passport_type", selector: "PPT_TYPE", type: "dropdown" },
    { key: "passport_number", selector: "PPT_NUM" },
    { key: "passport_book_number", selector: "PPT_BOOK_NUM" },
    { key: "passport_country", selector: "PPT_ISSUED_CNTRY", type: "dropdown" },
    { key: "passport_city", selector: "PPT_ISSUED_IN_CITY" },
    { key: "passport_country", selector: "PPT_ISSUED_IN_CNTRY", type: "dropdown" },
    { key: "passport_issue", selector: "PPT_ISSUED", type: "date" },
    { key: "passport_expire", selector: "PPT_EXPIRE", type: "date" },
    { key: "passport_lost_yn", selector: "LOST_PPT_IND", type: "radio" },
    { key: "passport_lost", selector: "dtlLostPPT", timer: 1000, type: [
      { key: "passport_lost_number", selector: "LOST_PPT_NUM" },
      { key: "passport_lost_country", selector: "LOST_PPT_NATL", type: "dropdown" },
      { key: "passport_lost_explain", selector: "LOST_PPT_EXPL", type: "textarea" },
    ], data: (data) => [{ passport_lost_explain: data['passport_lost_explain'] }] }
  ],
  Travel: [
    { key: "trip_purpose", selector: "dlPrincipalAppTravel", data: data => [{ visa_category: "B", visa_type: "B1-B2" }], type: [
      { key: "visa_category", selector: "PurposeOfTrip", type: "dropdown" },
      { key: "visa_type", selector: "OtherPurpose", type: "dropdown", timer: 400 }
    ] },
    { key: "specific_travel_plans", selector: "SpecificTravel", type: "radio", data: () => "No", timer: 1000 },
    { key: "trippayment", selector: "WhoIsPaying", type: "dropdown", timer: 1500 },
    { key: "arrival_date", selector: "TRAVEL", type: "date" },
    { key: "time_in_country", selector: "TRAVEL_LOS" },
    { key: "time_in_country_frame", selector: "TRAVEL_LOS_CD", type: "dropdown" },
    { key: "us_stay_address", selector: "", type: "address", timer: 2000 },
    
  ],
  TravelCompanions: [
    { key: "travelcompanions_yn", selector: "OtherPersonsTravelingWithYou", type: "radio" },
    { key: "grouptravel_yn", selector: "GroupTravel", type: "radio" },
    { key: "grouptravel_name", selector: "GroupName" },
    { key: "travel_companions_page", selector: "dlTravelCompanions", data: (data) => transformCompanionData(data, "travel_companions_page"), timer: 1000, type: [
      { key: "travel_companion_first", selector: "GivenName" },
      { key: "travel_companion_last", selector: "Surname" },
      { key: "travel_companion_relation", selector: "TCRelationship", type: "dropdown" }
    ]},
  ],
  PreviousUSTravel: [
    { key: "ustravel_yn", selector: "PREV_US_TRAVEL_IND", type: "radio" },
    { key: "previous_ustrips", selector: "dtlPREV_US_VISIT", type: [
      { key: "previous_ustrip_date", selector: "PREV_US_VISIT", type: "date" },
      { key: "previous_ustrip_duration_num", selector: "PREV_US_VISIT_LOS", data: data => data["previous_ustrip_duration"].split(' ')[0] },
      { key: "previous_ustrip_duration_type", selector: "PREV_US_VISIT_LOS_CD", type: "dropdown", data: data => data["previous_ustrip_duration"].split(' ')[1] }
    ], timer: 2000 },
    { key: "driverslicense_yn", selector: "PREV_US_DRIVER_LIC_IND", type: "radio" },
    { key: "previous_visa_yn", selector: "PREV_VISA_IND", type: "radio" },
    { key: "previousvisa_issuedate", selector: "PREV_VISA_ISSUED", type: "date" },
    { key: "previousvisa_number", selector: "PREV_VISA_FOIL_NUMBER" },
    { key: "previousvisa_same_yn", selector: "PREV_VISA_SAME_TYPE_IND", type: "radio" },
    { key: "previousvisa_country", selector: "PREV_VISA_SAME_CNTRY_IND", type: "radio", data: data => "Yes" },
    { key: "tenprinted_yn", selector: "PREV_VISA_TEN_PRINT_IND", type: "radio" },
    { key: "previousvisa_lost_stolen_yn", selector: "PREV_VISA_LOST_IND", type: "radio" },
    { key: "visa_lost_stolen_year", selector: "PREV_VISA_LOST_YEAR", timer: 2000 },
    { key: "visa_lost_stolen_explain", selector: "PREV_VISA_LOST_EXPL", timer: 2000 },
    { key: "previousvisa_revoked_yn", selector: "PREV_VISA_CANCELLED_IND", type: "radio" },
    { key: "entryrefusal_yn", selector: "PREV_VISA_REFUSED_IND", type: "radio" },
    { key: "entry_refusal_explain", selector: "PREV_VISA_REFUSED_EXPL" },
    { key: "estarefusal_yn", selector: "VWP_DENIAL_IND", type: "radio" },
    { key: "estarefusal_yn_explain", selector: "VWP_DENIAL_EXPL" },
    { key: "immigration_petition_yn", selector: "IV_PETITION_IND", type: "radio" },
    { key: "immigration_petition_explain", selector: "IV_PETITION_EXPL" }
  ],
  USContact: [
    { key: "know_anyone_us", selector: "US_POC_ORG_NA_IND", type: "checkbox", condition: data => data['know_anyone_us'] == "Yes" },
    { key: "us_contact_last_name", selector: "US_POC_SURNAME" },
    { key: "us_contact_first_name", selector: "US_POC_GIVEN_NAME" },
    { key: "know_anyone_us", selector: "US_POC_NAME_NA", type: "checkbox", condition: data => data['know_anyone_us'] == "No" },
    { key: "us_stay_name", selector: "US_POC_ORGANIZATION" },
    { key: "us_contact_relationship", selector: "US_POC_REL_TO_APP", type: "dropdown" },
    { key: "us_contact_address", selector: "US_POC_ADDR", type: "address", timer: 1000, data: usContactAddress },
    { key: "us_contact_phone", selector: "US_POC_HOME_TEL", type: "number", data: usContactPhone },
    { key: "us_contact_email", selector: "US_POC_EMAIL_ADDR" }
 ],
  Relatives: [
    { key: "father_last_name", selector: "FATHER_SURNAME" },
    { key: "father_first_name", selector: "FATHER_GIVEN_NAME" },
    { key: "know_father's_dateofbirth", selector: "FATHER_DOB_UNK_IND", type: "checkbox", condition: data => data["know_father's_dateofbirth"] == "No" },
    { key: "fatherDOB", selector: "FathersDOB", type: "date" },
    { key: "father_location", selector: "FATHER_LIVE_IN_US_IND", type: "radio" },
    { key: "father_status", selector: "FATHER_US_STATUS", type: "dropdown", timer: 1000 },
    { key: "mother_last_name", selector: "MOTHER_SURNAME" },
    { key: "mother_first_name", selector: "MOTHER_GIVEN_NAME" },
    { key: "know_mother's_dateofbirth", selector: "MOTHER_DOB_UNK_IND", type: "checkbox", condition: data => data["know_mother's_dateofbirth"] == "No"  },
    { key: "motherDOB", selector: "MothersDOB", type: "date" },
    { key: "mother_location", selector: "MOTHER_LIVE_IN_US_IND", type: "radio" },
    { key: "mother_status", selector: "MOTHER_US_STATUS", type: "dropdown", timer: 1000 },
    { key: "US_IMrelatives_yn", selector: "US_IMMED_RELATIVE_IND", type: "radio" },
    { key: "relatives_page", selector: "dlUSRelatives", type: [
      { key: "immediate_relative_last_name", selector: "US_REL_SURNAME" },
      { key: "immediate_relative_first_name", selector: "US_REL_GIVEN_NAME" },
      { key: "immediate_relative_type", selector: "US_REL_TYPE", type: "dropdown" },
      { key: "immediate_relative_status", selector: "US_REL_STATUS", type: "dropdown" }
    ], timer: 1000 },
    { key: "US_relatives_yn", selector: "US_OTHER_RELATIVE_IND", type: "radio" }
  ],
};

function usContactAddress(data) {
  if(data['know_anyone_us'] == "Yes") {
    return data['us_contact_address'];
  }

  return data['us_stay_address'];
}

function usContactPhone(data) {
  if(data['know_anyone_us'] == "Yes") {
    return data['us_contact_phone'];
  }

  return data['us_stay_phone'];
}

function transformContactRelationData(data) {
  if(data['know_anyone_us'] == "No") {
    return "O";
  }
  return data["us_contact_relationship"];
}

function transformCompanionData(data, key) {
  var dataCompanions = data[key];
  for(var i = 0, dataSlice = dataCompanions[0] ; i < dataCompanions.length ; ++i , dataSlice = dataCompanions[i]) {
    switch(dataSlice["travel_companion_relation"]) {
      case "mother":
        dataSlice["travel_companion_first"] = data["mother_first_name"];
        dataSlice["travel_companion_last"] = data["mother_last_name"];
        dataSlice["travel_companion_relation"] = "P";
        break;
      case "father":
        dataSlice["travel_companion_first"] = data["father_first_name"];
        dataSlice["travel_companion_last"] = data["father_last_name"];
        dataSlice["travel_companion_relation"] = "P";
        break;
      case "partner":
        dataSlice["travel_companion_relation"] = "O";
        break;
    }
  }
  return dataCompanions;
}
