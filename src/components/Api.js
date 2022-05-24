import axios from "axios";

const getPokemonList = async (url) => {
  const response = await axios.get(url);

  response.data.results = response.data.results.map((pokemon) => {
    return { id: getPokemonIdFromUrl(pokemon.url), ...pokemon };
  });

  return response.data.results;
};

const getPokemonDetails = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const getPokemonIdFromUrl = (url) => {
  const urlSegments = url.split("/");
  const pokemonId = urlSegments.pop() || urlSegments.pop();
  return pokemonId;
};

const getPokemonEvolutions = async (url) => {
  const evolutions = [];
  const response = await axios.get(url);
  const evoData = response.data;

  const traverseEvolutionTree = (node, level) => {
    if (evolutions[level] === undefined) evolutions[level] = [];
    evolutions[level].push(getPokemonIdFromUrl(node.species.url));
    node.evolves_to.forEach((child) => traverseEvolutionTree(child, level + 1));
  };

  traverseEvolutionTree(evoData.chain, 0);

  return evolutions;
};

const formatPokemonName = (name) => {
  return name
    .toLowerCase()
    .split("-")
    .map((s) => {
      if (s === "m") {
        return "♂";
      } else if (s === "f") {
        return "♀";
      }
      return s.charAt(0).toUpperCase() + s.substring(1);
    })
    .join(" ");
};

const formatStatName = (name) => {
  if (name === "hp") return "HP";

  return name
    .toLowerCase()
    .split("-")
    .map((s) => {
      if (s === "special") return "Sp";
      return s.charAt(0).toUpperCase() + s.substring(1);
    })
    .join(" ");
};

const getJapaneseName = async (id) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  return response.data.names[0].name;
};

export {
  getPokemonList,
  getPokemonDetails,
  getPokemonEvolutions,
  getJapaneseName,
  formatPokemonName,
  formatStatName,
};
