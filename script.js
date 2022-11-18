// Add JavaScript Below
var comedy = ["elf", "dumb and dumber", "austin powers", "booksmart", "think like a man", "the nutty professor", "heathers", "mrs doubtfire", "the 40 year old virgin", "spaceballs", "sister act", "bill and ted's excellent adventure", "Princess Bride", "Inside Man", "legally blonde", "are we there yet", "home alone", "wayne's world", "beverly hills cop", "my big fat greek wedding", "Grandma’s Boy", "Ferris Bueller's Day Off", "Pitch Perfect", "Dr. Strangelove", "Duck Soup", "Caddyshack", "Friday", "Office Space", "House Party", "Airplane!"]
var romcom = ["When Harry Met Sally", "Sleepless in Seattle", "Annie Hall", "Pretty Woman", "Groundhog Day", "City Lights", "The Princess Bride", "Silver Linings Playbook", "The Wedding Singer", "Roxanne", "Say Anything", "Love Actually", "10 Things I Hate About You", "The African Queen ", "You've Got Mail", "Better Off Dead", "Breakfast At Tiffanys", "There's Something About Mary", "The Apartment", "About Time", "Punch-Drunk Love", "Crazy, Stupid, Love", "Harold And Maude", "My Best Friend's Wedding", "Amélie", "As Good As It Gets", "The Big Sick", "(500) Days of Summer", "Crazy Rich Asians", "Kissing Jessica Stein"]
var horror = ["The Shining", "The Exorcist", "Jaws", "Alien", "The Texas Chainsaw Massacre", "Nosferatu", "Night Of The Living Dead", "Psycho", "The Silence Of The Lambs", "Audition", "The Cabinet Of Dr. Caligari", "Halloween", "The Evil Dead", "Freaks", "The Fly", "Hereditary", "Rosemary’s Baby", "Dawn Of The Dead ", "Dracula", "Evil Dead II", "The Bride Of Frankenstein", "A Nightmare On Elm Street", "Invasion Of The Body Snatchers", "The Blair Witch Project", "Scream", "28 Days Later", "The Thing", "Get Out", "Don’t Look Now", "Creepshow"]
var action = ["The Wages of Fear", "Seven Samurai", "Goldfinger", "Shaft", "Enter the Dragon", "The Driver", "Raiders of the Lost Ark", "First Blood", "RoboCop", "Die Hard", "Terminator 2: Judgment Day", "Point Break", "The Fugitive", "Léon: The Professional", "Speed ", "Drunken Master II", "The Matrix", "Battle Royale", "Crouching Tiger, Hidden Dragon", "Bad Boys II", "Ong-Bak: The Thai Warrior", "Kill Bill: Vol 1", "The Bourne Ultimatum", "The Raid", "Fast Five", "John Wick", "Mad Max: Fury Road", "The Villainess ", "Mission: Impossible - Fallout"]

// Add JavaScript Below

//  The script below will need to be added to the HTML in order for the function to run
/* <script src="https://code.jquery.com/jquery-3.5.1.min.js"
  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" 
  crossorigin="anonymous">
</script> */

$("#submitMovie").click(function () {
  //Gather values from the user fields and store them into variables.
  var title = $("#title").val();
  var year = $("#year").val();

  // Concatenate the variables above into the api url
  var queryString = "https://www.omdbapi.com/?apikey=5c231540&t=" + title + "&y=" + year + "&plot=full&r=json";

  // Put that query string into the AJAX request
  $.ajax({
    url: queryString, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    method: 'GET'
  }).done(function (response) {
    if (response.length < 1) {
      // Output error message into output container
      $("#output").append("No such movie exists");
    } else {
      // Log JSON data into console
      console.log(response);

      // create an HTML element that will hold all of the prettified elements
      var movieContainer = $('<div class="movie_Container">');
      // Append the movie container to the existing container
      $(".movieOutput").append(movieContainer);

      // Go through each property of the object and create/input the data from the object
      for (var prop in response) {
        var element;
        if (prop == "Poster" && response[prop] != "N/A") {
          element = $("<img class='moviePoster'>").attr("src", response[prop]);
        } else {
          element = $("<h3 class='movieInfo'>").text(prop + ": " + response[prop]);
        }

        movieContainer.append(element);
      }
    }
  });
});