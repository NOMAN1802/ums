import Container from "../../../utils/Container";
import { EmblaOptionsType } from "embla-carousel";
import CarouselOfTeacher from "./CarouselOfTeacher";

const OurTeacher = () => {
  const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };
  return (
    <div className="text-gray-700 pb-20" id="teachers">
      {/* Title Section */}
      <div className="text-center pt-20">
        <p className="text-5xl">
          Our <span className="text-green-500">Alumni</span>
        </p>
        <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
        <p className="text-md px-8 ">
          Meet our distinguished alumni who have excelled in diverse fields and
          continue to inspire future generations.
        </p>
        <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
      </div>
      {/* Main Section  */}
      <Container>
        <CarouselOfTeacher options={OPTIONS} />
      </Container>
    </div>
  );
};

export default OurTeacher;
