import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaThumbButton";
import { EmblaOptionsType } from "embla-carousel";
import { eventImage } from "./NoticeData";

type PropType = {
  options?: EmblaOptionsType;
};

const EventCarousel = (props: PropType) => {
  const { options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="event_embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {eventImage.map((item) => (
            <div key={item?.id} className="embla__slide">
              <img
                src={item?.image}
                alt=""
                className="w-full h-full p-4 border rounded-md "
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {eventImage.map((item) => (
              <Thumb
                key={item?.id}
                onClick={() => onThumbClick(item?.id)}
                selected={item?.id === selectedIndex}
                image={item?.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCarousel;
