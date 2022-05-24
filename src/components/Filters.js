import { REGIONS, TYPES, SORT_BY } from "../constants/constants";

const Filters = ({ filters, updateFilters }) => {
  return (
    <div className="filters-container">
      <div className="filter-item">
        <label htmlFor="region-filter" className="pokemon-text">
          Region
        </label>
        <select
          id="region-filter"
          value={filters.region}
          onChange={(e) => updateFilters({ region: e.target.value })}
        >
          {REGIONS.map((region) => (
            <option key={region} value={region}>
              {region.charAt(0).toUpperCase() + region.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="type-filter" className="pokemon-text">
          Type
        </label>
        <select
          id="type-filter"
          value={filters.type}
          onChange={(e) => updateFilters({ type: e.target.value })}
        >
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="sort-filter" className="pokemon-text">
          Sort By
        </label>
        <select
          id="sort-filter"
          value={filters.sortBy}
          onChange={(e) => updateFilters({ sortBy: e.target.value })}
        >
          {SORT_BY.map((sortMethod) => (
            <option key={sortMethod} value={sortMethod}>
              {sortMethod.charAt(0).toUpperCase() + sortMethod.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="search-filter" className="pokemon-text">
          Search
        </label>
        <input
          id="search-filter"
          type="text"
          onChange={(e) => updateFilters({ searchTerm: e.target.value })}
        />
      </div>
    </div>
  );
};

export default Filters;
