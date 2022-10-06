// const getCovidUrl = id =>  `https://api.brasil.io/v1/dataset/covid19/caso/data/${id}` // API onde será colocado o link da API do professor
const getCovidUrl = id =>  `https://pokeapi.co/api/v2/pokemon/${id}` // API onde será colocado o link da API do professor

// const getCovidUrl = id =>  `https://api.covid19api.com/dayone/country/brazil/${id}`
// linha 19 é responsável pelas imagens da API 

const generateCovidPromises = () => Array(5).fill().map((_, index) => 
    fetch(getCovidUrl(index + 1)).then(response => response.json()))

const generateHTML = covids => covids.reduce((accumulator, {name, id, types}) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    
    accumulator += `
    <li class="card ${elementTypes[0]}">
    <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/>
    <h2 class="card-title">${id}. ${name}</h2>
    <p class="card-subtitle">${elementTypes.join(' | ')}</p>
    </li>
`
    return accumulator
}, '') 


const insertPokemonsIntoPage = covids => {
    const ul = document.querySelector('[data-js="covid"]')
    ul.innerHTML = covids
}


const covidPromises = generateCovidPromises()

Promise.all(covidPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
