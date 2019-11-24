$(document).ready(function () {

  /* boiler plate code  https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal */
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("newUser");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  btn.onclick = function () {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  var passwordFinal = "";

  function passwordCheck(pw1, confirm) {

    if (pw1 === confirm) {
      passwordFinal = confirm;
      return true;
    } else {
      $("#passwordError").text("Password did not match please retry ...");
      console.log("Passowrd Match Error")
      return false;
    }


  }

  $("#registerSubmit").on("click", function () {
    var password1 = $("#newPassword1").val().trim();
    var password2 = $("#newPassword2").val().trim();
    var proceed = passwordCheck(password1, password2);
    console.log(proceed)
    
    if (proceed === true) {
   
   
  
      var newUser = {
        first: $("#firstName_newUser").val().trim().toLowerCase(),
        last: $("#lastName_newUser").val().trim().toLowerCase(),
        username: $("#email_newUser").val().trim().toLowerCase(),
        password: passwordFinal,

      }

      console.log(newUser);

      $.ajax("/register", {
        type: "POST",
        data: newUser
      }).then(
        function () {
          console.log("new user added");
          $("#passwordError").text("Profile Created")
          $("#messageBox").append($("<img>").attr("src", "/assets/new_player.png").attr("style", "max-width:100%;").attr("style","max-height:100%;"));
          $("#form_entry").empty();
          
         
        }
      )

    } else {

    }
  })





});