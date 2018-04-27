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
      { key: "other_passport_number", selector: "OTHER_PPT_NUM", timer: 500 }
    ] },
    { key: "other_residence_yn", selector: "PermResOtherCntryInd", type: "radio", timer: 2000 },
    { key: "other_residence_page", selector: "dtlOthPermResCntry", timer: 2500, type: [
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
    { key: "trippayment", selector: "WhoIsPaying", type: "dropdown", timer: 1500, data: whoIsPaying },
    { key: "arrival_date", selector: "TRAVEL", type: "date" },
    { key: "time_in_country", selector: "TRAVEL_LOS" },
    { key: "time_in_country_frame", selector: "TRAVEL_LOS_CD", type: "dropdown" },
    { key: "us_stay_address", selector: "", type: "address", timer: 2000, data: usStayAddress },
    { key: "payee_last_name", selector: "PayerSurname", data: payerLastName },
    { key: "payee_first_name", selector: "PayerGivenName", data: payerFirstName },
    { key: "payee_tel", selector: "PayerPhone", type: "number" },
    { key: "payee_email", selector: "PAYER_EMAIL_ADDR", type: "email" },
    { key: "payee_relationship", selector: "PayerRelationship", type: "dropdown", data: tripPayerRelation },
    { key: "payee_address_yn", selector: "PayerAddrSameAsInd", type: "radio", data: payerAddressSame },
    { key: "payee_address", selector: "Payer", type: "address" },
    
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
  WorkEducation1: [
    { key: "occupation", selector: "PresentOccupation", type: "dropdown", data: occupation },
    { key: "work_name", selector: "EmpSchName", data: workName },
    { key: "work_address", selector: "EmpSch", type: "address", data: workAddress },
    { key: "work_zip", selector: "WORK_EDUC_ADDR_POSTAL_CD", data: workZip, type: "number" },
    { key: "work_phone", selector: "WORK_EDUC_TEL", type: "number", data: workPhone },
    { key: "work_start_date", selector: "EmpDateFrom", type: "date", data: workStartDate },
    { key: "current_monthly_income", selector: "CURR_MONTHLY_SALARY", type: "number" },
    { key: "work_duties", selector: "DescribeDuties", data: workDuties }
  ],
  WorkEducation2: [
    { key: "previously_employed", selector: "PreviouslyEmployed", type: "radio" },
    { key: "past_employment_group", selector: "dtlPrevEmpl", type: [
      { key: "past_employer_name", selector: "EmployerName", timer: 200 },
      { key: "past_employer_address", selector: "Employer", type: "address" },
      { key: "past_employer_address", selector: "PREV_EMPL_ADDR", type: "address" },
      { key: "past_employer_number", selector: "EmployerPhone", type: "number" },
      { key: "past_job_title", selector: "JobTitle" },
      { key: "supervisors_surnames", selector: "SupervisorSurname", data: (data) => data['supervisors_name'].split(' ').shift() },
      { key: "supervisors_given_names", selector: "SupervisorGivenName", data: (data) => data['supervisors_name'].split(' ').pop() },
      { key: "start_date", selector: "EmpDateFrom", type: "date" },
      { key: "end_date", selector: "EmpDateTo", type: "date" },
      { key: "past_duties", selector: "DescribeDuties" }
    ], timer: 500 },
    { key: "previous_education", selector: "OtherEduc", type: "radio", timer: 3000 },
    { key: "previous_education_info_group", selector: "dtlPrevEduc", timer: 500, type: [
      { key: "previous_school_name", selector: "SchoolName" },
      { key: "previous_school_address", selector: "School", type: "address" },
      { key: "previous_school_address", selector: "EDUC_INST_ADDR", type: "address" },
      { key: "previous_course_study", selector: "SchoolCourseOfStudy" },
      { key: "school_start", selector: "SchoolFrom", type: "date" },
      { key: "school_end", selector: "SchoolTo", type: "date" }
    ]}
  ],
  WorkEducation3: [
    { key: "clan_yn", selector: "CLAN_TRIBE_IND", type: "radio" },
    { key: "clan_name", selector: "CLAN_TRIBE_NAME", timer: 800 },
    { key: "languages_page", selector: "dtlLANGUAGES", type: [
      { key: "languages", selector: "LANGUAGE_NAME" }
    ]},
    { key: "travel_yn", selector: "COUNTRIES_VISITED_IND", timer: 2000, type: "radio" },
    { key: "previous_countries", selector: "dtlCountriesVisited", timer: 1000, type: [
      { key: "previous_countries_list", selector: "COUNTRIES_VISITED", type: "dropdown", timer: 500 }
    ]},
    { key: "charitable_yn", selector: "ORGANIZATION_IND", type: "radio" },
    { key: "charitable_name", selector: "dtlORGANIZATIONS", type: [
      { key: "", selector: "ORGANIZATION_NAME" }
    ]},
    { key: "taliban_yn", selector: "TALIBAN_IND", type: "radio" },
    { key: "firearms_yn", selector: "SPECIALIZED_SKILLS_IND", type: "radio" },
    { key: "firearms_explain", selector: "SPECIALIZED_SKILLS_EXPL" },
    { key: "military_yn", selector: "MILITARY_SERVICE_IND", type: "radio" },
    { key: "military_service", selector: "dtlMILITARY_SERVICE", type: [
      { key: "army_country", selector: "MILITARY_SVC_CNTRY", type: "dropdown" },
      { key: "army_branch", selector: "MILITARY_SVC_BRANCH" },
      { key: "army_rank", selector: "MILITARY_SVC_RANK" },
      { key: "army_specialty", selector: "MILITARY_SVC_SPECIALTY" },
      { key: "army_begin", selector: "MILITARY_SVC_FROM", type: "date" },
      { key: "army_end", selector: "MILITARY_SVC_TO", type: "date" }
    ]},
    { key: "guerilla_yn", selector: "INSURGENT_ORG_IND", type: "radio" },
    { key: "guerilla_explain", selector: "INSURGENT_ORG_EXPL" }
  ],
  SecurityandBackground1: [
    { key: "disease_yn", selector: "Disease", type: "radio" },
    { key: "disease_explain", selector: "Disease", type: "radio" },
    { key: "mental_yn", selector: "Disorder", type: "radio" },
    { key: "mental_explain", selector: "Disease", type: "radio" },
    { key: "drug_yn", selector: "Druguser", type: "radio" },
    { key: "drug_explain", selector: "Disease", type: "radio" },

  ],
  SecurityandBackground2: [
    { key: "convicted_yn", selector: "Arrested", type: "radio" },
    { key: "convicted_explain", selector: "Arrested" },
    { key: "substances_yn", selector: "ControlledSubstances", type: "radio" }, 
    { key: "substances_explain", selector: "ControlledSubstances" },
    { key: "prostitution_yn", selector: "Prostitution", type: "radio" }, 
    { key: "prostitution_explain", selector: "Prostitution" },
    { key: "laundering_yn", selector: "MoneyLaundering", type: "radio" }, 
    { key: "laundering_explain", selector: "MoneyLaundering" },
    { key: "trafficking_yn", selector: "HumanTrafficking", type: "radio" }, 
    { key: "trafficking_explain", selector: "HumanTrafficking" },
    { key: "ustrafficking_yn", selector: "AssistedSevereTrafficking", type: "radio" }, 
    { key: "ustrafficking_explain", selector: "AssistedSevereTrafficking" },
    { key: "traffickingrelation_yn", selector: "HumanTraffickingRelated", type: "radio" }, 
    { key: "traffickingrelation_explain", selector: "HumanTraffickingRelated" },
  ],
  SecurityandBackground3: [
    { key: "espionage_yn", selector: "IllegalActivity", type: "radio" },
    { key: "espionage_explain", selector: "IllegalActivity" },
    { key: "terrorism_yn", selector: "TerroristActivity", type: "radio" }, 
    { key: "terrorism_explain", selector: "TerroristActivity" },
    { key: "terrorsupport_yn", selector: "TerroristSupport", type: "radio" }, 
    { key: "terrorsupport_explain", selector: "TerroristSupport" },
    { key: "terrororg_yn", selector: "TerroristOrg", type: "radio" }, 
    { key: "terrororg_explain", selector: "TerroristOrg" },
    { key: "genocide_yn", selector: "Genocide", type: "radio" }, 
    { key: "genocide_explain", selector: "Genocide" },
    { key: "torture_yn", selector: "Torture", type: "radio" }, 
    { key: "torture_explain", selector: "Torture" },
    { key: "killing_yn", selector: "ExViolence", type: "radio" }, 
    { key: "killing_explain", selector: "ExViolence" },
    { key: "childsoldiers_yn", selector: "ChildSoldier", type: "radio" }, 
    { key: "childsoldiers_explain", selector: "ChildSoldier" },
    { key: "religion_yn", selector: "ReligiousFreedom", type: "radio" }, 
    { key: "religion_explain", selector: "ReligiousFreedom" },
    { key: "abortion_yn", selector: "PopulationControls", type: "radio" }, 
    { key: "abortion_explain", selector: "PopulationControls" },
    { key: "organ_yn", selector: "Transplant", type: "radio" }, 
    { key: "organ_explain", selector: "Transplant" },
  ],
  SecurityandBackground4: [
    { key: "removal_hearing_yn", selector: "RemovalHearing", type: "radio" },
    { key: "removal_hearing_explain", selector: "RemovalHearing" },
    { key: "immigration_fraud_yn", selector: "ImmigrationFraud", type: "radio" }, 
    { key: "immigration_fraud_explain", selector: "ImmigrationFraud" },
    { key: "fail_attend_yn", selector: "FailToAttend", type: "radio" }, 
    { key: "fail_attend_explain", selector: "FailToAttend" },
    { key: "visa_violation_yn", selector: "VisaViolation", type: "radio" }, 
    { key: "visa_violation_explain", selector: "VisaViolation" },
  ],
  SecurityandBackground5: [
    { key: "custody_yn", selector: "ChildCustody", type: "radio" },
    { key: "custody_explain", selector: "ChildCustody" },
    { key: "vote_yn", selector: "VotingViolation", type: "radio" }, 
    { key: "vote_explain", selector: "VotingViolation" },
    { key: "taxevasion_yn", selector: "RenounceExp", type: "radio" }, 
    { key: "taxevasion_explain", selector: "RenounceExp" },
    { key: "school_reimburse_yn", selector: "AttWoReimb", type: "radio" }, 
    { key: "school_reimburse_explain", selector: "AttWoReimb" },
  ],
  SignCertify: [
    { key: "assisted", selector: "PREP_IND", type: "radio", data: (data) => "Yes" },

  ]

};

function occupation(data) {
  if(data['is_student'] == "Yes" && data['student_primary'] == "Yes") {
    return "S";
  }
  else if(data['currently_working'] == "Yes") {
    return data['occupation'];
  }
  else return data['work_status'];
}

function workName(data) {
  if(data['is_student'] == "Yes" && data['student_primary'] == "Yes") {
    return data['school_name'];
  }
  
  return data['employer_name'];
}

function workAddress(data) {
  if(data['is_student'] == "Yes" && data['student_primary'] == "Yes") {
    return data['school_address'];
  }

  return data['employer_address'];
}

function workZip(data) {
  address = JSON.parse(workAddress(data));
  return address['zip'];
}

function workPhone(data) {
  if(data['is_student'] == "Yes" && data['student_primary'] == "Yes") {
    return data['school_number'];
  }

  return data['employer_number'];
}

function workStartDate(data) {
  if(data['is_student'] == "Yes" && data['student_primary'] == "Yes") {
    return data['school_start'];
  }

  return data['start_date'];
}

function workDuties(data) {
  if(data['is_student'] == "Yes" && data['student_primary'] == "Yes") {
    return data['course_of_study'];
  }

  return data['employer_duties'];
}

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

function usStayAddress(data) {
  // If user doesn't know anyone in US
  // or if doesn't stay at point of contact's place
  // use stay address
  if(data["know_anyone_us"] == "No" ||
    data["know_anyone_us"] == "Yes" && data["us_stay_same"] == "No") {
    return data["us_stay_address"];
  }

  // Otherwise, use contact address
  return data["us_contact_address"];
}

function whoIsPaying(data) {
  const relationMapper = {
    self: "S",
    company: "P",
    father: "O",
    mother: "O",
    spouse: "O",
    friend: "O",
    child: "O",
    relative: "O",
    partner: "O",
    organization: "C",
  };

  return relationMapper[data["trippayment"]];
}

function payerLastName(data) {
  switch(data["trippayment"]) {
    case "father":
      return data["father_last_name"];
    case "mother":
      return data["mother_last_name"];
    case "spouse":
      return data["spouse_last"];
  }

  return data["payee_last_name"];
}

function payerFirstName(data) {
  switch(data["trippayment"]) {
    case "father":
      return data["father_first_name"];
    case "mother":
      return data["mother_first_name"];
    case "spouse":
      return data["spouse_first"];
  }

  return data["payee_first_name"];
}

function tripPayerRelation(data) {
  const relationMapper = {
    company: "P",
    father: "P",
    mother: "P",
    spouse: "S",
    friend: "F",
    child: "C",
    relative: "R",
    partner: "R",
    organization: "C",
  };

  return relationMapper[data["trippayment"]];
}

function payerAddressSame(data) {
  var payerAddress = JSON.parse(data["payee_address"]),
    homeAddress = JSON.parse(data["user_address"]);
  if(payerAddress["street"] == homeAddress["street"]) {
    return "Yes";
  }

  return "No";
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
