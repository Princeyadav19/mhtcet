//databases
const mongoose = require('mongoose');
const phy_questions_db = require('../model/physics_question.js');
const chem_questions_db = require('../model/chemistry_question.js');
const maths_questions_db = require('../model/maths_question.js');
const bio_questions_db = require('../model/biology_question.js');

const user_datamodel = require('../model/user_model.js');

//hashing
const bcrypt = require('bcrypt');
//env files
const dotenv = require('dotenv');
dotenv.config();
//email sender
const transporter = require('../config/emailconfig.js');

class mcqController {
    //code for mcq section

    static dashboard = async (req, res) => {
        global.user = await user_datamodel.findOne({ email: req.session.username })
        res.render("dashboard", { user_detail: user })
    }

    static customise = async (req, res) => {
        res.render("customise", { user_detail: user })
    }

    //show question to students
    static stu_show_question = async (req, res) => {
        // console.log(req.body);
        const coustom = req.body;
        // console.log(req.body.Subject);
        if (req.body.Subject === "Physics") {
            const detail = await phy_questions_db.find().limit(req.body.no_of_ques);
            res.render("show_question", { data: detail, coustom: coustom })

        }
        else if (req.body.Subject === "Chemistry") {
            const detail = await chem_questions_db.find().limit(req.body.no_of_ques);
            res.render("show_question", { data: detail, coustom: coustom })

        }
        else if (req.body.Subject === "Maths") {
            const detail = await maths_questions_db.find().limit(req.body.no_of_ques);
            res.render("show_question", { data: detail, coustom: coustom })

        }
        else if (req.body.Subject === "Biology") {
            const detail = await bio_questions_db.find().limit(req.body.no_of_ques);
            res.render("show_question", { data: detail, coustom: coustom })

        }
    }

    static submit_stu_mcq = async (req, res) => {
        const ans_sheet = req.body;
        // console.log(ans_sheet);
        // console.log(ans_sheet.subject_result);
        // console.log(ans_sheet.no_of_ques_result);
        const keys_id = Object.keys(ans_sheet);
        const values_ans = Object.values(ans_sheet)
        var count = 0;
        if (req.body.subject_result === "Physics") {
            for (var i = 3; i <= keys_id.length; i++) {
                const ans_data = await phy_questions_db.findOne({ _id: keys_id[i] });
                if (ans_data != null) {
                    if (ans_data.ans == values_ans[i]) {
                        count++;
                    }
                }
                else {
                    console.log("mismatch database");
                    break;
                }
            }
        }
        else if (req.body.subject_result === "Chemistry") {
            for (var i = 3; i <= keys_id.length; i++) {
                const ans_data = await chem_questions_db.findOne({ _id: keys_id[i] });
                if (ans_data != null) {
                    if (ans_data.ans == values_ans[i]) {
                        count++;
                    }
                }
                else {
                    console.log("mismatch database");
                    break;
                }
            }
        }
        else if (req.body.subject_result === "Maths") {
            for (var i = 3; i <= keys_id.length; i++) {
                const ans_data = await maths_questions_db.findOne({ _id: keys_id[i] });
                if (ans_data != null) {
                    if (ans_data.ans == values_ans[i]) {
                        count++;
                    }
                }
                else {
                    console.log("mismatch database");
                    break;
                }
            }

        }
        else if (req.body.subject_result === "Biology") {
            for (var i = 3; i <= keys_id.length; i++) {
                const ans_data = await bio_questions_db.findOne({ _id: keys_id[i] });
                if (ans_data != null) {
                    if (ans_data.ans == values_ans[i]) {
                        count++;
                    }
                }
                else {
                    break;
                }
            }
        }
        console.log(count);
        const result_detail ={
            subject_result: req.body.subject_result,
            no_of_ques_result:ans_sheet.no_of_ques_result,
            marks:count
        }
        res.render('result',{data:result_detail})
    }

    static profile = async (req, res) => {
        res.render("user_profile", { user_detail: user })
    }

    //code for admin section
    static admin_add_question_show = (req, res) => {
        res.render("admin_question", { add_quesn_msg: null })
    }

    static admin_add_question = async (req, res) => {
        try {
            // console.log(req.body.Subject);

            //for physics
            if (req.body.Subject == "physics") {
                const new_ques = new phy_questions_db({
                    question: req.body.question,
                    op1: req.body.op1,
                    op2: req.body.op2,
                    op3: req.body.op3,
                    op4: req.body.op4,
                    ans: req.body.ans,
                })
                const done = await new_ques.save();
                res.render("admin_question", { add_quesn_msg: `question added for ${req.body.Subject} successfully` })
            }
            //chemistry question
            else if (req.body.Subject == "chemistry") {
                const new_ques = new chem_questions_db({
                    question: req.body.question,
                    op1: req.body.op1,
                    op2: req.body.op2,
                    op3: req.body.op3,
                    op4: req.body.op4,
                    ans: req.body.ans,
                })
                const done = await new_ques.save();
                res.render("admin_question", { add_quesn_msg: `question added for ${req.body.Subject} successfully` })
            }

            //maths question
            else if (req.body.Subject == "maths") {
                const new_ques = new maths_questions_db({
                    question: req.body.question,
                    op1: req.body.op1,
                    op2: req.body.op2,
                    op3: req.body.op3,
                    op4: req.body.op4,
                    ans: req.body.ans,
                })

                //biology
                const done = await new_ques.save();
                res.render("admin_question", { add_quesn_msg: `question added for ${req.body.Subject} successfully` })
            }

            //biology question
            else if (req.body.Subject == "biology") {
                const new_ques = new bio_questions_db({
                    question: req.body.question,
                    op1: req.body.op1,
                    op2: req.body.op2,
                    op3: req.body.op3,
                    op4: req.body.op4,
                    ans: req.body.ans,
                })
                const done = await new_ques.save();
                // console.log(done);
                res.render("admin_question", { add_quesn_msg: `question added for ${req.body.Subject} successfully` })
            }


        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = mcqController;

