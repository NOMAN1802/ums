import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/create-academic-semester', 
auth(USER_ROLE.superAdmin, USER_ROLE.admin),
validateRequest(AcademicSemesterValidations.
createAcdemicSemesterValidationSchema),
AcademicSemesterControllers.createAcademicSemester);

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

router.get('/:semesterId',
AcademicSemesterControllers.getSingleAcademicSemester,);
  
router.patch('/:semesterId',
validateRequest(
AcademicSemesterValidations.updateAcademicSemesterValidationSchema,),
AcademicSemesterControllers.updateAcademicSemester,);
  



export const AcademicSemesterRoutes = router;