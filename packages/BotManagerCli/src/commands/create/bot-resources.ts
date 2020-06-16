import {Command, flags} from '@oclif/command'

export default class CreateBotResources extends Command {
  static description = 'Creates the Bot Resources in Azure portal'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name of the app service'}),
    // flag with a value (-r, --resourcegroup=VALUE)
    resourcegroup: flags.string({char: 'r', description: 'resource group'}),
    // flag with a value (-l, --location=VALUE)
    location: flags.string({char: 'l', description: 'resources location', default: 'westus'}),
    // flag with a value (-p, --pricetier=VALUE)
    pricetier: flags.string({char: 'p', description: 'price tier', default: 'S0'}),
    // flag with a value (--appid=VALUE)
    appid: flags.string({description: 'App id from an app registration. If this parameter is not specified, a new app registration will be created', dependsOn: ['appsecret']}),
    // flag with a value (--appsecret=VALUE)
    appsecret: flags.string({description: 'App secret from an app registration. If this parameter is not specified, a new app registration will be created', dependsOn: ['appid']}),
    // flag with a value (--hostplan=VALUE)
    hostplan: flags.string({description: 'hosting plan'}),
    // flag with a boolean (--useteams=BOOL)
    useteams: flags.boolean({description: 'set to true if your bot connects with MS-Teams', default: false}),
    // flag with a value (--qnaEndpointKey=VALUE)
    qnaEndpointKey: flags.string({description: 'qna endpoint key from knowledge base', required: true}),
    // flag with a value (--qnaHostname=VALUE)
    qnaHostname: flags.string({description: 'qna enpoint hostname from knowledge base', required: true}),
    // flag with a value (--qnaKbId=VALUE)
    qnaKbId: flags.string({description: 'ID from qna knowledge base', required: true}),

  }

  async run() {
    const {flags} = this.parse(CreateBotResources)

    const name = flags.name ?? Math.random().toString(36).substr(2, 5)
    const resourceGroup = flags.resourcegroup ?? Math.random().toString(36).substr(2, 5)
    const location = flags.location
    const priceTier = flags.pricetier
    const appId = flags.appid ?? '5d27565c-0f74-4ce2-871d-50013264d2d0'
    const appSecret = flags.appsecret ?? '98d5a376-901c-4f13-9719-3651f40ddc0f'
    const hostPlan = flags.hostplan ?? 'new host plan'
    const useTeams = flags.useteams
    const qnaEndpointKey = flags.qnaEndpointKey
    const qnaHostname = flags.qnaHostname
    const qnaKbId = flags.qnaKbId

    this.log(`    QnA Maker Service name: ${name}
    Resource Group: ${resourceGroup}
    Location: ${location}
    Price Tier: ${priceTier}
    App Id: ${appId}
    App Secret: ${appSecret}
    Host Plan: ${hostPlan}
    Use Teams: ${useTeams}
    QnA Enpoint Key: ${qnaEndpointKey}
    QnA Host Name: ${qnaHostname}
    QnA KB ID: ${qnaKbId}
    
    (MOCK)
    Resources created:
    -Resources Group: ${resourceGroup}
    -Resource group URL:
    -Bot endpoint URL:
    -Channel registration URL:
    -MS-Teams URL:`
    )
  }
}
