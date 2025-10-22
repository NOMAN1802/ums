import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {backToTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[50px] h-[50px] right-[50px]  text-green-500 p-3 rounded-full"
        >
          {/* <div className="flex justify-center items-center h-screen bg-green-500"> */}
          <button className="fixed bottom-4 right-4 p-3  rounded-md shadow-md  transition duration-300">
            <FaChevronUp className="text-green-500 animate-bounce" size={20} />
          </button>
          {/* </div> */}
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
