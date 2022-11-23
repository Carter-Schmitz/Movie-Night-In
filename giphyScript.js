$('#apiSubmit').click(function () {

    //javascript, jQuery
    var movie = $('#title').val().toLowerCase();
    var giphyString = $.get('https://api.giphy.com/v1/gifs/search?api_key=kESvdoXax2rPgrmMwoGVS1eNRTVE0k60&q=' + movie + '&limit=1&rating=pg-13&lang=en');
    giphyString.done(function (data) { console.log("success got data", data); });

    giphyContainer = document.getElementById('giphyContainer');

    console.log(giphyString.heaaders);
    
    // var titleUl = document.createElement('ul');
    // titleUl.textContent=giphyString.Title;
    // movieOutputEl.append(titleUl);

    // var giphyString = 'https://api.giphy.com/v1/gifs/search?api_key=kESvdoXax2rPgrmMwoGVS1eNRTVE0k60&q='+movie+'&limit=1&offset=0&rating=pg-13&lang=en'



    // $.ajax({
    //     url:giphyString,
    //     method: 'GET'
    // }).done(function(response){
    //     if(response.length < 1) {
    //         $('.giphyOutput').append('No such giphy exists');
    //     } else {
    //         console.log(response);
    //     }
    // })
});