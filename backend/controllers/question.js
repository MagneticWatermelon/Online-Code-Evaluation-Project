const questionModel     = require('../models/question')
const userController    = require('../controllers/user')
const Bundle            = require('../evaluator/bundle')
const evaluator         = require('../evaluator/evaluator')

module.exports.createQuestion = (req,res,next)=>{

    const userid        = req.user_id
    const role          = req.user_role
    const assigmentID   = req.body.assignment_id

    userController.doesHaveAssignment(assigmentID, userid, role)
    .then(success=>{
        const title         = req.body.title
        const explanation   = req.body.explanation
        const inputs        = req.body.inputs
        const outputs       = req.body.outputs

        questionModel.createQuestion(assigmentID,title, explanation, inputs, outputs, (err)=>{
            if(err){return res.status(500).json({message: err})}
            return res.status(201).json({message:'Question added to assignment'})
        })
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })

}

module.exports.getQuestion = (req,res,next)=>{
    const userid     = req.user_id
    const role       = req.user_role
    const questionID = req.params.id

    userController.doesHaveQuestion(questionID,userid,role)
    .then(success=>{
        questionModel.getQuestion(questionID,(err, question)=>{
            if(err){return res.status(500).json({message:err})}

            return res.status(200).json(question)
        })
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}

module.exports.updateQuestion = (req,res,next)=>{
    const userid     = req.user_id
    const role       = req.user_role
    const questionID = req.params.id

    userController.doesHaveQuestion(questionID,userid,role)
    .then(success=>{

        const title         = req.body.title;
        const explanation   = req.body.explanation;

        questionModel.updateQuestion(questionID,title, explanation, (err)=>{
            if(err){return res.status(500).json({message:err})}

            return res.status(200).json({message:'Question updated succesfully'})
        })
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}

module.exports.deleteQuestion = (req,res,next)=>{
    const userid     = req.user_id
    const role       = req.user_role
    const questionID = req.params.id

    userController.doesHaveQuestion(questionID,userid,role)
    .then(success=>{

        questionModel.deleteQuestion(questionID,(err)=>{
            if(err){return res.status(500).json({message:err})}
            return res.status(200).json({message:'Question deleted succesfully'})
        })
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}

module.exports.updateIO = (req,res,next)=>{
    const userid     = req.user_id
    const role       = req.user_role
    const questionID = req.params.id

    userController.doesHaveQuestion(questionID,userid,role)
    .then(success=>{
        const inputs = req.body.inputs
        const outputs= req.body.outputs
        questionModel.setIOOfQuestion(questionID,inputs, outputs,(err)=>{
            if(err){return res.status(500).json({message:err})}
            return res.status(200).json({message:'Inputs and outputs changed succesfully'})
        })
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}

module.exports.execute = (req,res,next)=>{
    const userid     = req.user_id
    const role       = req.user_role
    const questionID = req.params.id

    userController.doesHaveQuestion(questionID,userid,role)
    .then(success=>{
        questionModel.getQuestion(questionID,(err, question)=>{
            if(err){return res.status(404).json({message:err})}

            const lang      = req.body.language
            const files     = req.body.files
            const inputs    = question.inputs
            const outputs   = question.outputs

            const bundle = new Bundle(lang,inputs,outputs)
            bundle.addAll(files)

            evaluator.evaluate(userid, bundle, (err, score, evaluation)=>{
                if(err){return res.status(500).json({message:err})}
                return res.status(200).json({evaluation:{
                    score   :score,
                    results :evaluation
                }})
            });

        })
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}