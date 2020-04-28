/* this module has a simple purpose which is generate a bundle to a tar-stream
*/

const tar = require('tar-stream')

/* this function generates a tar stream from a bundle file
   tar file is needed for building the image
*/
function generateFromBundle(bundle){
    let pack = tar.pack()
    
    let data = bundle.toJSON();

    data.files.forEach(file => {
        pack.entry({name:file.name},file.content)
    });
    
    pack.finalize()

    return pack
}

/* this function does the same thing with json notation
*/
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





