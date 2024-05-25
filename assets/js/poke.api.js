const pokeApi = {};

pokeApi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url).then((response) => response.json());
};

pokeApi.getPokemons = (offset = 0, limite = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limite}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails);
};
