const { response, request } = require('express');
const { http } = require('../helpers/httpAdapter');

const getList = async ( req = request, res = response ) => {

    const files = await getFilesNames();

    return res.status(200).json({ files });
}

const getData = async ( req = request, res = response ) => {

    const { fileName = '' } = req.query;

    const arrFilename = await getFilesNames( fileName.toLowerCase() );

    const result = [];

    for (let index = 0; index < arrFilename.length; index++) {
        const filename = arrFilename[index];

        const fileData = await getDataFile( filename );

        if ( fileData )
            result.push( fileData )
    }

    return res.status(200).json( result );
}

const getFilesNames = async ( fileName = '' ) => {
    const data = await http.get('https://echo-serv.tbxnet.com/v1/secret/files', {
        headers: {
            'Authorization': 'Bearer aSuperSecretKey'
        }
    });

    if ( fileName )
        return data.files.filter( file => file === fileName );

    return data.files;
}

const getDataFile = async ( filename ) => {

    try {
        const data = await http.get(`https://echo-serv.tbxnet.com/v1/secret/file/${ filename }`, {
            headers: {
                'Authorization': 'Bearer aSuperSecretKey'
            }
        });

        const result = {
            file: filename,
            lines: [],
        };

        const arrLines = data.split('\n');

        for (let index = 0; index < arrLines.length; index++) {

            if ( index === 0 ) continue;

            const line = arrLines[index];
            const [ , text, number, hex ] = line.split(',');

            if ( !text || !number || !hex ) continue;

            result.lines.push({
                text,
                number: Number(number),
                hex
            });
        }

        if ( result.lines.length === 0 ) return false;
        
        return result;


    } catch (error) {
        if( error.code === 'ERR_BAD_REQUEST' )
            console.log( `Not found filename ${ filename }` );

        return false;
    }
}


module.exports = {
    getData,
    getList,
    getFilesNames,
    getDataFile,
}