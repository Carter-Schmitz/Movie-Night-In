// Add JavaScript Below
var comedy = ["elf", "dumb and dumber", "austin powers", "booksmart", "think like a man", "the nutty professor", "heathers", "mrs doubtfire", "the 40 year old virgin", "spaceballs", "sister act", "bill and ted's excellent adventure", "Princess Bride", "Inside Man", "legally blonde", "are we there yet", "home alone", "wayne's world", "beverly hills cop", "my big fat greek wedding", "Grandma’s Boy", "Ferris Bueller's Day Off", "Pitch Perfect", "Dr. Strangelove", "Duck Soup", "Caddyshack", "Friday", "Office Space", "House Party", "Airplane!"]
var romcom = ["When Harry Met Sally", "Sleepless in Seattle", "Annie Hall", "Pretty Woman", "Groundhog Day", "City Lights", "The Princess Bride", "Silver Linings Playbook", "The Wedding Singer", "Roxanne", "Say Anything", "Love Actually", "10 Things I Hate About You", "The African Queen ", "You've Got Mail", "Better Off Dead", "Breakfast At Tiffanys", "There's Something About Mary", "The Apartment", "About Time", "Punch-Drunk Love", "Crazy, Stupid, Love", "Harold And Maude", "My Best Friend's Wedding", "Amélie", "As Good As It Gets", "The Big Sick", "(500) Days of Summer", "Crazy Rich Asians", "Kissing Jessica Stein"]
var horror = ["The Shining", "The Exorcist", "Jaws", "Alien", "The Texas Chainsaw Massacre", "Nosferatu", "Night Of The Living Dead", "Psycho", "The Silence Of The Lambs", "Audition", "The Cabinet Of Dr. Caligari", "Halloween", "The Evil Dead", "Freaks", "The Fly", "Hereditary", "Rosemary’s Baby", "Dawn Of The Dead ", "Dracula", "Evil Dead II", "The Bride Of Frankenstein", "A Nightmare On Elm Street", "Invasion Of The Body Snatchers", "The Blair Witch Project", "Scream", "28 Days Later", "The Thing", "Get Out", "Don’t Look Now", "Creepshow"]
var action = ["The Wages of Fear", "Seven Samurai", "Goldfinger", "Shaft", "Enter the Dragon", "The Driver", "Raiders of the Lost Ark", "First Blood", "RoboCop", "Die Hard", "Terminator 2: Judgment Day", "Point Break", "The Fugitive", "Léon: The Professional", "Speed ", "Drunken Master II", "The Matrix", "Battle Royale", "Crouching Tiger, Hidden Dragon", "Bad Boys II", "Ong-Bak: The Thai Warrior", "Kill Bill: Vol 1", "The Bourne Ultimatum", "The Raid", "Fast Five", "John Wick", "Mad Max: Fury Road", "The Villainess ", "Mission: Impossible - Fallout"]

//array to save movie titles into
var watchListArray = [];


//add a selector for movieOutput(DT)
var movieOutputEl = document.querySelector('.movieOutput');
var giphyEl = document.getElementById("giphyContainer");

var watchListEl = document.getElementById("watch-list");
var saveContEl = document.getElementById('saveCont');
var clearmovies = document.getElementById('clear-list');
var watchListEl=document.getElementById("watch-list");
var saveEl = document.getElementById("saveButton");
var saveMovEl = document.querySelector("saveMov");


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
  // (DT)

  var storedMovies = (localStorage.getItem('names'));
console.log(storedMovies);

//this is used to allow the .split function 
//to work when the local storage is empty(DT)
if(storedMovies){
watchListArray = storedMovies.split(",") ;
console.log(watchListArray);
}

localStorage.setItem("clear",title);


});





//this is the code that will be used to save the 
//current movie to the watch-list
//it does not account for repeated names. (DT)

$("#saveMov").on("click",function(){


title = localStorage.getItem('clear')

 if (watchListArray.includes(title)){
  var movSavedh3= document.createElement('h3');
  movSavedh3.textContent = "Movie is already saved"
  movSavedh3.setAttribute("style","font-weight:bold");
  saveContEl.append(movSavedh3);
  console.log("Movied already Saved");
 }else{
  watchListArray.push(title);
  console.log(watchListArray);
  localStorage.setItem("names",watchListArray);
    var titleLi = document.createElement('button');
    titleLi.setAttribute("class","reCall bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded");
    titleLi.setAttribute("id",title);
    titleLi.textContent= title;
    console.log(titleLi)
    watchListEl.append(titleLi);
 }

 $('.reCall').click(function(){
 

  var title  = $(this).attr('id');


movieOutputEl.textContent = "";




var queryString = "https://www.omdbapi.com/?apikey=5c231540&t=" + title + "&y=" + year + "&plot=full&r=json";


$.ajax({
  url: queryString, 
  method: 'GET'
}).done(function (response) {
  if (response.Response == "False") {
   
    $(".movieOutput").append("<b>No such movie exists!<b>");
  } else {
  

    
    var titleUl = document.createElement('ul');
    titleUl.textContent = response.Title;
    movieOutputEl.append(titleUl);

    var genreUl = document.createElement('ul');
    genreUl.textContent = response.Genre;
    movieOutputEl.append(genreUl);

    var ratedUl = document.createElement('ul');
    ratedUl.textContent = response.Rated;
    movieOutputEl.append(ratedUl);

    
    var movieContainer = $('<div class="movie_Container">');
  
    $(".movieOutput").append(movieContainer);


    for (var prop in response) {
      var element;
      if (prop == "Poster" && response[prop] != "N/A") {
        element = $("<img class='moviePoster'>").attr("src", response[prop]);
      } else {
      
      }

      movieContainer.append(element);
    }
  }
  var plotP = document.createElement('p');
  plotP.textContent = response.Plot;
  movieOutputEl.append(plotP);
});






var giphyString = 'https://api.giphy.com/v1/gifs/search?api_key=kESvdoXax2rPgrmMwoGVS1eNRTVE0k60&q=' + title + '&limit=1&offset=0&rating=pg-13&lang=en';

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

var storedMovies = (localStorage.getItem('names'));
console.log(storedMovies);

if(storedMovies){
watchListArray = storedMovies.split(",") ;
console.log(watchListArray);
}

localStorage.setItem("clear",title);

showDiv();


})


 



})



//this will keep the save button hidden until the 
//seach button is hit (DT)

function showDiv(){
  document.getElementById('saveCont').style.display="block";
  document.getElementById("clearCont").style.display="block";
}

$("#apiSubmit").click(showDiv);




//this fucntion will be used to propigate the 
//watch list when the page is refreshed(DT)
function setWatchList(){
  var storedMovies = (localStorage.getItem('names'));
  console.log(storedMovies);
  if(storedMovies){
  watchListArray = storedMovies.split(",") ;
  console.log(watchListArray);
  }
  

watchListEl.textContent = " "
  var watchListH2 = document.createElement('h2');
  watchListH2.textContent = "Watch-List:";
  watchListH2.setAttribute("style","border-bottom:solid;font-weight:bold")
  watchListEl.append(watchListH2);

  for(var i=0;i<watchListArray.length;i++){
    var titleLi = document.createElement('button');
    titleLi.setAttribute("class","reCall bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded");
    
    titleLi.setAttribute("id",watchListArray[i]);
  titleLi.textContent= watchListArray[i];
  console.log(titleLi)
  watchListEl.append(titleLi);

  }


}

setWatchList();




$('#clear-list').click(function() {
  localStorage.clear();
  navigator.innerHTML = '';
  location.reload();
})







//this will allow us to click on a movie in the watch list and re-populate the page with that information(DT)

$('.reCall').click(function(){
 

  var title  = $(this).attr('id');


movieOutputEl.textContent = "";


//using API fetch request code again

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
      
      }

      movieContainer.append(element);
    }
  }
  var plotP = document.createElement('p');
  plotP.textContent = response.Plot;
  movieOutputEl.append(plotP);
});






var giphyString = 'https://api.giphy.com/v1/gifs/search?api_key=kESvdoXax2rPgrmMwoGVS1eNRTVE0k60&q=' + title + '&limit=1&offset=0&rating=pg-13&lang=en';

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

var storedMovies = (localStorage.getItem('names'));
console.log(storedMovies);

if(storedMovies){
watchListArray = storedMovies.split(",") ;
console.log(watchListArray);
}

localStorage.setItem("clear",title);

showDiv();


})



//this will allow you to clear a movie that you have saved to your watch list

$('#clearmovie').click(function() {
  title = localStorage.getItem("clear")
    console.log(title);
    var storedMovies = (localStorage.getItem('names'));
    console.log("hello");
    
    //this is used to allow the .split function 
    //to work when the local storage is empty(DT)
    if(storedMovies){
    watchListArray = storedMovies.split(",") ;
    console.log(watchListArray);
    }
  
    for(var i=0; i < watchListArray.length;i++){
      if(watchListArray[i]==title){
         watchListArray.splice(i,1);
      }
    }
    console.log(watchListArray);
    localStorage.setItem("names",watchListArray);
  
     setWatchList();


//this will add the event listner for recall to watch list we created again, after we removed a movie title(DT)
  
     $('.reCall').click(function(){
      console.log("hello137981398173");
    
      var title  = $(this).attr('id');
    console.log(title);
    
    movieOutputEl.textContent = "";
    
    
    
    
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
    
    
    
    
    
    
    var giphyString = 'https://api.giphy.com/v1/gifs/search?api_key=kESvdoXax2rPgrmMwoGVS1eNRTVE0k60&q=' + title + '&limit=1&offset=0&rating=pg-13&lang=en';
    
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
    // (DT)
    
    var storedMovies = (localStorage.getItem('names'));
    console.log(storedMovies);
    
    //this is used to allow the .split function 
    //to work when the local storage is empty(DT)
    if(storedMovies){
    watchListArray = storedMovies.split(",") ;
    console.log(watchListArray);
    }
    
    localStorage.setItem("clear",title);
    
    
    })
    
    
    
  
  
  })

