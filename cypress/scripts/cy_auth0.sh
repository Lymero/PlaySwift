curl --request POST \
  --url https://web3.eu.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"rrCX17d5Btcb8gwi83jnA0OsDFUgi0ss","client_secret":"vdZUDYdIp-fRor_iQ3gajYoAtjSMcZp7KjUaW-2IfB0H4mePqd5CVh1yR59yXjxa","audience":"http://localhost:3030","grant_type":"client_credentials"}' >> ../fixtures/tokens.json