import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { EnrolledCourseControllers } from './enrolledCourse.controller'
import { EnrolledCourseValidations } from './enrolledCourse.validaton'

const router = express.Router()

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema
  ),
  EnrolledCourseControllers.createEnrolledCourse
)

router.get(
  '/',
  auth('faculty'),
  EnrolledCourseControllers.getAllEnrolledCourses
)

router.get(
  '/enrolled-course/:id',
  auth('student'),
  EnrolledCourseControllers.getSingleEnrolledCourses
)

router.get(
  '/my-enrolled-courses',
  auth('student'),
  EnrolledCourseControllers.getMyEnrolledCourses
)



router.patch(
  '/update-enrolled-course-marks',
  auth('admin', 'faculty'),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks
)

export const EnrolledCourseRoutes = router
