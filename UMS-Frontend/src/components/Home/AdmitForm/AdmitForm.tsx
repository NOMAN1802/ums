import { Col, Flex } from "antd";
import MYForm from "../../Form/MYForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import MYInput from "../../Form/MYInput";
import MYTextArea from "../../Form/MYTextarea";
import Container from "../../../utils/Container";
import { IoMdMail } from "react-icons/io";

const AdmitForm = () => {
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="py-10">
      <div className="text-center text-gray-700 font-light pt-20">
        <p className="text-5xl">
          Quickly <span className="text-green-500">admit</span> here
        </p>
        <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
        <p className="text-md px-4">
          Start your academic journey with us by completing the quick and easy
          admission process online today.
        </p>
        <div className="border w-[180px] font-thin my-5 text-green-500 mx-auto"></div>
      </div>

      {/* form  */}
      <Container>
        <div className="py-10 bg-white shadow-2xl rounded-2xl  ">
          <Flex justify="center" align="center">
            <Col span={20}>
              <MYForm onSubmit={onsubmit}>
                <div className="grid grid-cols-2 gap-5 items-center">
                  <MYInput
                    // className="shadow-2xl border-none focus:outline-0 py-4 text-red-300"
                    name="name"
                    type="text"
                    placeholder="Your name"
                  />
                  <MYInput
                    name="email"
                    type="email"
                    placeholder="Email Address"
                  />
                </div>
                <MYInput
                  name="phoneNumber"
                  type="number"
                  placeholder="Your phone"
                />
                <MYTextArea name="message" placeHolder="Enter Message" />
                <button
                  type="submit"
                  className="relative mt-6 flex mx-auto w-full text-center items-center gap-1 px-6 py-3 text-white text-lg overflow-hidden bg-green-500 transition-all duration-700 before:absolute before:inset-0 before:bg-green-700 before:-translate-y-full before:transition-transform before:duration-700 hover:before:translate-y-0 before:z-0 cursor-pointer"
                >
                  <div className="relative z-10 flex items-center justify-center text-center gap-3">
                    <div className="flex justify-center items-center mx-auto gap-2 ">
                      <IoMdMail size={20} />
                      <div className="uppercase text-center">submit</div>
                    </div>
                  </div>
                </button>
              </MYForm>
            </Col>
          </Flex>
        </div>
      </Container>
    </div>
  );
};

export default AdmitForm;
