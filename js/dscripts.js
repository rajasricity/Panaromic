var server = "https://panaromic.com/application/";
var watchId;
var latval,lngval,map,mapOptions,marker=null;
$(document).ready(function(){
$("#data").load(server+"showData.php");
});
function connect(){
$.ajax({
      url:server+"connect.php",
      success: function(str){

      },
      error:function(jqXHR, exception){
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        $('#conerr').html(msg);
        $("#connection").modal("show");
      }
   });
}

function getUname(){
  var fdata = {"Userno":localStorage.Userno };
$.ajax({
      url:server+"getUname.php",
      type:"post",
      data: fdata,
      success: function(str){
        $("#uname").html(str);
      },
      error:function(jqXHR, exception){
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        $('#conerr').html(msg);
        $("#connection").modal("show");
      }
   });
}
function refresh(){
  location.reload();
}
function showOptions(){
  $("#myUl").slideToggle("slow");
}
function logout(){
  localStorage.setItem("Userno","");
  localStorage.setItem("Role","");
  location.href="Login.html";
}

function showMap(){
 $("#map").height($(window).height());
 if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition, onError,{
      maximumAge:60*1000,
      timeout:5*60*1000,
      enableHighAccuracy: true
    });
}else{
  Alert("Your Device Doesn't support Geo Location");
}
}

function showPosition(position) {

 mapOptions = {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
 marker = new google.maps.Marker({
     position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
     icon: "images/marker.ico",
     map: map
  });
  map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
 }

 function onError(error){
 switch(error.code){
   case PERMISSION_DENIED:
   alert("User denied permission");
   break;
   case TIMEOUT:
   alert("Geolocation Timeout");
   break;
   case POSITION_UNAVALABLE:
   alert("Geolocation information is not available");
   break;
   default:
   alert("Unknown Error");
   break;
 }
}

function showPersonnel(eid){
localStorage.setItem("Empid",eid);
location.href="Person.html";
}
function home(){
localStorage.setItem("Empid","");
location.href="Director.html";
}