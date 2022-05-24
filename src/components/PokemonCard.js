import pokeballIcon from "../assets/img/pokeball-icon.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatPokemonName } from "./Api";
import { TYPE_COLORS, TYPE_SECONDARY_COLORS } from "../constants/constants";

const PokemonCard = ({ pokemonDetails, toggleModal }) => {
  const typeColorGradient = getTypeColorGradient(pokemonDetails.types);

  return (
    <li>
      <article
        className="pokemon-card"
        style={{
          background: `radial-gradient(circle at top, ${typeColorGradient[0]} 35%, ${typeColorGradient[1]}) 100%`,
        }}
        onClick={() => toggleModal(pokemonDetails)}
      >
        <>
          <div className="pokemon-id pokemon-text">
            <h4>{"#" + ("00" + pokemonDetails.id).slice(-3)}</h4>
          </div>
          <div className="pokeball-icon-container">
            <img
              className="pokeball-icon"
              src={pokeballIcon}
              alt="pokeball icon"
            />
          </div>
          <div className="sprite-container">
            <LazyLoadImage
              className="pokemon-sprite"
              src={
                pokemonDetails.sprites.other["official-artwork"].front_default
              }
              alt={pokemonDetails.name}
              effect="blur"
            />
          </div>
          <h3 className="pokemon-text">
            {formatPokemonName(pokemonDetails.species.name)}
          </h3>
          <div className="type-list">
            {pokemonDetails.types.map((type) => (
              <span
                key={type.slot}
                className="type-badge"
                style={{ backgroundColor: `${TYPE_COLORS[type.type.name]}` }}
              >
                {type.type.name.charAt(0).toUpperCase() +
                  type.type.name.slice(1)}
              </span>
            ))}
          </div>
        </>
      </article>
    </li>
  );
};

export const getTypeColorGradient = (typesArray) => {
  if (typesArray.length === 1) {
    return [
      TYPE_COLORS[typesArray[0].type.name],
      TYPE_SECONDARY_COLORS[typesArray[0].type.name],
    ];
  } else {
    return [
      TYPE_COLORS[typesArray[0].type.name],
      TYPE_COLORS[typesArray[1].type.name],
    ];
  }
};

export default PokemonCard;
