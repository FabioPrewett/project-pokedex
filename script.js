
const pokedexContainer = document.getElementById('pokedex-container');
const barraDeBusca = document.getElementById('barraDeBusca');
let allPokemons = []; // Array para guardar os dados de todos os Pokemons

// Função para buscar todos os Pokemons da API (numero 1025)
const fetchAllPokemons = async () => {
    const pokemonPromises = [];
    for (let i = 1; i <= 1022; i++) {
        pokemonPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
    }
    // Usando Promise.all para carregar todos de uma vez (mais rápido)
    allPokemons = await Promise.all(pokemonPromises);
    displayPokemons(allPokemons); //mostra todos na tela ao terminar
};
// funcçao para mostrar os pokemons na tela, recebe o array de pokemons
const displayPokemons = (pokemons) => {
    pokedexContainer.innerHTML = ''; 
    
    //limpa a tela antes de mostrar novos resultados.
    pokemons.forEach(pokemon => {createPokemonCard(pokemon);});
};

// funcão para criar o HTML dos cards de pohemon (sem alterações) e de maneira altomatica.
const createPokemonCard = (pokemon) => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const cardHTML = `
    <div class="img-container">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    </div>
    <div class="info">
        <span class="number">${pokemon.id.toString().padStart(3, '0')}</span>
        <h3 class="name">${pokemon.name}</h3>
        <small class="type">Type: ${pokemon.types[0].type.name}</small>
    </div>    
    `;
    card.innerHTML = cardHTML;
    pokedexContainer.appendChild(card);
};
// evento para pegar o que digita na barra de busca.
barraDeBusca.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();

    //filtra o array (allpokemons).
    const filteredPokemons = allPokemons.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(searchTerm) ||
        pokemon.id.toString().includes(searchTerm);
    });
    //mostra na tela apenas pokemons filtrados.
    displayPokemons(filteredPokemons);
});
//inicia tudo!
fetchAllPokemons();