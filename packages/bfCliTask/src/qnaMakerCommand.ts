/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import taskLibrary = require('azure-pipelines-task-lib/task');
import { execSync } from 'child_process';

export class QnAMakerCommand {

    private qnaMakerSubCommand: string;
    private qnaKey: string;
    private kbName: string;
    private kbDTOFileLocation: string;
    private publishNewKB: boolean;
    private kbId: string;
    private feedbackRecordDTOLocation: string;
    private kbHostName: string;
    private kbEndPointKey: string;
    private wordAlterationsDTOFileLocation: string;
    private serviceEndpoint: string;

    constructor() {
        this.qnaMakerSubCommand = taskLibrary.getInput('qnaMakerSubCommand', false) as string;
        this.qnaKey = taskLibrary.getInput('qnaKey', false) as string;
        this.kbName = taskLibrary.getInput('kbName', false) as string;
        this.kbDTOFileLocation = taskLibrary.getInput('kbDTOFileLocation', false) as string;
        this.publishNewKB = taskLibrary.getBoolInput('publishNewKB', false);
        this.kbId = taskLibrary.getInput('kbId', false) as string;
        this.feedbackRecordDTOLocation = taskLibrary.getInput('feedbackRecordDTOFileLocation',false) as string;
        this.kbHostName = taskLibrary.getInput('kbHostName',false) as string;
        this.kbEndPointKey = taskLibrary.getInput('kbEndPointKey',false) as string;
        this.wordAlterationsDTOFileLocation = taskLibrary.getInput('wordAlterationsDTOFileLocation',false) as string;
        this.serviceEndpoint = taskLibrary.getInput('serviceEndpoint',false) as string;
    }

    public executeSubCommand = (): void => {
        switch (this.qnaMakerSubCommand) {
            case 'CreateKB':
                this.createKnowledgeBase();
                break;
            case 'DeleteKB':
                this.deleteKnowledgeBase();
                break;
            case 'PublishKB':
                this.publishKnowledgeBase();
                break;
            case 'ReplaceKB':
                this.replaceKnowledgeBase();
                break;
            case 'UpdateKB':
                this.updateKnowledgeBase();
                break;
            case 'TrainKB':
                this.traingKnowledgeBase();
                break;
            case 'AlterationsReplaceKB':
                this.replaceAlterations();
                break;
            default:
                console.log('No QnA Maker command was selected')
        }
    }

    private publishKnowledgeBase = (newKbId?: string): void => {
        console.log('Publishing QnA knowledgebase');
    
        let command = `bf qnamaker:kb:publish --kbId ${ newKbId? newKbId: this.kbId } --subscriptionKey ${ this.qnaKey }`;
    
        execSync(command);
        console.log('QnA knowledgebase succesfully published');
    }
    
    private createKnowledgeBase = (): void => {
        console.log('Creating QnA knowledgebase');
    
        let command = `bf qnamaker:kb:create --in ${ this.kbDTOFileLocation } --subscriptionKey ${ this.qnaKey }`;
        if (this.kbName) {
            command += ` --name ${ this.kbName }`;
        }
    
        let newKB = execSync(command);
        console.log('QnA knowledgebase successfully created');
    
        if (this.publishNewKB) {
            let ObjKbId = JSON.parse(newKB.toString('utf8'));
            this.publishKnowledgeBase(ObjKbId.kbId);
        }
    }
    
    private deleteKnowledgeBase = (): void => {
        console.log('Deleting QnA knowledgebase');

        let command = `bf qnamaker:kb:delete --kbId ${ this.kbId } --subscriptionKey ${ this.qnaKey } --force`;

        execSync(command);
        console.log('QnA knolewdgebase successfully deleted');
    }

    private replaceKnowledgeBase = (): void => {
        console.log('Replacing QnA knowledgebase');

        let command = `bf qnamaker:kb:replace --kbId ${ this.kbId } --in ${ this.kbDTOFileLocation } --subscriptionKey ${ this.qnaKey }`;

        execSync(command);
        console.log('QnA knowledgebase successfully replaced');
    }

    private updateKnowledgeBase = (): void => {
        console.log('Updating QnA knowledgebase');

        let command = `bf qnamaker:kb:update --kbId ${ this.kbId } --in ${ this.kbDTOFileLocation } --subscriptionKey ${ this.qnaKey } --wait`;

        execSync(command);
        console.log('QnA knowledgebase successfully updated');
    }

    private traingKnowledgeBase = (): void => {
        console.log('Updating QnA knowledgebase');

        let command = `bf qnamaker:kb:train --kbId ${ this.kbId } --endpointKey ${this.kbEndPointKey} --hostname ${this.kbHostName} --in ${this.feedbackRecordDTOLocation} --subscriptionKey ${ this.qnaKey }`;

        execSync(command, {stdio: 'inherit'});
        console.log('QnA knowledgebase successfully trained');
    }

    private replaceAlterations = (): void => {
        console.log('Replacing Alteration in QnA knowledgebase');
        console.log('Alteration file location:' + this.wordAlterationsDTOFileLocation);

        let command = `bf qnamaker:alterations:replace --in ${ this.wordAlterationsDTOFileLocation } --subscriptionKey ${ this.qnaKey }`;
        if (this.serviceEndpoint) {
            command += ` --endpoint ${ this.serviceEndpoint }`;
        }
    
        execSync(command, {stdio: 'inherit'});
        console.log('Alterations successfully replaced');
    }
}