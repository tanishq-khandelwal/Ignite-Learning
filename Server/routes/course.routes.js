import { Router } from "express";
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, removeLectureFromCourse, updateCourse } from "../controllers/course.controller.js";
import { isLoggedIn,authorizedRoles } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router=Router();

router
  .route('/')
  .get(getAllCourses)
  .delete(isLoggedIn,removeLectureFromCourse)
  .post(
    isLoggedIn,
    upload.single('thumbnail'),
    createCourse
  );

  router.route('/:id')
    .get(isLoggedIn,getLecturesByCourseId)
    .put(isLoggedIn,updateCourse)
    .delete(isLoggedIn,removeCourse)
    
    .post(isLoggedIn,upload.single('lecture'),addLectureToCourseById);

export default router;
