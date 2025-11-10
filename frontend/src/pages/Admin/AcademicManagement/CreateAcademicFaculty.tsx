/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAddAcademicFacultyNameMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global";
import { academicFacultyNameSchema } from "../../../schemas/academicSemester.schema";
import MYForm from "../../../components/Form/MYForm";
import MYInput from "../../../components/Form/MYInput";
import { TAcademicFaculty } from "../../../types";

const CreateAcademicFaculty = () => {
  const [addAcademicFacultyName, { isLoading }] = useAddAcademicFacultyNameMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating faculty...");
    
    try {
      const res = (await addAcademicFacultyName(data)) as TResponse<TAcademicFaculty>;
      
      if (res.error) {
        throw new Error(res.error.data?.message || "Failed to create faculty");
      }

      toast.success(res.data?.message || "Faculty created successfully", { 
        id: toastId 
      });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", { 
        id: toastId 
      });
    }
  };

  return (
    <Flex justify="center" align="center" className="px-4 py-8">
      <Col xs={24} sm={20} md={12} lg={10} xl={8}>
        <MYForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultyNameSchema)}
        >
          <div className="space-y-4">
            <MYInput
              label="Faculty Name"
              name="name"
              type="text"
              placeholder="Enter faculty name"
            />
            <Button 
              htmlType="submit" 
              type="primary" 
              block
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </MYForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;