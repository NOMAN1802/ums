import { CiBadgeDollar } from "react-icons/ci";
import bgTwo from "../../../assets/images/homeLandingPage/landingParallexImageTwo.jpg";
import Container from "../../../utils/Container";

const LandingBottomBanner = () => {
  return (
    <div className="relative h-[500px]   text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgTwo})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="relative">
        {/* Title Section */}
        <Container>
          <div className="py-20">
            <div className="bg-black/30 text-xl w-[300px] font-semibold mx-auto px-4 py-4 rounded-2xl border-r-green-500 border-l-green-500 border-r-4 border-l-4">
              <p>World's best University</p>
            </div>
            <div className="bg-black/30 text-4xl rounded-2xl my-6 px-4 py-4 md:w-[400px]  mx-auto ">
              <p>Admission going on</p>
            </div>
            <div className="py-3 text-center">
              <p className="text-gray-200">
                We provides always best services for your life easier <br /> try
                to achieve our students satisfaction.
              </p>
            </div>
            <div className="flex justify-center">
              <button className="relative mt-6 flex items-center gap-1 px-6 py-3 text-white text-lg overflow-hidden bg-green-500 transition-all duration-700 before:absolute before:inset-0 before:bg-green-700 before:-translate-y-full before:transition-transform before:duration-700 hover:before:translate-y-0 before:z-0 cursor-pointer">
                <span className="relative z-10 flex items-center gap-3">
                  <CiBadgeDollar size={26} /> <p>APPLY NOW!</p>
                </span>
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default LandingBottomBanner;
