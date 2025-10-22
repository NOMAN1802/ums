import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiFacebookFill } from "react-icons/ri";
import { FaGooglePlusG } from "react-icons/fa6";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./TeacherCarourselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import { alumniData } from "./teachersData";

type PropType = {
  options?: EmblaOptionsType;
};

const CarouselOfTeacher: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {alumniData.map((teacher, index) => (
            <div className="embla__slide" key={index}>
              <div className="md:p-4 h-full flex justify-center">
                <div className="grid grid-cols-5 gap-5 bg-white p-4 md:p-6 rounded-2xl shadow-lg max-w-4xl w-full min-h-[320px] max-h-[320px] overflow-hidden">
                  {/* Left Image + Icons */}
                  <div className="col-span-2 flex flex-col justify-between h-full">
                    <div className="h-[180px] overflow-hidden rounded">
                      <img
                        src={teacher.image}
                        alt={teacher?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-center gap-4 pt-4">
                      <RiFacebookFill
                        size={20}
                        className="text-gray-600 hover:text-green-500 cursor-pointer"
                      />
                      <FaTwitter
                        size={20}
                        className="text-gray-600 hover:text-green-500 cursor-pointer"
                      />
                      <FaGooglePlusG
                        size={20}
                        className="text-gray-600 hover:text-green-500 cursor-pointer"
                      />
                      <FaLinkedin
                        size={20}
                        className="text-gray-600 hover:text-green-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="col-span-3 flex flex-col justify-between overflow-hidden">
                    <div className="overflow-hidden">
                      <h3 className="text-lg font-semibold mt-2">
                        {teacher.name}
                      </h3>
                      <p className="text-green-600 font-bold">
                        {teacher.title}
                      </p>
                      <p className="text-gray-600 mt-1 text-sm line-clamp-3">
                        {teacher.paragraph}
                      </p>
                    </div>

                    <div className="mt-2 space-y-2 overflow-auto pr-1 max-h-[100px]">
                      {teacher?.skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-sm font-medium w-28">
                            {skill.name}
                          </span>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-green-500 h-3 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center pb-10">
        <div className="embla__controls">
          <div className="embla__dots ">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot bg-green-500".concat(
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

export default CarouselOfTeacher;
