const tar = require('tar-stream')


function generateFromBundle(bundle){
    let pack = tar.pack()
    
    let data = bundle.toJSON();

    data.files.forEach(file => {
        pack.entry({name:file.name},file.content)
    });
    
    pack.finalize()

    return pack
}

function generateFromJson(json){
    let pack = tar.pack()

    json.files.forEach(file => {
        pack.entry({name:file.name},file.content)
    });
    
    pack.finalize()

    return pack
}


module.exports.generateFromBundle   = generateFromBundle
module.exports.generateFromJson     = generateFromJson





