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
