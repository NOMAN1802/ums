import Container from "../../../utils/Container";
import { advantagesData } from "./advantagesData";

const Advantages = () => {
  return (
    <Container>
      <div id="why-us" className="text-gray-700 pb-20">
        {/* title  */}
        <div className="text-center md:py-10 py-3">
          <p className="text-5xl">
            <span className="text-green-500">Advantages</span> of the University
          </p>
          <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
          <p className="text-md">
            Discover how our university empowers students with world-class
            education, modern facilities, and an inclusive environment that
            fosters academic excellence and personal growth.
          </p>
          <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
        </div>
        {/* content  */}
        <div className="md:py-6 py-3">
          <div className="grid md:grid-cols-3 grid-cols-2  gap-5">
            {advantagesData.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg px-6 py-6 text-center"
              >
                <div>
                  <img src={item?.logo} alt="logo" className="mx-auto" />
                </div>
                <h1 className="text-green-400 font-medium text-xl uppercase py-2">
                  {item?.title}
                </h1>
                <p className="text-gray-500">{item?.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Advantages;
