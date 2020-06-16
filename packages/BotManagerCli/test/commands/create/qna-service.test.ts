import {expect, test} from '@oclif/test'

describe('create:qna-service', () => {
  test
  .stdout()
  .command(['create:qna-service'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['create:qna-service', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
