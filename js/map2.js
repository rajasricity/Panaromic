var watchId;
var latval,lngval,map,mapOptions,marker=null;
window.onload = function(){
$("#map").height($(window).height());
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
function onSuccess(position){
  var currentLat = position.coords.latitude;
  var currentLong = position.coords.longitude;
  latval = currentLat;
  lngval = currentLong;

  mapOptions = {
    center: new google.maps.LatLng(currentLat,currentLong),
    zoom: 19,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  watchId = navigator.geolocation.watchPosition(showPosition, onError,{
      maximumAge:60*1000,
      timeout:5*60*1000,
      enableHighAccuracy: true
    });
  //alert("Watch Id :"+watchId+" Lat :"+latval+"&nbsp;Lon :"+lngval);
/*  $("#wi").html(watchId);
  $("#la").html(latval);
  $("#ln").html(lngval);*/
marker = new google.maps.Marker({
     position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
     icon: "images/marker.png",
     map: map
  });
}

function showPosition(position) {
  map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
  marker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
 }

function placemarker(position){
  var marker = new google.maps.Marker({
     position: position,
     icon: "images/marker.ico",
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
