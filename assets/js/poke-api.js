
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type

    pokemon.species = pokeDetail.species.name;

    
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const pokemonStats = {};
    pokeDetail.stats.forEach((stat) => {
        pokemonStats[stat.stat.name] = stat.base_stat;
    });

    pokemon.stats = pokemonStats;

    //pokemon.photo = pokeDetail.sprites.other.official-artwork.front_default
    
    //pokemon.photo = pokeDetail.sprites.other.official-artwork.front_shiny

    /*official-artwork
    const abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability*/
    
    /* * 
    const abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
    const [mainAbility] = abilities;
    
    pokemon.abilities = abilities;
    pokemon.mainAbility = mainAbility;
    */
    
    const abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
    const [mainAbility, ...otherAbilities] = abilities;
    
    pokemon.abilities = otherAbilities;
    pokemon.mainAbility = mainAbility;

    

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
