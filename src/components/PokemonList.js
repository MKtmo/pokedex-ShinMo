import PokemonCard from "./PokemonCard";
import DetailModal from "./DetailModal";
import Filters from "./Filters";
import { useState, useEffect } from "react";
import { getPokemonList, getPokemonDetails, formatPokemonName } from "./Api";
import loadingIcon from "../assets/img/pikachu-running.gif";
import { POKEMON_PER_LOAD, REGION_INFO } from "../constants/constants";

const PokemonList = () => {
  const [numPokemon, setNumPokemon] = useState(20);
  const [loading, setLoading] = useState(true);
  const [allPokemonDetails, setAllPokemonDetails] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [filters, setFilters] = useState({
    region: "all",
    type: "all",
    sortBy: "id",
    searchTerm: "",
  });
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailPokemon, setDetailPokemon] = useState({});

  // Load all Pokemon
  useEffect(() => {
    const getAllPokemonDetails = async () => {
      const pokemonList = await getPokemonList(
        "https://pokeapi.co/api/v2/pokemon?limit=898"
      );

      const allResponses = await Promise.all(
        pokemonList.map((pokemon) => getPokemonDetails(pokemon.url))
      );

      setAllPokemonDetails(allResponses);
      setDisplayedPokemon(allResponses);
      setLoading(false);
    };

    getAllPokemonDetails();
  }, []);

  // Filters
  useEffect(() => {
    const start = REGION_INFO[filters.region].start;
    const limit = REGION_INFO[filters.region].limit;
    const filteredPokemon = allPokemonDetails
      .slice(start, start + limit)
      .filter((pokemon) => {
        return (
          filters.type === "all" ||
          pokemon.types.map((type) => type.type.name).includes(filters.type)
        );
      })
      .filter((pokemon) => {
        return formatPokemonName(pokemon.species.name)
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());
      });

    // Sort
    if (filters.sortBy === "name") {
      filteredPokemon.sort((p1, p2) =>
        p1.species.name.localeCompare(p2.species.name)
      );
    }

    setDisplayedPokemon(filteredPokemon);
    setNumPokemon(POKEMON_PER_LOAD);
  }, [allPokemonDetails, filters]);

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const loadMorePokemon = () => {
    setNumPokemon(numPokemon + POKEMON_PER_LOAD);
  };

  const toggleModal = (pokemonDetails) => {
    if (pokemonDetails) {
      setDetailPokemon(pokemonDetails);
    } else {
      setDetailPokemon({});
    }
    setShowDetailModal((value) => !value);
  };

  if (loading)
    return (
      <div className="loading-screen pokemon-text">
        <img src={loadingIcon} alt="loading icon" />
        <h1>Loading...</h1>
      </div>
    );

  return (
    <>
      <header className="pokemon-text page-heading">
        <h1>Pokédex</h1>
      </header>
      <Filters filters={filters} updateFilters={updateFilters} />
      <div className="list-container">
        {displayedPokemon.length === 0 && (
          <div className="no-results pokemon-text">
            <h3>No Pokemon Found!</h3>
          </div>
        )}
        <ul className="pokemon-list">
          {displayedPokemon.slice(0, numPokemon).map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemonDetails={pokemon}
              toggleModal={toggleModal}
            />
          ))}
        </ul>
        {numPokemon < displayedPokemon.length && (
          <button className="load-more" onClick={loadMorePokemon}>
            Load more Pokémon
          </button>
        )}
      </div>
      {showDetailModal && (
        <DetailModal
          detailPokemon={detailPokemon}
          allPokemonDetails={allPokemonDetails}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
};

export default PokemonList;
