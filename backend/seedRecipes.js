const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Povezano sa MongoDB.'))
  .catch((err) => console.error('Greška pri povezivanju:', err));




const seedRecepti = [
  {
    naziv: "Jogurt sladoled",
    sastojci: [
      "500 ml običnog ili grčkog jogurta",
      "2 banane",
      "200g malina",
      "1 Dolcela Limun šećer",
      "voće po želji"
    ],
    priprema: [
      "Za bijeli sladoled, u blender stavite 250 ml običnog ili grčkog jogurta, dodajte banane i usitnite da dobijete glatku bijelu smjesu.",
      "Za ružičasti sladoled, u čist blender stavite preostali jogurt, dodajte maline, limun šećer i miješajte dok ne dobijete glatku ružičastu smjesu.",
      "U kalupe za sladoled dodajte voće po želji. Voće prelijte sa smjesom jogurta i banane za bijele sladolede ili smjesom jogurta i malina za ružičaste sladolede.",
      "Kalupe ostavite u zamrzivaču preko noći."
    ],
    vreme: "15 min",
    slika: "https://piovariations.cdn.podravka.net/720b3d54-609e-11f0-b83b-46b1c4d84b92/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92bb'), 
    ],
    createdAt: new Date('2025-06-15'),
    user: '688f73033708e0cb89ef4adf'
  },
  {
    naziv: "Letnja salata sa borovnicama i feta sirom",
    sastojci: [
      "200g mix zelene salate",
      "100g borovnica",
      "80g feta sira",
      "30g oraha",
      "20g aceto balsamico"
    ],
    priprema: [
      "Salatu rasporediti po tanjiru.",
      "Dodati mrvljenu ili na kocke isečen feta sir.",
      "Rasporediti borovnice.",
      "Dodati orahe.",
      "Zaciniti balzamikom."
    ],
    vreme: "10min",
    slika: "https://piovariations.cdn.podravka.net/7ad252fc-633b-11f0-bf44-46b1c4d84b92/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92b2'), 
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92b8'), 
    ],
    createdAt: new Date('2025-06-15'),
    user: '688f733e3708e0cb89ef4ae2'
  },
  {
    naziv: "Bloody Berry torta",
    sastojci: [
      "300g Podravka Oštrog brašna",
      "100g kakaa",
      "300 g šećera",
      "½ Dolcela Praška za pecivo",
      "1 i ½ žličica Dolcela Sode bikarbone",
      "prstohvat soli",
      "2 jaja",
      "1 Dolcela Vanilin šećer",
      "125 ml ulja",
      "250 ml mlijeka",
      "250 ml vrele vode"
    ],
    priprema: [
      "Prvo pripremite čokoladni biskvit. U jednoj posudi pomiješajte sve suhe sastojke: brašno, prosijani kakao, šećer, prašak za pecivo, sodu bikarbonu i sol.",
      "U drugu posudu razbijte cijela jaja, dodajte vanilin šećer i ulje, pa kratko promiješajte mikserom na najmanjoj brzini tek toliko da se sjedini. Dodajte mlijeko te naizmjenično dodajte suhe sastojke i vruću vodu, miješajući mikserom na najmanjoj brzini dok ne dobijete glatku smjesu bez grudica. Smjesa će biti rijetka, ali tako treba.",
      "Pripremite 3 kalupa Ø 24 ili 26 cm i obložite im dno papirom za pečenje. Smjesu za biskvit razdijelite na 3 jednaka dijela.",
      "U svaki kalup ulijte smjesu pa svaki biskvit pecite u pećnici zagrijanoj na 180°C 20-25 minuta. Pečene biskvite stavite na rešetku da se ohlade.",
      "Za vanilija kremu, u malo mlijeka izmiješajte puding tako da ne bude grudica. Ostatak mlijeka ulijte u posudu, dodajte šećer, vanilin šećer i zagrijavajte do vrenja. Skinite s vatre, ukuhajte puding ulijevajući u tankom mlazu sve vrijeme miješajući, pa kuhajte par minuta dok se ne zgusne. Pokrijte prozirnom folijom i ostavite da se potpuno ohladi na sobnoj temperaturi.",
      "Za berry nadjev, stavite u posudu smrznuto šumsko voće, dodajte šećer, vanilin šećer, limunov sok i malo vode od ukupne količine. Zagrijavajte na srednjoj vatri dok se voće ne otopi. Kuhajte nekoliko minuta da se voće raspadne, pa skinite s vatre i usitnite štapnim mikserom.",
      "U ostatku vode razmutite Gussnel, umiješajte u usitnjeno voće, vratite na vatru i kuhajte par minuta dok se ne zgusne. Odmah u vruće dodajte maslac i miješajte dok se ne otopi i sjedini u gladak nadjev. Pokrijte prozirnom folijom i ostavite da se hladi na sobnoj temperaturi."
    ],
    vreme: "95min",
    slika: "https://piovariations.cdn.podravka.net/893116e0-62fe-11f0-8e4a-46b1c4d84b92/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92bb'), 
    ],
    createdAt: new Date('2025-06-15'),
    user: '688f733e3708e0cb89ef4ae2'

  },
  {
    naziv: "Zapečene pileće šnicle",
    sastojci: [
      "600 g pilećih odrezaka",
      "250 ml slatkog vrhnja",
      "2 žlice ulja",
      "50 g naribanog sira edamera",
      "2 žličice Vegete Natur za piletinu"],
    priprema: [
      "Korak 1: Piletinu narežite na tanje odreske i pospite Vegetom Natur za piletinu pa neka odstoji oko 30 minuta. ",
      "Korak 2: Odreske popecite u tavi na zagrijanom ulju sa svake strane oko 5 minuta, do zlatno žute boje.",
      "Korak 3: Pripremljene odreske stavite u vatrostalnu posudu, prelijte slatkim vrhnjem, pospite naribanim sirom i pecite u pećnici zagrijanoj na 230°C oko 10 minuta."
    ],
    vreme: "30 minuta",
    slika: "https://piovariations.cdn.podravka.net/f5387772-610d-11eb-be50-0242ac12001b/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92b2'), 
    ],
    createdAt: new Date('2025-06-15'),
    user: '688f733e3708e0cb89ef4ae2'
  },
  {
    naziv: "Pileći ražnjići s povrćem",
    sastojci: [
      "500 g pilećih fileta",
      "200 g svježe crvene paprike",
      "100 g tikvica",
      "100 g mladog luka",
      "200 g šampinjona",
      "200 ml tamnog piva",
      "4 - 5 žlica ulja",
      "1 žlica Vegete Natur za piletinu"
    ],
    priprema: [
      "Pileće filete narežite na kockice, stavite u dublju zdjelu i pospite Vegetom Natur za piletinu.",
      "Opranu papriku očistite od sjemenki pa je isto tako narežite na kockice. Bijeli dio očišćenog mladog luka narežite na veće komade, oprane šampinjone na četvrtine, a tikvice na kocke.",
      "Narezano povrće malo posolite, dodajte piletinu, zalijte pivom i sve dobro promiješajte.",
      "Meso s povrćem pokrijte i ostavite stajati na hladnome mjestu oko 30 minuta, a zatim nanižite na drvene štapiće za ražnjiće.",
      "Rešetku za roštilj ili tavu premažite uljem i dobro zagrijte. Pripremljene ražnjiće pecite sa svih strana dok ne postanu zlatnožuti."
    ],
    vreme: "45 minuta",
    slika: "https://piovariations.cdn.podravka.net/f47b22f8-610d-11eb-88fa-0242ac12001d/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92b2'), 
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92b5'), 
    ],
    createdAt: new Date('2025-08-13'),
    user: '688f733e3708e0cb89ef4ae2'
  },
  {
    naziv: "Pečena mlada piletina",
    sastojci: [
      "piletina (oko 1 kg)",
      "50 g brašna",
      "300-400 ml mlijeka",
      "50-100 ml ulja",
      "2 žlice Vegete Natur za piletinu"
    ],
    priprema: [
      "U dublju zdjelu stavite piletinu narezanu na veće komade, prelijte je mlijekom i ostavite stajati oko sat vremena.",
      "Izvadite meso iz mlijeka, posušite papirnim ubrusom i uvaljajte u brašno pomiješano s Vegetom Natur za piletinu.",
      "Kratko je popecite u tavi na malo ulja sa svih strana, a zatim stavite u zagrijanu pećnicu i pecite 35-40 minuta na 180-200°C."
    ],
    vreme: "60 minuta",
    slika: "https://piovariations.cdn.podravka.net/e4d7df6c-610d-11eb-8e3b-0242ac120016/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92b2'), 
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92b5'), 
    ],
    createdAt: new Date('2025-07-18'),
    user: '688f73033708e0cb89ef4adf'
  },
  {
    naziv: "Piletina s rižom iz pećnice",
    sastojci: [
      "3-4 žlice ulja",
      "800 g piletine (batak, zabatak, pileća prsa)",
      "2 žličice Vegete",
      "150 g luka",
      "250 g svježe rajčice",
      "300 g svježe paprike",
      "500 ml vode",
      "1 Podravka Povrtna kocka",
      "350 g riže",
      "100 ml Podravka Passate"
    ],
    priprema: [
      "Na zagrijanom ulju popecite pileće meso, pospite Vegetom, podlijte s malo vode i pirjajte oko 15 minuta.",
      "Meso izvadite iz posude i stavite na toplo mjesto.",
      "Na istoj masnoći popecite nasjeckani luk i kratko ga popirjajte. Dodajte rajčice narezane na kockice, a zatim i papriku narezanu na veće kocke i zajedno pirjajte oko 10 minuta.",
      "U drugoj posudi zakipite vodu, dodajte kocku i kuhajte 1-2 minute.",
      "Na lim (vel. 33×21 cm) rasporedite rižu, po riži rasporedite pripremljenu piletinu, pirjano povrće i zalijte passatom i temeljcem koji ste pripremili od kocki.",
      "Ovako pripremljenu rižu pecite u pećnici zagrijanoj na 200°C oko 30 minuta."
    ],
    vreme: "60 minuta",
    slika: "https://piovariations.cdn.podravka.net/b21dd7aa-63bc-11eb-b57b-0242ac12001a/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92b2'), 
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92b5'), 
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92b8'), 
    ],
    createdAt: new Date('2025-07-04'),
    user: '688f73543708e0cb89ef4ae7'
  },
  {
    naziv: "Pileća krem čorba",
    sastojci: [
      "100g putera",
      "1 glavica crnog luka",
      "3 čena belog luka",
      "1/2 cup sitno seckanog celera",
      "1 komad manje šargarepe",
      "1 komad manjih pilećih prsa",
      "2-3 cups bistre pileće supe sačuvane od barenih pilećih prsa",
      "3 cups mleka",
      "1 kašika brašna",
      "so i biber po želji"
    ],
    priprema: [
      "Obariti 10 min pileća prsa prethodno očišćenih od masnoće i žilica i dodati malo soli. Supu procediti i sačuvati, a prsa malo prohladiti.",
      "Na puteru izdinstati oljušteni i sitno iseckani crni i beli luk oko 8 min. Dodati narendanu šargarepu, seckani celer i sve zajedno dinstati još par minuta.",
      "Naliti supu, 2 cups mleka i sitno seckana pileća prsa. U preostali 1 cup mleka umutiti kašiku brašna i sipati u šerpu sa supom da vri najmanje 5 min, dok čorba ne postane gusta i kremasta. Isključiti, malo prohladiti i služiti."
    ],
    vreme: "45 minuta",
    slika: "https://piovariations.cdn.podravka.net/82ce3d5e-6421-11eb-ae21-0242ac12002a/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92b2'), 

    ],
    createdAt: new Date('2025-06-15'),
    user: '688f733e3708e0cb89ef4ae2'
  },
  {
  naziv: "Namaz od patlidžana s bademima",
  sastojci: [
    "500 g patlidžana",
    "2 češnja češnjaka",
    "5 žlica maslinova ulja",
    "3 žlice limunova soka",
    "2 žlice nasjeckanih badema",
    "sol",
    "Vegeta Maestro Crni papar mljeveni",
    "1 žličica narezanog vlasca",
    "1 žličica nasjeckanog peršina"
  ],
  priprema: [
    "Patlidžane narežite na kolutove, popecite u tavi na žlici ulja i ohladite.",
    "Dobro ih usitnite električnom miješalicom, umiješajte protisnuti češnjak, vlasac, peršin, sol i papar. Lagano dodajite preostalo maslinovo ulje i limunov sok da dobijete kremastu smjesu.",
    "Na kraju umiješajte nasjeckane bademe."
  ],
  vreme: "40 minuta",
  slika: "https://piovariations.cdn.podravka.net/c328da32-5677-11ec-a312-ae48ed498d44/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
  kategorija: [
    new mongoose.Types.ObjectId('68a24cfbd6329213330d92b2'), 
    new mongoose.Types.ObjectId('68a24cfbd6329213330d92b5'), 
    new mongoose.Types.ObjectId('68a24cfbd6329213330d92b8'), 
    ],
  createdAt: new Date('2025-06-15'),
  user: '688f73033708e0cb89ef4adf'

},
{
  naziv: "Tofu s povrćem",
  sastojci: [
    "300 g tofua",
    "3 mlada luka",
    "1 žličica sezamova ulja",
    "1 žličica cvjetni med",
    "1 žlica sojina umaka",
    "100 ml vode",
    "200 g crvene paprike",
    "400 g bukovača",
    "100 g šampinjona",
    "2 žličice nasjeckanog đumbira",
    "1 češanj češnjaka"
  ],
  priprema: [
    "U tavi popecite nasjeckani luk i papriku narezanu na rezance, a zatim ih izvadite iz tave.",
    "U istoj tavi popecite narezane gljive i dodajte povrću. Nakon toga popecite tofu narezan na kockice i protisnuti češnjak.",
    "Povrće vratite u tavu, podlijte vodom i dodajte đumbir, Vegetu, sezamovo ulje, med, sojin umak pa kratko propirjajte."
  ],
  vreme: "30 minuta",
  slika: "https://piovariations.cdn.podravka.net/f47dfadc-610d-11eb-9d2b-0242ac120034/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
  kategorija: [
    new mongoose.Types.ObjectId('68a24cfbd6329213330d92b2'), 
    new mongoose.Types.ObjectId('68a24cfbd6329213330d92b5'), 
    new mongoose.Types.ObjectId('68a24cfbd6329213330d92b8'), 
  ],
  createdAt: new Date('2025-08-10'),
  user: '688f73543708e0cb89ef4ae7'
},
{
    naziv: "Fini namaz od slanutka",
    sastojci: [
    "240 g konzerviranog Slanutka Podravka",
    "1 crni luk",
    "2-3 kašike limunovog soka",
    "50 ml maslinovog ulja",
    "1 kašika vegete",
    "1 kašika Tahini paste(pasta od seyama)"
    ],
    priprema: [
    "Slanutak ocijedite, isperite i stavite u posudu. Dodajte protisnuti češnjak.",
    "Sve dobro usitnite štapnim mikserom (ili u električnoj sjeckalici) da smjesa postane glatka.",
    "Dodajte maslinovo ulje po potrebi da namaz bude kremast."
    ],
    vreme: "30 minuta",
    slika: "https://piovariations.cdn.podravka.net/97d4bd42-1469-11ec-af9c-d627f6be7959/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92af'), 
    ],
    createdAt: new Date('2025-08-12'),
    user: "688f73543708e0cb89ef4ae7"
},
{
    naziv: "Namaz od avokada",
    sastojci: [
    "1 avokado (350g)",
    "1 kašika limunovog soka",
    "1 kašika maslinovog ulja",
    "so",
    "Vegeta",
    "1 kašika naseckanog peršuna"
    ],
  priprema: [
    "Avokado razrežite po dužini, odstranite košticu i kašikom izvadite mesnati deo.",
    "Od njega napravite pire i umešajte limunov sok, maslinovo ulje, so i peršin.",
    "Namaz servirajte u ljusci avokada."
  ],
  vreme: "20 minuta",
  slika: "https://piovariations.cdn.podravka.net/bbe17944-6403-11eb-91d3-0242ac12005a/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
  kategorija: [
    new mongoose.Types.ObjectId('68a24cfbd6329213330d92af'), 
  ],
  createdAt: new Date('2025-08-12'),
  user: "688f73543708e0cb89ef4ae7"

},
{
  naziv: "Francuski topli sendviči",
  sastojci: [
  "20g maslaca",
  "So i biber",
  "200ml mleka",
  "20g oštrog brašna",
  "4 jaja",
  "8 parčeta tost hleba",
  "2 kašike ulja",
  "50g sira",
  "50g šunke",
  "50g Kraškog vrata",
  "30g  gongonzole",
  ],
  priprema: [
  "U manjoj posudi na srednjem plamenu rastopiti maslac, dodati brašno i miješati oko 2 minuta, zaprska mora ostati svetla.",
  "Doliti hladno mlieko i dobro promješati da se ne stvore grudvice.",

  "Posoliti, zapapriti po ukusu i dodati prstohvat-dva ribanog muškatnog oraščića te i dalje lagano miješati par minuta da bešamel dobije blagu kremastu masu.",
  "U zdjeli razmutiti 2 jaja, dodati prstohvat soli i razrijediti sa preostalim mlijekom,Kriske kruha umociti u razmućenu smjesu i blago propeci s obje strane na predhodno zagrijanoj tavici s uljem.",
  "4 kriske kruha premazati bešamelom, posipati s malo naribanog sira, prekriti šunkom + vratinom i zlicom bešamela, poklopiti s preostalim kruhom..",
  "Svaki sendvic premazati bešamelom, dodati ostatak naribanog sira i staviti na grill zicu oblozenu folijom ili pek papirom.. peci u pecnici odprilike 10 minuta pazeci da ne potamne.",
  "Gorgonzolu izmrviti na malo vece komadice i ispeci 2 jaja na oko..",
  "Na 2 sendviča staviti gorgonzolu ili sir po zelji (to je 'Croc-Monsieur') vratiti ih u vrucu pecnicu na 2 minute da se sir otopi.. na druge položiti po jedno jaje na oko ( eto 'Croc-Madame') i nasjeckani zeleni zacin.",

  ],
  vreme: "30 minuta",
  slika: "https://piovariations.cdn.podravka.net/b67fb3ae-63d5-11eb-9cd6-0242ac120027/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
  kategorija: [
      new mongoose.Types.ObjectId('68a24cfbd6329213330d92af'), 
    ],
  createdAt: new Date('2025-08-12'),
  user: "688f73543708e0cb89ef4ae7"
}
];
async function seedDB() {
  try {
    console.log('Seed pokrenut...');
    await Recipe.deleteMany({}); // Ako želiš prvo očistiti ovu kolekciju
    await Recipe.insertMany(seedRecepti);
    console.log('Seed završen!');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

seedDB();