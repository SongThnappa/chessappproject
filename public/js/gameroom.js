

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
    if(turn===side){
        if($(this).attr("status") === opposingSide && move[0] === undefined){
            return
        }
        if($(this).attr("status")==="error"){
            return
        }
        if (checked === $(this)){
            console.log("returned")
                
            return
    
         }
    
        if ($(this).attr("style") === "border: 5px solid yellow;"){
        $(this).attr("style", "")
        }
        else{
            // Holy shit it worked
            $(this).attr("style", "border: 5px solid yellow;");
           
          
            if (checked){
                checked.attr("style","");
                checked = $(this);
            }
            else{
                checked= $(this);
            }
          }

    }
    else{}

    
})

var message;

$(".submit").on("click", event=>{
    event.preventDefault();
    message = $("#chatInput").val();
    if(message && message !== ""){
    $("#chatInput").val("");
    $(".chatBox").append($("<p>").attr("style", "margin-top: 5px; margin-right: 5px; margin-left: 5px; padding-left: 10px; border-radius: 15px; background-color: grey; text-align: left; font-size: 24px; border: 3px solid yellow;").text("You: "+ message));
    console.log("click");
    socket.emit("send-message", message);
    message = "";
    }
    else{}

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

    $(".chatBox").append($("<p>").attr("style", "margin-top: 5px; padding-right: 10px; margin-right: 5px; margin-left: 5px; border-radius: 15px; background-color: rgb(34, 194, 223); color: grey;  word-break: break-all; white-space: normal; text-align: right; font-size: 24px; border: 3px solid yellow;").text(message));
  
}

function flasher(){
    $("#newUser").attr("class", "flash");
}


//PIECE MOVER
var turn = "white";
var side = "white";
var opposingSide = "black";
var move = [];
var piece;
var moving = false;
var pieceSelected = false;
var moveSend="";
var oldSpace;
//testing only
var switcher;


$(".chessBlock").on("click", function () {
    if(turn != side){


    }
    else{
        if( pieceSelected===true && move[1] === undefined && $(this).attr("status") != "empty" && $(this).attr("status") != opposingSide){
            console.log("new piece selected to move")
            move[0]=$(this).attr("value");
            console.log(move);
            piece =$(this).attr("id");
            console.log(piece);
            moving = true;
            oldSpace = $(this);
        }

        if(side === $(this).attr("status")){
            console.log("your piece");
           

            if(pieceSelected===false){
            move.push($(this).attr("value"));
            piece =$(this).attr("id");
            oldSpace = $(this);
            pieceSelected = true;
            moving = true;

            console.log(piece);
            console.log(move);
                       console.log("first piece selected")
           
            }
        }
        if(pieceSelected===true && moving === true && move[1] === undefined){
            if($(this).attr("status") === "empty"){
                move.push($(this).attr("value"));
                console.log(`${piece} piece was moved to ${move[1]}`);
                $(this).attr("status", side);
                $(this).attr("id", piece)
                $(this).attr("style", "");
                oldSpace.attr("status", "empty").attr("id", "");
                oldSpace = "";  
                move=[];
                pieceSelected = false;
                moving = false;
                turn=opposingSide;
                    //testing purposes
                    switcher = opposingSide;
                    console.log("TCL: switcher = opposingSide;", switcher, opposingSide)
                    opposingSide = side;
                    side =  switcher;
                    switcher = "";
                   

            }
           

            if($(this).attr("status") === opposingSide && moving === true){
                attackedPiece = $(this).attr("id");
                console.log(`${piece} attacked ${attackedPiece}  ` )
                move.push($(this).attr("value"));
                console.log(`${piece} piece was moved to ${move[1]}`);
                $(this).attr("status", side);
                $(this).attr("id", piece)
                $(this).attr("style", "");
                oldSpace.attr("status", "empty").attr("id", "");
                oldSpace = "";
                move=[]; 
                pieceSelected = false;
                moving = false;
                turn=opposingSide;
                //testing purposes
                switcher = opposingSide;
                opposingSide = side;
                side =  switcher;
                switcher = "";
            }
        }

        
    }
})

