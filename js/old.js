DEFAULT_TEXT = "MISSING";
DEFAULT_NO = "No";
DEFAULT_ADDRESS = '{"street":"MISSING","line2":"","zip":"00000","city":"MISSING","country":"Argentina"}';
DEFAULT_US_ADDRESS = '{"street":"MISSING","line2":"","zip":"00000","city":"MISSING","state":"AL","country":"Argentina"}';
DEFAULT_NUMBER = "0000000000";
DEFAULT_SMALL_NUMBER = "00000";
DEFAULT_PAST_DATE = "01/01/2014";
DEFAULT_FUTURE_DATE = "01/01/2025";
DEFAULT_COUNTRY = "ARGENTINA";
DEFAULT_RELATIONSHIP = "O";

function fillOutPagePersonal1Old(personalData) {
  var first_name = false, last_name =false,gender =false,marital_status =false,city_of_birth =false,state_of_birth =false,country_of_birth =false,DOB =false,alias_yn =false,telecode_yn =false;
  var firstNameValue = '', lastNameValue = '';

  for(var i in personalData) {
    var interaction = personalData[i].interaction;
    var value = personalData[i].value;

    if(interaction == "first_name") {
      fillTextInput("APP_GIVEN_NAME", value);
      firstNameValue = value;
      fillTextInput("APP_FULL_NAME_NATIVE", firstNameValue.trim() + ' ' + lastNameValue.trim(), false, false);
      first_name = true;
    }
    if(interaction == "last_name") {
      fillTextInput("APP_SURNAME", value);
      lastNameValue = value;
      fillTextInput("APP_FULL_NAME_NATIVE", firstNameValue.trim() + ' ' + lastNameValue.trim(), false, false);
      last_name = true;
    }
    if(interaction == "gender") {
      gender = checkGender("APP_GENDER", value);
    }
    if(interaction == "marital_status") {
      var marital = value.toUpperCase().trim();
      if (marital == "COMMON LAW MARRIED") {
        marital = "COMMON LAW MARRIAGE";
      }
      marital_status = setSelectValue("APP_MARITAL_STATUS", marital);
    }
    if(interaction == "city_of_birth") {
      city_of_birth = fillTextInput("APP_POB_CITY", value);
    }
    if (interaction=="state_of_birth") {
      state_of_birth = fillTextInput("APP_POB_ST_PROVINCE", value);
    }
    if (interaction == "country_of_birth") {
      var country = value.toUpperCase().trim();
      country_of_birth = setSelectValue("APP_POB_CNTRY", country);
    }
    if (interaction == "DOB") {
      DOB = setDate("DOB", value);
    }
    if(interaction == "alias_yn") {
      alias_yn = checkYesNo("OtherNames", value);
    }
    if(interaction == "telecode_yn") {
      checkYesNo("TelecodeQuestion", value);
      telecode_yn = true;
    }
  }

  if(!first_name){
    fillTextInput("APP_SURNAME", DEFAULT_TEXT);
  }
  if(!last_name){
    fillTextInput("APP_GIVEN_NAME", DEFAULT_TEXT);
  }
  if (!gender) {
    checkBox("APP_GENDER_0");
  }
  if (!marital_status) {
    setSelectValue("APP_MARITAL_STATUS", "SINGLE");
  }
  if (!city_of_birth) {
    fillTextInput("APP_POB_CITY", DEFAULT_TEXT);
  }
  if (!state_of_birth) {
    fillTextInput("APP_POB_ST_PROVINCE", DEFAULT_TEXT);
  }
  if (!country_of_birth) {
    fillTextInput("APP_POB_CNTRY", "ARGENTINA");
  }
  if (!DOB) {
    setDate("DOB", DEFAULT_PAST_DATE);
  }
  if (!alias_yn) {
    checkBox("OtherNames_1");
  }
  if (telecode_yn) {
    checkBox("TelecodeQuestion_1");
  }

  clickNext();
}

function fillOutPagePersonal2Old(personalData) {
  var nationality = false,othernationality_yn=false,other_residence_yn=false,national_id=false,ssn=false,taxidnumber=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction;
    var value = personalData[i].value;

    if(interaction=="nationality"){
      setSelectValue("ddlAPP_NATL", value);
      nationality = true;
    }
    if(interaction=="othernationality_yn"){
      checkYesNo("APP_OTH_NATL_IND", value);
      othernationality_yn = true;
    }
    if (interaction == "other_nationality") {
      setSelectValue("OTHER_NATL", value);
    }
    if (interaction == "other_passport_y/n") {
      checkYesNo("THER_PPT_IND", value);
    }
    if(interaction == "other_passport_number") {
      fillTextInput("OTHER_PPT_NUM", value);
    }
    if(interaction=="other_residence_yn"){
      checkYesNo("PermResOtherCntryInd", value);
      other_residence_yn = true;
    }
    if (interaction == "other_residence") {
      setSelectValue("OthPermResCntry", value);
    }
    if(interaction=="national_id"){
      fillTextInput("APP_NATIONAL_ID", personalData[i].value.trim().replaceAll(".","").replaceAll("-","").replaceAll("/",""));
      // $('input[name$="APP_NATIONAL_ID"]').val(personalData[i].value.trim().replaceAll(".","").replaceAll("-","").replaceAll("/",""));
      national_id = true;
    }
    if(interaction=="ssn"){
      var ssn_number = value.split("-");
      fillTextInput("APP_SSN1", ssl_number[0]);
      fillTextInput("APP_SSN2", ssl_number[1]);
      fillTextInput("APP_SSN3", ssl_number[2]);
      ssn = true
    }
    if (interaction=="taxidnumber") {
      fillNumberInput("APP_TAX_ID", value);
      taxidnumber = true
    }
  }

  if(!nationality) {
    setSelectValue("APP_NATL", "ARGENTINA");
  }
  if(!othernationality_yn){
    checkBox("APP_OTH_NATL_IND_1");
  }
  if(!other_residence_yn){
    missing_obj[i] = {};
    checkBox("PermResOtherCntryInd_1");
  }
  if(!national_id){
    checkBox("APP_NATIONAL_ID_NA");
  }
  if(!ssn){
    checkBox("APP_SSN_NA");
  }
  if(!taxidnumber){
    checkBox("APP_TAX_ID_NA");
  }

  clickNext();
}

function fillOutPageAddressPhoneOld(personalData) {
  var user_address = false,same_mailing_address_yn=false,phone_number=false,second_phone_number=false,work_phone_number=false,user_email=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if (interaction == "user_address") {
      user_address = setAddressValue("APP_ADDR", value);
    }
    if(interaction == "same_mailing_address_yn") {
      same_mailing_address_yn = checkYesNo("MailingAddrSame", value);
    }
    if(interaction == "phone_number"){
      phone_number = fillNumberInput("APP_HOME_TEL", value);
    }
    if(interaction == "second_phone_number") {
      second_phone_number = fillNumberInput("APP_MOBILE_TEL", value);
    }
    if(interaction == "work_phone_number") {
      work_phone_number = fillNumberInput("APP_BUS_TEL", value);
    }
    if(interaction == "user_email"){
      user_email = fillTextInput("APP_EMAIL_ADDR", value);
    }
    if(interaction == "mailing_address") {
      setAddressValue("MAILING_ADDR", value);
    }
  }

  if(!user_address){
    setAddressValue("APP_ADDR", DEFAULT_ADDRESS);
  }
  if(!same_mailing_address_yn){
    checkBox("MailingAddrSame_0");
  }
  if(!phone_number){
    fillNumberInput("APP_HOME_TEL", DEFAULT_NUMBER);
  }
  if(!second_phone_number){
    checkBox("MOBILE_TEL_NA");
  }
  if(!work_phone_number){
    checkBox("APP_BUS_TEL_NA");
  }
  if(!user_email){
    fillTextInput("APP_EMAIL_ADDR", "application@oliver.ai", false, false);
  }

  clickNext();
}

function fillOutPagePptVisaOld(personalData) {
  var passport_type = false,passport_number=false,passport_book_number=false,passport_city=false,passport_issue=false,passport_expire=false,passport_lost_yn=false, passport_lost_number=false,passport_lost_national=false,Passport_lost_explain=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if (interaction == "passport_type") {
      passport_type = setSelectValue("PPT_TYPE", value);
    }
    if (interaction == "passport_number") {
      passport_number = fillTextInput("PPT_NUM", value);
    }
    if (interaction == "passport_book_number") {
      passport_book_number = fillNumberInput("PPT_BOOK_NUM", value);
    } else {
      $('input[id$="PPT_BOOK_NUM_NA"]').prop("checked", true);
    }
    if (interaction == "passport_country") {
      passport_country = setSelectValue("PPT_ISSUED_CNTRY", personalData[i].value);
    }
    if (interaction == "passport_city") {
      passport_city = fillTextInput("PPT_ISSUED_IN_CITY", value);
    }
    if (interaction == "passport_issue") {
      passport_issue = setDate("PPT_ISSUED", value);
    }
    if(interaction == "passport_expire"){
      passport_expire = setDate("PPT_EXPIRE", value);
    }
    if(interaction == "passport_lost_yn"){
      passport_lost_yn = checkYesNo("LOST_PPT_IND", value);
    }
    if(interaction == "passport_lost_number"){
      $('input[name$="LOST_PPT_NUM"]').val(personalData[i].value);
      passport_lost_number = fillNumberInput("LOST_PPT_NUM", value);
    }
    if(interaction == "passport_lost_national") {
      passport_lost_national = setSelectValue("LOST_PPT_NATL", value.toUpperCase().trim());
    }
    if(interaction == "Passport_lost_explain") {
      Passport_lost_explain = fillTextarea("LOST_PPT_EXPL", value);
    }
  }
  if(!passport_type){
    setSelectValue("PPT_TYPE", "REGULAR");
  }
  if(!passport_number){
    fillTextInput("PPT_NUM", DEFAULT_TEXT);
  }
  if(!passport_book_number){
    checkBox("PPT_BOOK_NUM_NA");
  }
  if(!passport_city){
    fillTextInput("PPT_ISSUED_IN_CITY", DEFAULT_TEXT);
  }
  if (!passport_issue) {
    setDate("PPT_ISSUED", DEFAULT_PAST_DATE);
  }
  if (!passport_expire) {
    setDate("PPT_EXPIRE", DEFAULT_FUTURE_DATE);
  }
  if (!passport_lost_yn) {
    checkBox("LOST_PPT_IND_1");
  }
  if (!passport_lost_number) {
    checkBox("LOST_PPT_NUM_UNKN_IND");
  }
  if (!passport_lost_national) {
    setSelectValue("LOST_PPT_NATL", DEFAULT_COUNTRY);
  }
  if(!Passport_lost_explain){
    fillTextarea("LOST_PPT_EXPL", DEFAULT_TEXT);
  }

  clickNext();
}

function fillOutPageTravelOld(personalData) {
  var trippayment = false,arrival_date=false,time_in_country=false,time_in_country_frame=false,purposeoftrip=false,otherpurpose=false,staystreet=false,staycity=false,staystate=false, stayzipcode=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "purposeoftrip") {
      purposeoftrip = setSelectValue("PurposeOfTrip", value);
    }
    if(interaction == "otherpurpose") {
      otherpurpose = setSelectValue("OtherPurpose", value);
    }
    if(interaction == "staystreet") {
      staystreet = fillTextInput("StreetAddress1", value);
    }
    if(interaction == "staycity"){
      staycity = fillTextInput("City", value);
    }
    if(interaction == "staystate"){
      staystate = fillTextInput("TravelState", value);
    }
    if(interaction=="stayzipcode"){
      stayzipcode = fillTextInput("ZIPCode", value);
    }
    if(interaction == "trippayment") {
      switch(value) {
        case "self":
          trippayment = setSelectValue("WhoIsPaying", value);
          break;
        case "employer":
        case "company":
          trippayment = setSelectValue("WhoIsPaying", "C");
          break;
        default:
          trippayment = setSelectValue("WhoIsPaying", "O");
      }
    }
    if (interaction == "payee_last_name") {
      fillTextInput("PayerSurname", value);
    }
    if (interaction == "payee_first_name") {
      fillTextInput("PayerGivenName", value);
    }
    if (interaction == "payee_tel") {
      fillNumberInput("PayerPhone", value);
    }
    if (interaction == "payee_email") {
      fillTextInput("PAYER_EMAIL_ADDR", value, false, false);
    }
    if (interaction == "payee_address") {
      setAddressValue("Payer", value);
    }
    if(interaction == "arrival_date"){
      checkBox("SpecificTravel_1");
      arrival_date = setDate("TRAVEL_DTE", value);
    }
    if(interaction == "time_in_country"){
      time_in_country = fillNumberInput("TRAVEL_LOS", value);
    }
    if(interaction == "time_in_country_frame") {
      time_in_country_frame = findInSelect("TRAVEL_LOS_CD", value);
    }
  }

  if(!purposeoftrip){
    setSelectValue("PurposeOfTrip", "B");
  }
  if(!otherpurpose){
    setSelectValue("OtherPurpose", "B1-B2");
  }
  if(!staystreet){
    fillTextInput("StreetAddress1", DEFAULT_TEXT);
  }
  if(!staycity){
    fillTextInput("City", DEFAULT_TEXT);
  }
  if(!staystate){
    setSelectValue("TravelState", "AL");
  }
  if(!stayzipcode){
    fillNumberInput("ZIPCode", DEFAULT_SMALL_NUMBER);
  }
  if(!trippayment) {
    setSelectValue("WhoIsPaying", "S");
  }
  if(!arrival_date) {
    checkBox("SpecificTravel_1");
    arrival_date = setDate("TRAVEL_DTE", DEFAULT_FUTURE_DATE);
  }
  if(!time_in_country) {
    fillNumberInput("TRAVEL_LOS", 10);
  }
  if(!time_in_country_frame) {
    setSelectValue("TRAVEL_LOS_CD", "D");
  }

  clickNext();
}

function fillOutPageTravelCompanionsOld(personalData) {
  var travelcompanions_yn = false, grouptravel_yn = false,travel_companion_first=false,travel_companion_last=false,travel_companion_relation=false;

  for(var i in personalData) {
    var interaction = personalData[i].interaction, value = personalData[i].value;

    if(interaction == "travelcompanions_yn") {
      travelcompanions_yn = checkYesNo("OtherPersonsTravelingWithYou", value);
    }
    if(interaction == "grouptravel_yn") {
      grouptravel_yn = checkYesNo("GroupTravel", value);
    }
    if(interaction == "grouptravel_name") {
      grouptravel_name = fillTextInput("GroupName", value);
    }
    if(interaction == "travel_companion_last") {
      travel_companion_last = fillTextInput("Surname", value);
    }
    if(interaction == "travel_companion_first") {
      travel_companion_first = fillTextInput("GivenName", value);
    }
    if(interaction == "travel_companion_relation") {
      travel_companion_relation = findInSelect("TCRelationship", value);
    }
  }

  if(!travelcompanions_yn){
    checkBox("OtherPersonsTravelingWithYou");
  }
  if(!grouptravel_yn){
    checkBox("GroupTravel");
  }
  if(!travel_companion_relation){
    setSelectValue("TCRelationship", "P");
  }

  clickNext();
}

function fillOutPagePreviousUSTravelOld(personalData) {
  var ustravel_yn = false,previous_ustrip_date=false,previous_ustrip_duration=false,driverslicense_yn=false,previous_visa_yn=false,entryrefusal_yn=false,immigration_petition_yn=false, previousvisa_issuedate=false,previousvisa_number=false,previousvisa_same_yn=false,tenprinted_yn=false,previousvisa_lost_stolen_yn=false,previousvisa_revoked_yn=false;

  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;

    if(interaction == "ustravel_yn"){
      ustravel_yn = checkYesNo("PREV_US_TRAVEL_IND", value);
    }
    if(interaction == "previous_ustrip_date"){
      previous_ustrip_date = setDate("PREV_US_VISIT", value);
    }
    if(interaction == "previous_ustrip_duration"){
      var trip_date = personalData[i].value.split(" ");
      fillNumberInput("PREV_US_VISIT_LOS", value);
      setSelectValue("PREV_US_VISIT_LOS_CD", "D");
      previous_ustrip_duration = true;
    }
    if(interaction == "driverslicense_yn"){
      driverslicense_yn = checkYesNo("PREV_US_DRIVER_LIC_IND", value);
    }
    if(interaction == "previous_visa_yn"){
      previous_visa_yn = checkYesNo("PREV_VISA_IND", value);
    }


    if(interaction == "previousvisa_issuedate"){
      previousvisa_issuedate = setDate("PREV_VISA_ISSUED", value);
    }
    if(interaction == "previousvisa_number"){
      previousvisa_number = fillTextInput("PREV_VISA_FOIL_NUMBER", value);
    }
    if(interaction == "previousvisa_same_yn"){
      previousvisa_same_yn = checkYesNo("PREV_VISA_SAME_TYPE_IND", value);
      checkYesNo("PREV_VISA_SAME_CNTRY_IND", value);
    }
    if(interaction == "tenprinted_yn"){
      tenprinted_yn = checkYesNo("PREV_VISA_TEN_PRINT_IND", value);
    }
    if(interaction == "previousvisa_lost_stolen_yn"){
      previousvisa_lost_stolen_yn = checkYesNo("PREV_VISA_LOST_IND", value);
    }
    if(interaction == "previousvisa_revoked_yn"){
      previousvisa_revoked_yn = checkYesNo("PREV_VISA_CANCELLED_IND", value);
    }

    if(interaction == "entryrefusal_yn"){
      entryrefusal_yn = checkYesNo("PREV_VISA_REFUSED_IND", value);
    }
    if(interaction == "estarefusal_yn") {
      checkYesNo("VWP_DENIAL_IND", value);
    }
    if(interaction == "immigration_petition_yn"){
      immigration_petition_yn = checkYesNo("PETITION_IND", value);
    }
  }

  if(!ustravel_yn){
    checkBox("PREV_US_TRAVEL_IND_1");
  }
  if(!previous_ustrip_date){
    setDate("PREV_US_VISIT", DEFAULT_PAST_DATE);
  }
  if(!previous_ustrip_duration){
    fillNumberInput("PREV_US_VISIT_LOS", "10");
    setSelectValue("PREV_US_VISIT_LOS_CD", "D");
  }
  if(!driverslicense_yn){
    checkBox("PREV_US_DRIVER_LIC_IND_1");
  }
  if(!previous_visa_yn){
    checkBox("PREV_VISA_IND_1");
  }
  if(!previousvisa_issuedate){
    setDate("PREV_VISA_ISSUED", DEFAULT_PAST_DATE);
  }
  if(!previousvisa_number){
    checkBox("PREV_VISA_FOIL_NUMBER_NA");
  }
  if(!previousvisa_same_yn){
    checkBox("PREV_VISA_SAME_TYPE_IND_1");
    checkBox("PREV_VISA_SAME_CNTRY_IND_1");
  }
  if(!tenprinted_yn){
    checkBox("PREV_VISA_TEN_PRINT_IND_1");
  }
  if(!previousvisa_lost_stolen_yn){
    checkBox("PREV_VISA_LOST_IND_1");
  }
  if(!previousvisa_revoked_yn){
    checkBox("PREV_VISA_CANCELLED_IND_1");
  }
  if(!entryrefusal_yn){
    checkBox("PREV_VISA_REFUSED_IND_1");
  }
  if(!immigration_petition_yn){
    checkBox("PETITION_IND_1");
  }

  clickNext();
}

function fillOutPageUSContactOld(personalData) {
  var contact_surname= false,contact_givenname=false,organization_name=false,contact_relationship=false,contact_person_street=false,contact_person_city=false,contact_person_state=false,contact_person_zipcode=false,contact_person_phone=false,contact_person_email=false;

  checkBox("US_POC_NAME_NA");
  setAddressValue("US_POC_ADDR", DEFAULT_US_ADDRESS, true);
  fillTextInput("US_POC_ORGANIZATION", DEFAULT_TEXT);
  fillNumberInput("US_POC_HOME_TEL", DEFAULT_NUMBER);
  checkBox("US_POC_EMAIL_ADDR_NA");
  setSelectValue("US_POC_REL_TO_APP", DEFAULT_RELATIONSHIP);

  clickNext();
}

function fillOutPageSpouseOld(personalData) {
  var spouse_first= false,spouse_last=false,spouse_dob=false,spouse_birth_city=false,spouse_nationality=false,spouse_birth_country=false,spouse_living_yn=false;

  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "spouse_first"){
      spouse_first = fillTextInput("SpouseGivenName", value);
    }
    if(interaction == "spouse_last"){
      spouse_last = fillTextInput("SpouseSurname", value);
    }
    if(interaction == "spouse_dob"){
      spouse_dob = setDate("DOB", value);
    }
    if(interaction == "spouse_nationality"){
      spouse_nationality = setSelectValue("SpouseNatDropDownList", value);
    }
    if(interaction == "spouse_birth_city"){
      spouse_birth_city = fillTextInput("SpousePOBCity", value);
    }
    if(interaction == "spouse_birth_country"){
      spouse_birth_country = setSelectValue("SpousePOBCountry", value);
    }
    if(interaction == "spouse_living_yn"){
      if(value == "Yes"){
        setSelectValue("SpouseAddressType", "H");
      }else{
        setSelectValue("SpouseAddressType", "D");
      }
      spouse_living_yn = true;
    }
  }

  if(!spouse_first){
    fillTextInput("SpouseSurname", DEFAULT_TEXT);
  }
  if(!spouse_last){
    fillTextInput("SpouseGivenName", DEFAULT_TEXT);
  }
  if(!spouse_dob){
    setDat("DOB", DEFAULT_PAST_DATE);
  }
  if(!spouse_nationality){
    setSelectValue("SpouseNatDropDownList", DEFAULT_COUNTRY);
  }
  if(!spouse_birth_city){
    checkBox("SPOUSE_POB_CITY_NA");
  }
  if(!spouse_birth_country){
    setSelectValue("SpousePOBCountry", DEFAULT_COUNTRY);
  }
  if(!spouse_living_yn){
    setSelectValue("SpouseAddressType", "D");
  }

  clickNext();
}

function fillOutPageRelativesOld(personalData) {
  var father_first_name= false,father_last_name=false,fatherDOB=false,father_location=false,mother_first_name=false,mother_last_name=false,motherDOB=false,mother_location=false,US_IMrelatives_yn=false,immediate_relative_first_name=false,immediate_relative_last_name=false,immediate_relative_type=false,immediate_relative_status=false,US_relatives_yn=false;

  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "father_last_name"){
      father_last_name = fillTextInput("FATHER_SURNAME", value);
    }
    if(interaction == "father_first_name"){
      father_first_name = fillTextInput("FATHER_GIVEN_NAME", value);
    }
    if(interaction == "fatherDOB"){
      fatherDOB = setDate("FathersDOB", value);
    }
    if(interaction == "father_location"){
      father_location = checkYesNo("FATHER_LIVE_IN_US_IND", value);
    }
    if(interaction == "mother_last_name"){
      mother_last_name = fillTextInput("MOTHER_SURNAME", value);
    }
    if(interaction == "mother_first_name"){
      mother_first_name = fillTextInput("MOTHER_GIVEN_NAME", value);
    }
    if(interaction == "motherDOB"){
      motherDOB = setDate("MothersDOB", value);
    }
    if(interaction == "mother_location"){
      mother_location = checkYesNo("MOTHER_LIVE_IN_US_IND", value);
    }
    if(interaction == "US_IMrelatives_yn"){
      US_IMrelatives_yn = checkYesNo("US_IMMED_RELATIVE_IND", value);
    }
    if(interaction == "immediate_relative_first_name"){
      immediate_relative_first_name = fillTextInput("US_REL_GIVEN_NAME", value);
    }
    if(interaction == "immediate_relative_last_name"){
      immediate_relative_last_name = fillTextInput("US_REL_SURNAME", value);
    }
    if(interaction == "immediate_relative_type"){
      immediate_relative_type = setSelectValue("US_REL_TYPE", value);
    }
    if(interaction == "immediate_relative_status"){
      immediate_relative_status = findInSelect("US_REL_STATUS", value);
    }
    if(interaction == "US_relatives_yn"){
      US_relatives_yn = checkYesNo("US_OTHER_RELATIVE_IND", value);
    }
  }

  if(!father_first_name){
    checkBox("FATHER_SURNAME_UNK_IND");
  }
  if(!father_last_name){
    checkBox("FATHER_GIVEN_NAME_UNK_IND");
    $('input[id$="FATHER_GIVEN_NAME_UNK_IND"]').prop("checked", true);
  }
  if(!fatherDOB){
    checkBox("FATHER_DOB_UNK_IND");
    $('input[id$="FATHER_DOB_UNK_IND"]').prop("checked", true);
  }
  if(!father_location){
    checkBox("FATHER_LIVE_IN_US_IND_1");
  }
  if(!mother_first_name){
    checkBox("MOTHER_SURNAME_UNK_IND");
  }
  if(!mother_last_name){
    checkBox("MOTHER_GIVEN_NAME_UNK_IND");
  }
  if(!motherDOB){
    checkBox("MOTHER_DOB_UNK_IND");
  }
  if(!mother_location){
    checkBox("MOTHER_LIVE_IN_US_IND_1");
  }
  if(!US_IMrelatives_yn){
    checkBox("US_IMMED_RELATIVE_IND_1");
  }
  if(!immediate_relative_first_name){
    fillTextInput("US_REL_SURNAME", DEFAULT_TEXT);
  }
  if(!immediate_relative_last_name){
    fillTextInput("US_REL_GIVEN_NAME", DEFAULT_TEXT);
  }
  if(interaction == "immediate_relative_type"){
    setSelectValue("US_REL_TYPE", "B");
  }
  if(!immediate_relative_status){
    setSelectValue("US_REL_STATUS", "O");
  }
  if(!US_relatives_yn){
    checkBox("US_OTHER_RELATIVE_IND_1");
  }

  clickNext();
}

function fillOutPagePrevSpouseOld(personalData) {
  var spouse_first= false,spouse_last=false,spouse_dob=false,spouse_birth_city=false,spouse_nationality=false,spouse_birth_country=false,ex_start_date=false, ex_end_date=false,mariage_end_why=false,mariage_end_country=false;
  $('input[name$="NumberOfPrevSpouses"]').val("1");
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "spouse_first"){
      spouse_first = fillTextInput("GIVEN_NAME", value);
    }
    if(interaction == "spouse_last"){
      spouse_last = fillTextInput("SURNAME", value);
    }
    if(interaction == "spouse_dob"){
      spouse_dob = setDate("DOB", value);
    }
    if(interaction == "spouse_nationality"){
      spouse_nationality = setSelectValue("SpouseNatDropDownList", value);
    }
    if(interaction == "spouse_birth_city"){
      spouse_birth_city = fillTextInput("SpousePOBCity", value);
    }
    if(interaction == "spouse_birth_country"){
      spouse_birth_country = setSelectValue("SpousePOBCountry", value);
    }
    if(interaction == "ex_start_date"){
      ex_start_date = setDate("Dom", value);
    }
    if(interaction == "ex_end_date"){
      ex_end_date = setDate("DomEnd", value);
    }
    if(interaction == "mariage_end_why"){
      mariage_end_why = fillTextarea("HowMarriageEnded", value);
    }
    if(interaction == "mariage_end_country"){
      mariage_end_country = setSelectValue("MarriageEnded_CNTRY", value);
    }
  }

  clickNext();
}

function fillOutPageDeceasedSpouseOld(personalData) {
  fillOutPagePrevSpouseOld(personalData);
}

function fillOutPageWorkEducation1Old(personalData) {
  var occupation= false,employer_school_name=false,employer_number=false,employer_address=false,current_monthly_income=false,employer_duties=false,occupation_other_explain=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction.trim(), value = personalData[i].value;
    if(interaction == "is_student" && value == "Yes") {
      occupation = setSelectValue("PresentOccupation", "STUDENT");
    }
    if(interaction == "occupation" || interaction == "work_status"){
      occupation = findInSelect("PresentOccupation", value);
    }
    if(interaction == "occupation_other_explain"){
      occupation_other_explain = fillTextarea("ExplainOtherPresentOccupation", value);
    }
    if(interaction == "employer_name" || interaction == "school_name"){
      employer_school_name = fillTextInput("EmpSchName", value);
    }
    if(interaction == "employer_number" || interaction == "school_number"){
      employer_number = fillNumberInput("WORK_EDUC_TEL", value);
    }
    if(interaction == "employer_address" || interaction == "school_address"){
      var address = JSON.parse(personalData[i].value.trim());
      if(address['street'].trim() && address['street'].trim()!=""){
        fillTextInput("EmpSchAddr1", address['street'].trim());
      } else {
        fillTextInput("EmpSchAddr1", "MISSING");
      }
      fillTextInput("EmpSchAddr2", address['line2'].trim());
      fillTextInput("EmpSchCity", address['city'].trim());
      if(address['city'].trim() && address['city'].trim()!=""){
        fillTextInput("EmpSchCity", address['city'].trim());
      } else {
        fillTextInput("EmpSchCity", "MISSING");
      }
      if(address['zip'] && address['zip'].trim() != ""){
        fillTextInput("WORK_EDUC_ADDR_POSTAL_CD", address['zip']);
      } else {
        checkBox("WORK_EDUC_ADDR_POSTAL_CD_NA");
      }
      if(address['state']){
        fillTextInput("WORK_EDUC_ADDR_STATE", address['state']);
      } else {
        checkBox("WORK_EDUC_ADDR_STATE_NA");
      }

      if(!findInSelect("EmpSchCountry", address['country'])){
        setSelectValue("EmpSchCountry", "ARG");
      }
      employer_address = true;
    }
    if(interaction == "current_monthly_income") {
      current_monthly_income = fillNumberInput("CURR_MONTHLY_SALARY", value);
    }
    if(interaction == "employer_duties" || interaction == "course_of_study"){
      employer_duties = fillTextarea("DescribeDuties", value);
    }
  }

  if(!occupation){
    setSelectValue("PresentOccupation", "LP");
  }
  if(!occupation_other_explain){
    fillTextarea("ExplainOtherPresentOccupation", DEFAULT_TEXT);
  }
  if(!employer_school_name){
    fillTextInput("EmpSchName", DEFAULT_TEXT);
  }
  if (!employer_number) {
    fillNumberInput("WORK_EDUC_TEL", DEFAULT_NUMBER);
  }
  if(!employer_address){
    fillTextInput("EmpSchAddr1", DEFAULT_TEXT);
    fillTextInput("EmpSchCity", DEFAULT_TEXT);
    checkBox("WORK_EDUC_ADDR_POSTAL_CD_NA");
    checkBox("WORK_EDUC_ADDR_STATE_NA");
    setSelectValue("EmpSchCountry", DEFAULT_COUNTRY);
  }
  if(!current_monthly_income){
    checkBox("CURR_MONTHLY_SALARY_NA");
  }
  if(!employer_duties){
    fillTextarea("DescribeDuties", DEFAULT_TEXT);
  }

  clickNext();
}

function fillOutPageWorkEducation2Old(personalData) {
  var previously_employed= false,previous_education=false,previous_school_name=false,previous_school_address=false,previous_course_study=false,school_start=false,school_end=false, past_employer_name=false,supervisors_name=false,past_employer_address=false,past_job_title=false,start_date=false,end_date=false,past_duties=false;

  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;

    if(interaction == "previously_employed"){
      previously_employed = checkYesNo("PreviouslyEmployed", value);
    }
    if(interaction == "past_employer_name"){
      past_employer_name = fillTextInput("EmployerName", value);
    }

    if(interaction == "past_employer_address"){
      past_employer_address = setAddressValue("Employer", value, false, "PREV_EMPL_ADDR");
    }
    if (interaction == "past_employer_number") {
      fillNumberInput("EmployerPhone", value);
    }
    if(interaction == "past_job_title") {
      past_job_title = fillTextInput("JobTitle", value);
    }
    if(interaction == "supervisors_name"){
      var names = value.split(" ");
      var first_name = names.shift();
      fillTextInput("SupervisorGivenName", first_name);
      fillTextInput("SupervisorSurname", names.join(' '));
      supervisors_name = (value.trim() != '');
    }
    if(interaction == "start_date"){
      start_date = setDate("EmpDateFrom", value);
    }
    if(interaction == "end_date"){
      end_date = setDate("EmpDateTo", value);
    }
    if(interaction == "past_duties"){
      past_duties = fillTextarea("DescribeDuties", value);
    }

    if(interaction == "previous_education"){
      previous_education = checkYesNo("OtherEduc", value);
    }
    if(interaction == "previous_school_name"){
      previous_school_name = fillTextInput("SchoolName", value);
    }
    if(interaction == "previous_school_address"){
      previous_school_address = setAddressValue("School", value, false, "EDUC_INST_ADDR");
    }
    if(interaction == "previous_course_study"){
      previous_course_study = fillTextInput("SchoolCourseOfStudy", value);
    }
    if(interaction == "school_start"){
      school_start = setDate("SchoolFrom", value);
    }
    if(interaction == "school_end"){
      school_end = setDate("SchoolTo", value);
    }
  }
  var missing_obj = [];
  var i =0;
  if(!previously_employed){
    checkBox("PreviouslyEmployed_1");
  }
  if(!past_employer_name){
    fillTextInput("EmployerName", DEFAULT_TEXT);
  }
  if(!past_employer_address){
    setAddressValue("Employer", DEFAULT_ADDRESS, false, "PREV_EMPL_ADDR");
  }
  if(!past_job_title){
    fillTextInput("JobTitle", DEFAULT_TEXT);
  }
  if(!supervisors_name){
    checkBox("SupervisorSurname_NA");
    checkBox("SupervisorGivenName_NA");
  }
  if(!start_date){
    setDate("EmpDateFrom", DEFAULT_PAST_DATE);
  }
  if(!end_date){
    setDate("EmpDateTo", DEFAULT_PAST_DATE);
  }
  if(!past_duties){
    fillTextarea("DescribeDuties", DEFAULT_TEXT);
  }
  if(!previous_education){
    checkBox("OtherEduc_1");
  }
  if(!previous_school_name){
    fillTextInput("SchoolName", DEFAULT_TEXT);
  }
  if(!previous_school_address){
    setAddressValue("School", DEFAULT_ADDRESS, false, "EDUC_INST");
  }
  if(!previous_course_study){
    fillTextInput("SchoolCourseOfStudy", DEFAULT_TEXT);
  }
  if(!school_start){
    setSelectValue("SchoolFrom", DEFAULT_PAST_DATE);
  }
  if(!school_end){
    setSelectValue("SchoolTo", DEFAULT_PAST_DATE);
  }

  clickNext();
}

function fillOutPageWorkEducation3Old(personalData) {
  var clan_yn= false,languages=false,travel_yn=false,previous_countries_list=false,charitable_yn=false,charitable_name=false,firearms_yn=false,military_yn=false,guerilla_yn=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "clan_yn"){
      clan_yn = checkYesNo("CLAN_TRIBE_IND", value);
    }
    if(interaction == "languages"){
      languages = fillTextInput("LANGUAGE_NAME", value);
    }
    if (interaction == "travel_yn") {
      travel_yn = checkYesNo("COUNTRIES_VISITED_IND", value);
    }
    if(interaction == "previous_countries_list"){
      previous_countries_list = findInSelect("COUNTRIES_VISITED", value);
    }
    if(interaction == "charitable_yn"){
      charitable_yn = checkYesNo("charitable_yn", value);
    }
    if (interaction == "charitable_name") {
      charitable_name = fillTextInput("ORGANIZATION_NAME", value);
    }
    if(interaction == "firearms_yn"){
      firearms_yn = checkYesNo("SPECIALIZED_SKILLS_IND", value);
    }
    if(interaction == "military_yn"){
      military_yn = checkYesNo("MILITARY_SERVICE_IND", value);
    }
    if(interaction == "guerilla_yn"){
      guerilla_yn = checkYesNo("INSURGENT_ORG_IND", value);
    }
  }

  if(!clan_yn){
    checkBox("CLAN_TRIBE_IND_1");
  }
  if(!languages){
    fillTextInput("LANGUAGE_NAME", DEFAULT_TEXT);
  }
  if(!previous_countries_list){
  }
  if(!charitable_yn){
    checkBox("ORGANIZATION_IND_1");
  }
  if(!firearms_yn){
    checkBox("SPECIALIZED_SKILLS_IND_1");
  }
  if(!military_yn){
    checkBox("MILITARY_SERVICE_IND_1");
  }
  if(!guerilla_yn){
    checkBox("INSURGENT_ORG_IND_1");
  }

  clickNext();
}

function fillOutPageSecurityandBackground1Old(personalData) {
  var disease_yn= false,mental_yn=false,drug_yn=false,charitable_yn=false,firearms_yn=false,military_yn=false,guerilla_yn=false;

  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;

    if(interaction == "disease_yn"){
      disease_yn = checkYesNo("Disease", value);
    }
    if(interaction == "mental_yn"){
      mental_yn = checkYesNo("Disorder", value);
    }
    if(interaction == "drug_yn"){
      drug_yn = checkYesNo("Druguser", value);
    }
  }

  if(!disease_yn){
    checkBox("Disease");
  }
  if(!mental_yn){
    checkBox("Disorder");
  }
  if(!drug_yn){
    checkBox("Druguser");
  }

  clickNext();
}

function fillOutPageSecurityandBackground2Old(personalData) {
  var convicted_yn= false,substances_yn=false,prostitution_yn=false,laundering_yn=false,trafficking_yn=false,ustrafficking_yn=false,traffickingrelation_yn=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "convicted_yn"){
      convicted_yn = checkYesNo("Arrested", value);
    }
    if(interaction == "substances_yn"){
      substances_yn = checkYesNo("ControlledSubstances", value);
    }
    if(interaction == "prostitution_yn"){
      prostitution_yn = checkYesNo("Prostitution", value);
    }
    if(interaction == "laundering_yn"){
      laundering_yn = checkYesNo("MoneyLaundering", value);
    }
    if(interaction == "trafficking_yn"){
      trafficking_yn = checkYesNo("HumanTrafficking", value);
    }
    if(interaction == "ustrafficking_yn"){
      ustrafficking_yn = checkYesNo("AssistedSevereTrafficking", value);
    }
    if(interaction == "traffickingrelation_yn"){
      traffickingrelation_yn = checkYesNo("HumanTraffickingRelated", value);
    }
  }

  if(!convicted_yn) {
    checkYesNo("Arrested", "No");
  }
  if(!substances_yn) {
    checkYesNo("ControlledSubstances", "No");
  }
  if(!prostitution_yn) {
    checkYesNo("Prostitution", "No");
  }
  if(!laundering_yn) {
    checkYesNo("MoneyLaundering", "No");
  }
  if(!trafficking_yn) {
    checkYesNo("HumanTrafficking", "No");
  }
  if(!ustrafficking_yn) {
    checkYesNo("AssistedSevereTrafficking", "No");
  }
  if(!traffickingrelation_yn) {
    checkYesNo("HumanTraffickingRelated", "No");
  }

  clickNext();
}

function fillOutPageSecurityandBackground3Old(personalData) {
  var espionage_yn= false,terrorism_yn=false,terrorsupport_yn=false,terrororg_yn=false,genocide_yn=false,torture_yn=false,killing_yn=false,childsoldiers_yn=false,religion_yn=false,abortion_yn=false,organ_yn=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "espionage_yn"){
      espionage_yn = checkYesNo("IllegalActivity", value);
    }
    if(interaction == "terrorism_yn"){
      terrorism_yn = checkYesNo("TerroristActivity", value);
    }
    if(interaction == "terrorsupport_yn"){
      terrorsupport_yn = checkYesNo("TerroristSupport", value);
    }
    if(interaction == "terrororg_yn"){
      terrororg_yn = checkYesNo("TerroristOrg", value);
    }
    if(interaction == "genocide_yn"){
      genocide_yn = checkYesNo("Genocide", value);
    }
    if(interaction == "torture_yn"){
      torture_yn = checkYesNo("Torture", value);
    }
    if(interaction == "killing_yn"){
      killing_yn = checkYesNo("ExViolence", value);
    }
    if(interaction == "childsoldiers_yn"){
      childsoldiers_yn = checkYesNo("ChildSoldier", value);
    }
    if(interaction == "religion_yn"){
      religion_yn = checkYesNo("ReligiousFreedom", value);
    }
    if(interaction == "abortion_yn"){
      abortion_yn = checkYesNo("PopulationControls", value);
    }
    if(interaction == "organ_yn"){
      organ_yn = checkYesNo("Transplant", value);
    }
  }

  if(!espionage_yn){
    checkYesNo("IllegalActivity", DEFAULT_NO);
  }
  if(!terrorism_yn){
    checkYesNo("TerroristActivity", DEFAULT_NO);
  }
  if(!terrorsupport_yn){
    checkYesNo("TerroristSupport", DEFAULT_NO);
  }
  if(!terrororg_yn){
    checkYesNo("TerroristOrg", DEFAULT_NO);
  }
  if(!genocide_yn){
    checkYesNo("Genocide", DEFAULT_NO);
  }
  if(!torture_yn){
    checkYesNo("Torture", DEFAULT_NO);
  }
  if(!killing_yn){
    checkYesNo("ExViolence", DEFAULT_NO);
  }
  if(!childsoldiers_yn){
    checkYesNo("ChildSoldier", DEFAULT_NO);
  }
  if(!religion_yn){
    checkYesNo("ReligiousFreedom", DEFAULT_NO);
  }
  if(!abortion_yn){
    checkYesNo("PopulationControls", DEFAULT_NO);
  }
  if(!organ_yn){
    checkYesNo("Transplant", DEFAULT_NO);
  }

  clickNext();
}

function fillOutPageSecurityandBackground4Old(personalData) {
  var removalhearing_yn= false,immigration_fraud_yn=false,failtoattend_yn=false,visaviolation_yn=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;

    if(interaction == "removalhearing_yn"){
      removalhearing_yn = checkYesNo("RemovalHearing", value);
    }
    if(interaction == "immigration_fraud_yn"){
      immigration_fraud_yn = checkYesNo("ImmigrationFraud", value);
    }
    if(interaction == "failtoattend_yn"){
      failtoattend_yn = checkYesNo("FailToAttend", value);
    }
    if(interaction == "visaviolation_yn"){
      visaviolation_yn = checkYesNo("VisaViolation", value);
    }
  }

  if(!removalhearing_yn){
    checkYesNo("RemovalHearing", DEFAULT_NO);
  }
  if(!immigration_fraud_yn){
    checkYesNo("ImmigrationFraud", DEFAULT_NO);
  }
  if(!failtoattend_yn){
    checkYesNo("FailToAttend", DEFAULT_NO);
  }
  if(!visaviolation_yn){
    checkYesNo("VisaViolation", DEFAULT_NO);
  }

  clickNext();
}

function fillOutPageSecurityandBackground5Old(personalData) {
  var custody_yn= false,vote_yn=false,taxevasion_yn=false,reimbursing_yn=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "custody_yn"){
      custody_yn = checkYesNo("ChildCustody", value);
    }
    if(interaction == "vote_yn"){
      vote_yn = checkYesNo("VotingViolation", value);
    }
    if(interaction == "taxevasion_yn"){
      taxevasion_yn = checkYesNo("RenounceExp", value);
    }
    if(interaction == "reimbursing_yn"){
      reimbursing_yn = checkYesNo("AttWoReimb", value);
    }
  }

  if(!custody_yn){
    checkYesNo("ChildCustody", DEFAULT_NO);
  }
  if(!vote_yn){
    checkYesNo("VotingViolation", DEFAULT_NO);
  }
  if(!taxevasion_yn){
    checkYesNo("RenounceExp", DEFAULT_NO);
  }
  if(!reimbursing_yn){
    checkYesNo("AttWoReimb", DEFAULT_NO);
  }

  clickNext();
}
