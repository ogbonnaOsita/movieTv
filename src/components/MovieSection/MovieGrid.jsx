const MovieGrid = ({ children }) => {
  return (
    <div className="movie-display-slide h-[400px]y gridy grid-cols-5y gap-3y grid-layout  py-10 pl-12y pr-8y">
      {children}
    </div>
  );
};

export default MovieGrid;
