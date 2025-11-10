import Container from "../../../utils/Container";
import { aboutData } from "./AboutData";

const AboutHome = () => {
  return (
    <div
      id="about-University"
      className="bg-[#F5F5F5] text-gray-700 md:py-10 py-4"
    >
      {/* Title Section */}
      <div>
        <p className="text-5xl text-center">
          <span className="text-green-500">About</span> our University
        </p>
        <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
        <p className="text-lg text-gray-500 text-center max-w-3xl mx-auto">
          Our university is dedicated to academic excellence, innovation, and
          empowering students for a brighter future. With a focus on quality
          education, we foster a community where learners thrive and leaders are
          made.
        </p>
        <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
      </div>

      {/* Content Section */}
      <Container>
        <div className="container mx-auto md:py-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          {aboutData.map((item, index) => (
            <div
              key={index}
              className="flex py-10 px-5 h-[300px] bg-white flex-col items-center gap-3 shadow-sm hover:shadow-md transition"
            >
              <div className="bg-gray-100 px-6 py-6 rounded-full">
                <item.icon size={30} className="text-green-500" />
              </div>
              <h1 className="text-xl font-bold text-green-500 text-center">
                {item.title}
              </h1>
              <p className="text-gray-500 text-center text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AboutHome;
