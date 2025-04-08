# SC2006: SPLIIT

SPLIIT is a multi-user expense tracker for individuals and groups, particularly those traveling together, who need an efficient and organized way to manage shared financial obligations. 
SPLIIT serves as an all-in-one solution for group expense management, offering features like user registration, trip creation, expense logging, real-time debt settlement calculations, and detailed transaction logs. It also allows for seamless currency tracking, supporting both local and foreign currencies, with a built-in exchange rate mechanism. Users can view detailed insights into their financial activities, simplify debts, export transaction data for further analysis and get a personalised AI generated Itinerary.

View SPLIIT live at https://sc2006-spliit.vercel.app


## Set up instructions
### Frontend
Install frontend dependencies
```bash
cd SPLIIT/client
```

```bash
yarn install
```
Start frontend (You can open a browser and visit http://localhost:3000)
```bash
yarn start
```

### Backend
Install backend dependencies
```bash
cd SPLIIT/server
```

```bash
npm i
```
Start backend (You can test with http://localhost:5050)
```bash
npm run start
```

#### APIs used:
1. Exchange rates - https://exchangeratesapi.io/documentation/
1. Database - https://www.mongodb.com/
1. LLM - https://toolhouse.ai/
1. Authentication - https://developers.google.com/identity/protocols/oauth2

## Documentation

## Tech stack used
Frontend: React JS

Backend: Express JS

## Contributors (SCMB Team 1)

| Name          | GitHub       | Role             |
|--------------|---------------|----------------|
| Siah Yee Long      | @siahyeelong       | Full-stack |
| Goh Jun Keat     | @JKniaaa      | Front end |
| Koh Ze Kai Leo   | @Hotarun1    | LLM integration |
| Madhumita Thiruppathi | @madhu-dhudhu  | Documentation |
| Teo Liang Wei, Ryan  | @Paralyseds   | Documentation |
| Zhang Yichi  | @yichi0812   | LLM agent |