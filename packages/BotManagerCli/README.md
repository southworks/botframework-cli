BotManager
==========

get bot samples and deploy bot to Azure

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/BotManager.svg)](https://npmjs.org/package/BotManager)
[![Downloads/week](https://img.shields.io/npm/dw/BotManager.svg)](https://npmjs.org/package/BotManager)
[![License](https://img.shields.io/npm/l/BotManager.svg)](https://github.com/santgr11/BotManager/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g BotManager
$ BM COMMAND
running command...
$ BM (-v|--version|version)
BotManager/0.0.0 win32-x64 node-v10.16.0
$ BM --help [COMMAND]
USAGE
  $ BM COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`BM connect-and-deploy [FILE]`](#bm-connect-and-deploy-file)
* [`BM get-sample [OPTIONS]`](#bm-get-sample-options)
* [`BM hello [FILE]`](#bm-hello-file)
* [`BM help [COMMAND]`](#bm-help-command)
* [`BM login`](#bm-login)

## `BM connect-and-deploy [FILE]`

describe the command here

```
USAGE
  $ BM connect-and-deploy [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src\commands\connect-and-deploy.ts](https://github.com/santgr11/BotManager/blob/v0.0.0/src\commands\connect-and-deploy.ts)_

## `BM get-sample [OPTIONS]`

download a sample from BotBuilder-Samples repository

```
USAGE
  $ BM get-sample [OPTIONS]

OPTIONS
  -h, --help       show CLI help
  -k, --kind=kind  Kind of bot sample to download
```

_See code: [src\commands\get-sample.ts](https://github.com/santgr11/BotManager/blob/v0.0.0/src\commands\get-sample.ts)_

## `BM hello [FILE]`

describe the command here

```
USAGE
  $ BM hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ BM hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/santgr11/BotManager/blob/v0.0.0/src\commands\hello.ts)_

## `BM help [COMMAND]`

display help for BM

```
USAGE
  $ BM help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src\commands\help.ts)_

## `BM login`

Login to Azure

```
USAGE
  $ BM login

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\login.ts](https://github.com/santgr11/BotManager/blob/v0.0.0/src\commands\login.ts)_
<!-- commandsstop -->
