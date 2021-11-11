const baseURL = "https://pokeapi.co/api/v2/type/"
const form = document.getElementById("userQuery")
const userInput = document.getElementById("types")
const cards = document.querySelector(".cardHolder")
const submit = document.getElementById("submitButton")
const newURL = "https://pokeapi.co/api/v2/pokemon/"

let url;
let REALURL;



function buildCards(data) {
    console.log(data)
    let displayData = data.pokemon
    console.log(displayData)

    if (displayData.length === 0) {
        let nothing = document.createElement("h1")
        nothing.innerHTML = "hello"
        cards.appendChild(nothing)
    } else {
        // let anotherThing = document.createElement("h1")
        // anotherThing.innerHTML = "hello"
        // cards.appendChild(anotherThing)

        for (let i = 0; i < displayData.length; i++) {
            let h5 = document.createElement("h5")
            let div = document.createElement("div")
            let link = document.createElement("a")
            let link2 = document.createElement("a")
            let img = document.createElement("img")

            let currentIndex = displayData[i];
            // h5.innerText = currentIndex.pokemon.name
            link.href = "https://bulbapedia.bulbagarden.net/wiki/" + currentIndex.pokemon.name +"_(Pokemon)"
            link2.href ="https://bulbapedia.bulbagarden.net/wiki/" + currentIndex.pokemon.name +"_(Pokemon)"
            link.innerText = currentIndex.pokemon.name

            function getPics(currentIndex) {
                    let newIndex = currentIndex.pokemon.name
                    // console.log(newIndex)
                    REALURL = newURL + newIndex
                    // console.log(REALURL)
                    fetch(REALURL)
                        .then(res => res.json())
                        .then(pokeName => {
                            if (pokeName.sprites.front_default === null) {
                                return img.alt = "No Image Found"
                            } else {
                            img.src = pokeName.sprites.front_default}})
                        .catch(err => img.alt = "No Image Found")
            }
            // async function imgSRC() {
            //     let resultArray = await Promise.all(currentIndex).then((value) => {
            //         let newURL = "https://pokeapi.co/api/v2/pokemon/"
            //         let REALURL = newURL + newIndex + "/"
                    
            //         fetch (REALURL)
            //         .then(res => res.json)
            //         .then(newData => newData)
            //     })
            //     console.log(resultArray)
            // console.log(currentIndex.pokemon.name)
            // let imgSRC = () => {
            //     let newIndex = currentIndex.pokemon.name
            // //     // console.log(newIndex)
            //     let newURL = "https://pokeapi.co/api/v2/pokemon/"
            //     let REALURL = newURL + newIndex + "/"
            //     // console.log(REALURL)
            //     fetch(REALURL)
            //         .then(res => res.json())
            //         .then(pokeName => getPics(pokeName))
            // }

            // console.log(imgSRC)
            // img.src = getPics(currentIndex)
            getPics(currentIndex)

            cards.appendChild(div) //parent.appendChild(child) makes the child INSIDE of the parent element.
            div.appendChild(link2)
            div.appendChild(link)
            div.appendChild(h5)

            h5.appendChild(link)
            link2.appendChild(img)

            div.classList.add("card")

            
        }
    }
}

async function searchType(e){
    e.preventDefault();
    // let searchTerm = userInput.value
    let searchTerm = types.options[types.selectedIndex].value
    console.log(searchTerm)
    url = baseURL + searchTerm + "/"
    console.log(url)
    await fetch(url)
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => buildCards(data))
}

form.addEventListener("submit", searchType)