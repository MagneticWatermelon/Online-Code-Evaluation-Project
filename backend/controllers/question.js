const questionModel     = require('../models/question')
const userController    = require('../controllers/user')
const Bundle            = require('../evaluator/bundle')
const evaluator         = require('../evaluator/evaluator')

module.exports.createQuestion = (req,res,next)=>{
    let {title, explanation, submission_limit,points,languages, inputs, outputs} = req.body
    const assignmentID = req.params.assignmentID

    console.log(req.body)
    questionModel.createQuestion(assignmentID,title, explanation,submission_limit,points,languages, inputs, outputs, (err, id)=>{
        if(err){return res.status(500).json({message: err})}
        return res.status(201).json({message:'Question added to assignment',question_id:id})
    })
}

module.exports.getQuestion = (req,res,next)=>{
    const questionID = req.params.id
    questionModel.getQuestion(questionID,(err, question)=>{
        if(err){return res.status(404).json({message:err})}
        return res.status(200).json(question)
    })
}

module.exports.updateQuestion = (req,res,next)=>{
    const questionID = req.params.id
    let {title,explanation,submission_limit,points,languages} = req.body
    questionModel.updateQuestion(questionID,title, explanation,submission_limit,points,languages, (err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Question updated succesfully'})
    })
}

module.exports.deleteQuestion = (req,res,next)=>{
    const questionID = req.params.id
    questionModel.deleteQuestion(questionID,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Question deleted succesfully'})
    })
}

module.exports.updateIO = (req,res,next)=>{
    const questionID = req.params.id
    let {inputs,outputs} = req.body
    questionModel.setIOOfQuestion(questionID,inputs, outputs,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Inputs and outputs changed succesfully'})
    })
}

module.exports.execute = (req,res,next)=>{
    const questionID = req.params.id
    const userID     = req.user_id

    let {language, files} = req.body

    questionModel.getQuestion(questionID,(err, question)=>{
        if(err){return res.status(404).json({message:err})}

        const bundle = new Bundle(language,question.inputs,question.outputs)
        bundle.addAll(files)

        this.executeBundle(userID,bundle,(err, evaluation)=>{
            if(err){return res.status(500).json({message:err})}
            return res.status(200).json(evaluation)
        })
    })
}

module.exports.executeBundle = (userID, bundle, callback)=>{
    evaluator.evaluate(userID, bundle, (err, score, evaluation)=>{
        if(err){return callback(err,null)}
        return callback(null,{
            score   :Number.parseInt((score*100).toPrecision(3)),
            results :evaluation
        })
    });
}

module.exports.getSubmissions = (req,res,next)=>{
    const questionID = req.params.id
    const studentID  = req.params.studentID

    questionModel.getSubmissions(questionID,studentID,(err, submissions)=>{
        if(err){return res.status(404).json({message:err})}
        return res.status(200).json(submissions)
    })
}

module.exports.checkAssignment = (req,res,next)=>{
    const userID        = req.user_id
    const assigmentID   = req.params.assignmentID
    const role          = req.user_role

    userController.doesHaveAssignment(req,assigmentID,userID,role)
    .then(success=>{
        next()
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}

module.exports.validateUser = (req,re,next)=>{
    const questionID    = req.params.id
    const userID        = req.user_id
    const role          = req.user_role
    
    userController.doesHaveQuestion(req,questionID, userID, role)
    .then(success=>{next()})
    .catch(err=>{
        return res.status(401).json({message:'Permission Denied'})
    })
}