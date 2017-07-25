function clickNext() {
  setTimeout(function(){
    $('input[name$="UpdateButton3"]').click();
  }, 2000);
}

function clickContinue() {
  setTimeout(function(){
    $('input[name$="btnContinue"]').click();
  }, 1000);
}

function fillOutPageSecureQuestion(personalData) {
  $('input[name$="txtAnswer"]').val('OLIVER');

  return false;
}

function fillOutPagePersonal1(personalData) {
  var first_name = false, last_name =false,gender =false,marital_status =false,city_of_birth =false,state_of_birth =false,country_of_birth =false,DOB =false,alias_yn =false,telecode_yn =false;
  var firstNameValue = '', lastNameValue = '';
  for(var i in personalData) {
    var interaction = personalData[i].interaction;
    var value = personalData[i].value;
    if(interaction == "first_name") {
      fillTextInput("APP_GIVEN_NAME", value);
      firstNameValue = value;
      fillTextInput("APP_FULL_NAME_NATIVE", firstNameValue + ' ' + lastNameValue);
      first_name = true;
    }
    if(interaction == "last_name") {
      fillTextInput("APP_SURNAME", value);
      lastNameValue = value;
      fillTextInput("APP_FULL_NAME_NATIVE", firstNameValue + ' ' + lastNameValue);
      last_name = true;
    }
    if(interaction == "gender") {
      if (value == "male") {
        checkBox("APP_GENDER_0");
      } else {
        checkBox("APP_GENDER_1");
      }
      gender = true;
    }
    if(interaction == "marital_status") {
      var marital = value.toUpperCase().trim();
      if (marital == "COMMON LAW MARRIED") {
        marital = "COMMON LAW MARRIAGE";
      }
      marital_status = setSelectValue("APP_MARITAL_STATUS", marital);
    }
    if(interaction == "city_of_birth") {
      fillTextInput("APP_POB_CITY", value);
      city_of_birth = true;
    }
    if (interaction=="state_of_birth") {
      fillTextInput("APP_POB_ST_PROVINCE", value);
      state_of_birth = true
    }
    if (interaction == "country_of_birth") {
      var country = value.toUpperCase().trim();
      setSelectValue("APP_POB_CNTRY", country);
      country_of_birth = true;
    }
    if (interaction == "DOB") {
      setDate("DOB", value);
      DOB = true;
    }
    if(interaction == "alias_yn") {
      checkYesNo("OtherNames", value);
      alias_yn = true;
    }
    if(interaction == "telecode_yn") {
      checkYesNo("TelecodeQuestion", value);
      telecode_yn = true;
    }
  }

  var missing_obj = [];
  var i =0;
  if(!first_name){
    $('input[name$="APP_SURNAME"]').val("FERNANDEZ GARCIA");
    $('input[name$="APP_FULL_NAME_NATIVE"]').val("FERNANDEZ GARCIA");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="first_name";
    missing_obj[i]['value']="FERNANDEZ";
    i++
  }
  if(!last_name){
    $('input[name$="APP_GIVEN_NAME"]').val("JUAN MIGUEL");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="last_name";
    missing_obj[i]['value']="MIGUEL";
    i++
  }
  if(!gender){
    $('input[id$="APP_GENDER_0"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="gender";
    missing_obj[i]['value']="male/female";
    i++
  }
  if(!marital_status){
    $('select[id$="APP_MARITAL_STATUS"]').val("S");
    $('select[id$="APP_MARITAL_STATUS"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="marital_status";
    missing_obj[i]['value']="Married/Common law marriage/Single/Other/Widowed/Divorced";
    i++
  }
  if(!city_of_birth){
    $('input[name$="APP_POB_CITY"]').val("City");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="city_of_birth";
    missing_obj[i]['value']="City Name";
    i++
  }
  if(!state_of_birth){
    $('input[name$="APP_POB_ST_PROVINCE"]').val("State");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="state_of_birth";
    missing_obj[i]['value']="State Name";
    i++
  }
  if(!country_of_birth){
    $('select[id$="APP_POB_CNTRY"]').val("ARG");
    $('select[id$="APP_POB_CNTRY"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="country_of_birth";
    missing_obj[i]['value']="Albania/Algeria/American";
    i++
  }
  if(!DOB){
    $('select[id$="DOBDay"]').val("1");
    $('select[id$="DOBDay"]').change();
    $('select[id$="DOBMonth"]').val("1");
    $('select[id$="DOBMonth"]').change();
    $('input[name$="DOBYear"]').val("1980");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="DOB";
    missing_obj[i]['value']="01/1/1970";
    i++
  }
  if(!alias_yn){
    $('input[id$="OtherNames_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="alias_yn";
    missing_obj[i]['value']="Yes/No";
    i++
  }
  if(telecode_yn){
    //console.log(missing_obj);
    //console.log(missing_obj[i]);
    $('input[id$="TelecodeQuestion_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="telecode_yn";
    missing_obj[i]['value']="Yes/No";
    i++
  }

  // chrome.runtime.sendMessage({from: "content",data: missing_obj});
}

function fillOutPagePersonal2(personalData) {
  var nationality = false,othernationality_yn=false,other_residence_yn=false,national_id=false,ssn=false,taxidnumber=false;
  for(var i in personalData){
    if(personalData[i].interaction=="nationality"){
      setSelectValue("ddlAPP_NATL", personalData[i].value);
      nationality = true;
    }
    if(personalData[i].interaction=="othernationality_yn"){
      checkYesNo("APP_OTH_NATL_IND", personalData[i].value);
      othernationality_yn = true;
    }
    if(personalData[i].interaction=="other_residence_yn"){
      checkYesNo("PermResOtherCntryInd", personalData[i].value);
      other_residence_yn = true;
    }
    if(personalData[i].interaction=="national_id"){
      fillTextInput("APP_NATIONAL_ID", personalData[i].value.trim().replaceAll(".","").replaceAll("-","").replaceAll("/",""));
      // $('input[name$="APP_NATIONAL_ID"]').val(personalData[i].value.trim().replaceAll(".","").replaceAll("-","").replaceAll("/",""));
      national_id = true;
    }
    if(personalData[i].interaction=="ssn"){
      var ssn_number = personalData[i].value.split("-");
      fillTextInput("APP_SSN1", ssl_number[0]);
      fillTextInput("APP_SSN2", ssl_number[1]);
      fillTextInput("APP_SSN3", ssl_number[2]);
      ssn = true
    }
    if(personalData[i].interaction=="taxidnumber"){
      $('input[name$="APP_TAX_ID"]').val(personalData[i].value);
      taxidnumber = true
    }
  }
  var missing_obj = [];
  var i =0;
  if(!nationality){
    $('select[id$="APP_NATL"]').val("GRBR");
    $('select[id$="APP_NATL"]').change();
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

function fillOutPageAddressPhone(personalData) {
  var user_address = false,same_mailing_address_yn=false,phone_number=false,second_phone_number=false,work_phone_number=false,user_email=false;
  for(var i in personalData){
    var interaction = personalData[i].interaction, value = personalData[i].value;
    if (interaction == "user_address") {
      user_address = setAddressValue("APP_ADDR", value);
    }
    if(interaction == "same_mailing_address_yn") {
      checkYesNo("MailingAddrSame", value);
      same_mailing_address_yn = true;
    }

    if(interaction == "phone_number"){
      fillTextInput("APP_HOME_TEL", value.numerize());
      phone_number = true;
    }
    if(interaction == "second_phone_number") {
      fillTextInput("APP_MOBILE_TEL", value.numerize());
      second_phone_number = true;
    }
    if(interaction == "work_phone_number") {
      fillTextInput("APP_BUS_TEL", value.numerize());
      work_phone_number = true;
    }
    if(interaction == "user_email"){
      fillTextInput("APP_EMAIL_ADDR", value);
      user_email = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!user_address){
    $('input[name$="APP_ADDR_LN1"]').val("street");
    $('input[name$="APP_ADDR_CITY"]').val("City");
    $('input[id$="APP_ADDR_POSTAL_CD_NA"]').prop("checked", true);
    $('input[id$="APP_ADDR_STATE_NA"]').prop("checked", true);
    $('select[id$="ddlCountry"]').val("GRBR");
    $('select[id$="ddlCountry"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="user_address";
    missing_obj[i]['value']='{"street":" Honduras 5550","line2":"","zip":"1414","city":"Buenos Aires","country":"Argentina"}';
    i++
  }
  if(!same_mailing_address_yn){
    $('input[id$="MailingAddrSame_0"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="same_mailing_address_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!phone_number){
    $('input[name$="APP_HOME_TEL"]').val("123456789");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="phone_number";
    missing_obj[i]['value']='123456789';
    i++
  }
  if(!second_phone_number){
    $('input[name$="MOBILE_TEL_NA"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="second_phone_number";
    missing_obj[i]['value']='123456789';
    i++
  }
  if(!work_phone_number){
    $('input[name$="APP_BUS_TEL_NA"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="work_phone_number";
    missing_obj[i]['value']='123456789';
    i++
  }
  if(!user_email){
    $('input[name$="APP_EMAIL_ADDR"]').val("application@oliver.ai");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="user_email";
    missing_obj[i]['value']='application@oliver.ai';
    i++
  }
}

function fillOutPagePptVisa(personalData) {
  var passport_type = false,passport_number=false,passport_book_number=false,passport_city=false,passport_issue=false,passport_expire=false,passport_lost_yn=false, passport_lost_number=false,passport_lost_national=false,Passport_lost_explain=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="passport_type"){
      $('select[name$="PPT_TYPE"]').find('option').each(function(){
        if($(this).text()==personalData[i].value.toUpperCase().trim()){
          $('select[id$="PPT_TYPE"]').val($(this).val());
          $('select[id$="PPT_TYPE"]').change();
        }
      });
      passport_type = true;
    }
    if(personalData[i].interaction=="passport_number"){
      $('input[name$="PPT_NUM"]').val(personalData[i].value.replaceAll(".","").replaceAll("-",""));
      passport_number = true;
    }
    if(personalData[i].interaction=="passport_book_number"){
      $('input[name$="PPT_BOOK_NUM"]').val(personalData[i].value);
      passport_book_number = true;
    }else{
      $('input[id$="PPT_BOOK_NUM_NA"]').prop("checked", true);
    }
    if(personalData[i].interaction=="passport_country"){
      console.log("PASSPORT COUNTRY");
      passport_country = setSelectValue("PPT_ISSUED_CNTRY", personalData[i].value);
    }
    if(personalData[i].interaction=="passport_city"){
      $('input[name$="PPT_ISSUED_IN_CITY"]').val(personalData[i].value);
      passport_city = true;
    }
    if(personalData[i].interaction=="passport_issue"){
      var issue_date = personalData[i].value.split("/");
      var issue_day = issue_date[0];
      $('select[id$="PPT_ISSUED_DTEDay"]').find('option').each(function(){
        if($(this).text()==issue_day){
          $('select[id$="PPT_ISSUED_DTEDay"]').val($(this).val());
          $('select[id$="PPT_ISSUED_DTEDay"]').change();
        }
      });
      var issue_month = issue_date[1];
      $('select[id$="PPT_ISSUED_DTEMonth"]').find('option').each(function(index, value){
        if(index==parseInt(issue_month)){
          $('select[id$="PPT_ISSUED_DTEMonth"]').val($(this).val());
          $('select[id$="PPT_ISSUED_DTEMonth"]').change();
        }
      });
      $('input[name$="PPT_ISSUEDYear"]').val(issue_date[2]);
      passport_issue = true;
    }
    if(personalData[i].interaction=="passport_expire"){
      var expire_date = personalData[i].value.split("/");
      var expire_day = expire_date[0];
      $('select[id$="PPT_EXPIRE_DTEDay"]').find('option').each(function(){
        if($(this).text()==expire_day){
          $('select[id$="PPT_EXPIRE_DTEDay"]').val($(this).val());
          $('select[id$="PPT_EXPIRE_DTEDay"]').change();
        }
      });
      var expire_month = expire_date[1];
      $('select[id$="PPT_EXPIRE_DTEMonth"]').find('option').each(function(index, value){
        if(index==parseInt(expire_month)){
          $('select[id$="PPT_EXPIRE_DTEMonth"]').val($(this).val());
          $('select[id$="PPT_EXPIRE_DTEMonth"]').change();
        }
      });
      $('input[name$="PPT_EXPIREYear"]').val(expire_date[2]);
      passport_expire = true;
    }
    if(personalData[i].interaction=="passport_lost_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="LOST_PPT_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="LOST_PPT_IND_0"]').prop("checked", true);
      }
      passport_lost_yn = true;
    }
    if(personalData[i].interaction=="passport_lost_number"){
      $('input[name$="LOST_PPT_NUM"]').val(personalData[i].value);
      passport_lost_number = true;
    }else{
      $('input[id$="LOST_PPT_NUM_UNKN_IND"]').prop("checked", true);
    }
    if(personalData[i].interaction=="passport_lost_national"){
      var country = personalData[i].value.toUpperCase().trim();
      //console.log(country);
      $('select[id$="LOST_PPT_NATL"]').find('option').each(function(){
        if($(this).text()==country){
          $('select[id$="LOST_PPT_NATL"]').val($(this).val());
          $('select[id$="LOST_PPT_NATL"]').change();
        }
      });
      passport_lost_national = true;
    }
    if(personalData[i].interaction=="Passport_lost_explain"){
      $('textarea[name$="LOST_PPT_EXPL"]').text(personalData[i].value);
      Passport_lost_explain = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!passport_type){
    $('select[name$="PPT_TYPE"]').find('option').each(function(){
      if($(this).text()=="REGULAR"){
        $('select[id$="PPT_TYPE"]').val($(this).val());
        $('select[id$="PPT_TYPE"]').change();
      }
    });
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_type";
    missing_obj[i]['value']='regular/official/diplomatic/other';
    i++
  }
  if(!passport_number){
    $('input[name$="PPT_NUM"]').val("AA12345");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_number";
    missing_obj[i]['value']='AA12345';
    i++
  }
  if(!passport_book_number){
    $('input[id$="PPT_BOOK_NUM_NA"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_book_number";
    missing_obj[i]['value']='123456';
    i++
  }
  if(!passport_city){
    $('input[name$="PPT_ISSUED_IN_CITY"]').val("CITY");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_city";
    missing_obj[i]['value']='city name';
    i++
  }
  if(!passport_issue){
    $('select[id$="PPT_ISSUED_DTEDay"]').val("01");
    $('select[id$="PPT_ISSUED_DTEDay"]').change();
    $('select[id$="PPT_ISSUED_DTEMonth"]').val("01");
    $('select[id$="PPT_ISSUED_DTEMonth"]').change();
    $('input[name$="PPT_ISSUEDYear"]').val("2014");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_issue";
    missing_obj[i]['value']='1/01/2015';
    i++
  }
  if(!passport_expire){
    $('select[id$="PPT_EXPIRE_DTEDay"]').val("01");
    $('select[id$="PPT_EXPIRE_DTEDay"]').change();
    $('select[id$="PPT_EXPIRE_DTEMonth"]').val("01");
    $('select[id$="PPT_EXPIRE_DTEMonth"]').change();
    $('input[name$="PPT_EXPIREYear"]').val("2024");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_expire";
    missing_obj[i]['value']='1/01/2025';
    i++
  }
  if(!passport_lost_yn){
    $('input[id$="LOST_PPT_IND_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_expire";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!passport_lost_number){
    $('input[id$="LOST_PPT_NUM_UNKN_IND"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_lost_number";
    missing_obj[i]['value']='123456789';
    i++
  }
  if(!passport_lost_national){
    $('select[id$="LOST_PPT_NATL"]').val("ARG");
    $('select[id$="LOST_PPT_NATL"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="passport_lost_national";
    missing_obj[i]['value']='Argentina/AUSTRALIA';
    i++
  }
  if(!Passport_lost_explain){
    $('textarea[name$="LOST_PPT_EXPL"]').text("explain text");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="Passport_lost_explain";
    missing_obj[i]['value']='explain text';
    i++
  }
}

function fillOutPageTravel(personalData) {
  var trippayment = false,arrival_date=false,time_in_country=false,time_in_country_frame=false,purposeoftrip=false,otherpurpose=false,staystreet=false,staycity=false,staystate=false, stayzipcode=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="purposeoftrip"){
      $('select[name$="PurposeOfTrip"]').val(personalData[i].value);
      purposeoftrip = true;
    }
    if(personalData[i].interaction=="otherpurpose"){
      $('select[name$="OtherPurpose"]').val(personalData[i].value);
      otherpurpose = true;
    }
    if(personalData[i].interaction=="staystreet"){
      $('input[name$="StreetAddress1"]').val(personalData[i].value);
      staystreet = true;
    }
    if(personalData[i].interaction=="staycity"){
      $('input[name$="City"]').val(personalData[i].value);
      staycity = true;
    }
    if(personalData[i].interaction=="staystate"){
      $('select[name$="TravelState"]').val(personalData[i].value);
      staystate = true;
    }
    if(personalData[i].interaction=="stayzipcode"){
      $('input[name$="ZIPCode"]').val(personalData[i].value);
      stayzipcode = true;
    }
    if(personalData[i].interaction=="last_name"){
      $('input[name$="PrincipleAppSurname"]').val(personalData[i].value.trim().latinize());
    }
    if(personalData[i].interaction=="first_name"){
      $('input[name$="PrincipleAppGivenName"]').val(personalData[i].value);
    }

    if(personalData[i].interaction=="trippayment"){
      //console.log(personalData[i].value.toUpperCase().trim());
      $('select[name$="WhoIsPaying"]').find('option').each(function(){
        if($(this).text().toUpperCase()==personalData[i].value.toUpperCase().trim()){
          $('select[id$="WhoIsPaying"]').val($(this).val());
          $('select[id$="WhoIsPaying"]').change();
        }else{
          $('select[id$="WhoIsPaying"]').val("S");
          $('select[id$="WhoIsPaying"]').change();
        }
      });
      trippayment = true;
    }
    if(personalData[i].interaction=="arrival_date"){
      $('input[id$="SpecificTravel_1"]').prop("checked", true);
      var arr_date = personalData[i].value.split("/");
      //console.log(arr_date);
      var arr_day = arr_date[0];
      $('select[id$="TRAVEL_DTEDay"]').find('option').each(function(){
        if($(this).text()==arr_day){
          $('select[id$="TRAVEL_DTEDay"]').val($(this).val());
          $('select[id$="TRAVEL_DTEDay"]').change();
        }
      });
      var arr_month = arr_date[1];
      $('select[id$="TRAVEL_DTEMonth"]').find('option').each(function(index, value){
        if(index==parseInt(arr_month)){
          $('select[id$="TRAVEL_DTEMonth"]').val($(this).val());
          $('select[id$="TRAVEL_DTEMonth"]').change();
        }
      });
      $('input[name$="TRAVEL_DTEYear"]').val(arr_date[2]);
      arrival_date = true;
    }
    if(personalData[i].interaction=="time_in_country"){
      $('input[name$="TRAVEL_LOS"]').val(parseInt(personalData[i].value.trim()));
      time_in_country = true;
    }
    if(personalData[i].interaction=="time_in_country_frame"){
      $('select[id$="TRAVEL_LOS_CD"]').val(personalData[i].value[0].toUpperCase());
      $('select[id$="TRAVEL_LOS_CD"]').change();
      time_in_country_frame = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!purposeoftrip){
    $('select[name$="PurposeOfTrip"]').val("B");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="PurposeOfTrip";
    missing_obj[i]['value']='A/B/C/CNMI/D/E/F/G/HI/J/K/L/M/N/NATO/O/P/Q/R';
    i++
  }
  if(!otherpurpose){
    $('select[name$="OtherPurpose"]').val("B1-B2");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="otherpurpose";
    missing_obj[i]['value']='F2-CH/C2-UN/C1-D';
    i++
  }
  if(!staystreet){
    $('input[name$="StreetAddress1"]').val("street");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="staystreet";
    missing_obj[i]['value']='street name';
    i++
  }
  if(!staycity){
    $('input[name$="City"]').val("city");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="staystreet";
    missing_obj[i]['value']='city name';
    i++
  }
  if(!staystate){
    $('select[name$="TravelState"]').val("DE");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="staystate";
    missing_obj[i]['value']='DE';
    i++
  }
  if(!stayzipcode){
    $('input[name$="ZIPCode"]').val("12345");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="stayzipcode";
    missing_obj[i]['value']='12345';
    i++
  }
  if(personalData[i].interaction=="first_name"){
    $('input[name$="PrincipleAppSurname"]').val(personalData[i].value);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="first_name";
    missing_obj[i]['value']='first name';
    i++
  }
  if(personalData[i].interaction=="last_name"){
    $('input[name$="PrincipleAppGivenName"]').val(personalData[i].value);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="last_name";
    missing_obj[i]['value']='last name';
    i++
  }
  if(!trippayment){
    $('select[id$="WhoIsPaying"]').val('S');
    $('select[id$="WhoIsPaying"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="trippayment";
    missing_obj[i]['value']='self';
    i++
  }
  if(!arrival_date){
    $('input[id$="SpecificTravel_1"]').prop("checked", true);
    $('select[id$="TRAVEL_DTEDay"]').val("1");
    $('select[id$="TRAVEL_DTEDay"]').change();
    $('select[id$="TRAVEL_DTEMonth"]').val("1");
    $('select[id$="TRAVEL_DTEMonth"]').change();
    $('input[name$="TRAVEL_DTEYear"]').val("2018");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="arrival_date";
    missing_obj[i]['value']='01/01/2018';
    i++
  }
  if(!time_in_country){
    $('input[name$="TRAVEL_LOS"]').val("10");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="time_in_country";
    missing_obj[i]['value']='10';
    i++
  }
  if(!time_in_country_frame){
    $('select[id$="TRAVEL_LOS_CD"]').val("W");
    $('select[id$="TRAVEL_LOS_CD"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="time_in_country_frame";
    missing_obj[i]['value']='Day/Month/Year';
    i++
  }
}

function fillOutPageTravelCompanions(personalData) {
  var travelcompanions_yn = false, grouptravel_yn = false,travel_companion_first=false,travel_companion_last=false,travel_companion_relation=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="travelcompanions_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="OtherPersonsTravelingWithYou_1"]').prop("checked", true);
      }else{
        $('input[id$="OtherPersonsTravelingWithYou_0"]').prop("checked", true);
      }
      travelcompanions_yn = true;
    }
    if(personalData[i].interaction=="grouptravel_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="GroupTravel_1"]').prop("checked", true);
      }else{
        $('input[id$="GroupTravel_0"]').prop("checked", true);
      }
      grouptravel_yn = true;
    }
    if(personalData[i].interaction=="grouptravel_name"){
      $('input[name$="GroupName"]').val(personalData[i].value);
      grouptravel_name = true;
    }
    if(personalData[i].interaction=="travel_companion_last"){
      $('input[name$="Surname"]').val(personalData[i].value);
      travel_companion_last = true;
    }
    if(personalData[i].interaction=="travel_companion_first"){
      $('input[name$="GivenName"]').val(personalData[i].value);
      travel_companion_first = true;
    }
    if(personalData[i].interaction=="travel_companion_relation"){
      $('select[id$="TCRelationship"]').find('option').each(function(){
        if($(this).text()==personalData[i].value.toUpperCase().trim()){
          $('select[id$="TCRelationship"]').val($(this).val());
          $('select[id$="TCRelationship"]').change();
          travel_companion_relation = true;
        }
      });
    }
  }
  var missing_obj = [];
  var i =0;
  if(!travelcompanions_yn){
    $('input[id$="OtherPersonsTravelingWithYou_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="travelcompanions_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!grouptravel_yn){
    $('input[id$="GroupTravel_1"]').prop("checked", true);
    missing_obj[i] = {}
    missing_obj[i]['interaction']="grouptravel_yn";
    missing_obj[i]['value']='Yes/No';
    i++
  }
  if(!travel_companion_relation){
    $('select[id$="TCRelationship"]').val("P");
    $('select[id$="TCRelationship"]').change();
    missing_obj[i] = {}
    missing_obj[i]['interaction']="travel_companion_relation";
    missing_obj[i]['value']='PARENT/SPOUSE/CHILD/FRIEND/BUSINESS ASSOCIATE/OTHER';
    i++
  }
}

function fillOutPagePreviousUSTravel(personalData) {
  var ustravel_yn = false,previous_ustrip_date=false,previous_ustrip_duration=false,driverslicense_yn=false,previous_visa_yn=false,entryrefusal_yn=false,immigration_petition_yn=false, previousvisa_issuedate=false,previousvisa_number=false,previousvisa_same_yn=false,tenprinted_yn=false,previousvisa_lost_stolen_yn=false,previousvisa_revoked_yn=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="ustravel_yn"){
      if(personalData[i].value=="Yes"){
        $('input[id$="PREV_US_TRAVEL_IND_0"]').prop("checked", true);
      }else{
        $('input[id$="PREV_US_TRAVEL_IND_1"]').prop("checked", true);
      }
      ustravel_yn = true;
    }
    if(personalData[i].interaction=="previous_ustrip_date"){
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
    if(personalData[i].interaction=="previous_ustrip_duration"){
      var trip_date = personalData[i].value.split(" ");
      $('input[name$="PREV_US_VISIT_LOS"]').val(trip_date[0]);
      $('select[id$="PREV_US_VISIT_LOS_CD"]').val("D");
      $('select[id$="PREV_US_VISIT_LOS_CD"]').change();
      previous_ustrip_duration = true;
    }
    if(personalData[i].interaction=="driverslicense_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="PREV_US_DRIVER_LIC_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="PREV_US_DRIVER_LIC_IND_0"]').prop("checked", true);
      }
      driverslicense_yn = true;
    }
    if(personalData[i].interaction=="previous_visa_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="PREV_VISA_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="PREV_VISA_IND_0"]').prop("checked", true);
      }
      previous_visa_yn = true;
    }


    if(personalData[i].interaction=="previousvisa_issuedate"){
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
    if(personalData[i].interaction=="previousvisa_number"){
      $('input[name$="PREV_VISA_FOIL_NUMBER"]').val(personalData[i].value);
      previousvisa_number = true;
    }
    if(personalData[i].interaction=="previousvisa_same_yn"){
      if(personalData[i].value=="Yes"){
        $('input[id$="PREV_VISA_SAME_TYPE_IND_0"]').prop("checked", true);
        $('input[id$="PREV_VISA_SAME_CNTRY_IND_0"]').prop("checked", true);
      }else{
        $('input[id$="PREV_VISA_SAME_TYPE_IND_1"]').prop("checked", true);
        $('input[id$="PREV_VISA_SAME_CNTRY_IND_1"]').prop("checked", true);
      }
      previousvisa_same_yn = true;
    }
    if(personalData[i].interaction=="tenprinted_yn"){
      if(personalData[i].value=="Yes"){
        $('input[id$="PREV_VISA_TEN_PRINT_IND_0"]').prop("checked", true);
      }else{
        $('input[id$="PREV_VISA_TEN_PRINT_IND_1"]').prop("checked", true);
      }
      tenprinted_yn = true;
    }
    if(personalData[i].interaction=="previousvisa_lost_stolen_yn"){
      if(personalData[i].value=="Yes"){
        $('input[id$="PREV_VISA_LOST_IND_0"]').prop("checked", true);
      }else{
        $('input[id$="PREV_VISA_LOST_IND_1"]').prop("checked", true);
      }
      previousvisa_lost_stolen_yn = true;
    }
    if(personalData[i].interaction=="previousvisa_revoked_yn"){
      if(personalData[i].value=="Yes"){
        $('input[id$="PREV_VISA_CANCELLED_IND_0"]').prop("checked", true);
      }else{
        $('input[id$="PREV_VISA_CANCELLED_IND_1"]').prop("checked", true);
      }
      previousvisa_revoked_yn = true;
    }



    if(personalData[i].interaction=="entryrefusal_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="PREV_VISA_REFUSED_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="PREV_VISA_REFUSED_IND_0"]').prop("checked", true);
      }
      entryrefusal_yn = true;
    }
    if(personalData[i].interaction=="immigration_petition_yn"){
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

function fillOutPageUSContact(personalData) {
  var contact_surname= false,contact_givenname=false,organization_name=false,contact_relationship=false,contact_person_street=false,contact_person_city=false,contact_person_state=false,contact_person_zipcode=false,contact_person_phone=false,contact_person_email=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="contact_surname"){
      $('input[name$="US_POC_SURNAME"]').val(personalData[i].value);
      contact_surname = true;
    }
    if(personalData[i].interaction=="contact_givenname"){
      $('input[name$="US_POC_GIVEN_NAME"]').val(personalData[i].value);
      contact_givenname = true;
    }else{
      $('input[id$="US_POC_NAME_NA"]').prop("checked", true);
    }
    if(personalData[i].interaction=="organization_name"){
      $('input[name$="US_POC_ORGANIZATION"]').val(personalData[i].value);
      organization_name = true;
    }else{
      $('input[name$="US_POC_ORGANIZATION"]').val("organization");
    }
    if(personalData[i].interaction=="contact_person_street"){
      $('input[name$="US_POC_ADDR_LN1"]').val(personalData[i].value);
      contact_person_street = true;
    }
    if(personalData[i].interaction=="contact_person_city"){
      $('input[name$="US_POC_ADDR_CITY"]').val(personalData[i].value);
      contact_person_city = true;
    }
    if(personalData[i].interaction=="contact_person_state"){
      $('select[name$="US_POC_ADDR_STATE"]').val(personalData[i].value);
      contact_person_state = true;
    }
    if(personalData[i].interaction=="contact_person_zipcode"){
      $('input[name$="US_POC_ADDR_POSTAL_CD"]').val(personalData[i].value);
      contact_person_zipcode = true;
    }
    if(personalData[i].interaction=="contact_person_phone"){
      $('input[name$="US_POC_HOME_TEL"]').val(personalData[i].value);
      contact_person_phone = true
    }
    if(personalData[i].interaction=="contact_person_email"){
      $('input[name$="US_POC_EMAIL_ADDR"]').val(personalData[i].value);
      contact_person_email = true;
    }else{
      $('input[id$="US_POC_EMAIL_ADDR_NA"]').prop("checked", true);
    }
    if(personalData[i].interaction=="contact_relationship"){
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

function fillOutPageSpouse(personalData) {
  var spouse_first= false,spouse_last=false,spouse_dob=false,spouse_birth_city=false,spouse_nationality=false,spouse_birth_country=false,spouse_living_yn=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="spouse_first"){
      $('input[name$="SpouseSurname"]').val(personalData[i].value);
      spouse_first = true;
    }
    if(personalData[i].interaction=="spouse_last"){
      $('input[name$="SpouseGivenName"]').val(personalData[i].value);
      spouse_last = true;
    }
    if(personalData[i].interaction=="spouse_dob"){
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
    if(personalData[i].interaction=="spouse_nationality"){
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
    if(personalData[i].interaction=="spouse_birth_city"){
      $('input[name$="SpousePOBCity"]').val(personalData[i].value);
      spouse_birth_city = true;
    }
    if(personalData[i].interaction=="spouse_birth_country"){
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
    if(personalData[i].interaction=="spouse_living_yn"){
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

function fillOutPageRelatives(personalData) {
  var father_first_name= false,father_last_name=false,fatherDOB=false,father_location=false,mother_first_name=false,mother_last_name=false,motherDOB=false,mother_location=false,US_IMrelatives_yn=false,immediate_relative_first_name=false,immediate_relative_last_name=false,immediate_relative_type=false,immediate_relative_status=false,US_relatives_yn=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="father_last_name"){
      $('input[name$="FATHER_SURNAME"]').val(personalData[i].value);
      father_last_name = true;
    }//else{
    //	$('input[id$="FATHER_SURNAME_UNK_IND"]').prop("checked", true);
    //}
    if(personalData[i].interaction=="father_first_name"){
      $('input[name$="FATHER_GIVEN_NAME"]').val(personalData[i].value);
      father_first_name = true;
    }//else{
    //	$('input[id$="FATHER_GIVEN_NAME_UNK_IND"]').prop("checked", true);
    //}
    if(personalData[i].interaction=="fatherDOB"){
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
    if(personalData[i].interaction=="father_location"){
      if(personalData[i].value=="No"){
        $('input[id$="FATHER_LIVE_IN_US_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="FATHER_LIVE_IN_US_IND_0"]').prop("checked", true);
      }
      father_location = true;
    }
    if(personalData[i].interaction=="mother_last_name"){
      $('input[name$="MOTHER_SURNAME"]').val(personalData[i].value);
      mother_first_name = true;
    }//else{
    //	$('input[id$="MOTHER_SURNAME_UNK_IND"]').prop("checked", true);
    //}
    if(personalData[i].interaction=="mother_first_name"){
      $('input[name$="MOTHER_GIVEN_NAME"]').val(personalData[i].value);
      mother_last_name = true;
    }//else{
    //	$('input[id$="MOTHER_GIVEN_NAME_UNK_IND"]').prop("checked", true);
    //}
    if(personalData[i].interaction=="motherDOB"){
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
    if(personalData[i].interaction=="mother_location"){
      if(personalData[i].value=="No"){
        $('input[id$="MOTHER_LIVE_IN_US_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="MOTHER_LIVE_IN_US_IND_0"]').prop("checked", true);
      }
      mother_location = true;
    }
    if(personalData[i].interaction=="US_IMrelatives_yn"){
      if(personalData[i].value=="Yes"){
        $('input[id$="US_IMMED_RELATIVE_IND_0"]').prop("checked", true);
      }else{
        $('input[id$="US_IMMED_RELATIVE_IND_1"]').prop("checked", true);
      }
      US_IMrelatives_yn = true;
    }
    if(personalData[i].interaction=="immediate_relative_first_name"){
      $('input[name$="US_REL_SURNAME"]').val(personalData[i].value);
      immediate_relative_first_name = true;
    }
    if(personalData[i].interaction=="immediate_relative_last_name"){
      $('input[name$="US_REL_GIVEN_NAME"]').val(personalData[i].value);
      immediate_relative_last_name = true;
    }
    if(personalData[i].interaction=="immediate_relative_type"){
      var immediate = personalData[i].value.toUpperCase().trim();
      $('select[id$="US_REL_TYPE"]').find('option').each(function(){
        if($(this).text()==immediate){
          $('select[id$="US_REL_TYPE"]').val($(this).val());
          $('select[id$="US_REL_TYPE"]').change();
        }
      });
      immediate_relative_type = true;
    }
    if(personalData[i].interaction=="immediate_relative_status"){
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
    if(personalData[i].interaction=="US_relatives_yn"){
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
  if(personalData[i].interaction=="immediate_relative_type"){
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

function fillOutPageWorkEducation1(personalData) {
  var occupation= false,employer_school_name=false,employer_address=false,current_monthly_income=false,employer_duties=false,occupation_other_explain=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="occupation"){
      findInSelect("PresentOccupation", personalData[i].value);
      // $('select[id$="PresentOccupation"]').find('option').each(function(){
      //   if($(this).text().toUpperCase().indexOf(personalData[i].value.toUpperCase())!=-1){
      //     $('select[id$="PresentOccupation"]').val($(this).val());
      //     $('select[id$="PresentOccupation"]').change();
      //   }
      // });
      occupation = true;
    }
    if(personalData[i].interaction=="occupation_other_explain"){
      $('textarea[name$="ExplainOtherPresentOccupation"]').text(personalData[i].value);
      occupation_other_explain = true;
    }
    if(personalData[i].interaction=="employer_school_name"){
      fillTextInput("EmpSchName", personalData[i].value);
      // $('input[name$="EmpSchName"]').val(personalData[i].value);
      employer_school_name = true;
    }
    if(personalData[i].interaction=="employer_name"){
      fillTextInput("EmpSchName", personalData[i].value);
      // $('input[name$="EmpSchName"]').val(personalData[i].value);
      employer_school_name = true;
    }
    if(personalData[i].interaction=="employer_number"){
      fillTextInput("WORK_EDUC_TEL", personalData[i].value.numerize());
      // $('input[name$="WORK_EDUC_TEL"]').val(personalData[i].value.numerize());
      employer_number = true;
    }
    if(personalData[i].interaction=="employer_address"){
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
    if(personalData[i].interaction=="current_monthly_income") {
      fillTextInput("CURR_MONTHLY_SALARY", personalData[i].value.numerize());
      current_monthly_income = true;
    }
    if(personalData[i].interaction=="employer_duties"){
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

function fillOutPageWorkEducation2(personalData) {
  var previously_employed= false,previous_education=false,previous_school_name=false,previous_school_address=false,previous_course_study=false,school_start=false,school_end=false, past_employer_name=false,supervisors_name=false,past_employer_address=false,past_job_title=false,start_date=false,end_date=false,past_duties=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="previously_employed"){
      if(personalData[i].value=="No"){
        $('input[id$="PreviouslyEmployed_1"]').prop("checked", true);
      }else{
        $('input[id$="PreviouslyEmployed_0"]').prop("checked", true);
      }
      previously_employed = true;
    }
    if(personalData[i].interaction=="past_employer_name"){
      $('input[name$="EmployerName"]').val(personalData[i].value.trim().replaceAll(".",""));
      past_employer_name = true;
    }

    if(personalData[i].interaction=="past_employer_address"){
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
    if(personalData[i].interaction=="past_job_title"){
      $('input[name$="JobTitle"]').val(personalData[i].value.trim());
      past_job_title = true;
    }
    if(personalData[i].interaction=="supervisors_name"){
      $('input[name$="SupervisorSurname"]').val(address['state']);
      $('input[name$="SupervisorGivenName"]').val(address['state']);
      supervisors_name = true;
    }else{
      $('input[id$="SupervisorSurname_NA"]').prop("checked", true);
      $('input[name$="SupervisorGivenName_NA"]').prop("checked", true);
    }
    if(personalData[i].interaction=="start_date"){
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
    if(personalData[i].interaction=="end_date"){
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
    if(personalData[i].interaction=="past_duties"){
      $('textarea[name$="DescribeDuties"]').text(personalData[i].value);
      past_duties = true;
    }

    if(personalData[i].interaction=="previous_education"){
      if(personalData[i].value=="Yes"){
        $('input[id$="OtherEduc_0"]').prop("checked", true);
      }else{
        $('input[id$="OtherEduc_1"]').prop("checked", true);
      }
      previous_education = true;
    }
    if(personalData[i].interaction=="previous_school_name"){
      $('input[name$="SchoolName"]').val(personalData[i].value.trim().replaceAll(".",""));
      previous_school_name = true;
    }
    if(personalData[i].interaction=="previous_school_address"){
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
    if(personalData[i].interaction=="previous_course_study"){
      $('input[name$="SchoolCourseOfStudy"]').val(personalData[i].value);
      previous_course_study = true;
    }
    if(personalData[i].interaction=="school_start"){
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
    if(personalData[i].interaction=="school_end"){
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

function fillOutPageWorkEducation3(personalData) {
  var clan_yn= false,languages=false,previous_countries_list=false,charitable_yn=false,firearms_yn=false,military_yn=false,guerilla_yn=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="clan_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="CLAN_TRIBE_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="CLAN_TRIBE_IND_0"]').prop("checked", true);
      }
      clan_yn = true;
    }
    if(personalData[i].interaction=="languages"){
      $('input[name$="LANGUAGE_NAME"]').val(personalData[i].value.trim().latinize());
      languages = true;
    }
    if(personalData[i].interaction=="previous_countries_list"){
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
    if(personalData[i].interaction=="charitable_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ORGANIZATION_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="ORGANIZATION_IND_0"]').prop("checked", true);
      }
      charitable_yn = true;
    }
    if(personalData[i].interaction=="firearms_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="SPECIALIZED_SKILLS_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="SPECIALIZED_SKILLS_IND_0"]').prop("checked", true);
      }
      firearms_yn = true;
    }
    if(personalData[i].interaction=="military_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="MILITARY_SERVICE_IND_1"]').prop("checked", true);
      }else{
        $('input[id$="MILITARY_SERVICE_IND_0"]').prop("checked", true);
      }
      military_yn = true;
    }
    if(personalData[i].interaction=="guerilla_yn"){
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

function fillOutPageSecurityandBackground1(personalData) {
  var disease_yn= false,mental_yn=false,drug_yn=false,charitable_yn=false,firearms_yn=false,military_yn=false,guerilla_yn=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="disease_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Disease_1"]').prop("checked", true);
      }else{
        $('input[id$="Disease_0"]').prop("checked", true);
      }
      disease_yn = true;
    }
    if(personalData[i].interaction=="mental_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Disorder_1"]').prop("checked", true);
      }else{
        $('input[id$="Disorder_0"]').prop("checked", true);
      }
      mental_yn = true;
    }
    if(personalData[i].interaction=="drug_yn"){
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

function fillOutPageSecurityandBackground2(personalData) {
  var convicted_yn= false,substances_yn=false,prostitution_yn=false,laundering_yn=false,trafficking_yn=false,ustrafficking_yn=false,traffickingrelation_yn=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="convicted_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Arrested_1"]').prop("checked", true);
      }else{
        $('input[id$="Arrested_0"]').prop("checked", true);
      }
      convicted_yn = true;
    }
    if(personalData[i].interaction=="substances_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ControlledSubstances_1"]').prop("checked", true);
      }else{
        $('input[id$="ControlledSubstances_0"]').prop("checked", true);
      }
      substances_yn = true;
    }
    if(personalData[i].interaction=="prostitution_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Prostitution_1"]').prop("checked", true);
      }else{
        $('input[id$="Prostitution_0"]').prop("checked", true);
      }
      prostitution_yn = true;
    }
    if(personalData[i].interaction=="laundering_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="MoneyLaundering_1"]').prop("checked", true);
      }else{
        $('input[id$="MoneyLaundering_0"]').prop("checked", true);
      }
      laundering_yn = true;
    }
    if(personalData[i].interaction=="trafficking_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="HumanTrafficking_1"]').prop("checked", true);
      }else{
        $('input[id$="HumanTrafficking_0"]').prop("checked", true);
      }
      trafficking_yn = true;
    }
    if(personalData[i].interaction=="ustrafficking_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="AssistedSevereTrafficking_1"]').prop("checked", true);
      }else{
        $('input[id$="AssistedSevereTrafficking_0"]').prop("checked", true);
      }
      ustrafficking_yn = true;
    }
    if(personalData[i].interaction=="traffickingrelation_yn"){
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

function fillOutPageSecurityandBackground3(personalData) {
  var espionage_yn= false,terrorism_yn=false,terrorsupport_yn=false,terrororg_yn=false,genocide_yn=false,torture_yn=false,killing_yn=false,childsoldiers_yn=false,religion_yn=false,abortion_yn=false,organ_yn=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="espionage_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="IllegalActivity_1"]').prop("checked", true);
      }else{
        $('input[id$="IllegalActivity_0"]').prop("checked", true);
      }
      espionage_yn = true;
    }
    if(personalData[i].interaction=="terrorism_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="TerroristActivity_1"]').prop("checked", true);
      }else{
        $('input[id$="TerroristActivity_0"]').prop("checked", true);
      }
      terrorism_yn = true;
    }
    if(personalData[i].interaction=="terrorsupport_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="TerroristSupport_1"]').prop("checked", true);
      }else{
        $('input[id$="TerroristSupport_0"]').prop("checked", true);
      }
      terrorsupport_yn = true;
    }
    if(personalData[i].interaction=="terrororg_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="TerroristOrg_1"]').prop("checked", true);
      }else{
        $('input[id$="TerroristOrg_0"]').prop("checked", true);
      }
      terrororg_yn = true;
    }
    if(personalData[i].interaction=="genocide_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Genocide_1"]').prop("checked", true);
      }else{
        $('input[id$="Genocide_0"]').prop("checked", true);
      }
      genocide_yn = true;
    }
    if(personalData[i].interaction=="torture_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="Torture_1"]').prop("checked", true);
      }else{
        $('input[id$="Torture_0"]').prop("checked", true);
      }
      torture_yn = true;
    }
    if(personalData[i].interaction=="killing_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ExViolence_1"]').prop("checked", true);
      }else{
        $('input[id$="ExViolence_0"]').prop("checked", true);
      }
      killing_yn = true;
    }
    if(personalData[i].interaction=="childsoldiers_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ChildSoldier_1"]').prop("checked", true);
      }else{
        $('input[id$="ChildSoldier_0"]').prop("checked", true);
      }
      childsoldiers_yn = true;
    }
    if(personalData[i].interaction=="religion_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ReligiousFreedom_1"]').prop("checked", true);
      }else{
        $('input[id$="ReligiousFreedom_0"]').prop("checked", true);
      }
      religion_yn = true;
    }
    if(personalData[i].interaction=="abortion_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="PopulationControls_1"]').prop("checked", true);
      }else{
        $('input[id$="PopulationControls_0"]').prop("checked", true);
      }
      abortion_yn = true;
    }
    if(personalData[i].interaction=="organ_yn"){
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

function fillOutPageSecurityandBackground4(personalData) {
  var removalhearing_yn= false,immigration_fraud_yn=false,failtoattend_yn=false,visaviolation_yn=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="removalhearing_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="RemovalHearing_1"]').prop("checked", true);
      }else{
        $('input[id$="RemovalHearing_0"]').prop("checked", true);
      }
      removalhearing_yn = true;
    }
    if(personalData[i].interaction=="immigration_fraud_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ImmigrationFraud_1"]').prop("checked", true);
      }else{
        $('input[id$="ImmigrationFraud_0"]').prop("checked", true);
      }
      immigration_fraud_yn = true;
    }
    if(personalData[i].interaction=="failtoattend_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="FailToAttend_1"]').prop("checked", true);
      }else{
        $('input[id$="FailToAttend_0"]').prop("checked", true);
      }
      failtoattend_yn = true;
    }
    if(personalData[i].interaction=="visaviolation_yn"){
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

function fillOutPageSecurityandBackground5(personalData) {
  var custody_yn= false,vote_yn=false,taxevasion_yn=false,reimbursing_yn=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="custody_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="ChildCustody_1"]').prop("checked", true);
      }else{
        $('input[id$="ChildCustody_0"]').prop("checked", true);
      }
      custody_yn = true;
    }
    if(personalData[i].interaction=="vote_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="VotingViolation_1"]').prop("checked", true);
      }else{
        $('input[id$="VotingViolation_0"]').prop("checked", true);
      }
      vote_yn = true;
    }
    if(personalData[i].interaction=="taxevasion_yn"){
      if(personalData[i].value=="No"){
        $('input[id$="RenounceExp_1"]').prop("checked", true);
      }else{
        $('input[id$="RenounceExp_0"]').prop("checked", true);
      }
      taxevasion_yn = true;
    }
    if(personalData[i].interaction=="reimbursing_yn"){
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

function fillOutPagePrevSpouse(personalData) {
  var spouse_first= false,spouse_last=false,spouse_dob=false,spouse_birth_city=false,spouse_nationality=false,spouse_birth_country=false,ex_start_date=false, ex_end_date=false,mariage_end_why=false,mariage_end_country=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  $('input[name$="NumberOfPrevSpouses"]').val("1");
  for(var i in personalData){
    if(personalData[i].interaction=="spouse_first"){
      $('input[name$="SURNAME"]').val(personalData[i].value);
      spouse_first = true;
    }
    if(personalData[i].interaction=="spouse_last"){
      $('input[name$="GIVEN_NAME"]').val(personalData[i].value);
      spouse_last = true;
    }
    if(personalData[i].interaction=="spouse_dob"){
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
    if(personalData[i].interaction=="spouse_nationality"){
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
    if(personalData[i].interaction=="spouse_birth_city"){
      $('input[name$="SpousePOBCity"]').val(personalData[i].value);
      spouse_birth_city = true;
    }
    if(personalData[i].interaction=="spouse_birth_country"){
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
    if(personalData[i].interaction=="ex_start_date"){
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
    if(personalData[i].interaction=="ex_end_date"){
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
    if(personalData[i].interaction=="mariage_end_why"){
      $('textarea[name$="HowMarriageEnded"]').text(personalData[i].value);
      mariage_end_why = true;
    }
    if(personalData[i].interaction=="mariage_end_country"){
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

function fillOutPageExchangeVisitor3(personalData) {
  var servis_id= false,principal_servis_id=false;
  for(var i in personalData){
    //console.log(personalData[i].interaction+"----"+personalData[i].value);
  }
  for(var i in personalData){
    if(personalData[i].interaction=="servis_id"){
      $('input[name$="SevisID"]').val(personalData[i].interaction.value);
      servis_id = true;
    }
    if(personalData[i].interaction=="principal_servis_id"){
      $('input[name$="PrincipalSevisID"]').val(personalData[i].interaction.value);
      principal_servis_id = true;
    }
  }
  var missing_obj = [];
  var i =0;
  if(!servis_id){
    $('input[name$="SevisID"]').val("N0123456789");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="servis_id";
    missing_obj[i]['value']='N0123456789';
    i++
  }
  if(!principal_servis_id){
    $('input[name$="PrincipalSevisID"]').val("N0123456789");
    missing_obj[i] = {}
    missing_obj[i]['interaction']="principal_servis_id";
    missing_obj[i]['value']='N0123456789';
    i++
  }
}

function fillOutPageReviewPersonal(personalData) {
  return true;
}

function fillOutPageReviewTravel(personalData) {
  return true;
}

function fillOutPageReviewUSContact(personalData) {
  return true;
}

function fillOutPageReviewFamily(personalData) {
  return true;
}

function fillOutPageReviewWorkEducation(personalData) {
  return true;
}

function fillOutPageReviewSecurity(personalData) {
  return true;
}

function fillOutPageReviewLocation(personalData) {
  return true;
}

function fillOutPageSignCertify(personalData) {
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
