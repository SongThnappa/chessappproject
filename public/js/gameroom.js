

$(document).ready(function() {


    const player = localStorage.getItem("player");

    // modal

//boiler plate code  https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal */
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
    $("#newUser").attr("class", "");
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      $("#newUser").attr("class", "");
    }
  }
//sudo need logic that grabs player 1 or player 2 status such that you can subscribe to the chat name as a variable
// I need logic that also discriminates localhost/game/gameID:PORT as the serving host for the chat.

var checked;

$(".chessBlock").on("click", function (){
    
    if ($(this).attr("style") === "border: 5px solid yellow;"){
    $(this).attr("style", "")
    }
    else{
        // Holy shit it worked
        $(this).attr("style", "border: 5px solid yellow;");
       
        if (checked === $(this)){
            
            $(this).attr("style", "border: 5px solid yellow;");

        }
        else if (checked){
            checked.attr("style","");
            checked = $(this);
        }
        else{
            checked= $(this);
        }
      }
})

var message;

$(".submit").on("click", event=>{
    event.preventDefault();
    message = $("#chatInput").val();
    $("#chatInput").val("");
    $(".chatBox").append($("<p>").attr("style", "margin-top: 5px; padding-left: 10px; border-radius: 15px; background-color: grey; text-align: left; font-size: 24px; border: 3px solid yellow;").text("You: "+ message));
    console.log("click");
    socket.emit("send-message", message);
})


const socket = io("http://localhost:3001");

socket.on("main-chat", data=>{
    
    appendNewMessage(data);
    flasher();

})

// socket.on(player, data=>{
//     console.log(data)
// })

});

function appendNewMessage(message){

    $(".chatBox").append($("<p>").attr("style", "margin-top: 5px; padding-right: 10px; border-radius: 15px; background-color: rgb(34, 194, 223); color: grey;  word-break: break-all; white-space: normal; text-align: right; font-size: 24px; border: 3px solid yellow;").text(message));
  
}

function flasher(){
    $("#newUser").attr("class", "flash");
}