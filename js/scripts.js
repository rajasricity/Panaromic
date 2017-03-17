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
        location.href="Dashboard.html";
        }
      },
      error:function(qXHR, exception){
      alert(jqXHR.status);
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
      $("#myUl").slideToggle("slow");
    }
});
}
