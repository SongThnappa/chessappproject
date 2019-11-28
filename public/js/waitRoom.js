$(document).ready(function () {
    var gameID;
    function start() {
        gameID = Math.floor(Math.random() * 333) + "_" + Math.floor(Math.random() * 333) + "CHE" + Math.floor(Math.random() * 333) + "SS";
        console.log(gameID);
        const div = $("<div>").attr("class", "card table").attr("style", "width: 18rem; float: left;");
        const img = div.append($("<img>").attr("src", "/assets/startnew.png").attr("class", "card-img-top"));
        const div2 = div.append($("<div>").attr("class", "card-body").append(
        $("<h5>")
        .attr("class", "card-title gameID")
        .append($("<p>").attr("value", gameID).text("Game ID: " + gameID))
        )
        .append($("<a>").attr("class", "btn btn-primary newGame").text("Start New Table"))
        );
        $("#dateTableHolding").prepend(div2)
        return gameID
    }


    start();

    $("#logout").on("click", function () {
        localStorage.setItem("email", "");
    })




    $(document).on("click", ".newGame", function (event) {
        const email = localStorage.getItem("email");
        const gameInfo = {
            gameID: gameID,
            email: email
        };
         //  finally have a post redirect working with the below logic
        $.ajax("/newgame", {
            type: "POST",
            data: gameInfo
        }).then((data) => {
            window.location.href = data;
            return false;
        });

        localStorage.setItem("player", "Player1");
       

    })




















})