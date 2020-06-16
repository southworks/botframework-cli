import {expect, test} from '@oclif/test'

describe('create:qna-kb', () => {
  test
  .stdout()
  .command(['create:qna-kb'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['create:qna-kb', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
