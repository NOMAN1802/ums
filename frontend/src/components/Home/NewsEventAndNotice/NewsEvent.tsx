import { EmblaOptionsType } from "embla-carousel";
import EventCarousel from "./EventCarousel";
import { newsAndEventImage } from "./NoticeData";
import News from "./News";

const NewsEvent = () => {
  const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };
  return (
    <div>
      <EventCarousel options={OPTIONS} />
      <div className="md:mx-10">
        <div className="grid grid-cols-3 gap-5 justify-around">
          {newsAndEventImage.map((item) => (
            <News item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsEvent;
