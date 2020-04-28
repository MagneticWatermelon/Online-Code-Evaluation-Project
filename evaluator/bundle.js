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
        this.#lang    = lang;
        this.#inputs  = inputs;
        this.#outputs = outputs;
        this.#files   = [];

        this.#files.push(require('./dockerfiles')[lang])
    }
    
    #lang;
    #inputs;
    #outputs;
    #files;

    addFile(name,content){
        this.#files.push(
            {
                'name'      :name,
                'content'   :content,
            }
        )
    }

    addAll(files){
        this.#files.push(...files)
    }

    setInputs(inputs){
        this.#inputs=inputs;
    }

    getInputs(){
        return this.#inputs
    }

    setOutputs(outputs){
        this.#outputs = outputs;
    }

    getOutputs(){
        return this.#outputs
    }

    fileList(){
        console.log(this.#files)
    }

    deletefile(name){
        console.log('delete function is not implemented')
    }

    toJSON(){
        return {
            lang    : this.#lang,
            files   : this.#files,
            inputs  : this.#inputs,
            outputs : this.#outputs
        }
    }
}