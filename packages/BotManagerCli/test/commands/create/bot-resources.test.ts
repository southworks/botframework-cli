import {expect, test} from '@oclif/test'

describe('create:bot-resources', () => {
  test
  .stdout()
  .command(['create:bot-resources'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['create:bot-resources', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
