const submissionModel       = require('../models/submission')
const userController        = require('../controllers/user')
const questionController    = require('../controllers/question')
const questionModel         = require('../models/question')
const notificationController= require('../controllers/notification')
const Bundle                = require('../evaluator/bundle')

module.exports.createSubmission = (req,res,next)=>{
    const   studentID   = req.user_id
    let     question    = req.question
    let {files,language,comment} = req.body

    const bundle  = new Bundle(language,question.inputs,question.outputs)
    bundle.addAll(files)

    questionController.executeBundle(studentID,bundle,(executionError, evaluation)=>{
        if(executionError){
            submissionModel.saveSubmission(studentID,question,0,{},files,language,comment,(err,submissionID)=>{
                if(err){return res.status(500).json({message:'Cannot save submission'})}
                return res.status(417).json({
                    message:'Code execution failed',
                    results:executionError,
                    score:0
                })
            })
        }
        else{
            submissionModel.saveSubmission(
                studentID,
                question._id,
                evaluation.score,
                evaluation.results,
                files,
                language,
                comment,(err,submissionID)=>{
                    if(err){return res.status(500).json({message:'Cannot save submission'})}
                    return res.status(200).json({
                        message:'Code executed succesfully',
                        score  :evaluation.score,
                        results:evaluation.results
                    })
            })
        }
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
        notificationController.sendGradeUpdated(submissionID)
        return res.status(200).json({message:'Grade updated'})
    })
}

module.exports.updateEvaluation = (req,res,next)=>{
    const submissionID      = req.params.id
    const new_evaluation    = req.body.evaluation
    
    let correctCount      = 0
    for(result of new_evaluation){
        if(result.status == 'correct'){correctCount++;}
    }

    const new_score = (correctCount/new_evaluation.length)*100

    submissionModel.updateEvaluation(submissionID,new_evaluation,(err)=>{
        if(err){return res.status(500).json({message:err})}

        submissionModel.updateScore(submissionID,new_score,(err)=>{
            if(err){return res.status(500).json({message:err})}
            notificationController.sendGradeUpdated(submissionID)
            return res.status(200).json({message:'Evaluation updated'})
        })
    })
}


module.exports.checkQuestion    = (req,res,next)=>{
    const questionID= req.params.questionID
    const userID    = req.user_id
    const role      = req.user_role
    userController.doesHaveQuestion(req,questionID,userID,role)
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

            userController.doesHaveQuestion(req,questionID,userID,role)
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
    console.log(req.body)
    const questionID = req.params.questionID;
    const userID     = req.user_id
    const limit      = req.question.submission_limit

    questionModel.getSubmissionCount(questionID,userID,(err,count)=>{
        if(err){return res.status(500).json({message:err})}
        if(limit>count){return next()}
        return res.status(403).json({message:'You exceeded submission limit'})
    })
}