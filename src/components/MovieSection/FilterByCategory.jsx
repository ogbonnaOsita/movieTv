import MovieSection from "./MovieSection";
import { images } from "../TrendingMovieSection/SectionData";
import { meunLinks } from "./SectionData";

const FilterByCategory = () => {
  return (
    <div>
      <MovieSection images={images} meunLinks={meunLinks} />
    </div>
  );
};

export default FilterByCategory;
