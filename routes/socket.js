const io = require("socket.io")(3001);
var sideTaken;
var halfway = false;

io.on("connection", socket => {


   if (sideTaken !== undefined){
   
       socket.emit("side-checker", sideTaken);
      
   }




    socket.on("side-send", (side)=>{
        // console.log("TCL: halfway", halfway)
        // console.log("TCL: sideTaken", sideTaken)
        
        if(halfway === true && side !== sideTaken){
            // console.log("if statement 1")
            socket.emit("side-checker", "start");
            socket.broadcast.emit("side-checker", "start");
            //need to use this once games are started and I have actual rooms created. Doing hack in meantime.

            // io.in('game').emit('big-announcement', 'the game will start soon');

            // console.log("start")
            halfway=false;
            sideTaken="";
        }
        else if(halfway === true && side === sideTaken){
            // console.log("if statement 2")
            socket.emit("side-checker", "side taken");
            // console.log("side taken")
          
        }
        else{
            // console.log("if statement 3")
            halfway=true;
            
            sideTaken=side;
            socket.broadcast.emit("side-checker", side + "_taken");
            console.log(side);
        }
            
        
        
    })

     




    socket.on("send-message", message =>{
        socket.broadcast.emit("main-chat", message)
    });
    
    socket.on("send-move", move =>{
        console.log(move);
        socket.broadcast.emit("move", move)
    });
    socket.on("chosen", side =>{
        console.log(move);
        socket.broadcast.emit("move", move)
    });


})

