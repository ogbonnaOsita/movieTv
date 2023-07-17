import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvSeries from "./pages/TvSeries";
import SearchPage from "./pages/SearchPage";
// import MovieInfo from "./components/MovieInfo";
import ErrorComponent from "./components/ErrorComponent";
import MoviesDetails from "./pages/MoviesDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorComponent />}>
      <Route index element={<Home />} />
      <Route path="movies" element={<Movies />} />
      <Route path="series" element={<TvSeries />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="/:id/:filmtype/:title" element={<MoviesDetails />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
