DEFAULT_TEXT = "MISSING";
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

  var missing_obj = [];
  var i =0;
  if(!first_name){
    fillTextInput("APP_SURNAME", "MISSING");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="first_name";
    missing_obj[i]['value']="FERNANDEZ";
    i++;
  }
  if(!last_name){
    fillTextInput("APP_GIVEN_NAME", "MISSING");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="last_name";
    missing_obj[i]['value']="MIGUEL";
    i++
  }
  if (!gender) {
    checkBox("APP_GENDER_0");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="gender";
    missing_obj[i]['value']="male/female";
    i++
  }
  if (!marital_status) {
    setSelectValue("APP_MARITAL_STATUS", "SINGLE");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="marital_status";
    missing_obj[i]['value']="Married/Common law marriage/Single/Other/Widowed/Divorced";
    i++
  }
  if (!city_of_birth) {
    fillTextInput("APP_POB_CITY", "MISSING");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="city_of_birth";
    missing_obj[i]['value']="City Name";
    i++
  }
  if (!state_of_birth) {
    fillTextInput("APP_POB_ST_PROVINCE", "MISSING");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="state_of_birth";
    missing_obj[i]['value']="State Name";
    i++
  }
  if (!country_of_birth) {
    fillTextInput("APP_POB_CNTRY", "ARGENTINA");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="country_of_birth";
    missing_obj[i]['value']="Albania/Algeria/American";
    i++
  }
  if (!DOB) {
    setDate("DOB", "01/01/1980");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="DOB";
    missing_obj[i]['value']="01/01/1970";
    i++
  }
  if (!alias_yn) {
    checkBox("OtherNames_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="alias_yn";
    missing_obj[i]['value']="Yes/No";
    i++
  }
  if (telecode_yn) {
    //console.log(missing_obj);
    //console.log(missing_obj[i]);
    checkBox("TelecodeQuestion_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="telecode_yn";
    missing_obj[i]['value']="Yes/No";
    i++
  }

  // chrome.runtime.sendMessage({from: "content",data: missing_obj});
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
    if(interaction=="other_residence_yn"){
      checkYesNo("PermResOtherCntryInd", value);
      other_residence_yn = true;
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
  var missing_obj = [];
  var i =0;
  if(!nationality) {
    setSelectValue("APP_NATL", "ARGENTINA");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="nationality";
    missing_obj[i]['value']="Albania/Algeria/American";
    i++
  }
  if(!othernationality_yn){
    checkBox("APP_OTH_NATL_IND_1");
    // $('input[id$="APP_OTH_NATL_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i] = {}
    missing_obj[i]['interaction']="othernationality_yn";
    missing_obj[i]['value']="FERNANDEZ";
    i++
  }
  if(!other_residence_yn){
    missing_obj[i] = {};
    checkBox("PermResOtherCntryInd_1");
    // $('input[id$="PermResOtherCntryInd_1"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="othercountryindenty_yn";
    missing_obj[i]['value']="Yes/No";
    i++
  }
  if(!national_id){
    console.log('no national id');
    console.log(national_id);
    checkBox("APP_NATIONAL_ID_NA");
    // $('input[id$="APP_NATIONAL_ID_NA"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="national_id";
    missing_obj[i]['value']="123456789";
    i++
  }
  if(!ssn){
    $('input[id$="APP_SSN_NA"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="socialsecuritynumber";
    missing_obj[i]['value']="123-456-789";
    i++
  }
  if(!taxidnumber){
    $('input[id$="APP_TAX_ID_NA"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="taxidnumber";
    missing_obj[i]['value']="123456789";
    i++
  }
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
  var missing_obj = [];
  var i =0;
  if(!user_address){
    setAddressValue("APP_ADDR", DEFAULT_ADDRESS);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="user_address";
    missing_obj[i]['value']='{"street":" Honduras 5550","line2":"","zip":"1414","city":"Buenos Aires","country":"Argentina"}';
    i++
  }
  if(!same_mailing_address_yn){
    checkBox("MailingAddrSame_0");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="same_mailing_address_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!phone_number){
    fillNumberInput("APP_HOME_TEL", DEFAULT_NUMBER);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="phone_number";
    missing_obj[i]['value']='123456789';
    i++
  }
  if(!second_phone_number){
    checkBox("MOBILE_TEL_NA");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="second_phone_number";
    missing_obj[i]['value']='123456789';
    i++
  }
  if(!work_phone_number){
    checkBox("APP_BUS_TEL_NA");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="work_phone_number";
    missing_obj[i]['value']='123456789';
    i++
  }
  if(!user_email){
    fillTextInput("APP_EMAIL_ADDR", "application@oliver.ai", false, false);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="user_email";
    missing_obj[i]['value']='application@oliver.ai';
    i++
  }
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
  var missing_obj = [];
  var i =0;
  if(!passport_type){
    setSelectValue("PPT_TYPE", "REGULAR");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_type";
    missing_obj[i]['value']='regular/official/diplomatic/other';
    i++
  }
  if(!passport_number){
    fillTextInput("PPT_NUM", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_number";
    missing_obj[i]['value']='AA12345';
    i++
  }
  if(!passport_book_number){
    checkBox("PPT_BOOK_NUM_NA");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_book_number";
    missing_obj[i]['value']='123456';
    i++
  }
  if(!passport_city){
    fillTextInput("PPT_ISSUED_IN_CITY", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_city";
    missing_obj[i]['value']='city name';
    i++
  }
  if (!passport_issue) {
    setDate("PPT_ISSUED_DTE", DEFAULT_PAST_DATE);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_issue";
    missing_obj[i]['value']='1/01/2015';
    i++
  }
  if (!passport_expire) {
    setDate("PPT_EXPIRE_DTE", DEFAULT_FUTURE_DATE);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_expire";
    missing_obj[i]['value']='1/01/2025';
    i++
  }
  if (!passport_lost_yn) {
    checkBox("LOST_PPT_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_expire";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if (!passport_lost_number) {
    checkBox("LOST_PPT_NUM_UNKN_IND");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_lost_number";
    missing_obj[i]['value']='123456789';
    i++
  }
  if (!passport_lost_national) {
    setSelectValue("LOST_PPT_NATL", DEFAULT_COUNTRY);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_lost_national";
    missing_obj[i]['value']='Argentina/AUSTRALIA';
    i++
  }
  if(!Passport_lost_explain){
    fillTextarea("LOST_PPT_EXPL", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="Passport_lost_explain";
    missing_obj[i]['value']='explain text';
    i++
  }
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
      trippayment = setSelectValue("WhoIsPaying", value);
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
  var missing_obj = [];
  var i =0;
  if(!purposeoftrip){
    setSelectValue("PurposeOfTrip", "B");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="PurposeOfTrip";
    missing_obj[i]['value']='A/B/C/CNMI/D/E/F/G/HI/J/K/L/M/N/NATO/O/P/Q/R';
    i++
  }
  if(!otherpurpose){
    setSelectValue("OtherPurpose", "B1-B2");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="otherpurpose";
    missing_obj[i]['value']='F2-CH/C2-UN/C1-D';
    i++
  }
  if(!staystreet){
    fillTextInput("StreetAddress1", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="staystreet";
    missing_obj[i]['value']='street name';
    i++
  }
  if(!staycity){
    fillTextInput("City", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="staystreet";
    missing_obj[i]['value']='city name';
    i++
  }
  if(!staystate){
    setSelectValue("TravelState", "AL");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="staystate";
    missing_obj[i]['value']='DE';
    i++
  }
  if(!stayzipcode){
    fillNumberInput("ZIPCode", DEFAULT_SMALL_NUMBER);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="stayzipcode";
    missing_obj[i]['value']='12345';
    i++
  }
  if(!trippayment) {
    setSelectValue("WhoIsPaying", "S");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="trippayment";
    missing_obj[i]['value']='self';
    i++
  }
  if(!arrival_date) {
    checkBox("SpecificTravel_1");
    arrival_date = setDate("TRAVEL_DTE", DEFAULT_FUTURE_DATE);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="arrival_date";
    missing_obj[i]['value']='01/01/2018';
    i++
  }
  if(!time_in_country) {
    fillNumberInput("TRAVEL_LOS", 10);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="time_in_country";
    missing_obj[i]['value']='10';
    i++
  }
  if(!time_in_country_frame) {
    setSelectValue("TRAVEL_LOS_CD", "D");
    missing_obj[i] = {}
    missing_obj[i]['interaction'] = "time_in_country_frame";
    missing_obj[i]['value'] = 'Day/Month/Year';
    i++
  }
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
      setSelectValue("TCRelationship", value);
    }
  }
  var missing_obj = [];
  var i =0;
  if(!travelcompanions_yn){
    checkBox("OtherPersonsTravelingWithYou");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="travelcompanions_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!grouptravel_yn){
    checkBox("GroupTravel");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="grouptravel_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!travel_companion_relation){
    setSelectValue("TCRelationship", "P");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="travel_companion_relation";
    missing_obj[i]['value']='PARENT/SPOUSE/CHILD/FRIEND/BUSINESS ASSOCIATE/OTHER';
    i++
  }
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
    if(interaction == "immigration_petition_yn"){
      immigration_petition_yn = checkYesNo("PETITION_IND", value);
    }
  }
  var missing_obj = [];
  var i =0;
  if(!ustravel_yn){
    checkBox("PREV_US_TRAVEL_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="ustravel_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!previous_ustrip_date){
    setDate("PREV_US_VISIT", DEFAULT_PAST_DATE);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_ustrip_date";
    missing_obj[i]['value']='1/01/2001';
    i++
  }
  if(!previous_ustrip_duration){
    fillNumberInput("PREV_US_VISIT_LOS", "10");
    setSelectValue("PREV_US_VISIT_LOS_CD", "D");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_ustrip_duration";
    missing_obj[i]['value']='10 Days';
    i++
  }
  if(!driverslicense_yn){
    checkBox("PREV_US_DRIVER_LIC_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="driverslicense_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!previous_visa_yn){
    checkBox("PREV_VISA_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_visa_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!previousvisa_issuedate){
    setDate("PREV_VISA_ISSUED", DEFAULT_PAST_DATE);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previousvisa_issuedate";
    missing_obj[i]['value']='1/01/2001';
    i++
  }
  if(!previousvisa_number){
    checkBox("PREV_VISA_FOIL_NUMBER_NA");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previousvisa_number";
    missing_obj[i]['value']='123456789';
    i++
  }
  if(!previousvisa_same_yn){
    checkBox("PREV_VISA_SAME_TYPE_IND_1");
    checkBox("PREV_VISA_SAME_CNTRY_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previousvisa_same_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!tenprinted_yn){
    checkBox("PREV_VISA_TEN_PRINT_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="tenprinted_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!previousvisa_lost_stolen_yn){
    checkBox("PREV_VISA_LOST_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previousvisa_lost_stolen_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!previousvisa_revoked_yn){
    checkBox("PREV_VISA_CANCELLED_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previousvisa_revoked_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!entryrefusal_yn){
    checkBox("PREV_VISA_REFUSED_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="entryrefusal_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!immigration_petition_yn){
    checkBox("PETITION_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="immigration_petition_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
}

function fillOutPageUSContactOld(personalData) {
  var contact_surname= false,contact_givenname=false,organization_name=false,contact_relationship=false,contact_person_street=false,contact_person_city=false,contact_person_state=false,contact_person_zipcode=false,contact_person_phone=false,contact_person_email=false;

  checkBox("US_POC_NAME_NA");
  setAddressValue("US_POC_ADDR", DEFAULT_US_ADDRESS, true);
  fillTextInput("US_POC_ORGANIZATION", DEFAULT_TEXT);
  fillNumberInput("US_POC_HOME_TEL", DEFAULT_NUMBER);
  checkBox("US_POC_EMAIL_ADDR_NA");
  setSelectValue("US_POC_REL_TO_APP", DEFAULT_RELATIONSHIP);
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
  var missing_obj = [];
  var i =0;
  if(!spouse_first){
    fillTextInput("SpouseSurname", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_first";
    missing_obj[i]['value']='spouse firstname';
    i++
  }
  if(!spouse_last){
    fillTextInput("SpouseGivenName", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_last";
    missing_obj[i]['value']='spouse lastname';
    i++
  }
  if(!spouse_dob){
    setDat("DOB", DEFAULT_PAST_DATE);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_dob";
    missing_obj[i]['value']="01/1/1970";
    i++
  }
  if(!spouse_nationality){
    setSelectValue("SpouseNatDropDownList", DEFAULT_COUNTRY);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_nationality";
    missing_obj[i]['value']="Albania/Algeria/American";
    i++
  }
  if(!spouse_birth_city){
    checkBox("SPOUSE_POB_CITY_NA");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_birth_city";
    missing_obj[i]['value']="City name";
    i++
  }
  if(!spouse_birth_country){
    setSelectValue("SpousePOBCountry", DEFAULT_COUNTRY);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_birth_country";
    missing_obj[i]['value']="Albania/Algeria/American";
    i++
  }
  if(!spouse_living_yn){
    setSelectValue("SpouseAddressType", "D");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_living_yn";
    missing_obj[i]['value']="Yes/No";
    i++
  }
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
  var missing_obj = [];
  var i =0;
  if(!father_first_name){
    checkBox("FATHER_SURNAME_UNK_IND");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="father_first_name";
    missing_obj[i]['value']='father firstname';
    i++
  }
  if(!father_last_name){
    checkBox("FATHER_GIVEN_NAME_UNK_IND");
    $('input[id$="FATHER_GIVEN_NAME_UNK_IND"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="father_last_name";
    missing_obj[i]['value']='father lastname';
    i++
  }
  if(!fatherDOB){
    checkBox("FATHER_DOB_UNK_IND");
    $('input[id$="FATHER_DOB_UNK_IND"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="fatherDOB";
    missing_obj[i]['value']='1/1/1960';
    i++
  }
  if(!father_location){
    checkBox("FATHER_LIVE_IN_US_IND_1");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="father_location";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!mother_first_name){
    checkBox("MOTHER_SURNAME_UNK_IND");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="mother_first_name";
    missing_obj[i]['value']='mother firstname';
    i++
  }
  if(!mother_last_name){
    checkBox("MOTHER_GIVEN_NAME_UNK_IND");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="mother_last_name";
    missing_obj[i]['value']='mother lastname';
    i++
  }
  if(!motherDOB){
    checkBox("MOTHER_DOB_UNK_IND");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="motherDOB";
    missing_obj[i]['value']='1/1/1965';
    i++
  }
  if(!mother_location){
    checkBox("MOTHER_LIVE_IN_US_IND_1");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="mother_location";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!US_IMrelatives_yn){
    checkBox("US_IMMED_RELATIVE_IND_1");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="US_IMrelatives_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!immediate_relative_first_name){
    fillTextInput("US_REL_SURNAME", DEFAULT_TEXT);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="immediate_relative_first_name";
    missing_obj[i]['value']='relative firstname';
    i++
  }
  if(!immediate_relative_last_name){
    fillTextInput("US_REL_GIVEN_NAME", DEFAULT_TEXT);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="immediate_relative_last_name";
    missing_obj[i]['value']='relative lastname';
    i++
  }
  if(interaction == "immediate_relative_type"){
    setSelectValue("US_REL_TYPE", "B");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="immediate_relative_type";
    missing_obj[i]['value']='Spouse/Child/Sibling';
    i++
  }
  if(!immediate_relative_status){
    setSelectValue("US_REL_STATUS", "O");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="immediate_relative_status";
    missing_obj[i]['value']='citizen/resident/nonimmigrant/other';
    i++
  }
  if(!US_relatives_yn){
    checkBox("US_OTHER_RELATIVE_IND_1");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="US_OTHER_RELATIVE_IND_1";
    missing_obj[i]['value']='Yes/No';
    i++;
  }
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
}

function fillOutPageWorkEducation1Old(personalData) {
  var occupation= false,employer_school_name=false,employer_address=false,current_monthly_income=false,employer_duties=false,occupation_other_explain=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "is_student" && value == "Yes") {
      occupation = setSelectValue("PresentOccupation", "STUDENT");
    }
    if(interaction == "occupation" || interaction == "work_status"){
      occupation = findInSelect("PresentOccupation", value);
    }
    if(interaction == "occupation_other_explain"){
      occupation_other_explain = fillTextarea("ExplainOtherPresentOccupation", value);
    }
    if(interaction == "employer_school_name"){
      employer_school_name = fillTextInput("EmpSchName", personalData[i].value);
    }
    if(interaction == "employer_name"){
      employer_school_name = fillTextInput("EmpSchName", personalData[i].value);
    }
    if(interaction == "employer_number"){
      employer_number = fillTextInput("WORK_EDUC_TEL", personalData[i].value.numerize());
    }
    if(interaction == "employer_address"){
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
      if(address['zip'] && address['zip'].trim()!=""){
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
      if(address['phone_number']){
        fillTextInput("WORK_EDUC_TEL", address['phone_number'].numerize());
      } else {
        fillTextInput("WORK_EDUC_TEL", "000000000");
      }
      employer_address = true;
    }
    if(interaction == "current_monthly_income") {
      current_monthly_income = fillNumberInput("CURR_MONTHLY_SALARY", value);
    }
    if(interaction == "employer_duties"){
      employer_duties = fillTextarea("DescribeDuties", value);
    }
  }
  var missing_obj = [];
  var i =0;
  if(!occupation){
    setSelectValue("PresentOccupation", "LP");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="occupation";
    missing_obj[i]['value']='LEGAL PROFESSION/MILITARY/BUSINESS/RESEARCH/STUDENT/OTHER';
    i++
  }
  if(!occupation_other_explain){
    fillTextarea("ExplainOtherPresentOccupation", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="occupation_other_explain";
    missing_obj[i]['value']='string';
    i++
  }
  if(!employer_school_name){
    fillTextInput("EmpSchName", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="employer_school_name";
    missing_obj[i]['value']='school name';
    i++
  }
  if(!employer_address){
    fillTextInput("EmpSchAddr1", DEFAULT_TEXT);
    fillTextInput("EmpSchCity", DEFAULT_TEXT);
    fillNumberInput("WORK_EDUC_TEL", DEFAULT_NUMBER);
    checkBox("WORK_EDUC_ADDR_POSTAL_CD_NA");
    checkBox("WORK_EDUC_ADDR_STATE_NA");
    setSelectValue("EmpSchCountry", DEFAULT_COUNTRY);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="employer_address";
    missing_obj[i]['value']='{"street":"street","line2":"","zip":"1426","city":"Buenos Aires","country":"Argentina"}';
    i++
  }
  if(!current_monthly_income){
    checkBox("CURR_MONTHLY_SALARY_NA");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="current_monthly_income";
    missing_obj[i]['value']='2000';
    i++
  }
  if(!employer_duties){
    fillTextarea("DescribeDuties", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="employer_duties";
    missing_obj[i]['value']='duties description';
    i++
  }
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
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previously_employed";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!past_employer_name){
    fillTextInput("EmployerName", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="past_employer_name";
    missing_obj[i]['value']='employee name';
    i++
  }
  if(!past_employer_address){
    setAddressValue("Employer", DEFAULT_ADDRESS, false, "PREV_EMPL_ADDR");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="employer_address";
    missing_obj[i]['value']='{"street":"street","line2":"","zip":"1426","city":"Buenos Aires","country":"Argentina","phone_number":"123456789"}';
    i++
  }
  if(!past_job_title){
    fillTextInput("JobTitle", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="past_job_title";
    missing_obj[i]['value']='jobTitle';
    i++
  }
  if(!supervisors_name){
    checkBox("SupervisorSurname_NA");
    checkBox("SupervisorGivenName_NA");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="supervisors_name";
    missing_obj[i]['value']='supervisors name';
    i++
  }
  if(!start_date){
    setDate("EmpDateFrom", DEFAULT_PAST_DATE);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="start_date";
    missing_obj[i]['value']='1/1/2001';
    i++
  }
  if(!end_date){
    setDate("EmpDateTo", DEFAULT_PAST_DATE);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="end_date";
    missing_obj[i]['value']='1/1/2005';
    i++
  }
  if(!past_duties){
    fillTextarea("DescribeDuties", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="past_duties";
    missing_obj[i]['value']='past duties';
    i++
  }
  if(!previous_education){
    checkBox("OtherEduc_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_education";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!previous_school_name){
    fillTextInput("SchoolName", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_school_name";
    missing_obj[i]['value']='school name';
    i++
  }
  if(!previous_school_address){
    setAddressValue("School", DEFAULT_ADDRESS, false, "EDUC_INST");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_school_address";
    missing_obj[i]['value']='{"street":"Moldes 1469","line2":"","zip":"1426","city":"Buenos Aires","country":"Argentina"}';
    i++
  }
  if(!previous_course_study){
    fillTextInput("SchoolCourseOfStudy", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_course_study";
    missing_obj[i]['value']='law';
    i++
  }
  if(!school_start){
    setSelectValue("SchoolFrom", DEFAULT_PAST_DATE);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="school_start";
    missing_obj[i]['value']='1/1/2001';
    i++
  }
  if(!school_end){
    setSelectValue("SchoolTo", DEFAULT_PAST_DATE);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="school_end";
    missing_obj[i]['value']='1/1/2005';
    i++
  }
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
  var missing_obj = [];
  var i =0;
  if(!clan_yn){
    checkBox("CLAN_TRIBE_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="clan_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!languages){
    fillTextInput("LANGUAGE_NAME", DEFAULT_TEXT);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="languages";
    missing_obj[i]['value']='english';
    i++
  }
  if(!previous_countries_list){
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_countries_list";
    missing_obj[i]['value']='Bolivia/Australia/Russia...';
    i++
  }
  if(!charitable_yn){
    checkBox("ORGANIZATION_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="charitable_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!firearms_yn){
    checkBox("SPECIALIZED_SKILLS_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="firearms_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!military_yn){
    checkBox("MILITARY_SERVICE_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="military_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!guerilla_yn){
    checkBox("INSURGENT_ORG_IND_1");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="guerilla_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
}

// TODO
function fillOutPageSecurityandBackground1Old(personalData) {
  var disease_yn= false,mental_yn=false,drug_yn=false,charitable_yn=false,firearms_yn=false,military_yn=false,guerilla_yn=false;

  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;

    if(interaction == "disease_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Disease_1"]').prop("checked", true);
      }else{
        $('input[id$="Disease_0"]').prop("checked", true);
      }
      disease_yn = true;
    }
    if(interaction == "mental_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Disorder_1"]').prop("checked", true);
      }else{
        $('input[id$="Disorder_0"]').prop("checked", true);
      }
      mental_yn = true;
    }
    if(interaction == "drug_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Druguser_1"]').prop("checked", true);
      }else{
        $('input[id$="Druguser_0"]').prop("checked", true);
      }
      drug_yn = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!disease_yn){
    $('input[id$="Disease_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="disease_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!mental_yn){
    $('input[id$="Disorder_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="mental_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!drug_yn){
    $('input[id$="Druguser_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="drug_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
}

function fillOutPageSecurityandBackground2Old(personalData) {
  var convicted_yn= false,substances_yn=false,prostitution_yn=false,laundering_yn=false,trafficking_yn=false,ustrafficking_yn=false,traffickingrelation_yn=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "convicted_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Arrested_1"]').prop("checked", true);
      }else{
        $('input[id$="Arrested_0"]').prop("checked", true);
      }
      convicted_yn = true;
    }
    if(interaction == "substances_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ControlledSubstances_1"]').prop("checked", true);
      }else{
        $('input[id$="ControlledSubstances_0"]').prop("checked", true);
      }
      substances_yn = true;
    }
    if(interaction == "prostitution_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Prostitution_1"]').prop("checked", true);
      }else{
        $('input[id$="Prostitution_0"]').prop("checked", true);
      }
      prostitution_yn = true;
    }
    if(interaction == "laundering_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="MoneyLaundering_1"]').prop("checked", true);
      }else{
        $('input[id$="MoneyLaundering_0"]').prop("checked", true);
      }
      laundering_yn = true;
    }
    if(interaction == "trafficking_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="HumanTrafficking_1"]').prop("checked", true);
      }else{
        $('input[id$="HumanTrafficking_0"]').prop("checked", true);
      }
      trafficking_yn = true;
    }
    if(interaction == "ustrafficking_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="AssistedSevereTrafficking_1"]').prop("checked", true);
      }else{
        $('input[id$="AssistedSevereTrafficking_0"]').prop("checked", true);
      }
      ustrafficking_yn = true;
    }
    if(interaction == "traffickingrelation_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="HumanTraffickingRelated_1"]').prop("checked", true);
      }else{
        $('input[id$="HumanTraffickingRelated_0"]').prop("checked", true);
      }
      traffickingrelation_yn = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!convicted_yn){
    $('input[id$="Arrested_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="convicted_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!substances_yn){
    $('input[id$="ControlledSubstances_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="substances_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!prostitution_yn){
    $('input[id$="Prostitution_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="prostitution_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!laundering_yn){
    $('input[id$="MoneyLaundering_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="laundering_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!trafficking_yn){
    $('input[id$="HumanTrafficking_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="trafficking_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!ustrafficking_yn){
    $('input[id$="AssistedSevereTrafficking_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="ustrafficking_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!traffickingrelation_yn){
    $('input[id$="HumanTraffickingRelated_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="traffickingrelation_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
}

function fillOutPageSecurityandBackground3Old(personalData) {
  var espionage_yn= false,terrorism_yn=false,terrorsupport_yn=false,terrororg_yn=false,genocide_yn=false,torture_yn=false,killing_yn=false,childsoldiers_yn=false,religion_yn=false,abortion_yn=false,organ_yn=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "espionage_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="IllegalActivity_1"]').prop("checked", true);
      }else{
        $('input[id$="IllegalActivity_0"]').prop("checked", true);
      }
      espionage_yn = true;
    }
    if(interaction == "terrorism_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="TerroristActivity_1"]').prop("checked", true);
      }else{
        $('input[id$="TerroristActivity_0"]').prop("checked", true);
      }
      terrorism_yn = true;
    }
    if(interaction == "terrorsupport_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="TerroristSupport_1"]').prop("checked", true);
      }else{
        $('input[id$="TerroristSupport_0"]').prop("checked", true);
      }
      terrorsupport_yn = true;
    }
    if(interaction == "terrororg_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="TerroristOrg_1"]').prop("checked", true);
      }else{
        $('input[id$="TerroristOrg_0"]').prop("checked", true);
      }
      terrororg_yn = true;
    }
    if(interaction == "genocide_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Genocide_1"]').prop("checked", true);
      }else{
        $('input[id$="Genocide_0"]').prop("checked", true);
      }
      genocide_yn = true;
    }
    if(interaction == "torture_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Torture_1"]').prop("checked", true);
      }else{
        $('input[id$="Torture_0"]').prop("checked", true);
      }
      torture_yn = true;
    }
    if(interaction == "killing_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ExViolence_1"]').prop("checked", true);
      }else{
        $('input[id$="ExViolence_0"]').prop("checked", true);
      }
      killing_yn = true;
    }
    if(interaction == "childsoldiers_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ChildSoldier_1"]').prop("checked", true);
      }else{
        $('input[id$="ChildSoldier_0"]').prop("checked", true);
      }
      childsoldiers_yn = true;
    }
    if(interaction == "religion_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ReligiousFreedom_1"]').prop("checked", true);
      }else{
        $('input[id$="ReligiousFreedom_0"]').prop("checked", true);
      }
      religion_yn = true;
    }
    if(interaction == "abortion_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="PopulationControls_1"]').prop("checked", true);
      }else{
        $('input[id$="PopulationControls_0"]').prop("checked", true);
      }
      abortion_yn = true;
    }
    if(interaction == "organ_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Transplant_1"]').prop("checked", true);
      }else{
        $('input[id$="Transplant_0"]').prop("checked", true);
      }
      organ_yn = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!espionage_yn){
    $('input[id$="IllegalActivity_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="espionage_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!terrorism_yn){
    $('input[id$="TerroristActivity_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="terrorism_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!terrorsupport_yn){
    $('input[id$="TerroristSupport_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="terrorsupport_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!terrororg_yn){
    $('input[id$="TerroristOrg_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="terrororg_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!genocide_yn){
    $('input[id$="Genocide_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="genocide_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!torture_yn){
    $('input[id$="Torture_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="torture_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!killing_yn){
    $('input[id$="ExViolence_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="killing_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!childsoldiers_yn){
    $('input[id$="ChildSoldier_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="childsoldiers_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!religion_yn){
    $('input[id$="ReligiousFreedom_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="religion_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!abortion_yn){
    $('input[id$="PopulationControls_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="abortion_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!organ_yn){
    $('input[id$="Transplant_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="organ_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
}

function fillOutPageSecurityandBackground4Old(personalData) {
  var removalhearing_yn= false,immigration_fraud_yn=false,failtoattend_yn=false,visaviolation_yn=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;

    if(interaction == "removalhearing_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="RemovalHearing_1"]').prop("checked", true);
      }else{
        $('input[id$="RemovalHearing_0"]').prop("checked", true);
      }
      removalhearing_yn = true;
    }
    if(interaction == "immigration_fraud_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ImmigrationFraud_1"]').prop("checked", true);
      }else{
        $('input[id$="ImmigrationFraud_0"]').prop("checked", true);
      }
      immigration_fraud_yn = true;
    }
    if(interaction == "failtoattend_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="FailToAttend_1"]').prop("checked", true);
      }else{
        $('input[id$="FailToAttend_0"]').prop("checked", true);
      }
      failtoattend_yn = true;
    }
    if(interaction == "visaviolation_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="VisaViolation_1"]').prop("checked", true);
      }else{
        $('input[id$="VisaViolation_0"]').prop("checked", true);
      }
      visaviolation_yn = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!removalhearing_yn){
    $('input[id$="RemovalHearing_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="removalhearing_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!immigration_fraud_yn){
    $('input[id$="ImmigrationFraud_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="immigration_fraud_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!failtoattend_yn){
    $('input[id$="FailToAttend_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="failtoattend_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!visaviolation_yn){
    $('input[id$="VisaViolation_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="visaviolation_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
}

function fillOutPageSecurityandBackground5Old(personalData) {
  var custody_yn= false,vote_yn=false,taxevasion_yn=false,reimbursing_yn=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "custody_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ChildCustody_1"]').prop("checked", true);
      }else{
        $('input[id$="ChildCustody_0"]').prop("checked", true);
      }
      custody_yn = true;
    }
    if(interaction == "vote_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="VotingViolation_1"]').prop("checked", true);
      }else{
        $('input[id$="VotingViolation_0"]').prop("checked", true);
      }
      vote_yn = true;
    }
    if(interaction == "taxevasion_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="RenounceExp_1"]').prop("checked", true);
      }else{
        $('input[id$="RenounceExp_0"]').prop("checked", true);
      }
      taxevasion_yn = true;
    }
    if(interaction == "reimbursing_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="AttWoReimb_1"]').prop("checked", true);
      }else{
        $('input[id$="AttWoReimb_0"]').prop("checked", true);
      }
      reimbursing_yn = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!custody_yn){
    $('input[id$="ChildCustody_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="custody_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!vote_yn){
    $('input[id$="VotingViolation_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="vote_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!taxevasion_yn){
    $('input[id$="RenounceExp_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="taxevasion_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!reimbursing_yn){
    $('input[id$="AttWoReimb_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="reimbursing_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
}
