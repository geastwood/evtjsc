# evtjsc

Command line tool to interact with everiToken public blockchain

## Install 

`npm install -g evtjsc` or `yarn global add evtjsc`

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

## Demo CSV file

```csv
from,to,balance,memo
EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND,EVT6WfKLZ7Y7gktXuAwT6nSvcePabQUsZyw9ZyKTdSnuS7i7PxuUp,0.00010 S#20,test
EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND,EVT6BUvKvUfxDv5qt1cJ1JkoK68wv5TTce3ZFNLarBK3gTVx8j1eP,0.00011 S#20,test
EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND,EVT5LtAz4EvdfqjnYHws18vYHDs6zEHn78DhyEEKpN6JuK6fe8Vuq,0.00010 S#20,test
EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND,EVT4unfd4wnNLZa82Q5DZDseVtMPHpgRwVvtUbfjm3i8syVJGHmkc,0.00010 S#20,test
EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND,EVT7f4we2rx1QbtpJ5MCPrz5pvRxPezGjNqKKbEMjssVWyYU9xrXC,0.00010 S#20,test
EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND,EVT7rG13sSuGVXNpPrRwUSknVhZC4jm81xpmfQzofusMMyRqKfjis,0.00010 S#20,test
EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND,EVT792sHgx5vayYBXJz6Kb1UroheYXQauThoi9fhP6QARVofE5dUe,0.00010 S#20,test
EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND,EVT74VAieeMJ8Ade58vXMRfEShz3qFDqj89VPoyHsJzAakSLWRtBe,0.00011 S#20,test
EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND,EVT77UgQPsvBZ154duVHfHeSk8musPT7GTRG2K88amUK2BCobeauQ,0.00010 S#20,test
EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND,EVT6ZnPEPVEs9LHJsgAX8Fcv8fPqsfzfY7RyKzWSUJb5qeMZKYLZu,0.00010 S#20,test
```
