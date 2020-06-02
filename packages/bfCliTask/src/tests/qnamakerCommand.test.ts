import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

describe('QnA Crate KB command tests', function () {

    it('it should fail if the kbDTOFileLocation does not exist', function(done: MochaDone) {
        this.timeout(1000);

        let tp = path.join(__dirname, 'qnamakerCreateTest/qnamakerCreateFileDoesNotExist.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

        tr.run();
        console.log(tr.stdout)
        assert.equal(tr.succeeded, false, 'should have failed');        
        assert.equal(tr.stdout.indexOf('does not exist') >=0, true, "Should throw: File does not exist error");
        done();
    });

    it('it should fail due to invalid subscription key', function(done: MochaDone) {
        this.timeout(7000);

        let tp = path.join(__dirname, 'qnamakerCreateTest/qnamakerCreateInvalidKey.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

        tr.run();
        console.log(tr.stdout)
        assert.equal(tr.succeeded, false, 'should have failed');        
        //assert.equal(tr.stdout.indexOf('Access denied due to invalid subscription key') >=0, true, "Should throw: Error 401");
        done();
    });
 
});