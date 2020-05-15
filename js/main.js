var numplayers = 4;


function buildCard(courseID) {
    fetch(`https://golf-courses-api.herokuapp.com/courses/${courseID}`).then((response) => {
        response.json().then((data) => {
            console.log(data.data)
            const course = data.data;
            const holes = course.holes;
        })
    })
    // put list of players names (ie 'player 1') inside of the left hand player list
    for(var pl = 1; pl <= numplayers; pl++){
        $(".playerlist").append("<div class='playername'>player "+ pl +"</div>");
    }
    for(var i = 1; i <= 18; i++){
        var par = "<div id='column"+ i +"'><div class='par'>"+ i +"</div></div>";
        $("#column").append(par);
    }
    // create 18 column to hold the holes for players
    for(var c = 1; c <= 18; c++){
        var thecol = "<div id='column"+ c +"'><div class='holeheader'>"+ c +"</div></div>";
        $("#scorecard").append(thecol);
    }
    // create hole score inputs into each column for each player and give them an easy-to-reference id
    for(var h = 1; h <= 18; h++){
        for(var p = 1; p <= numplayers; p++){
            $("#column" + h).append("<input class='holeinput' type='text' id='player"+ p +"hole"+ h +"'/>");
        }
    }
}

// classes: inside the constructor is what they have, methods are what they do
// you can have a method that will calculate the yardage or the par or the final score
// method for adding score to card


