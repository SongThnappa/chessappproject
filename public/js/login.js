$(document).ready(function () {

  /* boiler plate code  https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal */
  // Get the modal
  const modal = document.getElementById("myModal");

  // Get the button that opens the modal
  const btn = document.getElementById("newUser");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

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
    const password1 = $("#newPassword1").val().trim();
    const password2 = $("#newPassword2").val().trim();
    const proceed = passwordCheck(password1, password2);
    console.log(proceed)

    if (proceed === true) {



      const newUser = {
        first: $("#firstName_newUser").val().trim().toLowerCase(),
        last: $("#lastName_newUser").val().trim().toLowerCase(),
        email2: $("#email_newUser").val().trim().toLowerCase(),
        password: passwordFinal,

      }



      console.log(newUser);

      $.ajax("/register", {
        type: "POST",
        data: newUser
      }).then(
        function (data) {
          console.log("new user added");
          $("#passwordError").text("Profile Created")
          $("#messageBox").append($("<img>").attr("src", "/assets/new_player.png").attr("style", "max-width:100%;").attr("style", "max-height:100%;"));
          $("#form_entry").empty();


        }
      )

    } else {

    }
  })

  $("#loginSubmit").on("click", function () {

    const email = $("#email").val().trim().toLowerCase();
    localStorage.setItem("email", email);


  })



});