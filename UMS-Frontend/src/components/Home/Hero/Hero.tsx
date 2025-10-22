import { useTypewriter } from "react-simple-typewriter";
import { BsArrowRight, BsFillSave2Fill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Hero = () => {
  const [text] = useTypewriter({
    words: ["University Management System"],
    loop: 1,
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 py-8 md:py-12 lg:py-16">
        {/* Text Content */}
        <div className="w-full space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
            Welcome to Our <br />
            <span className="text-green-400 font-medium">{text}</span>
            <span className="ml-2 animate-pulse">|</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed">
            Streamline your academic operations with our comprehensive platform
            for managing Students, Faculty, Courses, and Administration — all in
            one place.
          </p>

          <div className="w-1/2">
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/login">
              <button className="px-3 md:px-8 cursor-pointer py-3 md:py-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30">
                <BsFillSave2Fill className="text-xl" />
                <span>APPLY NOW</span>
                <BsArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button></Link>

             <Link to="/login">
              <button className="px-3 cursor-pointer md:px-8 py-3 border-2 border-green-400 text-green-400 hover:bg-green-400/10 font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
                LEARN MORE
              </button></Link>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="w-4 h-4 rounded-full bg-green-500 border-1 border-white"
                  ></div>
                ))}
              </div>
              <p className="text-white">Trusted by 50+ universities worldwide</p>
            </div>
          </div>
        </div>

        {/* Image */}
        {/* <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={heroImage}
            alt="Business University"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-contain transition-all duration-300"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
