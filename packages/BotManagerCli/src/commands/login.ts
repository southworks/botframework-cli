import {Command, flags} from '@oclif/command'

export default class Login extends Command {
  static description = 'Login to Azure'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    this.log('Logging with Azure')
  }
}
