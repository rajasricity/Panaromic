var server = "https://panaromic.com/application/";
$(document).ready(function(){
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
        localStorage.setItem("Userno",str);
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