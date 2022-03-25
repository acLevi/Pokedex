const pokeApiPromisses = new Array(150).fill().map((_, index) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
  .then(response => response.json())
})

const generateHTML = pokemons => {
  const padId = (id) => {
    if(id / 100 < 0.1){
      return '00' + id
    } else if (id / 100 < 1) {
      return '0' + id
    } else {
      return id
    }
  }
  
  return pokemons.reduce((acc, {name, sprites, types, id}) => {
    const elementTypes = types.reduce((acc2, type) => acc2 += `<p class="type-${type.type.name}">${type.type.name}</p>`, '')

    acc += `
    <li class='card ${types[0].type.name}'>
      <img class="card-image" src="${sprites.front_default}" alt="${name}">
      <div class="card-info">
        <p class="card-id">#${padId(id)}</p>
        <h2 class="card-title">${(name).toUpperCase()}</h2>
        <div class="card-subtitle">
          ${elementTypes}
        </div>
    </li>
    `
    return acc
  }, '')
}

const insertHTML = pokemons => {
  let pokedexGrid = document.querySelector('.pokedex-grid')
  pokedexGrid.innerHTML = pokemons
}

Promise.all(pokeApiPromisses).then(generateHTML).then(insertHTML)