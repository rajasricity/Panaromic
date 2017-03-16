var watchId;
var latval,lngval;
window.onload = function(){
$("#map").height($(window).height());
$("#map").width($(window).width());
if(navigator.geolocation){
    watchId = navigator.geolocation.watchPosition(onSuccess, onError,{
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

  var mapOptions = {
    center: new google.maps.LatLng(currentLat,currentLong),
    zoom: 19,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
     position: new google.maps.LatLng(currentLat, currentLong),
     icon: "images/marker.ico",
     map: map
  });
  //alert("Watch Id :"+watchId+" Lat :"+latval+"&nbsp;Lon :"+lngval);
  $("#wi").html(watchId);
  $("#la").html(latval);
  $("#ln").html(lngval);
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
