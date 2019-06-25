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
}


$("#addSup").on("click", function (event) {
    event.preventDefault();
    
    var supher = $("#supInput").val().trim();

   
    topics.push(supher);

    
    renderButtons();
});

$(document).on("click", ".supbttn", displayHero);



renderButtons();


function displayHero(){
    $("button").on("click", function () {
        
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

                   
                    var gifDiv = $("<div>");

                    
                    var rating = results[i].rating;

                    
                    var p = $("<p>").text("Rating: " + rating);

                    
                    var personImage = $("<img>");

                   
                    personImage.attr("src", results[i].images.fixed_height.url);

                   
                    gifDiv.append(p);
                    gifDiv.append(personImage);

                    
                    $("#gifs-appear-here").prepend(gifDiv);
                }

            });
    });

};

