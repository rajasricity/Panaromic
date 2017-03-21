var server = "https://panaromic.com/application/";
$(document).ready(function(){
  //localStorage.setItem("TrackId","PTPLT2");
if(localStorage.TrackId != ''){
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
           //alert(str);
           //location.reload();
         }
      });
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
  location.href="Login.html";
}

function startVisit(){
  alert(latval);
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
      $("#stop").show();
      $("#svisit").addClass("disabled");
      $("#myUl").slideToggle("slow");
      $("#sdata").show();
    }
});
}

function saveStop(){
  alert(latval);
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
