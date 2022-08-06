const express = require('express');
const router = express.Router();
const mcqController = require('../controller/mcqController.js');
const userController = require('../controller/userController.js');


//code for middlewares
router.use('/dashboard',userController.isAuth)
router.use('/customise',userController.isAuth)
router.get('/show_add_question',userController.isAuth)

router.post('/add_question',userController.isAuth)
router.get('/stu_questions',userController.isAuth)

router.post('/submit_mcq',userController.isAuth)
router.get('/profile',userController.isAuth)

// code for login section
router.get('/',userController.home)
router.get('/register_page',userController.register)

router.get('/get_otp',userController.getotp)
router.post('/get_otp',userController.get_otp)

router.post('/register',userController.registerUser)

router.get('/logout',userController.logout)

router.get('/login',userController.login)

router.post('/login',userController.loginuser)


//code for mcq sections
router.get('/dashboard',mcqController.dashboard)
router.get('/customise',mcqController.customise)

router.get('/show_add_question',mcqController.admin_add_question_show)

router.post('/add_question',mcqController.admin_add_question)
router.post('/stu_questions',mcqController.stu_show_question)

router.post('/submit_mcq',mcqController.submit_stu_mcq)

router.get('/profile',mcqController.profile)

module.exports = router;