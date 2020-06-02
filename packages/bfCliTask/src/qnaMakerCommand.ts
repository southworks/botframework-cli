/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import taskLibrary = require('azure-pipelines-task-lib/task');
import { spawn, exec } from 'child_process';
import { Utils } from './utils';
import { promisify } from 'util';
import fs = require('fs');
import path = require('path');
const executeCommand = promisify(exec);

export async function run(): Promise<void> {
    const utils = new Utils();
    let qnaMakerSubCommand = taskLibrary.getInput('qnaMakerSubCommand', false) as string;
    let qnaKey = taskLibrary.getInput('qnaKey', false) as string;
    let kbName = taskLibrary.getInput('kbName', false) as string || "";
    let kbDTOFileLocation = utils.validatePath('kbDTOFileLocation');
    let publishNewKB = taskLibrary.getBoolInput('publishNewKB', false);
    let kbId = taskLibrary.getInput('kbId', false) as string;
    let feedbackRecordDTOLocation = taskLibrary.getPathInput('feedbackRecordDTOFileLocation',false) as string;
    let kbHostName = taskLibrary.getInput('kbHostName',false) as string;
    let kbEndPointKey = taskLibrary.getInput('kbEndPointKey',false) as string;
    let wordAlterationsDTOFileLocation = taskLibrary.getInput('wordAlterationsDTOFileLocation',false) as string;
    let serviceEndpoint = taskLibrary.getInput('serviceEndpoint',false) as string;
    let qnaQuestion = taskLibrary.getInput('qnaQuestion', false) as string;
    let isAlterationFile = taskLibrary.getBoolInput('isAlterationFile', false);
    let qnaConvertFilePathInput = taskLibrary.getPathInput('qnaConvertFilePathInput', false) as string;
    let qnaConvertFilePathOutput = taskLibrary.getPathInput('qnaConvertFilePathOutput', false) as string;
    let qnaTranslateInput = taskLibrary.getInput('qnaTranslateInput', false) as string;
    let qnaTranslateOutputFolder = taskLibrary.getInput('qnaTranslateOutputFolder', false) as string;
    let qnaTranslateKey = taskLibrary.getInput('qnaTranslateKey', false) as string;
    let qnaSourceLang = taskLibrary.getInput('qnaSourceLang', false) as string;
    let qnaTargetLang = taskLibrary.getInput('qnaTargetLang', false) as string;
    let activeLearning = taskLibrary.getBoolInput('activeLearning', false);
    let keyType = taskLibrary.getInput('keyType', false) as string;

    try {
        switch (qnaMakerSubCommand) {
            case 'CreateKB':
                await createKnowledgeBase(kbDTOFileLocation, qnaKey, kbName, publishNewKB);
                break;
            case 'DeleteKB':
                deleteKnowledgeBase(qnaKey, kbId);
                break;
            case 'PublishKB':
                publishKnowledgeBase(qnaKey, kbId);
                break;
            case 'ReplaceKB':
                replaceKnowledgeBase(qnaKey, kbId, kbDTOFileLocation);
                break;
            case 'UpdateKB':
                updateKnowledgeBase(qnaKey, kbId, kbDTOFileLocation);
                break;
            case 'TrainKB':
                traingKnowledgeBase(qnaKey, kbId, kbEndPointKey, kbHostName, feedbackRecordDTOLocation);
                break;
            case 'AlterationsReplaceKB':
                replaceAlterations(qnaKey, wordAlterationsDTOFileLocation, serviceEndpoint);
                break;
            case 'QueryKB':
                QueryKnowledgeBase(qnaKey, kbId, kbEndPointKey, kbHostName, qnaQuestion);
                break;
            case 'QnAConvert':
                ConvertQnaFiles(kbName, qnaConvertFilePathInput, qnaConvertFilePathOutput, isAlterationFile);
                break;
            case 'QnATranslate':
                TranslateQnAModel(qnaTranslateInput, qnaTranslateOutputFolder, qnaTranslateKey, qnaSourceLang, qnaTargetLang);
                break;
            case 'EndpointSettingsUpdate':
                updateEndpointSettings(qnaKey, serviceEndpoint, activeLearning);
                break;
            case 'EndpointKeysRefresh':
                refreshEndpointKeys(qnaKey, serviceEndpoint, keyType);
                break;
            default:
                console.log('No QnA Maker command was selected');
        }
    } catch (error) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, error.message, true);
    }
}

async function publishKnowledgeBase(qnaKey: string, kbId: string): Promise<void>  {
    console.log('Publishing QnA knowledgebase');

    let command = `bf qnamaker:kb:publish --kbId "${ kbId }" --subscriptionKey "${ qnaKey }"`;        

    const { stdout, stderr } = await executeCommand(command);

    if (stderr) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, stderr, true);            
    } else {
        console.log(`QnA knowledgebase succesfully published \n${stdout}`);
    }
}

async function createKnowledgeBase(kbDTOFileLocation: string, qnaKey: string, kbName: string, publishNewKB :boolean){
    console.log('Creating QnA knowledgebase');

    let command = `bf qnamaker:kb:create --in "${ kbDTOFileLocation }" --subscriptionKey "${ qnaKey }"`;    

    if (kbName) {
        command += ` --name "${ kbName }"`;
    }
    
    const { stdout, stderr } = await executeCommand(command);

    if (stderr) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, stderr, true);            
    } else {
        console.log(`QnA knowledgebase successfully created \n${stdout}`);
    }

    if (publishNewKB) {
        let ObjKbId = JSON.parse(stdout.toString());
        publishKnowledgeBase(qnaKey , ObjKbId.kbId);
    }
}

async function deleteKnowledgeBase(qnaKey: string, kbId: string): Promise<void>{
    console.log('Deleting QnA knowledgebase');

    let command = `bf qnamaker:kb:delete --kbId "${ kbId }" --subscriptionKey "${ qnaKey }" --force`;

    const { stdout, stderr } = await executeCommand(command);

    if (stderr) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, stderr, true);
    } else {
        console.log(`QnA knolewdgebase successfully deleted \n${stdout}`);
    }
}

async function replaceKnowledgeBase(qnaKey: string, kbId: string, kbDTOFileLocation: string): Promise<void>{
    console.log('Replacing QnA knowledgebase');

    let command = `bf qnamaker:kb:replace --kbId "${ kbId }" --in "${ kbDTOFileLocation }" --subscriptionKey "${ qnaKey }"`;

    const { stdout, stderr } = await executeCommand(command);

    if (stderr) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, stderr, true);
    } else {
        console.log(`QnA knowledgebase successfully replaced \n${stdout}`);
    }
}

async function updateKnowledgeBase(qnaKey: string, kbId: string, kbDTOFileLocation: string): Promise<void>{
    console.log('Updating QnA knowledgebase');

    let command = `bf qnamaker:kb:update --kbId "${ kbId }" --in "${ kbDTOFileLocation }" --subscriptionKey "${ qnaKey }" --wait`;

    const { stdout, stderr } = await executeCommand(command);

    if (stderr) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, stderr, true);
    } else {
        console.log(`QnA knowledgebase successfully updated \n${stdout}`);
    }
}

async function traingKnowledgeBase(qnaKey: string, kbId: string, kbEndPointKey: string, kbHostName: string, feedbackRecordDTOLocation: string): Promise<void>{
    console.log('Updating QnA knowledgebase');

    let command = `bf qnamaker:train --kbId "${ kbId }" --endpointKey "${kbEndPointKey}" --hostname "${kbHostName}" --in "${feedbackRecordDTOLocation}" --subscriptionKey "${ qnaKey }"`;
    
    const { stdout, stderr } = await executeCommand(command);

    if (stderr) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, stderr, true);
    } else {
        console.log(`QnA knowledgebase successfully trained \n${stdout}`);
    }
}

async function replaceAlterations(qnaKey: string, wordAlterationsDTOFileLocation: string, serviceEndpoint: string): Promise<void>{
    console.log('Replacing Alteration in QnA knowledgebase');
    console.log('Alteration file location:' + wordAlterationsDTOFileLocation);

    let command = `bf qnamaker:alterations:replace --in "${ wordAlterationsDTOFileLocation }" --subscriptionKey "${ qnaKey }"`;

    if (serviceEndpoint) {
        command += ` --endpoint  "${ serviceEndpoint }"`;
    }

    const { stdout, stderr } = await executeCommand(command);

    if (stderr) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, stderr, true);
    } else {
        console.log(`Alterations successfully replaced \n${stdout}`);
    }
}

async function QueryKnowledgeBase(qnaKey: string, kbId: string, kbEndPointKey: string, kbHostName: string, qnaQuestion: string): Promise<void>{
    const rootPath = taskLibrary.getVariable('System.DefaultWorkingDirectory') as string;

    QnAMakerInitConfiguration(qnaKey,kbId).then(async () => {
        console.log('Calling for query to the QnA knowledgebase');

        let command = `bf qnamaker:query --endpointKey "${ kbEndPointKey }" --hostname "${ kbHostName }" --kbId "${ kbId }" --question "${ qnaQuestion }"`;            
        const { stdout, stderr } = await executeCommand(command);

        if (stderr) {
            taskLibrary.setResult(taskLibrary.TaskResult.Failed, stderr, true);
        } else {
            var queryResult = JSON.stringify(JSON.parse(stdout));            
            fs.writeFileSync(path.join(rootPath, 'QueryResult.json'), queryResult);

            console.log(`The QnA knowledgebase answered successfully \n${stdout}`);
        }
    });
}

async function QnAMakerInitConfiguration(qnaKey: string, kbId: string){
    console.log('Setting up QnA Maker configuration');
    let child = spawn('bf',['qnamaker:init'], { shell: true });

    for await (const data of child.stderr) {
        if(data.includes('What is your QnAMaker access/subscription key?')){
            child.stdin.write(qnaKey);
        }else if(data.includes('What would you like to use as your active knowledgebase ID?')){
            child.stdin.write(kbId);
        }else if(data.includes('ok?')){
            child.stdin.write("yes");
            child.stdin.end();
        }
        };
}

async function updateEndpointSettings(qnaKey: string, serviceEndpoint: string, activeLearning: boolean): Promise<void>{
    console.log('Updating Endpoint settings');

    let command = `bf qnamaker:endpointsettings:update --subscriptionKey "${ qnaKey }" --endpoint "${ serviceEndpoint }"`;

    if (activeLearning) {
        command += ` --activelearning`;
    }

    const { stdout, stderr } = await executeCommand(command);

    if (stderr) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, stderr, true);
    } else {
        console.log(`Endpoint settings successfully updated \n${stdout}`);
    }
}

async function refreshEndpointKeys(qnaKey: string, serviceEndpoint: string, keyType: string): Promise<void>{
    const rootPath = taskLibrary.getVariable('System.DefaultWorkingDirectory');
    const RefreshedKeys = `${ rootPath }/RefreshedKeys.json`;
    console.log('Refreshing Endpoint keys');

    let command = `bf qnamaker:endpointkeys:refresh --subscriptionKey "${ qnaKey }" --endpoint "${ serviceEndpoint }"`;
    command += ` --keyType "${ keyType }" > "${ RefreshedKeys }" | cat  "${ RefreshedKeys }"`;
    const { stdout, stderr } = await executeCommand(command);

    if (stderr) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, stderr, true);
    } else {
        console.log(`Endpoint keys successfully refreshed \n${stdout}`);
    }
}

async function ConvertQnaFiles(kbName: string, qnaConvertFilePathInput: string, qnaConvertFilePathOutput: string, isAlterationFile: boolean): Promise<void>{
    console.log('Converting QnA files');

    let command = `bf qnamaker:convert --in "${qnaConvertFilePathInput}" --out "${qnaConvertFilePathOutput}" --force --recurse`;

    if (kbName) {
        command += `--name  ${kbName}`;
    }

    if (isAlterationFile) {
        command += ` --alterations`;
    }

    const { stdout, stderr } = await executeCommand(command);

    if (stderr) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, stderr, true);
    } else {
        console.log(`QnA files converted successfully \n${stdout}`); 
    }
}

async function TranslateQnAModel(qnaTranslateInput: string, qnaTranslateOutputFolder: string, qnaTranslateKey: string, qnaSourceLang: string, qnaTargetLang: string): Promise<void>{
    console.log('Translationg QnA models');

    let command = `bf qnamaker:translate --in "${ qnaTranslateInput }" --out "${ qnaTranslateOutputFolder }" --translatekey "${ qnaTranslateKey }"`;
    command += qnaSourceLang? ` --srclang "${ qnaSourceLang }"` : '';
    command += ` --tgtlang "${ qnaTargetLang }" --force --recurse --translate_comments --translate_link_text`;
    const { stdout, stderr } = await executeCommand(command);

    if (stderr) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, stderr, true);
    } else {
        console.log(`QnA models translated successfully\n${stdout}`);
    }
}

run().catch((error)=>{
    taskLibrary.setResult(taskLibrary.TaskResult.Failed, error.message, true);
});