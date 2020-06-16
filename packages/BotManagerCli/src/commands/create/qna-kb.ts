import {Command, flags} from '@oclif/command'

export default class CreateQnAKB extends Command {
  static description = 'Creates the QnA Knowledge Base using a QnA Maker Service'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name of the qna knowledge base'}),
    // flag with a value (--lang=VALUE)
    lang: flags.string({description: 'language of the knowledge base', default: 'english'}),
    // flag with a value (-f, --file=VALUE)
    file: flags.string({char: 'f', description: 'DTO file location of the knowledge base'}),
    // flag with a value (-l, --location=VALUE)
    location: flags.string({char: 'l', description: 'the location to store the deployment metadata', default: 'westus'}),
    // flag with a value (-c, --chitchat=VALUE)
    chitchat: flags.string({char: 'c', description: 'chit-chat options (i.e. none, professional, friendly, etc.)', default: 'none'}),
    // flag with a value (-s, --subscription=VALUE)
    subscription: flags.string({char: 's', description: 'subscription key from the QnA Maker Service to use', required: true}),
  }

  async run() {
    const {flags} = this.parse(CreateQnAKB)

    const name = flags.name ?? Math.random().toString(36).substr(2, 5)
    const lang = flags.lang
    const file = flags.file ?? 'CognitiveModels/smartLightFAQ.tsv'
    const location = flags.location
    const chitchat = flags.chitchat
    const subscription = flags.subscription ?? 'Subscription Required'

    this.log(`    QnA Maker Service name: ${name}
    Language: ${lang}
    Cognitive Model file location: ${file}
    Location: ${location}
    Chit Chat option: ${chitchat}
    Subscription Key: ${subscription}
    
    (MOCK)
    Resources created:
    - QnA endpoint key: 0c5cb4f2-3339-49ed-9e96-8f12cea43ebb
    - QnA knoledge base ID: 87840f7b-6242-4079-a631-3c6015fc4641
    - QnA endpoint hostname: https://< >.azure.net/qnamaker
    - Knowledge base URL: https://kburl.com`
    )
  }
}
