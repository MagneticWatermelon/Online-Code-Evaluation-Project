const evaluator = require('./evaluator')

let template = require('./template')
const bundle = require('./bundle')
        
let data = new bundle(template.lang, template.inputs, template.outputs)
data.addAll(template.files)

evaluator.evaluate('nyilmaz', data);