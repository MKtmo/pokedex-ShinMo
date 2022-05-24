const Pagination = ({ goToNextPage, goToPreviousPage, position }) => {
  return (
    <div
      className="page-selector"
      style={
        position === "top" ? { marginTop: "25px" } : { marginBottom: "25px" }
      }
    >
      {goToPreviousPage && <button onClick={goToPreviousPage}>&#x276E;</button>}
      {goToNextPage && <button onClick={goToNextPage}>&#x276F;</button>}
    </div>
  );
};

export default Pagination;
