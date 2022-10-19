const api = "https://rickandmortyapi.com/api/character";

const search = document.getElementById("search");
const finder = document.getElementById("finder");
const containerCard = document.getElementById("containerCard");

window.addEventListener("DOMContentLoaded",renderCards);
finder.addEventListener("keyup",findCharacter);


function renderCards() {
    fetch(api)
    .then(response => response.json())
    .then(data => createCard(data))
}

function createCard(data) {
    data["results"].map(result => {

        const card = document.createElement("div");
        card.classList.add("card");

        const information = document.createElement("div");
        information.classList.add("information")

        const img = document.createElement('img');
        img.setAttribute("src",result["image"]);
        img.classList.add('image');

        const nameCharacter = document.createElement("h2");
        nameCharacter.textContent = result["name"];
        nameCharacter.classList.add('character');

        const gender = document.createElement('p');
        gender.textContent = result["gender"];
        gender.classList.add('gender');

        const specie = document.createElement('p');
        specie.textContent = `${result["status"]} - ${result["species"]}`;

        const icon = document.createElement('i');
        icon.classList.add('icon-circle');

        if (result["status"] === "Alive") {
            icon.style.color = "green";
        }else if (result["status"] === "Dead") {
            icon.style.color = "red";
        }else{
            icon.style.color = "gray";
        }
        specie.classList.add('species');

        const origin = document.createElement('p');
        origin.textContent = result["origin"].name;
        origin.classList.add('origin');

        card.appendChild(img);
        card.appendChild(information);
        information.appendChild(nameCharacter);
        information.appendChild(gender);
        information.appendChild(icon);
        information.appendChild(origin);
        icon.appendChild(specie);

        containerCard.appendChild(card);
        
    });
}

function findCharacter(event) {
    containerCard.innerHTML=" ";

    let newApi = api+`?name=${event.target.value}`;
    console.log(newApi)

    fetch(newApi)
    .then(response => response.json())
    .then(data => createCard(data))
}