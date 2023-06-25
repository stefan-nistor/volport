const now = new Date();

export const API_URL = 'http://localhost:8080';
export const TASKS = [
  {
    id: 'f69f88012978187a6c12897f',
    ref: 'DEV1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending',
    project: 'FII Practic',
    task: 'Site UI'
  },
  {
    id: '9eaa1c7dd4433f413c308ce2',
    ref: 'DEV1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered',
    project: 'FII Code',
    task: 'Find Partners'
  },
  {
    id: '01a5230c811bd04996ce7c13',
    ref: 'DEV1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded',
    project: 'Balul Bobocilor',
    task: 'Prepare new-comers'
  },
  {
    id: '1f4e1bd0a87cea23cdb83d18',
    ref: 'DEV1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending',
    project: 'FII IT-ist',
    task: 'Find goodies'
  },
  {
    id: '9f974f239d29ede969367103',
    ref: 'DEV1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered',
    project: 'FII Practic',
    task: 'Arrange classrooms'
  },
  {
    id: 'ffc83c1560ec2f66a1c05596',
    ref: 'DEV1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered',
    project: 'LAN Party',
    task: 'Prepare game rules'
  }
];

export const PARTNERS = [
  {
    "id": "221e0fca-56db-49a7-8698-a6802c34598e",
    "name": "Huels Inc",
    "contact": "Pat74@hotmail.com",
    "fiscalID": 74507285,
    "bank": "Investment Account",
    "bankAccount": "CH3907001320018144OY9"
  },
  {
    "id": "6e77e1b8-6208-4482-ac16-9f4ed8448b69",
    "name": "Parker Inc",
    "contact": "Patricia.Schimmel@yahoo.com",
    "fiscalID": 65243999,
    "bank": "Credit Card Account",
    "bankAccount": "GR77448006541589G53213J368U"
  },
  {
    "id": "be5440f0-7301-4780-8f74-8d47a212224d",
    "name": "Ondricka Group",
    "contact": "Melvina_Pagac26@hotmail.com",
    "fiscalID": 72598559,
    "bank": "Money Market Account",
    "bankAccount": "MT17VOKP741203Y3464VW4294571971"
  },
  {
    "id": "e0399f8c-5e46-4ff2-9d01-1a1eaa875efa",
    "name": "McKenzie - Stiedemann",
    "contact": "Foster_McDermott@gmail.com",
    "fiscalID": 80252771,
    "bank": "Checking Account",
    "bankAccount": "RS54021100800814790279"
  },
  {
    "id": "273c291f-d2bc-433a-a2a0-2582435df2ef",
    "name": "Kozey Group",
    "contact": "Juliana.Ullrich90@gmail.com",
    "fiscalID": 72070712,
    "bank": "Home Loan Account",
    "bankAccount": "PS40994T205415646004180408002"
  },
  {
    "id": "279a7b39-03d2-46f6-9094-39c9b21923a1",
    "name": "Osinski and Sons",
    "contact": "Eryn48@gmail.com",
    "fiscalID": 43940212,
    "bank": "Personal Loan Account",
    "bankAccount": "BA760020689008080035"
  },
  {
    "id": "a8d2b3c1-1188-4246-9199-da3ea2dbf333",
    "name": "Grimes - Hegmann",
    "contact": "Elvie.Adams45@hotmail.com",
    "fiscalID": 94314856,
    "bank": "Auto Loan Account",
    "bankAccount": "BR5200700100526808090737844K4"
  },
  {
    "id": "839709e6-9998-498e-a934-64cefe22ddab",
    "name": "Stiedemann, Considine and Bayer",
    "contact": "Leif_Stroman84@hotmail.com",
    "fiscalID": 66902830,
    "bank": "Checking Account",
    "bankAccount": "SK9360010416339880050065"
  },
  {
    "id": "d7e7ec93-e214-405d-b3e5-66e1db5b4c2f",
    "name": "Schroeder and Sons",
    "contact": "Ericka_Bode36@hotmail.com",
    "fiscalID": 37215623,
    "bank": "Auto Loan Account",
    "bankAccount": "LT920091124230257002"
  },
  {
    "id": "e455d910-ca73-43c9-bfef-fd819424a185",
    "name": "Walker, Wehner and Gutkowski",
    "contact": "Dimitri22@gmail.com",
    "fiscalID": 61621724,
    "bank": "Credit Card Account",
    "bankAccount": "AL47326002987E551J92331751P0"
  },
  {
    "id": "13a2c8be-bf0d-4928-acb6-da12e3a4f06a",
    "name": "McGlynn - Bartell",
    "contact": "Afton.Oberbrunner19@hotmail.com",
    "fiscalID": 16656532,
    "bank": "Credit Card Account",
    "bankAccount": "KW83PLUC2459MI68S38217Z4931885"
  },
  {
    "id": "d14b1e1f-2e78-451c-a583-db9d4e5aeb96",
    "name": "Balistreri - Powlowski",
    "contact": "Graham_Swift@yahoo.com",
    "fiscalID": 82123573,
    "bank": "Investment Account",
    "bankAccount": "HR3801008828899003071"
  },
  {
    "id": "25a52633-9377-49da-b3e4-f8532f1733bb",
    "name": "Conroy and Sons",
    "contact": "Kaden_Altenwerth48@gmail.com",
    "fiscalID": 43965088,
    "bank": "Savings Account",
    "bankAccount": "SK8700720230461634007033"
  },
  {
    "id": "8f5cf7c5-aeb1-45cb-af0b-169468932e1b",
    "name": "Berge - Waters",
    "contact": "Hailee.Schultz31@yahoo.com",
    "fiscalID": 86687493,
    "bank": "Home Loan Account",
    "bankAccount": "VG3317299208819303640049"
  },
  {
    "id": "2b2f15a6-3f2b-4373-8e0d-e8942d5a48a6",
    "name": "Jacobs - Cassin",
    "contact": "Justyn4@hotmail.com",
    "fiscalID": 97035593,
    "bank": "Checking Account",
    "bankAccount": "FO1977075200305026"
  },
  {
    "id": "c0d45f6d-1e96-453c-ba14-e8343acb0b8f",
    "name": "Bechtelar, Runte and Goodwin",
    "contact": "Rogelio_Pouros@yahoo.com",
    "fiscalID": 77127479,
    "bank": "Home Loan Account",
    "bankAccount": "JO32NTBN0457510301466440065429"
  },
  {
    "id": "b52906a2-f01f-43b9-9069-b2100610a97e",
    "name": "Ondricka - Fisher",
    "contact": "Kameron.Balistreri@gmail.com",
    "fiscalID": 61731259,
    "bank": "Investment Account",
    "bankAccount": "MU35JWTH0235583028204356034CMG"
  },
  {
    "id": "dc8522f8-eca3-470b-a9e7-7ac536fde059",
    "name": "Becker - Heathcote",
    "contact": "Keith_Roob@hotmail.com",
    "fiscalID": 78294963,
    "bank": "Checking Account",
    "bankAccount": "CZ5661724005052344005419"
  },
  {
    "id": "cb4eb9b4-6a5c-487e-b892-ccd7f0dcc59f",
    "name": "Gerlach - Bradtke",
    "contact": "Rene_Carter25@gmail.com",
    "fiscalID": 33816750,
    "bank": "Auto Loan Account",
    "bankAccount": "LV26YDCW1827526458Q99"
  },
  {
    "id": "c9f33ce3-4b84-4990-b03d-5e0767611ddc",
    "name": "Mayer, Bradtke and Bruen",
    "contact": "Lazaro35@hotmail.com",
    "fiscalID": 45331364,
    "bank": "Savings Account",
    "bankAccount": "VG6227259190073874001384"
  },
  {
    "id": "79ec33d0-a113-4f37-b8ef-2fd4e77a64df",
    "name": "Marquardt Inc",
    "contact": "Trycia.Lueilwitz-Nolan@gmail.com",
    "fiscalID": 97502111,
    "bank": "Savings Account",
    "bankAccount": "DO72DKXY00103069068900950342"
  },
  {
    "id": "56f7280c-89cc-4b79-b013-e8bd50dbb850",
    "name": "Kautzer - Wintheiser",
    "contact": "Sammy.Harber41@hotmail.com",
    "fiscalID": 64873458,
    "bank": "Savings Account",
    "bankAccount": "FR6183791600525S1509I9K5M08"
  },
  {
    "id": "89564478-d307-4620-9ee5-098a6dd15b4d",
    "name": "Renner and Sons",
    "contact": "Velda.Jacobi@yahoo.com",
    "fiscalID": 44391155,
    "bank": "Checking Account",
    "bankAccount": "HR6627000797307410618"
  },
  {
    "id": "9e3c70de-a9e2-4af9-9ac6-7d3aed79215e",
    "name": "Bradtke, Carroll and Conroy",
    "contact": "Hailie76@yahoo.com",
    "fiscalID": 45700090,
    "bank": "Credit Card Account",
    "bankAccount": "RS06034043050404610079"
  },
  {
    "id": "c129cec1-de78-481d-88c5-9525983fb00b",
    "name": "Schamberger - McCullough",
    "contact": "Baylee.Kohler@yahoo.com",
    "fiscalID": 31149681,
    "bank": "Auto Loan Account",
    "bankAccount": "XK263049050600433098"
  },
  {
    "id": "54cf4bc1-2467-476a-8ddd-118cd4d722e7",
    "name": "Cartwright LLC",
    "contact": "Jennyfer78@hotmail.com",
    "fiscalID": 80828520,
    "bank": "Personal Loan Account",
    "bankAccount": "PS331IY0032605315842060020417"
  },
  {
    "id": "7bee25ca-3a41-4400-8fa6-f0ceea69e0d6",
    "name": "Abernathy - Waelchi",
    "contact": "Edward_Daniel63@hotmail.com",
    "fiscalID": 50681370,
    "bank": "Savings Account",
    "bankAccount": "PL14090624980072590200802196"
  },
  {
    "id": "35100d3c-9ec5-4419-8747-7e80938dab3b",
    "name": "Carroll, Smith and Hartmann",
    "contact": "Osborne_Gerhold43@gmail.com",
    "fiscalID": 44586278,
    "bank": "Auto Loan Account",
    "bankAccount": "FI9503168204003033"
  },
  {
    "id": "e181d9af-0eaf-413c-838d-920f13b92167",
    "name": "Hackett - Kiehn",
    "contact": "Joanie_Morar29@gmail.com",
    "fiscalID": 57736782,
    "bank": "Money Market Account",
    "bankAccount": "CH90408251F36A3915808"
  },
  {
    "id": "96cd9577-5b14-4273-aea2-91485a15b4fc",
    "name": "Turner, Hilll and Haley",
    "contact": "Camilla.Glover@gmail.com",
    "fiscalID": 85289062,
    "bank": "Personal Loan Account",
    "bankAccount": "GB41FZNL50597600165008"
  },
  {
    "id": "f3ed88b0-daaf-4c81-bcf5-7c02f0140357",
    "name": "Weissnat Inc",
    "contact": "Lacy_Green31@gmail.com",
    "fiscalID": 22068582,
    "bank": "Savings Account",
    "bankAccount": "MU28XMDL0022400765210385016QRF"
  },
  {
    "id": "63daa946-6613-4394-93d4-85c201682b44",
    "name": "Murphy - Boyle",
    "contact": "Odessa69@yahoo.com",
    "fiscalID": 17834849,
    "bank": "Investment Account",
    "bankAccount": "SI91340298669009466"
  },
  {
    "id": "59554a76-613a-4939-a2c6-c7fe91b6d459",
    "name": "O'Connell - Leannon",
    "contact": "Odessa.Stokes57@gmail.com",
    "fiscalID": 27539887,
    "bank": "Credit Card Account",
    "bankAccount": "LI288552260Z0M624S1V2"
  },
  {
    "id": "37b5567f-c7d1-46ac-b8eb-83f677da5639",
    "name": "Haag - Schumm",
    "contact": "Ofelia.Zulauf@hotmail.com",
    "fiscalID": 24102025,
    "bank": "Savings Account",
    "bankAccount": "DO23MSKJ70080403230037485070"
  },
  {
    "id": "7f8c1644-f015-4efa-b0b6-4a8c2396a486",
    "name": "Tremblay, Mitchell and Marks",
    "contact": "Emmet86@hotmail.com",
    "fiscalID": 21801539,
    "bank": "Credit Card Account",
    "bankAccount": "IT60C30016003108A722477U789"
  },
  {
    "id": "b94d6942-5f3c-4490-a2a2-2a39afa0ad6a",
    "name": "Bode Inc",
    "contact": "Hilma46@yahoo.com",
    "fiscalID": 87917622,
    "bank": "Auto Loan Account",
    "bankAccount": "SM29D7004020396C79U4658KZV4"
  },
  {
    "id": "0bfe7274-52ae-4e13-a4de-080c2f04be7b",
    "name": "Lesch - Hodkiewicz",
    "contact": "Melba8@hotmail.com",
    "fiscalID": 25709771,
    "bank": "Money Market Account",
    "bankAccount": "GB30AAVC79669900690152"
  },
  {
    "id": "9d6b319c-7443-467f-8a06-4f95667fc74c",
    "name": "Bednar Inc",
    "contact": "Noe_Gusikowski@yahoo.com",
    "fiscalID": 71338358,
    "bank": "Auto Loan Account",
    "bankAccount": "PS71BG2T237502002828880035001"
  },
  {
    "id": "5ff45a21-9381-4dcf-af34-ee18bf91ea0c",
    "name": "Durgan - Leuschke",
    "contact": "Dino.Kuphal@yahoo.com",
    "fiscalID": 85361279,
    "bank": "Money Market Account",
    "bankAccount": "XK426896007009000344"
  },
  {
    "id": "2f85f46c-5e0a-4ca7-bd2a-87919ed88bd7",
    "name": "Greenholt and Sons",
    "contact": "Jewell.Okuneva55@gmail.com",
    "fiscalID": 63241976,
    "bank": "Personal Loan Account",
    "bankAccount": "LI9888974194473490661"
  },
  {
    "id": "98deb945-07c8-4348-846a-311ecd0da74e",
    "name": "Pagac - D'Amore",
    "contact": "Julio58@yahoo.com",
    "fiscalID": 33818992,
    "bank": "Savings Account",
    "bankAccount": "MU63EQLI5441060090020120003OJO"
  },
  {
    "id": "6e9ccf38-7253-4b72-a838-6a0ef73b831f",
    "name": "Moore Group",
    "contact": "Kelsie36@yahoo.com",
    "fiscalID": 10948223,
    "bank": "Savings Account",
    "bankAccount": "AT431007568900143044"
  },
  {
    "id": "ca506a3f-f3f2-45b7-9bfc-9d00491ce70a",
    "name": "Mitchell and Sons",
    "contact": "Kelton.Cummerata@gmail.com",
    "fiscalID": 66425779,
    "bank": "Home Loan Account",
    "bankAccount": "TR630713710380011008891575"
  },
  {
    "id": "efd33e51-9aab-454a-b63e-20471eaa6460",
    "name": "Heaney and Sons",
    "contact": "Makayla_Simonis75@gmail.com",
    "fiscalID": 68012329,
    "bank": "Investment Account",
    "bankAccount": "LB42006504K6654393399L74849Y"
  },
  {
    "id": "dc6ce2af-24e4-4ee0-907a-1a10bfdcca2d",
    "name": "Parisian Inc",
    "contact": "Marcella70@yahoo.com",
    "fiscalID": 68342237,
    "bank": "Auto Loan Account",
    "bankAccount": "AZ12ICFY00702100480086677437"
  },
  {
    "id": "1de4a3e0-a7c1-42aa-b146-2f623ad05106",
    "name": "Reilly, Dickens and Bednar",
    "contact": "Dena2@hotmail.com",
    "fiscalID": 72688457,
    "bank": "Checking Account",
    "bankAccount": "LB92015230E942V5G6097L45R49Y"
  },
  {
    "id": "587ad4e0-7e01-423e-ac55-0b4535ec3c2c",
    "name": "Lubowitz, Runte and Abshire",
    "contact": "Jett30@gmail.com",
    "fiscalID": 63872571,
    "bank": "Checking Account",
    "bankAccount": "XK954331515006000645"
  },
  {
    "id": "0979d347-d645-45c7-b45f-a0b51e769d68",
    "name": "Terry - Price",
    "contact": "Berry.Franecki@gmail.com",
    "fiscalID": 54735130,
    "bank": "Checking Account",
    "bankAccount": "SI65960030020073081"
  },
  {
    "id": "69d7a8ee-0047-4332-a8f7-b2016ca2385a",
    "name": "Haley - Kerluke",
    "contact": "Mya_Strosin79@hotmail.com",
    "fiscalID": 12896151,
    "bank": "Home Loan Account",
    "bankAccount": "MK520180C02L1300J36"
  },
  {
    "id": "3f5d57d1-17f8-4536-ad76-d1cf145411d0",
    "name": "Klocko Group",
    "contact": "Columbus.Schinner-Schaden@yahoo.com",
    "fiscalID": 49097649,
    "bank": "Home Loan Account",
    "bankAccount": "LV42CDKM8971H82499M80"
  },
  {
    "id": "67c9b176-fdf3-40dd-8e2d-e8446864ad3d",
    "name": "Sipes, Gislason and Bins",
    "contact": "Leland_Wyman43@hotmail.com",
    "fiscalID": 50453034,
    "bank": "Personal Loan Account",
    "bankAccount": "QA91PHLKA80HF02599424028P898P"
  },
  {
    "id": "7cf3d113-f51b-4200-9830-e33e6fdbead6",
    "name": "Swaniawski and Sons",
    "contact": "Melyna.Wolf20@hotmail.com",
    "fiscalID": 74879123,
    "bank": "Home Loan Account",
    "bankAccount": "ME69801030005205057518"
  },
  {
    "id": "2774de95-8134-4f30-8e90-d3fb8010c052",
    "name": "Murray and Sons",
    "contact": "Gillian_Hilpert99@yahoo.com",
    "fiscalID": 87062741,
    "bank": "Personal Loan Account",
    "bankAccount": "PS282P46054803022027600647541"
  },
  {
    "id": "2782595c-cdf8-4799-96c2-56beb6e9fc99",
    "name": "Herzog and Sons",
    "contact": "Marjorie.Morar15@hotmail.com",
    "fiscalID": 58953478,
    "bank": "Credit Card Account",
    "bankAccount": "KW42GYPK82B2V41974626NS8032252"
  },
  {
    "id": "037b889c-3ce4-42d5-b8be-53b39f703ac2",
    "name": "Pollich and Sons",
    "contact": "Tyra_Swaniawski@yahoo.com",
    "fiscalID": 62248506,
    "bank": "Credit Card Account",
    "bankAccount": "DO76EQJD11263729003200301006"
  },
  {
    "id": "99181657-e1d1-4736-a88d-f2372a619ac2",
    "name": "Kovacek, MacGyver and Schmitt",
    "contact": "Marjory.Labadie@yahoo.com",
    "fiscalID": 86600668,
    "bank": "Auto Loan Account",
    "bankAccount": "GB50TDID52011855627595"
  }
]

export const DEPARTMENTS = [
  {
    id:3,
    name:'IT',
    description:'În departamentul nostru avem misiunea de a crea platforme virtuale construind site-uri interactive, atrăgătoare şi ingenioase care găzduiesc identitatea online a asociaţiei şi promovează proiectele asociaţiei.',
  },
  {
    id: 2,
    name:'Relații externe',
    description: 'Departamentului nostru îi revine misiunea de a contacta și de a mentine o relație apropiată cu partenerii proiectelor ASII – relatie ce se bazează pe încredere și respect reciproc. Partenerii sunt entitățile (companii IT și non-IT, ONG-uri) care ne ajută să punem în practică ideile asociației.',
  },
  {
    id: 1,
    name: 'Relații interne',
    description: 'Departementul nostru are misiunea importantă de a organiza activități de socializare atractive, sesiuni de team-building distractive și evenimente care să aducă o dispoziție cât mai bună membrilor asociației.'
  },
  {
    id: 4,
    name: 'Proiecte',
    description: 'Departamentul nostru are misiunea de a veni cu idei cât mai originale şi mai interesante pentru proiecte. Ideile cu care venim trebuie să îi ajute pe toţi cei implicaţi în proiect (beneficiari şi proiectanţi) şi care să consolideze imaginea asociaţiei ca membru activ al societăţii. De asemenea noi realizăm mapele de proiect, monitorizăm implementarea proiectelor şi alcătuim raportul evaluării proiectului (ce a mers şi ce nu a mers bine).'
  },
  {
    id: 5,
    name: 'PR&M',
    description: 'Imaginea asociaţiei spre publicul larg este în mâinile noastre. Responsabilitatea noastră constă în oferirea unei identităţi vizuale fiecărui proiect (logo-uri, afişe, flyere) şi în promovarea lor pe fiecare canal disponibil(presă locală, social media, blog). Misiunea noastră este să fim partea spontană şi creativă a acestei asociaţii.'
  }
]

export const VOLUNTEERS = [
  {
    "firstname": "Tillman",
    "lastname": "Koch",
    "email": "tillman.koch@volport.com",
    "departmentId": 4,
    "joinDate": "2022-07-09"
  },
  {
    "firstname": "Beulah",
    "lastname": "Wilkinson",
    "email": "beulah*wilkinson@volport.com",
    "departmentId": 5,
    "joinDate": "2022-11-19"
  },
  {
    "firstname": "Elvera",
    "lastname": "Lockman",
    "email": "elvera38@volport.com",
    "departmentId": 5,
    "joinDate": "2023-02-23"
  },
  {
    "firstname": "Zora",
    "lastname": "Hermann",
    "email": "zora~hermann@volport.com",
    "departmentId": 3,
    "joinDate": "2022-07-18"
  },
  {
    "firstname": "Rebecca",
    "lastname": "Kessler",
    "email": "rebecca?kessler99@volport.com",
    "departmentId": 5,
    "joinDate": "2022-09-28"
  },
  {
    "firstname": "Westley",
    "lastname": "Bernhard",
    "email": "westley11@volport.com",
    "departmentId": 4,
    "joinDate": "2023-05-09"
  },
  {
    "firstname": "Sharon",
    "lastname": "Nienow",
    "email": "sharon$nienow@volport.com",
    "departmentId": 5,
    "joinDate": "2023-05-17"
  },
  {
    "firstname": "Consuelo",
    "lastname": "Beahan",
    "email": "consuelo68@volport.com",
    "departmentId": 2,
    "joinDate": "2023-04-26"
  },
  {
    "firstname": "Leonora",
    "lastname": "Monahan",
    "email": "leonora_monahan@volport.com",
    "departmentId": 5,
    "joinDate": "2022-12-11"
  },
  {
    "firstname": "Abagail",
    "lastname": "Walter",
    "email": "abagail70@volport.com",
    "departmentId": 2,
    "joinDate": "2022-07-11"
  },
  {
    "firstname": "Danika",
    "lastname": "Kertzmann",
    "email": "danika_kertzmann82@volport.com",
    "departmentId": 4,
    "joinDate": "2023-03-05"
  },
  {
    "firstname": "Bobby",
    "lastname": "Will",
    "email": "bobby_will@volport.com",
    "departmentId": 4,
    "joinDate": "2022-11-13"
  },
  {
    "firstname": "Makayla",
    "lastname": "Swift",
    "email": "makayla69@volport.com",
    "departmentId": 1,
    "joinDate": "2023-01-13"
  },
  {
    "firstname": "Felicia",
    "lastname": "Wisozk",
    "email": "felicia75@volport.com",
    "departmentId": 5,
    "joinDate": "2022-09-16"
  },
  {
    "firstname": "Sedrick",
    "lastname": "Cummings",
    "email": "sedrick=cummings85@volport.com",
    "departmentId": 4,
    "joinDate": "2023-06-22"
  },
  {
    "firstname": "Marianna",
    "lastname": "Purdy",
    "email": "marianna_purdy@volport.com",
    "departmentId": 4,
    "joinDate": "2023-04-13"
  },
  {
    "firstname": "Ursula",
    "lastname": "Monahan",
    "email": "ursula.monahan@volport.com",
    "departmentId": 1,
    "joinDate": "2023-01-22"
  },
  {
    "firstname": "Princess",
    "lastname": "Turner",
    "email": "princess~turner69@volport.com",
    "departmentId": 1,
    "joinDate": "2023-05-10"
  },
  {
    "firstname": "Kristian",
    "lastname": "Tillman",
    "email": "kristian_tillman26@volport.com",
    "departmentId": 1,
    "joinDate": "2022-07-19"
  },
  {
    "firstname": "Adell",
    "lastname": "Christiansen",
    "email": "adell_christiansen@volport.com",
    "departmentId": 1,
    "joinDate": "2022-10-29"
  },
  {
    "firstname": "Merl",
    "lastname": "Bogisich",
    "email": "merl98@volport.com",
    "departmentId": 4,
    "joinDate": "2023-01-05"
  },
  {
    "firstname": "Laurie",
    "lastname": "Stanton",
    "email": "laurie41@volport.com",
    "departmentId": 3,
    "joinDate": "2022-12-18"
  },
  {
    "firstname": "Clark",
    "lastname": "Simonis",
    "email": "clark_simonis@volport.com",
    "departmentId": 3,
    "joinDate": "2022-08-08"
  },
  {
    "firstname": "Maximillia",
    "lastname": "Glover",
    "email": "maximillia.glover78@volport.com",
    "departmentId": 2,
    "joinDate": "2023-01-10"
  },
  {
    "firstname": "Maegan",
    "lastname": "Little",
    "email": "maegan_little24@volport.com",
    "departmentId": 5,
    "joinDate": "2023-04-27"
  },
  {
    "firstname": "Mark",
    "lastname": "Koepp-Moore",
    "email": "mark38@volport.com",
    "departmentId": 4,
    "joinDate": "2023-01-17"
  },
  {
    "firstname": "Orpha",
    "lastname": "Quitzon",
    "email": "orpha45@volport.com",
    "departmentId": 4,
    "joinDate": "2022-08-03"
  },
  {
    "firstname": "Jessy",
    "lastname": "Pouros",
    "email": "jessy=pouros26@volport.com",
    "departmentId": 5,
    "joinDate": "2022-08-06"
  },
  {
    "firstname": "Adele",
    "lastname": "Brakus",
    "email": "adele.brakus@volport.com",
    "departmentId": 4,
    "joinDate": "2022-09-26"
  },
  {
    "firstname": "Tessie",
    "lastname": "Kuhn",
    "email": "tessie5@volport.com",
    "departmentId": 3,
    "joinDate": "2022-08-03"
  },
  {
    "firstname": "Lysanne",
    "lastname": "Roberts",
    "email": "lysanne.roberts@volport.com",
    "departmentId": 1,
    "joinDate": "2022-10-02"
  },
  {
    "firstname": "Melvina",
    "lastname": "Hahn",
    "email": "melvina11@volport.com",
    "departmentId": 1,
    "joinDate": "2023-04-28"
  },
  {
    "firstname": "Neal",
    "lastname": "Daugherty",
    "email": "neal84@volport.com",
    "departmentId": 1,
    "joinDate": "2022-07-24"
  },
  {
    "firstname": "Isom",
    "lastname": "Blanda",
    "email": "isom_blanda@volport.com",
    "departmentId": 5,
    "joinDate": "2022-08-01"
  },
  {
    "firstname": "Sincere",
    "lastname": "Wiza",
    "email": "sincere.wiza@volport.com",
    "departmentId": 4,
    "joinDate": "2022-09-19"
  },
  {
    "firstname": "Blaze",
    "lastname": "Schmitt",
    "email": "blaze99@volport.com",
    "departmentId": 1,
    "joinDate": "2022-06-30"
  },
  {
    "firstname": "Shaun",
    "lastname": "Ernser",
    "email": "shaun_ernser29@volport.com",
    "departmentId": 2,
    "joinDate": "2022-09-29"
  },
  {
    "firstname": "Adolph",
    "lastname": "Turner",
    "email": "adolph_turner@volport.com",
    "departmentId": 1,
    "joinDate": "2022-08-07"
  },
  {
    "firstname": "Hershel",
    "lastname": "Conn",
    "email": "hershel20@volport.com",
    "departmentId": 4,
    "joinDate": "2023-03-06"
  },
  {
    "firstname": "Royal",
    "lastname": "Gutkowski",
    "email": "royal42@volport.com",
    "departmentId": 5,
    "joinDate": "2022-10-23"
  },
  {
    "firstname": "Payton",
    "lastname": "Ernser",
    "email": "payton41@volport.com",
    "departmentId": 5,
    "joinDate": "2023-04-20"
  },
  {
    "firstname": "Shana",
    "lastname": "Kiehn",
    "email": "shana79@volport.com",
    "departmentId": 1,
    "joinDate": "2022-06-27"
  },
  {
    "firstname": "Jaylan",
    "lastname": "Bins",
    "email": "jaylan.bins98@volport.com",
    "departmentId": 2,
    "joinDate": "2023-04-18"
  },
  {
    "firstname": "Sydni",
    "lastname": "Mann",
    "email": "sydni?mann69@volport.com",
    "departmentId": 2,
    "joinDate": "2023-06-04"
  },
  {
    "firstname": "Laverna",
    "lastname": "Schneider",
    "email": "laverna_schneider87@volport.com",
    "departmentId": 2,
    "joinDate": "2023-03-17"
  },
  {
    "firstname": "Alf",
    "lastname": "Bernhard",
    "email": "alf.bernhard@volport.com",
    "departmentId": 1,
    "joinDate": "2023-01-31"
  },
  {
    "firstname": "Francis",
    "lastname": "Robel",
    "email": "francis_robel86@volport.com",
    "departmentId": 5,
    "joinDate": "2023-06-23"
  },
  {
    "firstname": "Madisen",
    "lastname": "O'Kon",
    "email": "madisen59@volport.com",
    "departmentId": 2,
    "joinDate": "2022-08-20"
  },
  {
    "firstname": "Jacynthe",
    "lastname": "Franecki",
    "email": "jacynthe_franecki54@volport.com",
    "departmentId": 4,
    "joinDate": "2023-05-10"
  },
  {
    "firstname": "Eugenia",
    "lastname": "Howe",
    "email": "eugenia53@volport.com",
    "departmentId": 4,
    "joinDate": "2022-12-17"
  },
  {
    "firstname": "Terrell",
    "lastname": "Swaniawski",
    "email": "terrell$swaniawski@volport.com",
    "departmentId": 1,
    "joinDate": "2022-07-27"
  },
  {
    "firstname": "Cary",
    "lastname": "Gorczany",
    "email": "cary84@volport.com",
    "departmentId": 1,
    "joinDate": "2022-10-09"
  },
  {
    "firstname": "Ian",
    "lastname": "Pouros",
    "email": "ian.pouros@volport.com",
    "departmentId": 3,
    "joinDate": "2022-12-11"
  },
  {
    "firstname": "Dana",
    "lastname": "Rodriguez",
    "email": "dana#rodriguez@volport.com",
    "departmentId": 4,
    "joinDate": "2023-06-04"
  },
  {
    "firstname": "Obie",
    "lastname": "Greenfelder",
    "email": "obie_greenfelder@volport.com",
    "departmentId": 3,
    "joinDate": "2023-01-18"
  },
  {
    "firstname": "Yasmine",
    "lastname": "Hessel",
    "email": "yasmine_hessel@volport.com",
    "departmentId": 1,
    "joinDate": "2023-03-29"
  },
  {
    "firstname": "Logan",
    "lastname": "Grimes",
    "email": "logan.grimes28@volport.com",
    "departmentId": 2,
    "joinDate": "2022-07-10"
  },
  {
    "firstname": "Alyce",
    "lastname": "Williamson",
    "email": "alyce/williamson48@volport.com",
    "departmentId": 3,
    "joinDate": "2022-12-28"
  },
  {
    "firstname": "Barton",
    "lastname": "Cronin",
    "email": "barton74@volport.com",
    "departmentId": 5,
    "joinDate": "2022-11-27"
  },
  {
    "firstname": "Buford",
    "lastname": "Ortiz",
    "email": "buford47@volport.com",
    "departmentId": 3,
    "joinDate": "2022-07-27"
  },
  {
    "firstname": "Abbie",
    "lastname": "Koepp",
    "email": "abbie!koepp21@volport.com",
    "departmentId": 1,
    "joinDate": "2022-11-13"
  },
  {
    "firstname": "Elda",
    "lastname": "Dooley",
    "email": "elda&dooley66@volport.com",
    "departmentId": 5,
    "joinDate": "2022-11-09"
  },
  {
    "firstname": "Lue",
    "lastname": "Torphy",
    "email": "lue_torphy26@volport.com",
    "departmentId": 3,
    "joinDate": "2022-09-26"
  },
  {
    "firstname": "Myrtle",
    "lastname": "Buckridge",
    "email": "myrtle.buckridge@volport.com",
    "departmentId": 1,
    "joinDate": "2023-02-26"
  },
  {
    "firstname": "Allan",
    "lastname": "Carter",
    "email": "allan_carter@volport.com",
    "departmentId": 1,
    "joinDate": "2022-08-06"
  },
  {
    "firstname": "Emanuel",
    "lastname": "Wuckert",
    "email": "emanuel.wuckert46@volport.com",
    "departmentId": 1,
    "joinDate": "2023-04-21"
  },
  {
    "firstname": "Kamryn",
    "lastname": "Grady",
    "email": "kamryn17@volport.com",
    "departmentId": 2,
    "joinDate": "2023-05-15"
  },
  {
    "firstname": "Ruben",
    "lastname": "Glover",
    "email": "ruben/glover@volport.com",
    "departmentId": 4,
    "joinDate": "2023-03-15"
  },
  {
    "firstname": "Napoleon",
    "lastname": "Gibson",
    "email": "napoleon_gibson@volport.com",
    "departmentId": 5,
    "joinDate": "2023-01-10"
  },
  {
    "firstname": "Travis",
    "lastname": "Metz",
    "email": "travis|metz68@volport.com",
    "departmentId": 5,
    "joinDate": "2022-11-06"
  },
  {
    "firstname": "Juliet",
    "lastname": "Wilkinson",
    "email": "juliet.wilkinson@volport.com",
    "departmentId": 1,
    "joinDate": "2023-04-10"
  },
  {
    "firstname": "Lenora",
    "lastname": "Vandervort",
    "email": "lenora&vandervort60@volport.com",
    "departmentId": 5,
    "joinDate": "2022-08-31"
  },
  {
    "firstname": "Cletus",
    "lastname": "Jenkins",
    "email": "cletus39@volport.com",
    "departmentId": 1,
    "joinDate": "2023-06-20"
  },
  {
    "firstname": "Afton",
    "lastname": "Ruecker",
    "email": "afton_ruecker3@volport.com",
    "departmentId": 1,
    "joinDate": "2022-09-11"
  },
  {
    "firstname": "Agnes",
    "lastname": "Hodkiewicz",
    "email": "agnes26@volport.com",
    "departmentId": 4,
    "joinDate": "2023-03-01"
  },
  {
    "firstname": "Laila",
    "lastname": "Brakus",
    "email": "laila_brakus@volport.com",
    "departmentId": 2,
    "joinDate": "2023-04-19"
  },
  {
    "firstname": "Cody",
    "lastname": "Upton",
    "email": "cody89@volport.com",
    "departmentId": 5,
    "joinDate": "2022-11-29"
  },
  {
    "firstname": "Josue",
    "lastname": "Dicki",
    "email": "josue96@volport.com",
    "departmentId": 3,
    "joinDate": "2022-10-21"
  },
  {
    "firstname": "Kaya",
    "lastname": "Ledner",
    "email": "kaya22@volport.com",
    "departmentId": 1,
    "joinDate": "2022-11-13"
  },
  {
    "firstname": "Sage",
    "lastname": "Moen",
    "email": "sage_moen84@volport.com",
    "departmentId": 2,
    "joinDate": "2022-07-09"
  },
  {
    "firstname": "Lee",
    "lastname": "Ondricka",
    "email": "lee13@volport.com",
    "departmentId": 4,
    "joinDate": "2022-09-03"
  },
  {
    "firstname": "Amaya",
    "lastname": "Runolfsson-Wyman",
    "email": "amaya21@volport.com",
    "departmentId": 1,
    "joinDate": "2022-11-29"
  },
  {
    "firstname": "Gilda",
    "lastname": "Swift",
    "email": "gilda.swift46@volport.com",
    "departmentId": 3,
    "joinDate": "2022-11-15"
  },
  {
    "firstname": "Jerrod",
    "lastname": "Frami",
    "email": "jerrod+frami@volport.com",
    "departmentId": 4,
    "joinDate": "2022-07-18"
  },
  {
    "firstname": "Lily",
    "lastname": "Stanton",
    "email": "lily77@volport.com",
    "departmentId": 3,
    "joinDate": "2023-01-10"
  },
  {
    "firstname": "Lenora",
    "lastname": "Kuhlman",
    "email": "lenora66@volport.com",
    "departmentId": 5,
    "joinDate": "2022-09-22"
  },
  {
    "firstname": "Cordia",
    "lastname": "Witting",
    "email": "cordia.witting@volport.com",
    "departmentId": 3,
    "joinDate": "2023-05-30"
  },
  {
    "firstname": "Kenya",
    "lastname": "Boyle",
    "email": "kenya.boyle93@volport.com",
    "departmentId": 1,
    "joinDate": "2022-12-10"
  },
  {
    "firstname": "Luciano",
    "lastname": "Denesik",
    "email": "luciano88@volport.com",
    "departmentId": 1,
    "joinDate": "2022-07-12"
  },
  {
    "firstname": "Mae",
    "lastname": "Lubowitz",
    "email": "mae.lubowitz65@volport.com",
    "departmentId": 4,
    "joinDate": "2022-11-26"
  },
  {
    "firstname": "Karlee",
    "lastname": "Leuschke",
    "email": "karlee_leuschke@volport.com",
    "departmentId": 5,
    "joinDate": "2022-09-16"
  },
  {
    "firstname": "Amparo",
    "lastname": "Walker-Kunde",
    "email": "amparo24@volport.com",
    "departmentId": 4,
    "joinDate": "2022-12-17"
  },
  {
    "firstname": "Trycia",
    "lastname": "Ortiz",
    "email": "trycia.ortiz57@volport.com",
    "departmentId": 1,
    "joinDate": "2023-02-22"
  },
  {
    "firstname": "Pierre",
    "lastname": "Morar",
    "email": "pierre40@volport.com",
    "departmentId": 1,
    "joinDate": "2023-01-08"
  },
  {
    "firstname": "Sheldon",
    "lastname": "Mraz",
    "email": "sheldon.mraz@volport.com",
    "departmentId": 1,
    "joinDate": "2022-07-04"
  },
  {
    "firstname": "Meaghan",
    "lastname": "Cole",
    "email": "meaghan75@volport.com",
    "departmentId": 2,
    "joinDate": "2022-08-09"
  },
  {
    "firstname": "Elisa",
    "lastname": "Crist",
    "email": "elisa3@volport.com",
    "departmentId": 4,
    "joinDate": "2023-05-24"
  },
  {
    "firstname": "Garett",
    "lastname": "Jerde",
    "email": "garett+jerde@volport.com",
    "departmentId": 5,
    "joinDate": "2022-10-20"
  },
  {
    "firstname": "Valerie",
    "lastname": "Heathcote",
    "email": "valerie%heathcote@volport.com",
    "departmentId": 2,
    "joinDate": "2022-12-11"
  },
  {
    "firstname": "Catalina",
    "lastname": "Heller",
    "email": "catalina!heller@volport.com",
    "departmentId": 1,
    "joinDate": "2022-10-15"
  },
  {
    "firstname": "Trycia",
    "lastname": "Sipes",
    "email": "trycia?sipes25@volport.com",
    "departmentId": 5,
    "joinDate": "2023-04-06"
  },
  {
    "firstname": "Alessia",
    "lastname": "Corkery",
    "email": "alessia.corkery@volport.com",
    "departmentId": 3,
    "joinDate": "2023-02-04"
  },
  {
    "firstname": "Leonie",
    "lastname": "Harber",
    "email": "leonie0@volport.com",
    "departmentId": 2,
    "joinDate": "2022-11-18"
  },
  {
    "firstname": "Alexys",
    "lastname": "Rempel",
    "email": "alexys.rempel16@volport.com",
    "departmentId": 5,
    "joinDate": "2023-03-21"
  },
  {
    "firstname": "Gussie",
    "lastname": "Barrows",
    "email": "gussie%barrows@volport.com",
    "departmentId": 5,
    "joinDate": "2022-08-28"
  },
  {
    "firstname": "Antone",
    "lastname": "Feeney",
    "email": "antone38@volport.com",
    "departmentId": 4,
    "joinDate": "2023-04-15"
  },
  {
    "firstname": "Emelie",
    "lastname": "Turner",
    "email": "emelie_turner92@volport.com",
    "departmentId": 3,
    "joinDate": "2022-12-25"
  },
  {
    "firstname": "Wilburn",
    "lastname": "Bins",
    "email": "wilburn41@volport.com",
    "departmentId": 1,
    "joinDate": "2022-07-02"
  },
  {
    "firstname": "Deshaun",
    "lastname": "Heathcote-Monahan",
    "email": "deshaun.heathcote-monahan88@volport.com",
    "departmentId": 4,
    "joinDate": "2023-04-24"
  },
  {
    "firstname": "Skye",
    "lastname": "Casper",
    "email": "skye`casper76@volport.com",
    "departmentId": 2,
    "joinDate": "2023-01-09"
  },
  {
    "firstname": "Kevon",
    "lastname": "Boehm",
    "email": "kevon_boehm@volport.com",
    "departmentId": 2,
    "joinDate": "2022-07-05"
  },
  {
    "firstname": "Taya",
    "lastname": "Weber",
    "email": "taya_weber48@volport.com",
    "departmentId": 4,
    "joinDate": "2022-08-08"
  },
  {
    "firstname": "Sonny",
    "lastname": "Little",
    "email": "sonny_little@volport.com",
    "departmentId": 5,
    "joinDate": "2023-02-28"
  },
  {
    "firstname": "Kasey",
    "lastname": "Schowalter",
    "email": "kasey35@volport.com",
    "departmentId": 2,
    "joinDate": "2023-01-20"
  },
  {
    "firstname": "Magnolia",
    "lastname": "Conn",
    "email": "magnolia?conn26@volport.com",
    "departmentId": 1,
    "joinDate": "2022-11-08"
  },
  {
    "firstname": "Winnifred",
    "lastname": "Murphy",
    "email": "winnifred^murphy@volport.com",
    "departmentId": 2,
    "joinDate": "2023-04-28"
  },
  {
    "firstname": "Naomie",
    "lastname": "Schmidt",
    "email": "naomie'schmidt54@volport.com",
    "departmentId": 3,
    "joinDate": "2022-08-16"
  },
  {
    "firstname": "Coleman",
    "lastname": "Schroeder",
    "email": "coleman_schroeder@volport.com",
    "departmentId": 4,
    "joinDate": "2023-05-20"
  },
  {
    "firstname": "Magali",
    "lastname": "Hermiston",
    "email": "magali#hermiston82@volport.com",
    "departmentId": 1,
    "joinDate": "2023-01-10"
  },
  {
    "firstname": "Fermin",
    "lastname": "Aufderhar",
    "email": "fermin23@volport.com",
    "departmentId": 4,
    "joinDate": "2023-04-17"
  },
  {
    "firstname": "Horace",
    "lastname": "Bergstrom",
    "email": "horace13@volport.com",
    "departmentId": 2,
    "joinDate": "2022-11-17"
  },
  {
    "firstname": "Avis",
    "lastname": "Parisian",
    "email": "avis34@volport.com",
    "departmentId": 4,
    "joinDate": "2022-08-12"
  },
  {
    "firstname": "Colleen",
    "lastname": "Dare",
    "email": "colleen.dare74@volport.com",
    "departmentId": 2,
    "joinDate": "2023-06-02"
  },
  {
    "firstname": "Jermain",
    "lastname": "Bernier",
    "email": "jermain.bernier@volport.com",
    "departmentId": 1,
    "joinDate": "2023-01-06"
  },
  {
    "firstname": "Kali",
    "lastname": "Cormier",
    "email": "kali_cormier@volport.com",
    "departmentId": 2,
    "joinDate": "2022-10-04"
  },
  {
    "firstname": "Gladys",
    "lastname": "Daniel",
    "email": "gladys23@volport.com",
    "departmentId": 1,
    "joinDate": "2023-01-27"
  }
]