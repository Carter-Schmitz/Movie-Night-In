// Add JavaScript Below
var comedy = ["elf", "dumb and dumber", "austin powers", "booksmart", "think like a man", "the nutty professor", "heathers", "mrs doubtfire", "the 40 year old virgin", "spaceballs", "sister act", "bill and ted's excellent adventure", "Princess Bride", "Inside Man", "legally blonde", "are we there yet", "home alone", "wayne's world", "beverly hills cop", "my big fat greek wedding", "Grandma’s Boy", "Ferris Bueller's Day Off", "Pitch Perfect", "Dr. Strangelove", "Duck Soup", "Caddyshack", "Friday", "Office Space", "House Party", "Airplane!"]
var romcom = ["When Harry Met Sally", "Sleepless in Seattle", "Annie Hall", "Pretty Woman", "Groundhog Day", "City Lights", "The Princess Bride", "Silver Linings Playbook", "The Wedding Singer", "Roxanne", "Say Anything", "Love Actually", "10 Things I Hate About You", "The African Queen ", "You've Got Mail", "Better Off Dead", "Breakfast At Tiffanys", "There's Something About Mary", "The Apartment", "About Time", "Punch-Drunk Love", "Crazy, Stupid, Love", "Harold And Maude", "My Best Friend's Wedding", "Amélie", "As Good As It Gets", "The Big Sick", "(500) Days of Summer", "Crazy Rich Asians", "Kissing Jessica Stein"]
var horror = ["The Shining", "The Exorcist", "Jaws", "Alien", "The Texas Chainsaw Massacre", "Nosferatu", "Night Of The Living Dead", "Psycho", "The Silence Of The Lambs", "Audition", "The Cabinet Of Dr. Caligari", "Halloween", "The Evil Dead", "Freaks", "The Fly", "Hereditary", "Rosemary’s Baby", "Dawn Of The Dead ", "Dracula", "Evil Dead II", "The Bride Of Frankenstein", "A Nightmare On Elm Street", "Invasion Of The Body Snatchers", "The Blair Witch Project", "Scream", "28 Days Later", "The Thing", "Get Out", "Don’t Look Now", "Creepshow"]
var action = ["The Wages of Fear", "Seven Samurai", "Goldfinger", "Shaft", "Enter the Dragon", "The Driver", "Raiders of the Lost Ark", "First Blood", "RoboCop", "Die Hard", "Terminator 2: Judgment Day", "Point Break", "The Fugitive", "Léon: The Professional", "Speed ", "Drunken Master II", "The Matrix", "Battle Royale", "Crouching Tiger, Hidden Dragon", "Bad Boys II", "Ong-Bak: The Thai Warrior", "Kill Bill: Vol 1", "The Bourne Ultimatum", "The Raid", "Fast Five", "John Wick", "Mad Max: Fury Road", "The Villainess ", "Mission: Impossible - Fallout"]

var watchListArray = [];

//add a selector for movieOutput(DT)
var movieOutputEl = document.querySelector('.movieOutput');
var giphyEl = document.getElementById("giphyContainer");

watchListEl = document.getElementById("watch-list");

// Function for selecting a random movie, it is not coded correctly yet
// movies could be the var that stores the selected array from above

var randomMovie = ''
var title = ''
var year = ''

$('#comedySelection').click(function () {
  $('#title').val('');
  $('#year').val('');
  movieOutputEl.textContent = "";
  randomSelection = comedy[Math.floor(Math.random() * comedy.length)];
  randomMovie = randomSelection;
  document.getElementById("randomMovie-Output").innerHTML = randomMovie + '! Press the search button above for some information about the movie for tonight.'; // this adds the selected movie the HTML, may not be needed
  console.log(randomMovie);
});

$('#romcomSelection').click(function () {
  $('#title').val('');
  $('#year').val('');
  movieOutputEl.textContent = "";
  randomSelection = romcom[Math.floor(Math.random() * romcom.length)];
  randomMovie = randomSelection;
  document.getElementById("randomMovie-Output").innerHTML = randomMovie + '! Press the search button above for some information about the movie for tonight.'; // this adds the selected movie the HTML, may not be needed
  console.log(randomMovie);
});

$('#horrorSelection').click(function () {
  $('#title').val('');
  $('#year').val('');
  movieOutputEl.textContent = "";
  randomSelection = horror[Math.floor(Math.random() * horror.length)];
  randomMovie = randomSelection;
  document.getElementById("randomMovie-Output").innerHTML = randomMovie + '! Press the search button above for some information about the movie for tonight.'; // this adds the selected movie the HTML, may not be needed
  console.log(randomMovie);
});

$('#actionSelection').click(function () {
  $('#title').val('');
  $('#year').val('');
  movieOutputEl.textContent = "";
  randomSelection = action[Math.floor(Math.random() * action.length)];
  randomMovie = randomSelection;
  document.getElementById("randomMovie-Output").innerHTML = randomMovie + '! Press the search button above for some information about the movie for tonight.'; // this adds the selected movie the HTML, may not be needed
  console.log(randomMovie);
});



$("#apiSubmit").click(function () {
  //Gather values from the user fields and store them into variables.
  title = $("#title").val();
  year = $("#year").val();

  //will clear the movieOutput content so that only one result is shown at a time(DT) 
  movieOutputEl.textContent = "";

  if (title === '') {
    title = randomMovie
    console.log(title, year);
  } else if (title === ! '') {
    console.log(title, year);
  }

  // var titleLi = document.createElement('p');
  // titleLi.textContent = title;
  // console.log(titleLi)
  // watchListEl.append(titleLi);

  // Concatenate the variables above into the api url
  var queryString = "https://www.omdbapi.com/?apikey=5c231540&t=" + title + "&y=" + year + "&plot=full&r=json";

  // Put that query string into the AJAX request
  $.ajax({
    url: queryString, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    method: 'GET'
  }).done(function (response) {
    if (response.Response == "False") {
      // Output error message into output container
      $(".movieOutput").append("<b>No such movie exists!<b>");
    } else {
      // Log JSON data into console

      console.log(response);
      console.log(response.Title)
      var titleUl = document.createElement('ul');
      titleUl.textContent = response.Title;
      movieOutputEl.append(titleUl);

      var genreUl = document.createElement('ul');
      genreUl.textContent = response.Genre;
      movieOutputEl.append(genreUl);

      var ratedUl = document.createElement('ul');
      ratedUl.textContent = response.Rated;
      movieOutputEl.append(ratedUl);

      // create an HTML element that will hold all of the elements
      var movieContainer = $('<div class="movie_Container">');
      // Append the movie container to the existing container
      $(".movieOutput").append(movieContainer);

      // Go through each property of the object and create/input the data from the object
      for (var prop in response) {
        var element;
        if (prop == "Poster" && response[prop] != "N/A") {
          element = $("<img class='moviePoster'>").attr("src", response[prop]);
        } else {
          // element = $("<h3 class='movieInfo'>").text(prop + ": " + response[prop]);
        }

        movieContainer.append(element);
      }
    }
    var plotP = document.createElement('p');
    plotP.textContent = response.Plot;
    movieOutputEl.append(plotP);
  });
});

$('#apiSubmit').click(function () {
  //javascript, jQuery
  var movie = $('#title').val().toLowerCase();

  if (movie === '') {
    movie = randomMovie
    console.log(movie, year);
  } else if (movie === ! '') {
    console.log(movie, year);
  }

  var giphyString = 'https://api.giphy.com/v1/gifs/search?api_key=kESvdoXax2rPgrmMwoGVS1eNRTVE0k60&q=' + movie + '&limit=1&offset=0&rating=pg-13&lang=en';

  $.ajax({
    url: giphyString,
    method: 'GET'
  }).done(function (response) {
    if (response.length < 1) {
      $('.giphyOutput').append('No such giphy exists');
    } else {
      console.log(response);
    }
    console.log(response.data);
    console.log(response.data[0]);
    console.log(response.data[0].images.original.url);
    mGif = response.data[0].images.original.url;
    console.log(mGif);
    var imgGif = document.createElement('img');
    imgGif.setAttribute("class","moviePoster");
    imgGif.setAttribute("src", mGif);
    movieOutputEl.append(imgGif);
  });

  //this will get the movie titles saved in local storage,
  //and will put them into the watch list array
  //work when the search button is pushed 
  //still need to link this to a page refresh 

  var storedMovies = (localStorage.getItem('names'));
console.log(storedMovies);
watchListArray = storedMovies.split(",") ;
console.log(watchListArray);


});

watchListEl=document.getElementById("watch-list");
saveEl = document.getElementById("saveButton");
saveMovEl = document.querySelector("saveMov");


//this is the code that will be used to save the 
//current movie to the watch-list
//it does not account for repeated names. 

$("#saveMov").on("click",function(){

 watchListArray.push(title);
console.log(watchListArray);
localStorage.setItem("names",watchListArray);
  var titleLi = document.createElement('p');
  titleLi.textContent= title;
  console.log(titleLi)
  watchListEl.append(titleLi);
})

//this will keep the save button hidden until the 
//seach button is hit 

function showDiv(){
  document.getElementById('saveCont').style.display="block";
}

$("#apiSubmit").click(showDiv);

//this will append the contet from the movie titles saved 
//in local storage and append them to the watchlist 

$('#apiSubmit').click(function () {

  watchListEl.textContent = " "
  var watchListH2 = document.createElement('h2');
  watchListH2.textContent = "Watch-List:";
  watchListH2.setAttribute("style","border-bottom:solid;font-weight:bold")
  watchListEl.append(watchListH2);

  for(var i=0;i<watchListArray.length;i++){
    var titleLi = document.createElement('p');
  titleLi.textContent= watchListArray[i];
  console.log(titleLi)
  watchListEl.append(titleLi);

  }

})