console.log("Let's get this party started!");

$("#gif-sub").on("click", function(event) {
    event.preventDefault();
    let gifName = $("#gif-input").val()
    $("#gif-input").val("")
    getGif(gifName)
} )

$("#Delete").on("click", function(e){
    e.preventDefault()
    let gifContainer = document.querySelector(".row")
    gifContainer.innerHTML = ""
})



async function getGif( gifType ){
    let gif = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params : {
            q : gifType,
            api_key :"MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
            limit : 50
        }
    })
    if (gif.data.data.length === 0){
        alert("No gif was found!")
        let gif2 = await axios.get("http://api.giphy.com/v1/gifs/random", {
            params : {
                api_key :"MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
            }
    }) 
    makeGif(gif2.data.data.images.original.url)
    } else {
    const numberOfGifs = gif.data.data.length
    let randomNumber = Math.floor(Math.random() * numberOfGifs)

    console.log(gif.data.data[randomNumber].images.original.url)
    makeGif(gif.data.data[randomNumber].images.original.url)
    }


}

function makeGif(data) {
    let gifHtml = document.createElement("div")
    gifHtml.classList.add("col-md-4", "col-12", "mb-4")
    const gifImage = document.createElement("img")
    gifImage.src = data
    gifImage.classList.add("img-fluid")
    let gifContainer = document.querySelector(".row")
    gifHtml.append(gifImage)
    gifContainer.append(gifHtml)
}
