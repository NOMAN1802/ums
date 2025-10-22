import { useState } from "react";
import Container from "../../../utils/Container";
import { ourSchoolData } from "./OurUniversityData";
import { FaPlay } from "react-icons/fa";
import VideoOverLay from "../../../assets/images/videoThumbail/video-overlay.jpg";

const OurSchool = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      id="about-University"
      className="bg-white text-gray-700 md:py-10 py-4 px-4"
    >
      {/* Title Section */}
      <div className="text-center">
        <p className="text-5xl">
          Our University with <span className="text-green-500">video</span>
        </p>
        <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
        <p className="text-lg text-gray-500">
          Explore the vibrant life, modern campus, and academic excellence of
          our university through this introduction.
        </p>
        <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
      </div>

      {/* Content Section */}
      <Container>
        <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Video Section */}
          <div className="relative w-full h-[315px] flex items-center justify-center">
            {!isPlaying ? (
              <div className="relative w-full h-full">
                <img
                  src={VideoOverLay}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-opacity-50 rounded-lg transition-all duration-300 hover:bg-opacity-70"
                >
                  <div className="w-20 h-20 bg-green-500 flex items-center justify-center rounded-full shadow-lg animate-pulse">
                    <FaPlay className="text-white text-3xl ml-1" />
                  </div>
                </button>
              </div>
            ) : (
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            )}
          </div>

          {/* Text Content Section */}
          <div>
            <p className="text-start text-gray-600">
              Our university is a place where innovation meets tradition. We
              offer state-of-the-art facilities, highly qualified faculty, and a
              nurturing environment to help students thrive academically and
              socially. From world-class laboratories to dynamic extracurricular
              opportunities, our institution is dedicated to shaping the leaders
              of tomorrow through quality education and holistic development.
            </p>
            <div className="py-10">
              {ourSchoolData.map((item, index) => (
                <div
                  key={index}
                  className="flex py-3 text-lg bg-white items-center gap-3"
                >
                  <div>
                    <item.icon size={20} className="text-green-500" />
                  </div>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OurSchool;
