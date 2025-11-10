import Container from "../../../utils/Container";
import NewsEvent from "./NewsEvent";
import Notice from "./Notice";

const NewsEventAndNotice = () => {
  return (
    <Container>
      <div className="text-black md:py-10 py-4">
        <div>
          <p className="text-5xl text-center">
            <span className="text-green-500">News</span> and Events
          </p>
          <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
          <p className="text-lg text-gray-500 text-center">
            Stay up to date with the latest announcements, achievements, and
            upcoming programs from our university community.
          </p>
          <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-4 md:py-10">
          {/* news and event image with section  */}
          <div className="md:col-span-3 text-start">
            <NewsEvent />
          </div>
          <Notice />
        </div>
      </div>
    </Container>
  );
};

export default NewsEventAndNotice;
