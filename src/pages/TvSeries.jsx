import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TvSeriesList from "../components/TvSeriesList/TvSeriesList";
import TvSeriesList2 from "../components/TvSeriesList/TvSeriesList2";

const TvSeries = () => {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <TvSeriesList2 />
    </>
  );
};

export default TvSeries;
