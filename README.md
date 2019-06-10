# evtjsc

Command line tool to interact with everiToken public blockchain

## Run command locally

1. clone this repo
2. run `yarn` install dependencies
3. use `./bin/run` instead of `evtjsc` to run the command. e.g.

```bash
./bin/run transferft --file=`pwd`/data/batchTransfer.csv -k=5J1by7KRQujRdXrurEsvEr2zQGcdPaMJRjewER6XsAR2eCcpt3D --dry-run --net="https://testnet1.everitoken.io"
```

## Transfer fungible (transferft)

Command to transfer fungible token, e.g. transfer Evt to another address

```bash
USAGE
  $ evtjsc transferft

OPTIONS
  -f, --file=file                Specify file with addresses and balances
  -h, --help                     show CLI help

  -k, --private-key=private-key  (required) Specify the private key, support
                                 multiple private key

  -x, --net=net                  (required) Specify which node to use, e.g.
                                 https://mainnet1.everitoken.io

  --balance=balance              Specify the balance, e.g. 1.00000 S#1

  --dry-run                      Specify this flag to perform a dry run

  --from=from                    Specify the from address

  --memo=memo                    Specify the memo

  --to=to                        Specify the to address, support multiple
                                 addresses

EXAMPLES
  - use "privateKey1" to sign transfer in csv file
       $ evtjsc transferft --file=/path/to/file.csv --private-key=privateKey1

  - use both keys to sign
       $ evtjsc transferft --file=/path/to/file.csv --private-key=p1 --private-key=p2

  - specify network
       $ evtjsc transferft --file=/path/to/file.csv --private-key=p1 --net="https://mainnet1.everitoken.io"

  - only dry run the process, will not push to blockchain
       $ evtjsc transferft --dry-run --file=/path/to/file.csv --private-key=p1

  - Use balance from one address to another address
       $ evtjsc transferft --from=address --to="address" --balance="0.10000 S#1" --memo="test"
```
