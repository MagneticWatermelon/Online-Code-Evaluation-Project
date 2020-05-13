const submissionModel       = require('../models/submission')
const userController        = require('../controllers/user')
const questionController    = require('../controllers/question')
const questionModel         = require('../models/question')
const notificationController= require('../controllers/notification')
const Bundle                = require('../evaluator/bundle')

module.exports.createSubmission = (req,res,next)=>{
    const studentID = req.user_id
    const questionID= req.params.questionID
    let {files,language,comment} = req.body

    questionModel.getQuestion(questionID,(err, question)=>{
        if(err){return res.status(404).json({message:err})}

        const bundle = new Bundle(language,question.inputs,question.outputs)
        bundle.addAll(files)

        questionController.executeBundle(studentID,bundle,(executionError, evaluation)=>{
            if(executionError){
                console.log(executionError)
                submissionModel.saveSubmission(studentID,questionID,0,null,files,language,comment,(err)=>{
                    if(err){return res.status(500).json({message:err})}
                    return res.status(200).json({
                        message:'Code execution failed',
                        error:executionError,
                        score:0
                    })
                })
            }
            else{
                submissionModel.saveSubmission(
                    studentID,
                    questionID,
                    evaluation.score,
                    evaluation.results.map(result=>{`{status:${result.status},output:${result.output}}`}),
                    files,
                    language,
                    comment,(err)=>{
                        if(err){return res.status(500).json({message:err})}
                        return res.status(200).json({
                            message:'Code executed succesfully',
                            score  :evaluation.score,
                            results:evaluation.results
                        })
                    }
                )

            }
        })
    })
}

module.exports.getSubmission = (req,res,next)=>{
    const submissionID = req.params.id
    submissionModel.getSubmission(submissionID,(err, submission)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json(submission)
    })
}

module.exports.deleteSubmission = (req,res,next)=>{
    const submissionID = req.params.id
    submissionModel.deleteSubmission(submissionID,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Submission deleted'})
    })
}

module.exports.getFiles = (req,res,next)=>{
    const submissionID = req.params.id
    submissionModel.getFiles(submissionID,(err, files)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json(files)
    })
}

module.exports.updateScore = (req,res,next)=>{
    const submissionID = req.params.id
    const new_score    = req.body.score
    submissionModel.updateScore(submissionID,new_score,(err)=>{
        if(err){return res.status(500).json({message:err})}
        notificationController.sendGradeUpdated(studentID, submissionID)
        return res.status(200).json({message:'Grade updated'})
    })
}

module.exports.updateEvaluation = (req,res,next)=>{
    const submissionID      = req.params.id
    const new_evaluation    = req.body.evaluation
    const studentID         = req.user_id
    
    const correctCount      = 0
    for(result of new_evaluation){
        if(result.status == 'correct'){correctCount++;}
    }

    const new_score = correctCount/new_evaluation.length

    submissionModel.updateEvaluation(submissionID,new_evaluation,(err)=>{
        if(err){return res.status(500).json({message:err})}

        submissionModel.updateScore(submissionID,new_score,(err)=>{
            if(err){return res.status(500).json({message:err})}
            notificationController.sendGradeUpdated(studentID, submissionID)
            return res.status(200).json({message:'Grade updated'})
        })
    })
}


module.exports.checkQuestion    = (req,res,next)=>{
    const questionID= req.params.questionID
    const userID    = req.user_id
    const role      = req.user_role
    userController.doesHaveQuestion(questionID,userID,role)
    .then(success=>{
        next()
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}

module.exports.validateUser     = (req,res,next)=>{
    const submissionID  = req.params.id
    const userID        = req.user_id
    const role          = req.user_role

    submissionModel.getSubmission(submissionID,(err,submission)=>{
        if(err){return res.status(500).json({message:err})}

        if(userID == submission.student_id){next()}

        else{
            const questionID = submission.question_id

            userController.doesHaveQuestion(questionID,userID,role)
            .then(success=>{
                next()
            })
            .catch(err=>{
                return res.status(403).json({message:'Permission denied'})
            })
        }
    })

}


module.exports.checkSubmissionLimit = (req,res,next)=>{
    const questionID = req.params.questionID;
    const userID     = req.user_id

    questionModel.getQuestion(questionID,(err, question)=>{
        if(err){return res.status(500).json({message:err})}

        questionModel.getSubmissions(questionID,userID,(err,submissions)=>{
            if(err){return res.status(500).json({message:err})}

            const submission_limit = question.submission_limit
            if(submission_limit<submissions.length){return next()}

            return res.status(403).json({message:'You exceeded submission limit'})
        })
    })
}