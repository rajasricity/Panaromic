var watchId;
var latval,lngval;
window.onload = function(){
$("#map").height($(window).height()-10);
$("#map").width($(window).width()-10);
  alert("1");
if(navigator.geolocation){
  alert("2");
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{
      maximumAge:60*1000,
      timeout:5*60*1000,
      enableHighAccuracy: true
    });
}else{
  Alert("Your Device Doesn't support Geo Location");
}

}
function onSuccess(position){
  alert("3");
  var currentLat = position.coords.latitude;
  var currentLong = position.coords.longitude;
  latval = currentLat;
  lngval = currentLong;

  var mapOptions = {
    center: new google.maps.LatLng(currentLat,currentLong),
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
     position: new google.maps.LatLng(currentLat, currentLong),
     map: map
  });
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
function getCps(){
 if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{
      maximumAge:60*1000,
      timeout:5*60*1000,
      enableHighAccuracy: true
    });
}else{
  Alert("Your Device Doesn't support Geo Location");
}
}