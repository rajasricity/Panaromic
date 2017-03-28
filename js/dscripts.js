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
  localStorage.clear();
  location.href="Login.html";
}



function showPersonnel(eid){    
localStorage.setItem("Empid",eid);
location.href="Person.html";
}
function home(){
localStorage.setItem("Empid","");
localStorage.removeItem("Empid");     
location.href="Director.html";
}

function showRoute(lat1,lng1,lat2,lng2){
  $("#myap").slideToggle("slow");
  var points = [{"lat":lat1,"long":lng1},{"lat":lat2,"long":lng2}];
  var map;
  var mapOptions = {
    center: new google.maps.LatLng(points[0].lat,points[0].long),
    zoom:17,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("myMap"),mapOptions);
  var latlngbounds = new google.maps.LatLngBounds();
  for(var i=0;i<points.length;i++){
    var marker = new google.maps.Marker({
       position: new google.maps.LatLng(points[i].lat,points[i].long),
       map:map
    });
    latlngbounds.extend(marker.position);
  }
 map.fitBounds(latlngbounds);

  var directionsService = new google.maps.DirectionsService();
  var poly = new google.maps.Polyline({ strokeColor:"#FF0000", strokeWeight:4});
  var request = {
    origin: new google.maps.LatLng(points[0].lat,points[0].long),
    destination: new google.maps.LatLng(points[1].lat,points[1].long),
    travelMode:google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, function(response, status){
     if(status === google.maps.DirectionsStatus.OK){
       new google.maps.DirectionsRenderer({
          map:map,
          polylineOptions:poly,
          directions:response
       });
     }
  });

}