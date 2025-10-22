import bgOne from "../../../assets/images/homeLandingPage/landingParallexImageOne.jpg";
import Container from "../../../utils/Container";
import { FactsSchoolData } from "./FactsUniversityData";

const FactsSchool = () => {
  return (
    <div className="relative h-[700px]   text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgOne})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="relative">
        {/* Title Section */}
        <div className="text-center md:pt-20">
          <p className="text-5xl px-4 py-10">
            Some <span className="text-green-500">facts</span> of our University
          </p>
          <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
          <p className="text-md text-white px-4 ">
            Discover some impressive statistics and achievements that highlight
            the excellence of our university community.
          </p>
          <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
        </div>

        <Container>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mt-8">
            {FactsSchoolData.map((item, index) => (
              <div
                key={index}
                className="bg-black/50 p-6 rounded-lg flex flex-col items-center"
              >
                <div className="text-4xl">
                  <item.icon />
                </div>
                <h3 className="text-2xl font-bold text-green-400">
                  {item.value}
                </h3>
                <p className="text-gray-300">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default FactsSchool;
