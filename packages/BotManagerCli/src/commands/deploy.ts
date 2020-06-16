import {Command, flags} from '@oclif/command'

export default class Deploy extends Command {
  static description = 'deploys the bot to an Azure web app'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name of the web app to use'}),
    // flag with a value (-r, --resourcegroup=VALUE)
    resourcegroup: flags.string({char: 'r', description: 'resource group'}),
  }

  async run() {
    const {flags} = this.parse(Deploy)

    const name = flags.name ?? Math.random().toString(36).substr(2, 5)
    const resourceGroup = flags.resourcegroup ?? Math.random().toString(36).substr(2, 5)

    this.log(`    QnA Maker Service name: ${name}
    Resource Group: ${resourceGroup}

    (MOCK)
    Bot deployed to web app ${name} in resource group ${resourceGroup}`
    )
  }
}
