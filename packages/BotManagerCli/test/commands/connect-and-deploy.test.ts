import {expect, test} from '@oclif/test'

describe('connect-and-deploy', () => {
  test
  .stdout()
  .command(['connect-and-deploy'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['connect-and-deploy', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
