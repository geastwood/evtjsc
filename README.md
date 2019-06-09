evtjsc
======

Command line tool to interact with everiToken public blockchain

[![Version](https://img.shields.io/npm/v/evtjsc.svg)](https://npmjs.org/package/evtjsc)
[![Downloads/week](https://img.shields.io/npm/dw/evtjsc.svg)](https://npmjs.org/package/evtjsc)
[![License](https://img.shields.io/npm/l/evtjsc.svg)](https://github.com/geastwood/evtjsc/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g evtjsc
$ evtjsc COMMAND
running command...
$ evtjsc (-v|--version|version)
evtjsc/0.1.0 darwin-x64 node-v11.10.1
$ evtjsc --help [COMMAND]
USAGE
  $ evtjsc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
- [evtjsc](#evtjsc)
- [Usage](#usage)
- [Commands](#commands)
  - [`evtjsc hello [FILE]`](#evtjsc-hello-file)
  - [`evtjsc help [COMMAND]`](#evtjsc-help-command)

## `evtjsc hello [FILE]`

describe the command here

```
USAGE
  $ evtjsc hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ evtjsc hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/geastwood/evtjsc/blob/v0.1.0/src/commands/hello.ts)_

## `evtjsc help [COMMAND]`

display help for evtjsc

```
USAGE
  $ evtjsc help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_
<!-- commandsstop -->
