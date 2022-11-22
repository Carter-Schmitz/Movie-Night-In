$('#apiSubmit').click(function () {

    var movie = $('#title').val();

    var giphyString = 'https://api.giphy.com/v1/gifs/search?api_key=kESvdoXax2rPgrmMwoGVS1eNRTVE0k60&q='+movie+'&limit=1&offset=0&rating=pg-13&lang=en'

    console.log(movie);
    console.log(giphyString);

    $.ajax({
        url:giphyString,
        method: 'GET'
    }).done(function(response){
        if(response.length < 1) {
            $('.giphyOutput').append('No such giphy exists');
        } else {
            console.log(response);
        }
    })
});