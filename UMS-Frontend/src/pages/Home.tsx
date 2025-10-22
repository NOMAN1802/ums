import { useEffect, useState } from "react";
import AboutHome from "../components/Home/AboutUniversity/AboutHome";
import Hero from "../components/Home/Hero/Hero";
// import Navbar from "../components/Home/Navbar/Navbar";
import bannerOne from "../assets/images/banner/University-of-Dhaka.jpg";
import bannerTwo from "../assets/images/banner/aiub_image.jpg";
import bannerThree from "../assets/images/banner/east_west_university.jpg";
import Container from "../utils/Container";
import BackToTopButton from "../utils/BackToTopButton";
import OurSchool from "../components/Home/OurUniversity/OurUnivesity";
import FactsSchool from "../components/Home/FactsSchool/FactsUniversity";
import OurTeacher from "../components/Home/OurTeacher/OurTeacher";
import PopularCourse from "../components/Home/PopularCourse/PopularDepartment";
import Advantages from "../components/Home/Advantages/Advantages";
import LandingBottomBanner from "../components/Home/LandingBottomBanner/LandingBottomBanner";
import LatestBlog from "../components/Home/LatestBlog/LatestBlog";
import ViewsGuardian from "../components/Home/ViewsGuardian/ViewsGuardian";
import AdmitForm from "../components/Home/AdmitForm/AdmitForm";
import Footer from "../components/Home/Footer/Footer";
import NewsEventAndNotice from "../components/Home/NewsEventAndNotice/NewsEventAndNotice";
// import Navbar from "../components/Navbar/Navbar";

const images = [bannerOne, bannerTwo, bannerThree];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-[85vh] sm:h-[70vh] bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${images[currentImage]})`,
        }}
      />
      {/* Content */}
      hang
      <div className="relative z-10">
        {/* <Navbar /> */}
        <Container>
          <Hero />
        </Container>
        <OurSchool />
        <NewsEventAndNotice />
        <LandingBottomBanner />
        <AboutHome />
        <FactsSchool />
        <OurTeacher />
        <PopularCourse />
        <Advantages />
        <LatestBlog />
        <ViewsGuardian />
        <AdmitForm />
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
};

export default Home;
