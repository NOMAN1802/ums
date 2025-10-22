import { useParams } from "react-router-dom";

import { Button, Modal, Table } from "antd";
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/facultyCourseManagement.api";
import MYForm from "../../components/Form/MYForm";
import MYInput from "../../components/Form/MYInput";
import { useState } from "react";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TStudnetInfo = {
  student: string;
  key: string;
  name: string;
  offeredCourse: string;
  roll: string;
  semesterRegistration: string;
};

type AddMarksModalProps = {
  studentInfo: TStudnetInfo;
};
const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData, isFetching } = useGetAllFacultyCoursesQuery(
    [
      { name: "semesterRegistration", value: registerSemesterId },
      { name: "course", value: courseId },
    ]
  );

  console.log(facultyCoursesData);

  const tableData = Array.isArray(facultyCoursesData?.data)
    ? facultyCoursesData?.data?.map(
        ({ _id, student, semesterRegistration, offeredCourse }) => ({
          key: _id,
          name: student.fullName,
          roll: student.id,
          semesterRegistration: semesterRegistration._id,
          student: student._id,
          offeredCourse: offeredCourse._id,
        })
      )
    : [];

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      key: "x",
      render: (item: TStudnetInfo) => {
        console.log(item);
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};




const AddMarksModal = ({ studentInfo }: AddMarksModalProps) => {
  console.log(studentInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating the marks...");
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };
    try {
      const res  = await addMark(studentMark);
      if (res?.error) {
        setIsModalOpen(false);
      } else {
        console.log(res);
        toast.success(res?.data?.message, { id: toastId });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", { id: toastId });
      setIsModalOpen(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Mark</Button>
      <Modal
        title="Mark Submit"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <MYForm onSubmit={onSubmit}>
          <MYInput
            type="number"
            name="classTest1"
            label="Class Test 1"
            placeholder="Class test 1"
          />
          <MYInput
            type="number"
            name="classTest2"
            label="Class Test 2"
            placeholder="Class Test 2"
          />
          <MYInput
            type="number"
            name="midTerm"
            label="Midterm"
            placeholder="Mid Term"
          />
          <MYInput
            type="number"
            name="finalTerm"
            label="Final"
            placeholder="Final"
          />
          <Button htmlType="submit">Submit</Button>
        </MYForm>
      </Modal>
    </>
  );
};

export default MyStudents;
