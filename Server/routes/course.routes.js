import { Router } from "express";
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, removeLectureFromCourse, updateCourse } from "../controllers/course.controller.js";
import { isLoggedIn,authorizedRoles } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router=Router();

router
  .route('/')
  .get(getAllCourses)
  .delete(removeLectureFromCourse)
  .post(
   
    upload.single('thumbnail'),
    createCourse
  );

  router.route('/:id')
    .get(getLecturesByCourseId)
    .put(updateCourse)
    .delete(removeCourse)
    
    .post(upload.single('lecture'),addLectureToCourseById);

export default router;
