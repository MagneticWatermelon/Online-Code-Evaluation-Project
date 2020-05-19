/* Bundle is an object that keeps all the needed information
   for a code execution
        bundle has following properties
            * files     : these are files coming from the user
            * inputs    : these are inputs for test cases
            * outputs   : these are correct outputs
            * lang      : this is the language for the execution
    - Whenever a bundle is created, dockerfile corresponding that
      language is automatically atached tho the bundle
*/

module.exports = class Bundle{

    constructor(lang, inputs, outputs){
        this.lang    = lang;
        this.inputs  = inputs;
        this.outputs = outputs;
        this.files   = [];
        
        this.setDockerFile(lang)
    }

    setDockerFile(lang){
        let {name,content} = require('./dockerfiles').getDockerFile(lang)
        this.addFile(name,content)
    }
    addFile(name,content){
        if(name==null || content == null){return}
        this.files.push({'name':name,'content':content,})
    }

    addAll(files){
        if(files==null){return}
        files.forEach((f)=>{
            let {name, content} = f
            this.addFile(name,content)
        })
    }

    setInputs(inputs){
        this.inputs=inputs;
    }

    getInputs(){
        return this.inputs
    }

    setOutputs(outputs){
        this.outputs = outputs;
    }

    getOutputs(){
        return this.outputs;
    }

    getFiles(){
        return this.files;
    }

    deletefile(name){
        this.files = this.files.filter(file => {file.name!=name})
    }
}