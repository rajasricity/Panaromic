var server = "http://localhost/application/";
var vid;
$(document).ready(function(){
  //localStorage.setItem("TrackId","PTPLT2");
if(localStorage.getItem("TrackId")){
$("#stop").show();
$("#svisit").addClass("disabled");
}
$("#login").on('submit', function(e){
   e.preventDefault();
   var fdata = $("#login").serialize();
   $.ajax({
      url:server+"checkLogin.php",
      data:fdata,
      type:"post",
      dataType: "json",
      beforeSend: function(){
        $("#loader").show();
      },
      success: function(str){
        $("#loader").hide();
        if(str.Userno == ''){
          $("#wmsg").show();
          $("#mnumber").val('');
          $("#pword").val('');
        }else{
        $("#wmsg").hide();
        localStorage.setItem("Userno",str.Userno);
        localStorage.setItem("Role",str.Role);
        if(str.Role == 'Director' || str.Role == 'HR'){
        location.href="Director.html";
        }else{
         location.href="Dashboard.html";
        }
        }
      },
      error:function(qXHR, exception){
      alert(jqXHR.status);
      }
   });
});

$("#saveData").on('submit', function(e){
      e.preventDefault();
      if($("#vehicle").val() != ''){
      $("#tid").val(localStorage.getItem("TrackId"));
      var fdata = $("#saveData").serialize();
      $.ajax({
         url:server+"saveData.php",
         type:"post",
         data:fdata,
         beforeSend: function(){
         $("#myModal").modal('show');
         },
         success: function(str){
           $("#myModal").modal('hide');
           $("#sdata").hide();
           $("#stop").show();
            $("#itext").hide();
           //alert(str);
           //location.reload();
         }
      });
      }else{
       alert("Select Type of Vehicle");
      }
   });
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

function startVisit(){
var fdata = {"userno":localStorage.Userno,"latitude":latval,"longitude":lngval};
$.ajax({
    url:server+"saveStart.php",
    data:fdata,
    type:"post",
    beforeSend: function(){
      $("#loader").modal('show');
    },
    success: function(str){
      $("#loader").modal('hide');
      localStorage.setItem("TrackId",str);
      $("#sbutton").hide();
      $("#sdata").show();
    }
});
}

function saveStop(){
var fdata = {"userno":localStorage.Userno,"latitude":latval,"longitude":lngval,"trackid":localStorage.TrackId};
$.ajax({
    url:server+"saveStop.php",
    data:fdata,
    type:"post",
    beforeSend: function(){
      $("#loader").modal('show');
    },
    success: function(str){
            $("#loader").modal('hide');
      localStorage.setItem("TrackId","");
      $("#stop").hide();
      $("#svisit").removeClass("disabled");
      //$("#myUl").slideToggle("slow");
    }
});
}

function addVehicle(veh){
  $("#vehicle").val(veh);
  $("#tid").val(localStorage.TrackId);
}

function saveOffice(){
var fdata = {"userno":localStorage.Userno,"latitude":latval,"longitude":lngval};
$.ajax({
    url:server+"saveOffice.php",
    data:fdata,
    type:"post",
    beforeSend: function(){
      $("#loader").modal('show');
    },
    success: function(str){
      $("#loader").modal('hide');
      $("#myUl").slideToggle("slow");
    }
});
}

function myvisits(){
  location.href="myVisits.html";
}
function refresh(){
  location.reload();
}
function showVisit(vid1){
  localStorage.setItem("Vid",vid1);
  location.href="myVisit.html";
}
function showRoute(lat1,lng1,lat2,lng2){
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
function drawPath(lat1,lng1,lat2,lng2){

}
