

$(document).ready(function() {
    var socket = io.connect(window.location.hostname);
    var side;
    var sideChoosen = false;
    var checked = [];
 
    $(document).on("click", "#blackside", function(){
        if(sideChoosen === true){
            return
        }
        else{
            side ="black";
            $(this).text("You");
            $("#whiteside").text("Waiting..");
            $("#chooseSideBanner").text("Waiting on opponent...")
            socket.emit("side-send", side);
            oppossingSideFunc();
            sideChoosen = true;
        }

     
        
    })
    $(document).on("click", "#whiteside", function(){
        if(sideChoosen === true){
            return
        }
        else{
            $(this).text("You");
            $("#blackside").text("Waiting..");
            $("#chooseSideBanner").text("Waiting on opponent...")
            side ="white";
            socket.emit("side-send", side);
            oppossingSideFunc();
            sideChoosen = true;
            $("#chessboardContainer").attr("class", "whiteFlip");
            $("#chessboard").attr("id", "chessboardWhite");
        }
  

        
    })

    socket.on("side-checker", data=>{
       
        if(data === "white_taken"){
            sideChoosen = true;
            side ="black";
            oppossingSideFunc();
            var jQvarUser = "#"+side+"side";
            var jQvarOpponent = "#"+oppossingSide+"side";
            $(jQvarUser).text("You");
            $(jQvarOpponent).text("Opponent");
            $("#chooseSideBanner").text("Opponent took white ...")
           
            setTimeout(function(){ 
                socket.emit("side-send", side); 
            }, 3000);
            
           
            
        }

        if(data ==="black_taken"){
            sideChoosen = true;
            side ="white";
            oppossingSideFunc();
            var jQvarUser = "#"+side+"side";
            var jQvarOpponent = "#"+oppossingSide+"side";
            $(jQvarUser).text("You");
            $(jQvarOpponent).text("Opponent");
            $("#chooseSideBanner").text("Opponent took black ...");
            $("#chessboardContainer").attr("class", "whiteFlip");
            $("#chessboard").attr("id", "chessboardWhite");
            setTimeout(function(){ 
                socket.emit("side-send", side); 
            }, 3000);
            
            

        }
        if(data === "start"){
            $("#chooseSideBanner").attr("style", "display: none;");
            $("#chessboardContainer").attr("style","opacity: 1");
            var jQvarOpponent = "#"+oppossingSide+"side";
            $(jQvarOpponent).text("Opponent");
            
            

        }

    })
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




socket.on("main-chat", data=>{
    console.log(data)
    appendNewMessage(data);
    flasher();
})


function appendNewMessage(message){

    $(".chatBox").append($("<p>").attr("style", "margin-top: 5px; padding-right: 10px; margin-right: 5px; margin-left: 5px; border-radius: 15px; background-color: rgb(34, 194, 223); color: grey;  word-break: break-all; white-space: normal; text-align: right; font-size: 24px; border: 3px solid yellow;").text(message));
  
}

function flasher(){
    $("#newUser").attr("class", "flash");
}


//PIECE MOVER
var turn = "black";

var oppossingSide;
function oppossingSideFunc(){
    if(side ==="black") {
        oppossingSide = "white"
    }
    else {
        oppossingSide="black";
    }
    
    
};

$(".chessBlock").on("click", function (){
    console.log("chessblock click");
   
    
   
    if(turn===side){
        if($(this).attr("status") === oppossingSide && move[0] === undefined){
            console.log("first if statement")
            return
            
        }
        else if($(this).attr("status")==="error"){
            console.log("2nd if statement")
            return
        }
        else if($(this).attr("status")==="empty" && move[0] === undefined){
            console.log("3rd if statement")
            return
        }
        else if ($(this).attr("value") === checked[0]){
            $(this).attr("flash", "flashOff")
            checked =[];
            console.log("4th if statement")
                
            return
    
         }
    
       
         else if(checked [0] === undefined ){
            console.log("turn on flash")
         
            $(this).attr("flash", "flashOn")
            checked.push($(this).attr("value"));
            console.log(checked[0]);
        
        }

        else {
          
            // Holy shit it worked
            console.log("turn off flash")
            
            $("[value ="+ checked[0] +"]").attr("flash", "flashOff");
            $(this).attr("flash", "flashOn")
            checked=[];
            checked.push($(this).attr("value"));
                
            }
           
        
    }
    else{}

    
})


var move = [];
var piece;
var moving = false;
var pieceSelected = false;
var moveSend=[];
var oldSpace;
//testing only
var switcher;


$(".chessBlock").on("click", function () {
   
    if(turn === oppossingSide){


    }
    else{
        if( pieceSelected===true && move[1] === undefined && $(this).attr("status") !== "empty" && $(this).attr("status") !== oppossingSide){
            oldSpace = $(this);
            console.log(oldSpace)
            console.log("new piece selected to move")
            move[0]=$(this).attr("value");
            console.log(move);
            piece =$(this).attr("id");
            console.log(piece);
            moving = true;
            
        }

        if(side === $(this).attr("status")){
            console.log("your piece");
           

            if(pieceSelected===false){
            oldSpace = $(this);
            console.log(oldSpace)
            move.push($(this).attr("value"));
            piece =$(this).attr("id");
            
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
                // $(this).attr("style", "border: 5px solid rgb(34, 194, 223);")

                moveSend.push(oldSpace);
                moveSend.push(move);
                console.log(moveSend);
                socket.emit("send-move", moveSend);
                
                oldSpace.attr("status", "empty");
                oldSpace.attr("id", "");
                oldSpace.attr("style","");
             
               
                
                oldSpace = "";  
                move=[];
                pieceSelected = false;
                moving = false;
                moveSend = [];
                turn=oppossingSide;
                var jQvarUser = "#"+side+"side";
                $(jQvarUser).attr("style", "opacity: .25;");
                var jQvarOpponent = "#"+oppossingSide+"side";
                $(jQvarOpponent).attr("style", "opacity: .9;");
               

                    //testing purposes
                    // switcher = opposingSide;
                    // console.log("TCL: switcher = opposingSide;", switcher, opposingSide)
                    // opposingSide = side;
                    // side =  switcher;
                    // switcher = "";
                   

            }
           

            if($(this).attr("status") === oppossingSide && moving === true){
                attackedPiece = $(this).attr("id");
                console.log(`${piece} attacked ${attackedPiece}  ` )
                move.push($(this).attr("value"));
                console.log(`${piece} piece was moved to ${move[1]}`);

                $(this).attr("status", side);
                $(this).attr("id", piece)
                $(this).attr("style", "");
                // $(this).attr("style", "border: 5px solid rgb(34, 194, 223);")

                moveSend.push(oldSpace);
                moveSend.push(move);
                console.log(moveSend)
                socket.emit("send-move", moveSend);

                oldSpace.attr("status", "empty");
                oldSpace.attr("id", "");
                oldSpace.attr("style","");
             
                
                oldSpace = "";
                move=[]; 
                pieceSelected = false;
                moving = false;
                moveSend = [];
                turn=oppossingSide;
                //testing purposes
                // switcher = opposingSide;
                // opposingSide = side;
                // side =  switcher;
                // switcher = "";
                var jQvarUser = "#"+side+"side";
                $(jQvarUser).attr("style", "opacity: .25;");
                var jQvarOpponent = "#"+oppossingSide+"side";
                $(jQvarOpponent).attr("style", "opacity: .9;");
                
            }
        }

        
    }
})

//sudo need logic that grabs player 1 or player 2 status such that you can subscribe to the chat name as a variable
// I need logic that also discriminates localhost/game/gameID:PORT as the serving host for the chat.






socket.on("move", data =>{
    console.log(data);
    var target = (data[1])[0];
    console.log("TCL: target", target)
    var final = (data[1])[1]
    console.log("TCL:  final",  final)
    var piece = $("."+target).attr("id");
    var status = $("."+target).attr("status")
    console.log(piece)
    $("."+final).attr("id", piece).attr("status", status).attr("flash","flashOn");
    $("."+target).attr("id", "").attr("status", "empty");
    var final = "";
    var target = "";
    turn=side;
    var jQvarUser = "#"+side+"side";
    $(jQvarUser).attr("style", "opacity: .9;");
    var jQvarOpponent = "#"+oppossingSide+"side";
    $(jQvarOpponent).attr("style", "opacity: .25;");
    console.log(turn)

})

socket.on(player, data=>{
    console.log(data)
})

});



