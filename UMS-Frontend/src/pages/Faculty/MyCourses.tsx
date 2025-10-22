import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import MYForm from "../../components/Form/MYForm";
import MYSelect from "../../components/Form/MYSelect";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourseManagement.api";

const MyCourses = () => {
  const { data: facultyCoursesData, isLoading: sLoading } =
    useGetAllFacultyCoursesQuery(undefined);
  const navigate = useNavigate();

  const semesterOptions = Array.isArray(facultyCoursesData?.data)
    ? facultyCoursesData.data.map((item) => ({
        label: `${item.academicSemester.name} ${item.academicSemester.year}`,
        value: item.semesterRegistration._id,
      }))
    : [];

  const courseOptions = Array.isArray(facultyCoursesData?.data)
    ? facultyCoursesData.data.map((item) => ({
        label: item.course.title,
        value: item.course._id,
      }))
    : [];

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  return (
    <div className=" flex items-center justify-center p-4 bg-gray-50">
      <Row justify="center" className="w-full">
        <Col xs={24} sm={20} md={14} lg={10} xl={8}>
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <MYForm onSubmit={onSubmit}>
              <div className="mb-4">
                <MYSelect
                  disabled={sLoading}
                  nameOptions={semesterOptions}
                  name="semesterRegistration"
                  label="Semester"
                  title="Semester"
                />
              </div>
              <div className="mb-4">
                <MYSelect
                  disabled={sLoading}
                  nameOptions={courseOptions}
                  name="course"
                  label="Course"
                  title="Course"
                />
              </div>
              <Button htmlType="submit" type="primary" block>
                Submit
              </Button>
            </MYForm>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MyCourses;
