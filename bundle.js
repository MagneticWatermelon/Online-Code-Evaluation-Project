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