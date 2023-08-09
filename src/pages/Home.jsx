// import { useEffect } from "react";
import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import FilterByCategory from "../components/MovieSection/FilterByCategory";
import Navbar from "../components/Navbar";
import ScrollToTopBtn from "../components/ScrollToTopBtn";
import TMSection from "../components/TrendingMovieSection/TMSection";
import { motion, AnimatePresence } from "framer-motion";
// import introbg from "../assets/gif.gif";

const Home = () => {
  const [onLoad, setOnLoad] = useState(true);
  return (
    <>
      <Header>
        <Navbar />
        <HeroSection />
      </Header>
      <TMSection handleOnLoad={setOnLoad} />
      <FilterByCategory />
      <ScrollToTopBtn />
      {/* this is the loader before the homepage is displayed...it is controlled by the onLoad State variable. It is displayed when the state == true and removed when the state == false. */}
      {/* the state is changed from true to false in the TMSection component---when the data needed for the tm section is fetched then the onLoad state is changed to false thereby removing the loader. A useEffect in the tm section is used to handle this change. */}
      <AnimatePresence>
        {onLoad && (
          <motion.div
            initial={{
              background: "black",
              position: "fixed",
              opacity: 1,
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "block",
            }}
            exit={{ background: "transparent", display: "none", opacity: 0 }}
            transition={{
              duration: 1,
              delay: 2.5,
              type: "tween",
              easing: "easeOutExpo",
            }}
            className="fixed z-[10000] top-0 left-0 h-screen w-screen bg-blacky"
          >
            <motion.span
              className="text-xl order-1 font-bold text-red-800 absolute bottom-[50vh] "
              // initial={{
              //   // scale: 0.8,
              //   bottom: 0,
              //   fontSize: "0.7rem",
              //   // top: "100vh",
              //   opacity: 0.1,
              //   left: "50%",
              //   translateX: "-50%",
              //   // translateY: "0%",
              // }}
              cx={50}
              animate={{
                // bottom: 0,
                bottom: ["50vh", "50vh", "60vh"],
                left: ["50%", "50%", "50%"],
                // scale: 1.5,
                fontSize: ["0.8rem", "2rem", "3rem"],
                opacity: [0, 1, 0.9],
                translateX: ["-50%", "-50%", "-50%"],
                // translateY: ["-50%", "-50%", "-50%"],
              }}
              transition={{
                duration: 2,
                delay: 0.3,
                type: "tween",
                times: [0, 0.8, 1],
                // easing: "easeOutExpo",
                // stiffness: 200,
              }}
            >
              RayPowerTv
            </motion.span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.2 }}
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            >
              <div className="loader_fetch"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
