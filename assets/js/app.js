var topics = ["Batman", "Superman", "Green Arrow", "The Hulk", "Spiderman"];


function renderButtons() {


    $("#buttons").empty();


    for (var i = 0; i < topics.length; i++) {


        var a = $("<button>");

        a.addClass("supbttn");

        a.attr("data-name", topics[i]);

        a.text(topics[i]);

        $("#buttons").append(a);
    }
    $("body").on("click", "button", function () {

        var person = $(this).attr("data-name");


        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=aaYKdOTvastDy6M8HNdeNcBnSEZfYeCn&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {


                var gifDiv = $("<div id='size'>");


                var rating = results[i].rating;


                var p = $("<p>").text("Rating: " + rating);


                var personImage = $("<img>");


                personImage.attr({ src: results[i].images.fixed_height_still.url, 'data-still': results[i].images.fixed_height_still.url, 'data-animate': results[i].images.fixed_height.url, 'data-state': 'still', 'class': 'gif' });


                gifDiv.append(p);
                gifDiv.append(personImage);


                $("#gifs-appear-here").prepend(gifDiv);

               
            }
        });
    });
}
$("body").on("click", ".gif", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


$("#addSup").on("click", function (event) {
    event.preventDefault();

    var supher = $("#supInput").val().trim();


    topics.push(supher);


    renderButtons();
});




renderButtons();




