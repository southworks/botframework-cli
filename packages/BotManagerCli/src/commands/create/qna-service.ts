import {Command, flags} from '@oclif/command'

export default class CreateQnaService extends Command {
  static description = 'Creates the QnA Maker service in Azure portal'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name of the qna maker service'}),
    // flag with a value (-p, --pricetier=VALUE)
    pricetier: flags.string({char: 'p', description: 'price tier', default: 'S0'}),
    // flag with a value (-r, --resourcegroup=VALUE)
    resourcegroup: flags.string({char: 'r', description: 'resource group'}),
    // flag with a value (-l, --location=VALUE)
    location: flags.string({char: 'l', description: 'resources location', default: 'westus'}),
    // flag with a value (-a, --app-name=VALUE)
    appname: flags.string({char: 'a', description: 'app name'}),
  }

  async run() {
    const {flags} = this.parse(CreateQnaService)

    const name = flags.name ?? Math.random().toString(36).substr(2, 5)
    const resourceGroup = flags.resourcegroup ?? Math.random().toString(36).substr(2, 5)
    const appName = flags.appname ?? Math.random().toString(36).substr(2, 5)
    const priceTier = flags.pricetier
    const location = flags.location

    this.log(`    QnA Maker Service name: ${name}
    Price Tier: ${priceTier}
    Resource Group: ${resourceGroup}
    Location: ${location}
    App Name: ${appName}
    
    (MOCK)
    Resources created:
    - Subscription key: subscription key
    - App Name: ${appName}
    - Resource Group URL: link to rg`
    )
  }
}
