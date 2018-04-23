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
    { key: "specific_travel_plans", selector: "SpecificTravel", type: "radio", data: data => "No", timer: 1000 },
    { key: "trippayment", selector: "WhoIsPaying", type: "dropdown", timer: 1500 },
    { key: "arrival_date", selector: "TRAVEL", type: "date" },
    { key: "time_in_country", selector: "TRAVEL_LOS" },
    { key: "time_in_country_frame", selector: "TRAVEL_LOS_CD", type: "dropdown" },
    { key: "us_stay_address", selector: "", type: "address", timer: 4000 },
    
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

  ]
};

function transformCompanionData(data, key) {
  var dataCompanions = data[key];
  for(var i = 0, dataSlice = dataCompanions[0] ; i < dataCompanions.length ; ++i , dataSlice = dataCompanions[i]) {
    console.log(dataCompanions);
    switch(dataSlice["travel_companion_relation"]) {
      case "mother":
        dataSlice["travel_companion_first"] = data["mother_first_name"];
        dataSlice["travel_companion_last"] = data["mother_last_name"];
        dataSlice["travel_companion_relation"] = "PARENT";
        console.log("MOTHERRRRR");
        break;
      case "father":
        break;
      case "spouse":
        break;
    }
  }

  console.log('transformed', dataCompanions);

  return dataCompanions;
}
