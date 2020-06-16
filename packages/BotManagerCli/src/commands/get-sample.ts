import {Command, flags} from '@oclif/command'

export default class GetSample extends Command {
  static description = 'Download a sample from BotBuilder-Samples repository.'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-k, --kind=VALUE)
    kind: flags.string({char: 'k', description: 'Kind of bot sample to download'}),
  }

  static args = [{name: 'options'}]

  async run() {
    const {flags} = this.parse(GetSample)
    const kind = flags.kind ?? 'empty-bot'

    this.log(`geting ${kind} sample`)
  }
}
