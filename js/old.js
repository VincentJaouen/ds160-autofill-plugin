DEFAULT_TEXT = "MISSING";
DEFAULT_ADDRESS = {"street":"MISSING","line2":"","zip":"00000","city":"MISSING","country":"Argentina"}
DEFAULT_NUMBER = "0000000000";
DEFAULT_SMALL_NUMBER = "00000";
DEFAULT_PAST_DATE = "01/01/2014";
DEFAULT_FUTURE_DATE = "01/01/2025";
DEFAULT_COUNTRY = "ARGENTINA";

function fillOutPagePersonal1Old(personalData) {
  var first_name = false, last_name =false,gender =false,marital_status =false,city_of_birth =false,state_of_birth =false,country_of_birth =false,DOB =false,alias_yn =false,telecode_yn =false;
  var firstNameValue = '', lastNameValue = '';

  for(var i in personalData) {
    var interaction = personalData[i].interaction;
    var value = personalData[i].value;

    if(interaction == "first_name") {
      fillTextInput("APP_GIVEN_NAME", value);
      firstNameValue = value;
      fillTextInput("APP_FULL_NAME_NATIVE", firstNameValue.trim() + ' ' + lastNameValue.trim(), false);
      first_name = true;
    }
    if(interaction == "last_name") {
      fillTextInput("APP_SURNAME", value);
      lastNameValue = value;
      fillTextInput("APP_FULL_NAME_NATIVE", firstNameValue.trim() + ' ' + lastNameValue.trim(), false);
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
      passport_number = fillNumberInput("PPT_NUM", value);
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
      time_in_country_frame = setSelectValue("TRAVEL_LOS_CD", value);
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
    setSelectValue("TRAVEL_LOS_CD", "W");
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
      if(personalData[i].value=="Yes"){
        $('input[id$="PREV_US_TRAVEL_IND_0"]').prop("checked", true);
      }else{
        $('input[id$="PREV_US_TRAVEL_IND_1"]').prop("checked", true);
      }
      ustravel_yn = true;
    }
    if(interaction == "previous_ustrip_date"){
      var us_date = personalData[i].value.split("/");
      //console.log(us_date);
      var us_day = us_date[0];
      $('select[id$="PREV_US_VISIT_DTEDay"]').find('option').each(function(){
        if($(this).text()==us_day){
          $('select[id$="PREV_US_VISIT_DTEDay"]').val($(this).val());
          $('select[id$="PREV_US_VISIT_DTEDay"]').change();
        }
      });
      var us_month = us_date[1];
      $('select[id$="PREV_US_VISIT_DTEMonth"]').find('option').each(function(index, value){
        if(index==parseInt(us_month)){
          $('select[id$="PREV_US_VISIT_DTEMonth"]').val($(this).val());
          $('select[id$="PREV_US_VISIT_DTEMonth"]').change();
        }
      });
      $('input[name$="PREV_US_VISIT_DTEYear"]').val(us_date[2]);
      previous_ustrip_date = true;
    }
    if(interaction == "previous_ustrip_duration"){
      var trip_date = personalData[i].value.split(" ");
      $('input[name$="PREV_US_VISIT_LOS"]').val(trip_date[0]);
      $('select[id$="PREV_US_VISIT_LOS_CD"]').val("D");
      $('select[id$="PREV_US_VISIT_LOS_CD"]').change();
      previous_ustrip_duration = true;
    }
    if(interaction == "driverslicense_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="PREV_US_DRIVER_LIC_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="PREV_US_DRIVER_LIC_IND_0"]').prop("checked", true);
      }
      driverslicense_yn = true;
    }
    if(interaction == "previous_visa_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="PREV_VISA_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="PREV_VISA_IND_0"]').prop("checked", true);
      }
      previous_visa_yn = true;
    }


    if(interaction == "previousvisa_issuedate"){
      var issue_date = personalData[i].value.split("/");
      //console.log(issue_date);
      var issue_day = issue_date[0];
      $('select[id$="PREV_VISA_ISSUED_DTEDay"]').find('option').each(function(){
        if($(this).text()==issue_day){
          $('select[id$="PREV_VISA_ISSUED_DTEDay"]').val($(this).val());
          $('select[id$="PREV_VISA_ISSUED_DTEDay"]').change();
        }
      });
      var issue_month = issue_date[1];
      $('select[id$="PREV_VISA_ISSUED_DTEMonth"]').find('option').each(function(index, value){
        if(index==parseInt(issue_month)){
          $('select[id$="PREV_VISA_ISSUED_DTEMonth"]').val($(this).val());
          $('select[id$="PREV_VISA_ISSUED_DTEMonth"]').change();
        }
      });
      $('input[name$="PREV_VISA_ISSUED_DTEYear"]').val(issue_date[2]);
      previousvisa_issuedate = true;
    }
    if(interaction == "previousvisa_number"){
      $('input[name$="PREV_VISA_FOIL_NUMBER"]').val(personalData[i].value);
      previousvisa_number = true;
    }
    if(interaction == "previousvisa_same_yn"){
      if(personalData[i].value=="Yes"){
        $('input[id$="PREV_VISA_SAME_TYPE_IND_0"]').prop("checked", true);
        $('input[id$="PREV_VISA_SAME_CNTRY_IND_0"]').prop("checked", true);
      }else{
        $('input[id$="PREV_VISA_SAME_TYPE_IND_1"]').prop("checked", true);
        $('input[id$="PREV_VISA_SAME_CNTRY_IND_1"]').prop("checked", true);
      }
      previousvisa_same_yn = true;
    }
    if(interaction == "tenprinted_yn"){
      if(personalData[i].value=="Yes"){
        $('input[id$="PREV_VISA_TEN_PRINT_IND_0"]').prop("checked", true);
      }else{
        $('input[id$="PREV_VISA_TEN_PRINT_IND_1"]').prop("checked", true);
      }
      tenprinted_yn = true;
    }
    if(interaction == "previousvisa_lost_stolen_yn"){
      if(personalData[i].value=="Yes"){
        $('input[id$="PREV_VISA_LOST_IND_0"]').prop("checked", true);
      }else{
        $('input[id$="PREV_VISA_LOST_IND_1"]').prop("checked", true);
      }
      previousvisa_lost_stolen_yn = true;
    }
    if(interaction == "previousvisa_revoked_yn"){
      if(personalData[i].value=="Yes"){
        $('input[id$="PREV_VISA_CANCELLED_IND_0"]').prop("checked", true);
      }else{
        $('input[id$="PREV_VISA_CANCELLED_IND_1"]').prop("checked", true);
      }
      previousvisa_revoked_yn = true;
    }



    if(interaction == "entryrefusal_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="PREV_VISA_REFUSED_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="PREV_VISA_REFUSED_IND_0"]').prop("checked", true);
      }
      entryrefusal_yn = true;
    }
    if(interaction == "immigration_petition_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="PETITION_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="PETITION_IND_0"]').prop("checked", true);
      }
      immigration_petition_yn = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!ustravel_yn){
    $('input[id$="PREV_US_TRAVEL_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="ustravel_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!previous_ustrip_date){
    $('select[id$="PREV_US_VISIT_DTEDay"]').val("1");
    $('select[id$="PREV_US_VISIT_DTEDay"]').change();
    $('select[id$="PREV_US_VISIT_DTEMonth"]').val("1");
    $('select[id$="PREV_US_VISIT_DTEMonth"]').change();
    $('input[name$="PREV_US_VISIT_DTEYear"]').val("2001");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_ustrip_date";
    missing_obj[i]['value']='1/01/2001';
    i++
  }
  if(!previous_ustrip_duration){
    $('input[name$="PREV_US_VISIT_LOS"]').val("10");
    $('select[id$="PREV_US_VISIT_LOS_CD"]').val("D");
    $('select[id$="PREV_US_VISIT_LOS_CD"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_ustrip_duration";
    missing_obj[i]['value']='10 Days';
    i++
  }
  if(!driverslicense_yn){
    $('input[id$="PREV_US_DRIVER_LIC_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="driverslicense_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!previous_visa_yn){
    $('input[id$="PREV_VISA_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_visa_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!previousvisa_issuedate){
    $('select[id$="PREV_VISA_ISSUED_DTEDay"]').val("1");
    $('select[id$="PREV_VISA_ISSUED_DTEDay"]').change();
    $('select[id$="PREV_VISA_ISSUED_DTEMonth"]').val("1");
    $('select[id$="PREV_VISA_ISSUED_DTEMonth"]').change();
    $('input[name$="PREV_VISA_ISSUED_DTEYear"]').val("2001");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previousvisa_issuedate";
    missing_obj[i]['value']='1/01/2001';
    i++
  }
  if(!previousvisa_number){
    $('input[id$="PREV_VISA_FOIL_NUMBER_NA"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previousvisa_number";
    missing_obj[i]['value']='123456789';
    i++
  }
  if(!previousvisa_same_yn){
    $('input[id$="PREV_VISA_SAME_TYPE_IND_1"]').prop("checked", true);
    $('input[id$="PREV_VISA_SAME_CNTRY_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previousvisa_same_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!tenprinted_yn){
    $('input[id$="PREV_VISA_TEN_PRINT_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="tenprinted_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!previousvisa_lost_stolen_yn){
    $('input[id$="PREV_VISA_LOST_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previousvisa_lost_stolen_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!previousvisa_revoked_yn){
    $('input[id$="PREV_VISA_CANCELLED_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previousvisa_revoked_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!entryrefusal_yn){
    $('input[id$="PREV_VISA_REFUSED_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="entryrefusal_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!immigration_petition_yn){
    $('input[id$="PETITION_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="immigration_petition_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
}

function fillOutPageUSContactOld(personalData) {
  var contact_surname= false,contact_givenname=false,organization_name=false,contact_relationship=false,contact_person_street=false,contact_person_city=false,contact_person_state=false,contact_person_zipcode=false,contact_person_phone=false,contact_person_email=false;

  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "contact_surname"){
      $('input[name$="US_POC_SURNAME"]').val(personalData[i].value);
      contact_surname = true;
    }
    if(interaction == "contact_givenname"){
      $('input[name$="US_POC_GIVEN_NAME"]').val(personalData[i].value);
      contact_givenname = true;
    }else{
      $('input[id$="US_POC_NAME_NA"]').prop("checked", true);
    }
    if(interaction == "organization_name"){
      $('input[name$="US_POC_ORGANIZATION"]').val(personalData[i].value);
      organization_name = true;
    }else{
      $('input[name$="US_POC_ORGANIZATION"]').val("organization");
    }
    if(interaction == "contact_person_street"){
      $('input[name$="US_POC_ADDR_LN1"]').val(personalData[i].value);
      contact_person_street = true;
    }
    if(interaction == "contact_person_city"){
      $('input[name$="US_POC_ADDR_CITY"]').val(personalData[i].value);
      contact_person_city = true;
    }
    if(interaction == "contact_person_state"){
      $('select[name$="US_POC_ADDR_STATE"]').val(personalData[i].value);
      contact_person_state = true;
    }
    if(interaction == "contact_person_zipcode"){
      $('input[name$="US_POC_ADDR_POSTAL_CD"]').val(personalData[i].value);
      contact_person_zipcode = true;
    }
    if(interaction == "contact_person_phone"){
      $('input[name$="US_POC_HOME_TEL"]').val(personalData[i].value);
      contact_person_phone = true
    }
    if(interaction == "contact_person_email"){
      $('input[name$="US_POC_EMAIL_ADDR"]').val(personalData[i].value);
      contact_person_email = true;
    }else{
      $('input[id$="US_POC_EMAIL_ADDR_NA"]').prop("checked", true);
    }
    if(interaction == "contact_relationship"){
      $('select[name$="US_POC_REL_TO_APP"]').val(personalData[i].value);
      $('select[name$="US_POC_REL_TO_APP"]').change();
      contact_relationship = true;
    }else{
      $('select[name$="US_POC_REL_TO_APP"]').val("O");
      $('select[name$="US_POC_REL_TO_APP"]').change();
    }
  }
  var missing_obj = [];
  var i =0;
  if(!contact_surname){
    $('input[name$="US_POC_SURNAME"]').val("surname");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="contact_surname";
    missing_obj[i]['value']='contact person firstname';
    i++
  }
  if(!contact_givenname){
    $('input[id$="US_POC_NAME_NA"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="contact_givenname";
    missing_obj[i]['value']='contact person lastname';
    i++;
  }
  if(!organization_name){
    $('input[name$="US_POC_ORGANIZATION"]').val("organization");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="organization_name";
    missing_obj[i]['value']='organization name';
    i++;
  }
  if(!contact_person_street){
    $('input[name$="US_POC_ADDR_LN1"]').val("street");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="contact_person_street";
    missing_obj[i]['value']='street';
    i++;
  }
  if(!contact_person_city){
    $('input[name$="US_POC_ADDR_CITY"]').val("city");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="contact_person_city";
    missing_obj[i]['value']='city';
    i++;
  }
  if(!contact_person_state){
    $('select[name$="US_POC_ADDR_STATE"]').val("DE");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="contact_person_state";
    missing_obj[i]['value']='AL/AK/AS...';
    i++;
  }
  if(!contact_person_zipcode){
    $('input[name$="US_POC_ADDR_POSTAL_CD"]').val("12345");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="contact_person_zipcode";
    missing_obj[i]['value']='12345';
    i++;
  }
  if(!contact_person_phone){
    $('input[name$="US_POC_HOME_TEL"]').val("123456789");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="contact_person_phone";
    missing_obj[i]['value']='123456789';
    i++;
  }
  if(!contact_person_email){
    $('input[id$="US_POC_EMAIL_ADDR_NA"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="contact_person_email";
    missing_obj[i]['value']='test@test.com';
    i++;
  }
  if(!contact_relationship){
    $('select[name$="US_POC_REL_TO_APP"]').val("O");
    $('select[name$="US_POC_REL_TO_APP"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="contact_relationship";
    missing_obj[i]['value']='S/C/B/P/H/O';
    i++;
  }
}

function fillOutPageSpouseOld(personalData) {
  var spouse_first= false,spouse_last=false,spouse_dob=false,spouse_birth_city=false,spouse_nationality=false,spouse_birth_country=false,spouse_living_yn=false;

  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "spouse_first"){
      $('input[name$="SpouseGivenName"]').val(personalData[i].value);
      spouse_first = true;
    }
    if(interaction == "spouse_last"){
      $('input[name$="SpouseSurname"]').val(personalData[i].value);
      spouse_last = true;
    }
    if(interaction == "spouse_dob"){
      var birth_date = personalData[i].value.split("/");
      //console.log(birth_date);
      var birth_day = birth_date[0];
      $('select[id$="DOBDay"]').find('option').each(function(){
        if($(this).text()==birth_day){
          $('select[id$="DOBDay"]').val($(this).val());
          $('select[id$="DOBDay"]').change();
        }
      });
      var birth_month = birth_date[1];
      $('select[id$="DOBMonth"]').find('option').each(function(index, value){
        if(index==parseInt(birth_month)){
          $('select[id$="DOBMonth"]').val($(this).val());
          $('select[id$="DOBMonth"]').change();
        }
      });
      $('input[name$="DOBYear"]').val(birth_date[2]);
      spouse_dob = true;
    }
    if(interaction == "spouse_nationality"){
      var country = personalData[i].value.toUpperCase().trim();
      //console.log(country);
      $('select[id$="SpouseNatDropDownList"]').find('option').each(function(){
        if($(this).text()==country){
          $('select[id$="SpouseNatDropDownList"]').val($(this).val());
          $('select[id$="SpouseNatDropDownList"]').change();
        }
      });
      spouse_nationality = true;
    }
    if(interaction == "spouse_birth_city"){
      $('input[name$="SpousePOBCity"]').val(personalData[i].value);
      spouse_birth_city = true;
    }
    if(interaction == "spouse_birth_country"){
      var country = personalData[i].value.toUpperCase().trim();
      //console.log(country);
      $('select[id$="SpousePOBCountry"]').find('option').each(function(){
        if($(this).text()==country){
          $('select[id$="SpousePOBCountry"]').val($(this).val());
          $('select[id$="SpousePOBCountry"]').change();
        }
      });
      spouse_birth_country = true;
    }
    if(interaction == "spouse_living_yn"){
      if(personalData[i].value=="Yes"){
        $('select[id$="SpouseAddressType"]').val("H");
        $('select[id$="SpouseAddressType"]').change();
      }else{
        $('select[id$="SpouseAddressType"]').val("D");
        $('select[id$="SpouseAddressType"]').change();
      }
      spouse_living_yn = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!spouse_first){
    $('input[name$="SpouseSurname"]').val("spouse firstname");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_first";
    missing_obj[i]['value']='spouse firstname';
    i++
  }
  if(!spouse_last){
    $('input[name$="SpouseGivenName"]').val("spouse lastname");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_last";
    missing_obj[i]['value']='spouse lastname';
    i++
  }
  if(!spouse_dob){
    $('select[id$="DOBDay"]').val("1");
    $('select[id$="DOBDay"]').change();
    $('select[id$="DOBMonth"]').val("1");
    $('select[id$="DOBMonth"]').change();
    $('input[name$="DOBYear"]').val("1980");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_dob";
    missing_obj[i]['value']="01/1/1970";
    i++
  }
  if(!spouse_nationality){
    $('select[id$="SpouseNatDropDownList"]').val("ARG");
    $('select[id$="SpouseNatDropDownList"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_nationality";
    missing_obj[i]['value']="Albania/Algeria/American";
    i++
  }
  if(!spouse_birth_city){
    $('input[id$="SPOUSE_POB_CITY_NA"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_birth_city";
    missing_obj[i]['value']="City name";
    i++
  }
  if(!spouse_birth_country){
    $('select[id$="SpousePOBCountry"]').val("ARG");
    $('select[id$="SpousePOBCountry"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="spouse_birth_country";
    missing_obj[i]['value']="Albania/Algeria/American";
    i++
  }
  if(!spouse_living_yn){
    $('select[id$="SpouseAddressType"]').val("D");
    $('select[id$="SpouseAddressType"]').change();
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
      $('input[name$="FATHER_SURNAME"]').val(personalData[i].value);
      father_last_name = true;
    }//else{
    //	$('input[id$="FATHER_SURNAME_UNK_IND"]').prop("checked", true);
    //}
    if(interaction == "father_first_name"){
      $('input[name$="FATHER_GIVEN_NAME"]').val(personalData[i].value);
      father_first_name = true;
    }//else{
    //	$('input[id$="FATHER_GIVEN_NAME_UNK_IND"]').prop("checked", true);
    //}
    if(interaction == "fatherDOB"){
      var father_date = personalData[i].value.split("/");
      //console.log(father_date);
      var father_day = father_date[0];
      $('select[id$="FathersDOBDay"]').find('option').each(function(){
        if($(this).text()==father_day){
          $('select[id$="FathersDOBDay"]').val($(this).val());
          $('select[id$="FathersDOBDay"]').change();
        }
      });
      var father_month = father_date[1];
      $('select[id$="FathersDOBMonth"]').find('option').each(function(index, value){
        if(index==parseInt(father_month)){
          $('select[id$="FathersDOBMonth"]').val($(this).val());
          $('select[id$="FathersDOBMonth"]').change();
        }
      });
      $('input[name$="FathersDOBYear"]').val(father_date[2]);
      fatherDOB = true;
    }
    if(interaction == "father_location"){
      if(personalData[i].value=="No"){
        $('input[id$="FATHER_LIVE_IN_US_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="FATHER_LIVE_IN_US_IND_0"]').prop("checked", true);
      }
      father_location = true;
    }
    if(interaction == "mother_last_name"){
      $('input[name$="MOTHER_SURNAME"]').val(personalData[i].value);
      mother_first_name = true;
    }//else{
    //	$('input[id$="MOTHER_SURNAME_UNK_IND"]').prop("checked", true);
    //}
    if(interaction == "mother_first_name"){
      $('input[name$="MOTHER_GIVEN_NAME"]').val(personalData[i].value);
      mother_last_name = true;
    }//else{
    //	$('input[id$="MOTHER_GIVEN_NAME_UNK_IND"]').prop("checked", true);
    //}
    if(interaction == "motherDOB"){
      var mother_date = personalData[i].value.split("/");
      //console.log(mother_date);
      var mother_day = mother_date[0];
      $('select[id$="MothersDOBDay"]').find('option').each(function(){
        if($(this).text()==mother_day){
          $('select[id$="MothersDOBDay"]').val($(this).val());
          $('select[id$="MothersDOBDay"]').change();
        }
      });
      var mother_month = mother_date[1];
      $('select[id$="MothersDOBMonth"]').find('option').each(function(index, value){
        if(index==parseInt(mother_month)){
          $('select[id$="MothersDOBMonth"]').val($(this).val());
          $('select[id$="MothersDOBMonth"]').change();
        }
      });
      $('input[name$="MothersDOBYear"]').val(mother_date[2]);
      motherDOB = true;
    }
    if(interaction == "mother_location"){
      if(personalData[i].value=="No"){
        $('input[id$="MOTHER_LIVE_IN_US_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="MOTHER_LIVE_IN_US_IND_0"]').prop("checked", true);
      }
      mother_location = true;
    }
    if(interaction == "US_IMrelatives_yn"){
      if(personalData[i].value=="Yes"){
        $('input[id$="US_IMMED_RELATIVE_IND_0"]').prop("checked", true);
      }else{
        $('input[id$="US_IMMED_RELATIVE_IND_1"]').prop("checked", true);
      }
      US_IMrelatives_yn = true;
    }
    if(interaction == "immediate_relative_first_name"){
      $('input[name$="US_REL_SURNAME"]').val(personalData[i].value);
      immediate_relative_first_name = true;
    }
    if(interaction == "immediate_relative_last_name"){
      $('input[name$="US_REL_GIVEN_NAME"]').val(personalData[i].value);
      immediate_relative_last_name = true;
    }
    if(interaction == "immediate_relative_type"){
      var immediate = personalData[i].value.toUpperCase().trim();
      $('select[id$="US_REL_TYPE"]').find('option').each(function(){
        if($(this).text()==immediate){
          $('select[id$="US_REL_TYPE"]').val($(this).val());
          $('select[id$="US_REL_TYPE"]').change();
        }
      });
      immediate_relative_type = true;
    }
    if(interaction == "immediate_relative_status"){
      var immediate_status = personalData[i].value.toUpperCase().trim();
      if(immediate_status=="CITIZEN"){
        $('select[id$="US_REL_STATUS"]').val("S");
        $('select[id$="US_REL_STATUS"]').change();
      }else if(immediate_status=="RESIDENT"){
        $('select[id$="US_REL_STATUS"]').val("C");
        $('select[id$="US_REL_STATUS"]').change();
      }else if(immediate_status=="NONIMMIGRANT"){
        $('select[id$="US_REL_STATUS"]').val("P");
        $('select[id$="US_REL_STATUS"]').change();
      }else{
        $('select[id$="US_REL_STATUS"]').val("O");
        $('select[id$="US_REL_STATUS"]').change();
      }
      immediate_relative_status = true;
    }
    if(interaction == "US_relatives_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="US_OTHER_RELATIVE_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="US_OTHER_RELATIVE_IND_0"]').prop("checked", true);
      }
      US_relatives_yn = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!father_first_name){
    $('input[id$="FATHER_SURNAME_UNK_IND"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="father_first_name";
    missing_obj[i]['value']='father firstname';
    i++
  }
  if(!father_last_name){
    $('input[id$="FATHER_GIVEN_NAME_UNK_IND"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="father_last_name";
    missing_obj[i]['value']='father lastname';
    i++
  }
  if(!fatherDOB){
    $('input[id$="FATHER_DOB_UNK_IND"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="fatherDOB";
    missing_obj[i]['value']='1/1/1960';
    i++
  }
  if(!father_location){
    $('input[id$="FATHER_LIVE_IN_US_IND_1"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="father_location";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!mother_first_name){
    $('input[id$="MOTHER_SURNAME_UNK_IND"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="mother_first_name";
    missing_obj[i]['value']='mother firstname';
    i++
  }
  if(!mother_last_name){
    $('input[id$="MOTHER_GIVEN_NAME_UNK_IND"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="mother_last_name";
    missing_obj[i]['value']='mother lastname';
    i++
  }
  if(!motherDOB){
    $('input[id$="MOTHER_DOB_UNK_IND"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="motherDOB";
    missing_obj[i]['value']='1/1/1965';
    i++
  }
  if(!mother_location){
    $('input[id$="MOTHER_LIVE_IN_US_IND_1"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="mother_location";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!US_IMrelatives_yn){
    $('input[id$="US_IMMED_RELATIVE_IND_1"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="US_IMrelatives_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!immediate_relative_first_name){
    $('input[name$="US_REL_SURNAME"]').val("relfirstname");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="immediate_relative_first_name";
    missing_obj[i]['value']='relative firstname';
    i++
  }
  if(!immediate_relative_last_name){
    $('input[name$="US_REL_GIVEN_NAME"]').val("rellastname");
    missing_obj[i] = {};
    missing_obj[i]['interaction']="immediate_relative_last_name";
    missing_obj[i]['value']='relative lastname';
    i++
  }
  if(interaction == "immediate_relative_type"){
    $('select[id$="US_REL_TYPE"]').val("B");
    $('select[id$="US_REL_TYPE"]').change();
    missing_obj[i] = {};
    missing_obj[i]['interaction']="immediate_relative_type";
    missing_obj[i]['value']='Spouse/Child/Sibling';
    i++
  }
  if(!immediate_relative_status){
    $('select[id$="US_REL_STATUS"]').val("O");
    $('select[id$="US_REL_STATUS"]').change();
    missing_obj[i] = {};
    missing_obj[i]['interaction']="immediate_relative_status";
    missing_obj[i]['value']='citizen/resident/nonimmigrant/other';
    i++
  }
  if(!US_relatives_yn){
    $('input[name$="US_OTHER_RELATIVE_IND_1"]').prop("checked", true);
    missing_obj[i] = {};
    missing_obj[i]['interaction']="US_OTHER_RELATIVE_IND_1";
    missing_obj[i]['value']='Yes/No';
    i++;
  }
}

function fillOutPageWorkEducation1Old(personalData) {
  var occupation= false,employer_school_name=false,employer_address=false,current_monthly_income=false,employer_duties=false,occupation_other_explain=false;

  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "occupation"){
      findInSelect("PresentOccupation", personalData[i].value);
      // $('select[id$="PresentOccupation"]').find('option').each(function(){
      //   if($(this).text().toUpperCase().indexOf(personalData[i].value.toUpperCase())!=-1){
      //     $('select[id$="PresentOccupation"]').val($(this).val());
      //     $('select[id$="PresentOccupation"]').change();
      //   }
      // });
      occupation = true;
    }
    if(interaction == "occupation_other_explain"){
      $('textarea[name$="ExplainOtherPresentOccupation"]').text(personalData[i].value);
      occupation_other_explain = true;
    }
    if(interaction == "employer_school_name"){
      fillTextInput("EmpSchName", personalData[i].value);
      // $('input[name$="EmpSchName"]').val(personalData[i].value);
      employer_school_name = true;
    }
    if(interaction == "employer_name"){
      fillTextInput("EmpSchName", personalData[i].value);
      // $('input[name$="EmpSchName"]').val(personalData[i].value);
      employer_school_name = true;
    }
    if(interaction == "employer_number"){
      fillTextInput("WORK_EDUC_TEL", personalData[i].value.numerize());
      // $('input[name$="WORK_EDUC_TEL"]').val(personalData[i].value.numerize());
      employer_number = true;
    }
    if(interaction == "employer_address"){
      //console.log(personalData[i].value.trim());
      var address = JSON.parse(personalData[i].value.trim());
      ////console.log(address);
      if(address['street'].trim() && address['street'].trim()!=""){
        fillTextInput("EmpSchAddr1", address['street'].trim());
        // $('input[name$="EmpSchAddr1"]').val(address['street'].trim());
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
      fillTextInput("CURR_MONTHLY_SALARY", personalData[i].value.numerize());
      current_monthly_income = true;
    }
    if(interaction == "employer_duties"){
      $('textarea[name$="DescribeDuties"]').text(personalData[i].value);
      employer_duties = true;
    }else{
      $('textarea[name$="DescribeDuties"]').text("DescribeDuties");
    }
  }
  var missing_obj = [];
  var i =0;
  if(!occupation){
    $('select[id$="PresentOccupation"]').val("LP");
    $('select[id$="PresentOccupation"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="occupation";
    missing_obj[i]['value']='LEGAL PROFESSION/MILITARY/BUSINESS/RESEARCH/STUDENT/OTHER';
    i++
  }
  if(!occupation_other_explain){
    $('textarea[name$="ExplainOtherPresentOccupation"]').text("OccupationExplain");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="occupation_other_explain";
    missing_obj[i]['value']='string';
    i++
  }
  if(!employer_school_name){
    $('input[name$="EmpSchName"]').val("SchoolName");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="employer_school_name";
    missing_obj[i]['value']='school name';
    i++
  }
  if(!employer_address){
    $('input[name$="EmpSchAddr1"]').val("Street");
    $('input[name$="EmpSchAddr2"]').val("");
    $('input[name$="EmpSchCity"]').val("City");
    $('input[id$="WORK_EDUC_ADDR_POSTAL_CD_NA"]').prop("checked", true);
    $('input[id$="WORK_EDUC_ADDR_STATE_NA"]').prop("checked", true);
    $('select[id$="EmpSchCountry"]').val("ARG");
    $('select[id$="EmpSchCountry"]').change();
    $('input[name$="WORK_EDUC_TEL"]').val("123456789");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="employer_address";
    missing_obj[i]['value']='{"street":"street","line2":"","zip":"1426","city":"Buenos Aires","country":"Argentina"}';
    i++
  }
  if(!current_monthly_income){
    $('input[id$="CURR_MONTHLY_SALARY_NA"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="current_monthly_income";
    missing_obj[i]['value']='2000';
    i++
  }
  if(!employer_duties){
    $('textarea[name$="DescribeDuties"]').text("DescribeDuties");
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
      if(personalData[i].value=="No"){
        $('input[id$="PreviouslyEmployed_1"]').prop("checked", true);
      }else{
        $('input[id$="PreviouslyEmployed_0"]').prop("checked", true);
      }
      previously_employed = true;
    }
    if(interaction == "past_employer_name"){
      $('input[name$="EmployerName"]').val(personalData[i].value.trim().replaceAll(".",""));
      past_employer_name = true;
    }

    if(interaction == "past_employer_address"){
      //console.log(personalData[i].value.trim());
      var address = JSON.parse(personalData[i].value.trim());
      ////console.log(address);
      if(address['street'].trim() && address['street'].trim()!=""){
        $('input[name$="EmployerStreetAddress1"]').val(address['street'].trim());
      }else{
        $('input[name$="EmployerStreetAddress1"]').val("street");
      }
      $('input[name$="EmployerStreetAddress2"]').val(address['line2'].trim());
      $('input[name$="EmployerCity"]').val(address['city'].trim());
      if(address['city'].trim() && address['city'].trim()!=""){
        $('input[name$="EmployerCity"]').val(address['city'].trim());
      }else{
        $('input[name$="EmployerCity"]').val("city");
      }
      if(address['zip'] && address['zip'].trim()!=""){
        $('input[name$="PREV_EMPL_ADDR_POSTAL_CD"]').val(address['zip']);
      }else{
        $('input[id$="PREV_EMPL_ADDR_POSTAL_CD_NA"]').prop("checked", true);
      }
      if(address['state']){
        $('input[name$="PREV_EMPL_ADDR_STATE"]').val(address['state']);
      }else{
        $('input[id$="PREV_EMPL_ADDR_STATE_NA"]').prop("checked", true);
      }
      var country_status = false;
      $('select[id$="DropDownList2"]').find('option').each(function(){
        if($(this).text()==address['country'].toUpperCase().trim()){
          $('select[id$="DropDownList2"]').val($(this).val());
          $('select[id$="DropDownList2"]').change();
          country_status=true;
        }
      });
      if(!country_status){
        $('select[id$="DropDownList2"]').val("ARG");
        $('select[id$="DropDownList2"]').change();
      }
      if(address['phone_number']){
        $('input[name$="EmployerPhone"]').val(address['phone_number']);
      }else{
        $('input[name$="EmployerPhone"]').val("123456789");
      }
      past_employer_address = true;
    }
    if(interaction == "past_job_title"){
      $('input[name$="JobTitle"]').val(personalData[i].value.trim());
      past_job_title = true;
    }
    if(interaction == "supervisors_name"){
      $('input[name$="SupervisorSurname"]').val(address['state']);
      $('input[name$="SupervisorGivenName"]').val(address['state']);
      supervisors_name = true;
    }else{
      $('input[id$="SupervisorSurname_NA"]').prop("checked", true);
      $('input[name$="SupervisorGivenName_NA"]').prop("checked", true);
    }
    if(interaction == "start_date"){
      var pre_start_date = personalData[i].value.split("/");
      //console.log(pre_start_date);
      var start_day = pre_start_date[0];
      $('select[id$="EmpDateFromDay"]').find('option').each(function(){
        if($(this).text()==start_day){
          $('select[id$="EmpDateFromDay"]').val($(this).val());
          $('select[id$="EmpDateFromDay"]').change();
        }
      });
      var start_month = pre_start_date[1];
      $('select[id$="EmpDateFromMonth"]').find('option').each(function(index, value){
        if(index==parseInt(start_month)){
          $('select[id$="EmpDateFromMonth"]').val($(this).val());
          $('select[id$="EmpDateFromMonth"]').change();
        }
      });
      $('input[name$="EmpDateFromYear"]').val(pre_start_date[2]);
      start_date = true;
    }
    if(interaction == "end_date"){
      var pre_end_date = personalData[i].value.split("/");
      //console.log(pre_end_date);
      var end_day = pre_end_date[0];
      $('select[id$="EmpDateToDay"]').find('option').each(function(){
        if($(this).text()==end_day){
          $('select[id$="EmpDateToDay"]').val($(this).val());
          $('select[id$="EmpDateToDay"]').change();
        }
      });
      var end_month = pre_end_date[1];
      $('select[id$="EmpDateToMonth"]').find('option').each(function(index, value){
        if(index==parseInt(end_month)){
          $('select[id$="EmpDateToMonth"]').val($(this).val());
          $('select[id$="EmpDateToMonth"]').change();
        }
      });
      $('input[name$="EmpDateToYear"]').val(pre_end_date[2]);
      end_date = true;
    }
    if(interaction == "past_duties"){
      $('textarea[name$="DescribeDuties"]').text(personalData[i].value);
      past_duties = true;
    }

    if(interaction == "previous_education"){
      if(personalData[i].value=="Yes"){
        $('input[id$="OtherEduc_0"]').prop("checked", true);
      }else{
        $('input[id$="OtherEduc_1"]').prop("checked", true);
      }
      previous_education = true;
    }
    if(interaction == "previous_school_name"){
      $('input[name$="SchoolName"]').val(personalData[i].value.trim().replaceAll(".",""));
      previous_school_name = true;
    }
    if(interaction == "previous_school_address"){
      //console.log(personalData[i].value.trim());
      var address = JSON.parse(personalData[i].value.trim());
      ////console.log(address);
      $('input[name$="SchoolAddr1"]').val(address['street'].trim());
      $('input[name$="SchoolAddr2"]').val(address['line2'].trim());
      $('input[name$="SchoolCity"]').val(address['city'].trim());
      if(address['zip']){
        $('input[name$="EDUC_INST_POSTAL_CD"]').val(address['zip']);
      }else{
        $('input[id$="EDUC_INST_POSTAL_CD_NA"]').prop("checked", true);
      }
      if(address['state']){
        $('input[name$="EDUC_INST_ADDR_STATE"]').val(address['state']);
      }else{
        $('input[id$="EDUC_INST_ADDR_STATE_NA"]').prop("checked", true);
      }
      $('select[id$="SchoolCountry"]').find('option').each(function(){
        if($(this).text()==address['country'].toUpperCase().trim()){
          $('select[id$="SchoolCountry"]').val($(this).val());
          $('select[id$="SchoolCountry"]').change();
        }
      });
      previous_school_address = true;
    }
    if(interaction == "previous_course_study"){
      $('input[name$="SchoolCourseOfStudy"]').val(personalData[i].value);
      previous_course_study = true;
    }
    if(interaction == "school_start"){
      var start_date = personalData[i].value.split("/");
      //console.log(start_date);
      var start_day = start_date[0];
      $('select[id$="SchoolFromDay"]').find('option').each(function(){
        if($(this).text()==start_day){
          $('select[id$="SchoolFromDay"]').val($(this).val());
          $('select[id$="SchoolFromDay"]').change();
        }
      });
      var start_month = start_date[1];
      $('select[id$="SchoolFromMonth"]').find('option').each(function(index, value){
        if(index==parseInt(start_month)){
          $('select[id$="SchoolFromMonth"]').val($(this).val());
          $('select[id$="SchoolFromMonth"]').change();
        }
      });
      $('input[name$="SchoolFromYear"]').val(start_date[2]);
      school_start = true;
    }
    if(interaction == "school_end"){
      var end_date = personalData[i].value.split("/");
      //console.log(end_date);
      var end_day = end_date[0];
      $('select[id$="SchoolToDay"]').find('option').each(function(){
        if($(this).text()==end_day){
          $('select[id$="SchoolToDay"]').val($(this).val());
          $('select[id$="SchoolToDay"]').change();
        }
      });
      var end_month = end_date[1];
      $('select[id$="SchoolToMonth"]').find('option').each(function(index, value){
        if(index==parseInt(end_month)){
          $('select[id$="SchoolToMonth"]').val($(this).val());
          $('select[id$="SchoolToMonth"]').change();
        }
      });
      $('input[name$="SchoolToYear"]').val(end_date[2]);
      school_end = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!previously_employed){
    $('input[id$="PreviouslyEmployed_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previously_employed";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!past_employer_name){
    $('input[name$="EmployerName"]').val("employee name");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="past_employer_name";
    missing_obj[i]['value']='employee name';
    i++
  }
  if(!past_employer_address){
    $('input[name$="EmployerStreetAddress1"]').val("Street");
    $('input[name$="EmployerStreetAddress2"]').val("");
    $('input[name$="EmployerCity"]').val("City");
    $('input[id$="PREV_EMPL_ADDR_POSTAL_CD"]').prop("checked", true);
    $('input[id$="PREV_EMPL_ADDR_STATE_NA"]').prop("checked", true);
    $('select[id$="DropDownList2"]').val("ARG");
    $('select[id$="DropDownList2"]').change();
    $('input[name$="EmployerPhone"]').val("123456789");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="employer_address";
    missing_obj[i]['value']='{"street":"street","line2":"","zip":"1426","city":"Buenos Aires","country":"Argentina","phone_number":"123456789"}';
    i++
  }
  if(!past_job_title){
    $('input[name$="JobTitle"]').val("jobTititle");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="past_job_title";
    missing_obj[i]['value']='jobTitle';
    i++
  }
  if(!supervisors_name){
    $('input[id$="SupervisorSurname_NA"]').prop("checked", true);
    $('input[name$="SupervisorGivenName_NA"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="supervisors_name";
    missing_obj[i]['value']='supervisors name';
    i++
  }
  if(!start_date){
    $('select[id$="EmpDateFromDay"]').val("1");
    $('select[id$="EmpDateFromDay"]').change();
    $('select[id$="EmpDateFromMonth"]').val("1");
    $('select[id$="EmpDateFromMonth"]').change();
    $('input[name$="EmpDateFromYear"]').val("2001");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="start_date";
    missing_obj[i]['value']='1/1/2001';
    i++
  }
  if(!end_date){
    $('select[id$="EmpDateToDay"]').val("1");
    $('select[id$="EmpDateToDay"]').change();
    $('select[id$="EmpDateToMonth"]').val("2");
    $('select[id$="EmpDateToMonth"]').change();
    $('input[name$="EmpDateToYear"]').val("2005");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="end_date";
    missing_obj[i]['value']='1/1/2005';
    i++
  }
  if(!past_duties){
    $('textarea[name$="DescribeDuties"]').text("past duties");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="past_duties";
    missing_obj[i]['value']='past duties';
    i++
  }
  if(!previous_education){
    $('input[id$="OtherEduc_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_education";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!previous_school_name){
    $('input[name$="SchoolName"]').val("SchoolName");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_school_name";
    missing_obj[i]['value']='school name';
    i++
  }
  if(!previous_school_address){
    $('input[name$="SchoolAddr1"]').val("street");
    $('input[name$="SchoolAddr2"]').val("");
    $('input[name$="SchoolCity"]').val("city");
    $('input[id$="EDUC_INST_POSTAL_CD_NA"]').prop("checked", true);
    $('input[id$="EDUC_INST_ADDR_STATE_NA"]').prop("checked", true);
    $('select[id$="SchoolCountry"]').val("ARG");
    $('select[id$="SchoolCountry"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_school_address";
    missing_obj[i]['value']='{"street":"Moldes 1469","line2":"","zip":"1426","city":"Buenos Aires","country":"Argentina"}';
    i++
  }
  if(!previous_course_study){
    $('input[name$="SchoolCourseOfStudy"]').val("law");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_course_study";
    missing_obj[i]['value']='law';
    i++
  }
  if(!school_start){
    $('select[id$="SchoolFromDay"]').val("1");
    $('select[id$="SchoolFromDay"]').change();
    $('select[id$="SchoolFromMonth"]').val("1");
    $('select[id$="SchoolFromMonth"]').change();
    $('input[name$="SchoolFromYear"]').val("2001");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="school_start";
    missing_obj[i]['value']='1/1/2001';
    i++
  }
  if(!school_end){
    $('select[id$="SchoolToDay"]').val("1");
    $('select[id$="SchoolToDay"]').change();
    $('select[id$="SchoolToMonth"]').val("2");
    $('select[id$="SchoolToMonth"]').change();
    $('input[name$="SchoolToYear"]').val("2005");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="school_end";
    missing_obj[i]['value']='1/1/2005';
    i++
  }
}

function fillOutPageWorkEducation3Old(personalData) {
  var clan_yn= false,languages=false,previous_countries_list=false,charitable_yn=false,firearms_yn=false,military_yn=false,guerilla_yn=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "clan_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="CLAN_TRIBE_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="CLAN_TRIBE_IND_0"]').prop("checked", true);
      }
      clan_yn = true;
    }
    if(interaction == "languages"){
      $('input[name$="LANGUAGE_NAME"]').val(personalData[i].value.trim().latinize());
      languages = true;
    }
    if(interaction == "previous_countries_list"){
      $('input[id$="COUNTRIES_VISITED_IND_0"]').prop("checked", true);
      $('select[id$="COUNTRIES_VISITED"]').find('option').each(function(){
        if($(this).text()==personalData[i].value.toUpperCase().trim()){
          $('select[id$="COUNTRIES_VISITED"]').val($(this).val());
          $('select[id$="COUNTRIES_VISITED"]').change();
        }
      });
      previous_countries_list = true;
    }else{
      $('input[id$="COUNTRIES_VISITED_IND_1"]').prop("checked", true);
    }
    if(interaction == "charitable_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ORGANIZATION_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="ORGANIZATION_IND_0"]').prop("checked", true);
      }
      charitable_yn = true;
    }
    if(interaction == "firearms_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="SPECIALIZED_SKILLS_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="SPECIALIZED_SKILLS_IND_0"]').prop("checked", true);
      }
      firearms_yn = true;
    }
    if(interaction == "military_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="MILITARY_SERVICE_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="MILITARY_SERVICE_IND_0"]').prop("checked", true);
      }
      military_yn = true;
    }
    if(interaction == "guerilla_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="INSURGENT_ORG_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="INSURGENT_ORG_IND_0"]').prop("checked", true);
      }
      guerilla_yn = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!clan_yn){
    $('input[id$="CLAN_TRIBE_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="clan_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!languages){
    $('input[name$="LANGUAGE_NAME"]').val("english");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="languages";
    missing_obj[i]['value']='english';
    i++
  }
  if(!previous_countries_list){
    $('input[id$="COUNTRIES_VISITED_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="previous_countries_list";
    missing_obj[i]['value']='Bolivia/Australia/Russia...';
    i++
  }
  if(!charitable_yn){
    $('input[id$="ORGANIZATION_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="charitable_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!firearms_yn){
    $('input[id$="SPECIALIZED_SKILLS_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="firearms_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!military_yn){
    $('input[id$="MILITARY_SERVICE_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="military_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!guerilla_yn){
    $('input[id$="INSURGENT_ORG_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="guerilla_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
}

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

function fillOutPagePrevSpouseOld(personalData) {
  var spouse_first= false,spouse_last=false,spouse_dob=false,spouse_birth_city=false,spouse_nationality=false,spouse_birth_country=false,ex_start_date=false, ex_end_date=false,mariage_end_why=false,mariage_end_country=false;
  $('input[name$="NumberOfPrevSpouses"]').val("1");
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if(interaction == "spouse_first"){
      $('input[name$="SURNAME"]').val(personalData[i].value);
      spouse_first = true;
    }
    if(interaction == "spouse_last"){
      $('input[name$="GIVEN_NAME"]').val(personalData[i].value);
      spouse_last = true;
    }
    if(interaction == "spouse_dob"){
      var birth_date = personalData[i].value.split("/");
      //console.log(birth_date);
      var birth_day = birth_date[0];
      $('select[id$="DOBDay"]').find('option').each(function(){
        if($(this).text()==birth_day){
          $('select[id$="DOBDay"]').val($(this).val());
          $('select[id$="DOBDay"]').change();
        }
      });
      var birth_month = birth_date[1];
      $('select[id$="DOBMonth"]').find('option').each(function(index, value){
        if(index==parseInt(birth_month)){
          $('select[id$="DOBMonth"]').val($(this).val());
          $('select[id$="DOBMonth"]').change();
        }
      });
      var spouse_year = "";
      if(parseInt(birth_date[2])<100) spouse_year="19"+birth_date[2];
      $('input[name$="DOBYear"]').val(spouse_year);
      spouse_dob = true;
    }
    if(interaction == "spouse_nationality"){
      var country = personalData[i].value.toUpperCase().trim();
      //console.log(country);
      $('select[id$="SpouseNatDropDownList"]').find('option').each(function(){
        if($(this).text()==country){
          $('select[id$="SpouseNatDropDownList"]').val($(this).val());
          $('select[id$="SpouseNatDropDownList"]').change();
        }
      });
      spouse_nationality = true;
    }
    if(interaction == "spouse_birth_city"){
      $('input[name$="SpousePOBCity"]').val(personalData[i].value);
      spouse_birth_city = true;
    }
    if(interaction == "spouse_birth_country"){
      var country = personalData[i].value.toUpperCase().trim();
      //console.log(country);
      $('select[id$="SpousePOBCountry"]').find('option').each(function(){
        if($(this).text()==country){
          $('select[id$="SpousePOBCountry"]').val($(this).val());
          $('select[id$="SpousePOBCountry"]').change();
        }
      });
      spouse_birth_country = true;
    }
    if(interaction == "ex_start_date"){
      var start_date = personalData[i].value.split("/");
      //console.log(start_date);
      var start_day = start_date[0];
      $('select[id$="DomDay"]').find('option').each(function(){
        if($(this).text()==start_day){
          $('select[id$="DomDay"]').val($(this).val());
          $('select[id$="DomDay"]').change();
        }
      });
      var start_month = start_date[1];
      $('select[id$="DomMonth"]').find('option').each(function(index, value){
        if(index==parseInt(start_month)){
          $('select[id$="DomMonth"]').val($(this).val());
          $('select[id$="DomMonth"]').change();
        }
      });
      $('input[name$="DomYear"]').val(start_date[2]);
      ex_start_date = true;
    }
    if(interaction == "ex_end_date"){
      var end_date = personalData[i].value.split("/");
      //console.log(end_date);
      var end_day = end_date[0];
      $('select[id$="DomEndDay"]').find('option').each(function(){
        if($(this).text()==end_day){
          $('select[id$="DomEndDay"]').val($(this).val());
          $('select[id$="DomEndDay"]').change();
        }
      });
      var end_month = end_date[1];
      $('select[id$="DomEndMonth"]').find('option').each(function(index, value){
        if(index==parseInt(end_month)){
          $('select[id$="DomEndMonth"]').val($(this).val());
          $('select[id$="DomEndMonth"]').change();
        }
      });
      $('input[name$="DomEndYear"]').val(end_date[2]);
      ex_end_date = true;
    }
    if(interaction == "mariage_end_why"){
      $('textarea[name$="HowMarriageEnded"]').text(personalData[i].value);
      mariage_end_why = true;
    }
    if(interaction == "mariage_end_country"){
      var country = personalData[i].value.toUpperCase().trim();
      //console.log(country);
      $('select[id$="MarriageEnded_CNTRY"]').find('option').each(function(){
        if($(this).text()==country){
          $('select[id$="MarriageEnded_CNTRY"]').val($(this).val());
          $('select[id$="MarriageEnded_CNTRY"]').change();
        }
      });
      mariage_end_country = true;
    }
  }
}
