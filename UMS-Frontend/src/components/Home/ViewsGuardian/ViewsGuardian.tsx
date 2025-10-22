import Container from "../../../utils/Container";
import CarouselOfGuardian from "./CarouselOfGuardian";
import { EmblaOptionsType } from "embla-carousel";

const ViewsGuardian = () => {
  const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };
  return (
    <div id="views" className="bg-gray-100 text-gray-700">
      {" "}
      {/* title  */}
      <div className="text-center pt-10">
        <p className="text-5xl font-light">
          <span className="text-green-500">Views</span> of our guardian
        </p>
        <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
        <p className="text-md px-8">
          Hear what our guardians have to say about the positive impact our
          school has had on their children's growth and learning.
        </p>
        <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
      </div>
      {/* content  */}
      <div>
        <Container>
          <CarouselOfGuardian options={OPTIONS} />
        </Container>
      </div>
    </div>
  );
};

export default ViewsGuardian;
