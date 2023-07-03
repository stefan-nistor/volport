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
