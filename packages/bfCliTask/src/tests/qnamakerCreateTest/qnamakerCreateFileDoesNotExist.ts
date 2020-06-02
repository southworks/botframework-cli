import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '../..', 'qnaMakerCommand.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

var qnafileLocation = path.join(__dirname, '..', '/QnAModels/qnaBKModel.jso');

tmr.setInput('qnaMakerSubCommand', 'CreateKB');
tmr.setInput('kbDTOFileLocation', qnafileLocation);
tmr.setInput('qnaKey', '');
tmr.setInput('kbName', 'undefined');
tmr.setInput('publishNewKB', 'false');

tmr.run();