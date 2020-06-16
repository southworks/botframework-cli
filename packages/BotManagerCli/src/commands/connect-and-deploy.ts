import {Command, flags} from '@oclif/command'
const opn = require('opn')

export default class ConnectAndDeploy extends Command {
  static description = 'Create the resources and deploy the Bot to Azure.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    this.log(`Creating QnA Service...
    Creating QnA Knoledgebase...
    Creating Bot resources...
    Deploying Bot...
    Done`)

    opn('https://google.com')
  }
}
