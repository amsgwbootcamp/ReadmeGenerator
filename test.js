var searchLat;
var searchLon;
var currentDate;
var counter = 1;
//
// Function to get the UV Index and color code it based on the index level.  
//
function getUVIndex()
{
        var queryURL = "https://api.github.com/users/amsgwbootcamp/repos";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        console.log(response);
        }
    )
}

getUVIndex();