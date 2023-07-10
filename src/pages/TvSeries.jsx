import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TvSeriesList from "../components/TvSeriesList/TvSeriesList";

const TvSeries = () => {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <TvSeriesList />
    </>
  );
};

export default TvSeries;
