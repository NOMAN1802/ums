import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./CarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import { GuardianReviewData } from "./guardianReview";

type PropType = {
  options?: EmblaOptionsType;
};

const CarouselOfGuardian: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {GuardianReviewData.map((item, index) => (
            <div className="embla__slide py-10" key={index}>
              <div key={index} className="bg-white  p-6  relative">
                <p className="text-gray-600">{item?.message}</p>
                <div className="absolute left-5 bottom-3 text-gray-200 text-3xl">
                  💬
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <img
                  src={item?.image}
                  alt="person"
                  className="w-14 h-14 rounded-full "
                />
                <div className="ml-4">
                  <h4 className="text-green-600 text-start font-bold">
                    {item?.name}
                  </h4>
                  <p className="text-gray-500 text-sm">{item?.designation},</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pb-10">
        <div className="embla__controls">
          <div className="embla__dots ">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot bg-[#0BC560]".concat(
                  index === selectedIndex ? " embla__dot--selected " : ""
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselOfGuardian;
