# Casetext Takehome Interview Backend

### NOTE: Starter/Boilerplate Code based on the example provided [here](https://github.com/w3cj/express-api-starter-ts/tree/main)

## How to use

[Clone the repo](https://github.com/mja2128/casetext-takehome-interview)

<!-- #default-branch-switch -->

Install it and run:

```bash
cd backend
npm install
npm start
```
## Existing Data (please test using these)
* PIN: 1111, Name: Peter Parker, Card Type: Maestro, Balance 500.00
* PIN: 2222, Name: Miles Morales, Card Type: MasterCard, Balance 2500.00
* PIN: 3333, Name: Miguel O'Hara, Card Type: Visa, Balance 5000.00

## Adding More Accounts
You can add more accounts to test with by doing either of the following:
* Add code under line 17 in `src/index.ts` to initialize more accounts
* (**UNTESTED**) Add new files in `.node-persist/storage` containing JSON with the following schema:
```json
{
  "key": "<new PIN>",
  "value": {
    "name": "<name of new user>",
    "cardType": "<star, pulse, maestro, mastercard, plus, or visa>",
    "balance": 1000 // any dollar amount
  }
}
```
