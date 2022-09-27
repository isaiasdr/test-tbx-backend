const { expect } = require("chai");
const { it } = require("mocha");
const { getFilesNames, getDataFile } = require("../controllers/files");



describe('Tests in funtion getFilesNames', () => {

    it('should return list filenames', async () => {

        const expectedFiles = [
            'test1.csv',
            'test2.csv',
            'test3.csv',
            'test4.csv',
            'test5.csv',
            'test6.csv',
            'test9.csv'
        ];

        const files = await getFilesNames();

        expect(files).to.eql( expectedFiles );
    });

    it('should return filter array for filename test3.csv', async () => {

        const filename = 'test3.csv';
        
        const files = await getFilesNames( filename.toLowerCase() );
        expect(files).to.eql( ['test3.csv'] );
    });
});

describe('Tests in function getDataFile', () => {

    it('should return false when not found file', async () => {

        const result = await getDataFile( 'test20.csv' );

        expect(false).to.equal( result )
    });

    it('should return result object when found filename test2.csv', async () => {

        const filename = 'test2.csv';

        const result = await getDataFile( filename.toLowerCase() );

        expect( result.file ).to.be.equal( filename );
        expect( result.lines.length ).to.be.equal( 1 );
        expect( result.lines[0].text ).to.be.an('string');
        expect( result.lines[0].number ).to.be.an('number');
        expect( result.lines[0].hex ).to.be.an('string');
    });
});