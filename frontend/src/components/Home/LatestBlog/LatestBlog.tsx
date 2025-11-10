import { BsFillSave2Fill } from "react-icons/bs";
import Container from "../../../utils/Container";
import { BlogData } from "./blogData";

const LatestBlog = () => {
  return (
    <Container>
      <div className="text-gray-700 py-10 ">
        {/* title  */}
        <div className="text-center pt-10">
          <p className="text-5xl">
            Latest <span className="text-green-500">blog</span> post
          </p>
          <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
          <p className="text-md">
            Stay informed with our latest articles, insights, and campus
            updates.
          </p>
          <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
        </div>
        {/* content  */}
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-40 pb-40 justify-center mx-auto items-center p-7  ">
          {BlogData.map((item, index) => (
            <div key={index} className="relative w-80 ">
              <div>
                <img src={item?.image} alt="image" />
              </div>
              <div className="flex justify-center items-center">
                <div className="absolute md:top-48 top-36 bg-white w-72 py-4 px-4 shadow">
                  <h2 className="text-lg text-start text-gray-600 font-semibold mb-2">
                    {item?.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="bg-green-500 text-white px-2 py-1  text-xs">
                      {item?.date}
                    </span>
                    <span className="ml-3 bg-gray-200 px-2 py-1 text-xs">
                      🗨 {item?.comments} Comments
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 text-start text-sm">
                    {item?.message}
                  </p>
                  <a href="#" className="text-green-500  flex text-start ">
                    Continue Reading →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-4">
          <button className="relative mt-6 flex items-center gap-1 px-4 py-3 text-white text-lg overflow-hidden bg-green-500 transition-all duration-700 before:absolute before:inset-0 before:bg-green-700 before:-translate-y-full before:transition-transform before:duration-700 hover:before:translate-y-0 before:z-0 cursor-pointer">
            <span className="relative z-10 flex items-center gap-3">
              <BsFillSave2Fill /> <p>VIEW MORE!</p>
            </span>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default LatestBlog;
