import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OfferedCourseControllers } from './OfferedCourse.controller'
import { OfferedCourseValidations } from './OfferedCourse.validation'
import auth from '../../middlewares/auth'

const router = express.Router()

router.get('/', OfferedCourseControllers.getAllOfferedCourses)



router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
)

router.get(
  '/my-offered-courses',
  auth('student'),
  OfferedCourseControllers.getMyOfferedCourses
)
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses)

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
)

router.delete('/:id', OfferedCourseControllers.deleteOfferedCourseFromDB)

export const offeredCourseRoutes = router
