const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Povezano sa MongoDB."))
  .catch((err) => console.error("Greška pri povezivanju:", err));

const seedRecepti = [
  {
    naziv: "Letnja salata sa testeninom",
    sastojci: [
      "200g mix zelene salate",
      "200g mozzarele",
      "80g feta sira",
      "30g oraha",
      "20g aceto balsamico",
    ],
    priprema: [
      "Korak 1: Testeninu skuvajte u posoljenoj vodi, ocedite i ohladite.",
      "Korak 2: U činiju za salatu stavite ohlađenu testeninu, dodajte krastavac isečen na kockice, paradajz presečen na pola, stabljiku celera isečenu na kolutove i oceđeni kukuruz šećerac.",
      "Korak 3: Zatim dodajte mozzarellu isečenu na kockice, peršun i pospite sveže mlevenim biberom.",
      "Korak 4: Jogurtu dodajte paštetu sobne temperature, dobro promešajte i prelijte preko salate.",
    ],
    vreme: "20 min",
    slika:
      "https://piovariations.cdn.podravka.net/40bed6f6-63ba-11eb-9bce-0242ac12001b/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b2"),
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b8"),
    ],
    createdAt: new Date("2025-06-15"),
    user: "688f733e3708e0cb89ef4ae2",
  },
  {
    naziv: "Zapečene pileće šnicle",
    sastojci: [
      "600 g pilećih odrezaka",
      "250 ml slatkog vrhnja",
      "2 žlice ulja",
      "50 g naribanog sira edamera",
      "2 žličice Vegete Natur za piletinu",
    ],
    priprema: [
      "Korak 1: Piletinu narežite na tanje odreske i pospite Vegetom Natur za piletinu pa neka odstoji oko 30 minuta. ",
      "Korak 2: Odreske popecite u tavi na zagrijanom ulju sa svake strane oko 5 minuta, do zlatno žute boje.",
      "Korak 3: Pripremljene odreske stavite u vatrostalnu posudu, prelijte slatkim vrhnjem, pospite naribanim sirom i pecite u pećnici zagrijanoj na 230°C oko 10 minuta.",
    ],
    vreme: "30 minuta",
    slika: "https://piovariations.cdn.podravka.net/21fc6e4c-52cb-11ee-a90f-e62b91d23211/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [new mongoose.Types.ObjectId("68a24cfbd6329213330d92b2")],
    createdAt: new Date("2025-06-15"),
    user: "688f733e3708e0cb89ef4ae2",
  },
  {
    naziv: "Hrskavi pileći ražnjići",
    sastojci: [
      "500 g pilećeg filea",
      "2 kašičice Vegete Natur",
      "300 g širokih zelenih boranija",
      "3 šargarepe",
      "2 jaja",
      "so",
      "100 g kukuruznih pahuljica (cornflakes)",
      "ulje za prženje",
      "Vegeta Maestro šareni biber",
      "maslinovo ulje za posluživanje",
    ],

    priprema: [
      "Korak 1: Piletinu isecite na podjednake kockice i pospite Vegetom Natur.",
      "Korak 2: Boraniju stavite da se kuva u posoljenoj vreloj vodi zajedno sa šargarepama. Povrće skuvajte al dente, pa ga ohladite pod mlazom hladne vode. Nekoliko boranija isecite na veličinu kockica mesa.",
      "Korak 3: Jednu šargarepu isecite na kolutove, a ako je deblja, oblikujte je u kvadrat. Na drvene štapiće za ražnjiće nanižite naizmenično meso i povrće.",
      "Korak 4: Umutite jaja sa malo soli, a kukuruzne pahuljice grubo usitnite u električnoj seckalici. Pripremljene ražnjiće prvo umočite u jaja, pa uvaljajte u kukuruzne pahuljice.",
      "Korak 5: U široj posudi zagrejte ulje (oko 2 cm dubine) i ispržite ražnjiće sa svih strana dok ne dobiju zlatno–rumenu boju. Stavite ih na papirni ubrus da upije višak masnoće.",
    ],

    vreme: "45 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/c2bce752-b3c8-11eb-a23b-3e1de2b1c6d7/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b2"),
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b5"),
    ],
    createdAt: new Date("2025-08-13"),
    user: "688f733e3708e0cb89ef4ae2",
  },
  {
    naziv: "Pečena mlada piletina",
    sastojci: [
      "piletina (oko 1 kg)",
      "50 g brašna",
      "300-400 ml mlijeka",
      "50-100 ml ulja",
      "2 žlice Vegete Natur za piletinu",
    ],
    priprema: [
      "U dublju zdjelu stavite piletinu narezanu na veće komade, prelijte je mlijekom i ostavite stajati oko sat vremena.",
      "Izvadite meso iz mlijeka, posušite papirnim ubrusom i uvaljajte u brašno pomiješano s Vegetom Natur za piletinu.",
      "Kratko je popecite u tavi na malo ulja sa svih strana, a zatim stavite u zagrijanu pećnicu i pecite 35-40 minuta na 180-200°C.",
    ],
    vreme: "60 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/e4d7df6c-610d-11eb-8e3b-0242ac120016/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b2"),
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b5"),
    ],
    createdAt: new Date("2025-07-18"),
    user: "688f73033708e0cb89ef4adf",
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
      "100 ml Podravka Passate",
    ],
    priprema: [
      "Na zagrijanom ulju popecite pileće meso, pospite Vegetom, podlijte s malo vode i pirjajte oko 15 minuta.",
      "Meso izvadite iz posude i stavite na toplo mjesto.",
      "Na istoj masnoći popecite nasjeckani luk i kratko ga popirjajte. Dodajte rajčice narezane na kockice, a zatim i papriku narezanu na veće kocke i zajedno pirjajte oko 10 minuta.",
      "U drugoj posudi zakipite vodu, dodajte kocku i kuhajte 1-2 minute.",
      "Na lim (vel. 33×21 cm) rasporedite rižu, po riži rasporedite pripremljenu piletinu, pirjano povrće i zalijte passatom i temeljcem koji ste pripremili od kocki.",
      "Ovako pripremljenu rižu pecite u pećnici zagrijanoj na 200°C oko 30 minuta.",
    ],
    vreme: "60 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/b21dd7aa-63bc-11eb-b57b-0242ac12001a/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b2"),
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b5"),
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b8"),
    ],
    createdAt: new Date("2025-07-04"),
    user: "688f73543708e0cb89ef4ae7",
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
      "so i biber po želji",
    ],
    priprema: [
      "Obariti 10 min pileća prsa prethodno očišćenih od masnoće i žilica i dodati malo soli. Supu procediti i sačuvati, a prsa malo prohladiti.",
      "Na puteru izdinstati oljušteni i sitno iseckani crni i beli luk oko 8 min. Dodati narendanu šargarepu, seckani celer i sve zajedno dinstati još par minuta.",
      "Naliti supu, 2 cups mleka i sitno seckana pileća prsa. U preostali 1 cup mleka umutiti kašiku brašna i sipati u šerpu sa supom da vri najmanje 5 min, dok čorba ne postane gusta i kremasta. Isključiti, malo prohladiti i služiti.",
    ],
    vreme: "45 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/82ce3d5e-6421-11eb-ae21-0242ac12002a/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [new mongoose.Types.ObjectId("68a24cfbd6329213330d92b2")],
    createdAt: new Date("2025-06-15"),
    user: "688f733e3708e0cb89ef4ae2",
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
      "1 žličica nasjeckanog peršina",
    ],
    priprema: [
      "Patlidžane narežite na kolutove, popecite u tavi na žlici ulja i ohladite.",
      "Dobro ih usitnite električnom miješalicom, umiješajte protisnuti češnjak, vlasac, peršin, sol i papar. Lagano dodajite preostalo maslinovo ulje i limunov sok da dobijete kremastu smjesu.",
      "Na kraju umiješajte nasjeckane bademe.",
    ],
    vreme: "40 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/c328da32-5677-11ec-a312-ae48ed498d44/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b2"),
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b5"),
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b8"),
    ],
    createdAt: new Date("2025-06-15"),
    user: "688f73033708e0cb89ef4adf",
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
      "1 češanj češnjaka",
    ],
    priprema: [
      "U tavi popecite nasjeckani luk i papriku narezanu na rezance, a zatim ih izvadite iz tave.",
      "U istoj tavi popecite narezane gljive i dodajte povrću. Nakon toga popecite tofu narezan na kockice i protisnuti češnjak.",
      "Povrće vratite u tavu, podlijte vodom i dodajte đumbir, Vegetu, sezamovo ulje, med, sojin umak pa kratko propirjajte.",
    ],
    vreme: "30 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/f47dfadc-610d-11eb-9d2b-0242ac120034/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b2"),
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b5"),
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b8"),
    ],
    createdAt: new Date("2025-08-10"),
    user: "688f73543708e0cb89ef4ae7",
  },
  {
    naziv: "Fini namaz od slanutka",
    sastojci: [
      "240 g konzerviranog Slanutka Podravka",
      "1 crni luk",
      "2-3 kašike limunovog soka",
      "50 ml maslinovog ulja",
      "1 kašika vegete",
      "1 kašika Tahini paste(pasta od seyama)",
    ],
    priprema: [
      "Slanutak ocijedite, isperite i stavite u posudu. Dodajte protisnuti češnjak.",
      "Sve dobro usitnite štapnim mikserom (ili u električnoj sjeckalici) da smjesa postane glatka.",
      "Dodajte maslinovo ulje po potrebi da namaz bude kremast.",
    ],
    vreme: "30 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/97d4bd42-1469-11ec-af9c-d627f6be7959/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [new mongoose.Types.ObjectId("68a24cfbd6329213330d92af")],
    createdAt: new Date("2025-08-12"),
    user: "688f73543708e0cb89ef4ae7",
  },
  {
    naziv: "Namaz od avokada",
    sastojci: [
      "1 avokado (350g)",
      "1 kašika limunovog soka",
      "1 kašika maslinovog ulja",
      "so",
      "Vegeta",
      "1 kašika naseckanog peršuna",
    ],
    priprema: [
      "Avokado razrežite po dužini, odstranite košticu i kašikom izvadite mesnati deo.",
      "Od njega napravite pire i umešajte limunov sok, maslinovo ulje, so i peršin.",
      "Namaz servirajte u ljusci avokada.",
    ],
    vreme: "20 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/bbe17944-6403-11eb-91d3-0242ac12005a/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [new mongoose.Types.ObjectId("68a24cfbd6329213330d92af")],
    createdAt: new Date("2025-08-12"),
    user: "688f73543708e0cb89ef4ae7",
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
    slika:
      "https://piovariations.cdn.podravka.net/b67fb3ae-63d5-11eb-9cd6-0242ac120027/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [new mongoose.Types.ObjectId("68a24cfbd6329213330d92af")],
    createdAt: new Date("2025-08-12"),
    user: "688f73543708e0cb89ef4ae7",
  },
  {
    naziv: "Brownie cheesecake s kupinama",
    sastojci: [
      "1 Dolcela Brownies double choco",
      "5 jaja",
      "180 g šećera",
      " 150 g maslaca",
      "100g slatke pavlake",
      "400g ABC krem sira",
      "200g kupina",
    ],
    priprema: [
      "Korak 1: Rernu zagrejte na 160°C, a kalup za kolač obložite papirom za pečenje ili koristite papirni kalup koji dolazi uz smesu za brauni.",
      "Korak 2: Za brauni sloj, mešavinu za testo sipajte u posudu i dodajte jaja, omekšali maslac i šećer. Mešajte ručno ili električnim mikserom na najmanjoj brzini 1–2 minuta, dok ne dobijete glatko testo, zatim sipajte u kalup za pečenje.",
      "Korak 3: Po površini testa ravnomerno rasporedite komadiće čokolade i poravnajte površinu.",
      "Korak 4: Za čizkejk sloj, žicom za mućenje pomešajte sir, slatku pavlaku, šećer i burbon vanilin šećer. Dodajte jedno po jedno jaje, mešajući između dodavanja, a zatim umešajte gustin.",
      "Korak 5: Stavite nekoliko kašika smese na brauni sloj pa ih drškom kašike lagano umešajte u brauni smesu kako bi se dobio prošarani izgled. Dodajte ostatak čizkejk smese, poravnajte i utisnite kupine.",
    ],
    vreme: "50 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/9772a81a-84c6-11f0-acfc-cabad32358c7/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [new mongoose.Types.ObjectId("68a24cfbd6329213330d92bb")],
    createdAt: new Date("2025-08-31"),
    user: "688f73033708e0cb89ef4adf",
  },
  {
    naziv: "Dinja u čaši",
    sastojci: [
      "1 dinja",
      "250 ml bistrog voćnog soka od jabuke",
      "40g šećera",
      "100ml slatke pavlake",
    ],
    priprema: [
      "Korak 1: Dinju izdubite pomoću okrugle kašičice tako da dobijete kuglice.",
      "Korak 2: Stavite kuglice u čašice zapremine oko 150 ml.",
      "Korak 3: Sadržaj kesice Dolcela preljeva za torte pomešajte sa šećerom i 3 kašike soka koji ste odvojili od ukupnih 250 ml soka.",
      "Korak 4: Ostatak soka zagrejte do ključanja, sklonite sa vatre, ulijte pripremljenu smesu i mešajući ponovo zagrevajte do ključanja.",
      "Korak 5: Prelijte preko kuglica dinje i ostavite da se ohladi.",
    ],

    vreme: "15 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/40cba858-3383-11ef-9132-c2ec66b63100/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp",
    kategorija: [new mongoose.Types.ObjectId("68a24cfbd6329213330d92bb")],
    createdAt: new Date("2025-08-31"),
    user: "688f73033708e0cb89ef4adf",
  },
  {
    naziv: "Kolač od jogurta s malinama",
    sastojci: [
      "6 jaja",
      "prstohvat soli",
      "120 g šećera",
      "naribana korica 1 limuna",
      "120 g Podravka Glatkog brašna",
      "400g malina",
      "2 kasike secera",
      "400g grckog jogurta",
      "250ml vode",
    ],
    priprema: [
      "Korak 1: Za biskvit, odvojite belanca od žumanaca i belancima dodajte prstohvat soli. Mutite mikserom dok se ne zapene. Dodajte 60 g šećera i nastavite da mutite dok ne dobijete čvrst sneg.",
      "Korak 2: Žumanca umutite sa preostalih 60 g šećera i dodajte rendanu koricu limuna. Mutite mikserom dok smesa ne postane penasta i svetlo žuta. Dodajte prosejano brašno i dobro sjedinite. Na kraju, postepeno u tri puta umešajte umućena belanca u smesu sa žumancima. Pleh za pečenje (oko 20x40 cm) obložite papirom za pečenje i sipajte pripremljenu smesu.",
      "Korak 3: Poravnajte smesu i stavite u rernu zagrejanu na 190°C. Pecite 7–10 minuta. Ispečen biskvit ostavite da se ohladi dok pripremate krem. Preostalu vodu zagrejte do ključanja, sklonite sa vatre i umešajte pripremljeni preljev. Vratite sve na vatru i kuvajte uz mešanje dok ponovo ne provri.",
      "Korak 4: Za sos od malina, pomešajte maline i šećer u posudi, zagrevajte i kuvajte na umerenoj temperaturi dok se sve ne pretvori u kašastu smesu. Sklonite sa vatre i procedite kroz sitno cedilo da dobijete gladak sos. Ostavite da se ohladi.",
      "Korak 5: Za krem od jogurta, želatinu prelijte sa 5 kašika hladne vode i ostavite 10 minuta da nabubri. Slatku pavlaku zagrejte skoro do ključanja, smanjite temperaturu, dodajte nabubrelu želatinu i promešajte dok se ne rastopi. Odmah sklonite sa vatre i ostavite da se malo prohladi.",
      "Korak 6: U drugoj posudi pomešajte grčki jogurt i šećer u prahu. Dodajte sos od malina, a zatim smesu od pavlake i želatine. Sve dobro sjedinite i prelijte preko ohlađenog biskvita. Ostavite u frižideru nekoliko sati da se krema potpuno stegne.",
      "Korak 7: Za preljev, u činijici pomešajte crveni preljev za torte sa šećerom i 2–3 kašike vode (od ukupnih 250 ml). Ostavite preljev da se malo ohladi, a zatim ga prelijte preko kolača kao završni sloj.",
    ],

    vreme: "45 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/37f6ef86-4b24-11ef-bea4-8ef5b6334984/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp",
    kategorija: [new mongoose.Types.ObjectId("68a24cfbd6329213330d92bb")],
    createdAt: new Date("2025-08-31"),
    user: "688f73033708e0cb89ef4adf",
  },
  {
    naziv: "Tart od ananasa",
    sastojci: [
      "200 g keksa sa maslacem",
      "100 g maslaca",
      "prstohvat soli",
      "400 ml soka od ananasa",
      "1 Dolcela puding od vanile",
      "4 kašike šećera",
      "350 g očišćenog i narezanog ananasa",
      "200 ml slatke pavlake",
    ],
    priprema: [
      "Korak 1: Za podlogu, sameljite keks u fine mrvice, dodajte otopljeni maslac i sve dobro promešajte da se sastojci sjedine u ujednačenu smesu.",
      "Korak 2: Dobijenu smesu utisnite u kalup za tart, poravnajte kašikom i ostavite u frižideru dok pripremate nadev.",
      "Korak 3: Za nadev, u činiji pomešajte 100 ml soka od ananasa, Dolcela puding od vanile i šećer.",
      "Korak 4: Ostatak soka zagrevajte do ključanja.",
      "Korak 5: Kada provri, dodajte mešavinu soka i pudinga i kuvajte uz neprestano mešanje dok se ne zgusne.",
      "Korak 6: Sklonite sa vatre i ostavite da se prohladi.",
      "Korak 7: U ohlađenu smesu umešajte komadiće ananasa.",
      "Korak 8: Umutite slatku pavlaku u čvrst šlag, pa je mikserom sjedinite sa pudingom.",
      "Korak 9: Ovako pripremljenim nadevom premažite prethodno pripremljenu podlogu od keksa.",
    ],
    vreme: "30 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/c4825a06-5f94-11ef-ade0-8ef5b6334984/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp",
    kategorija: [new mongoose.Types.ObjectId("68a24cfbd6329213330d92bb")],
    createdAt: new Date("2025-08-31"),
    user: "688f73033708e0cb89ef4adf",
  },
  {
    naziv: "Cheesecake s pudingom od borovnica",
    sastojci: [
      "3 jaja",
      "35 g Podravka glatkog brašna",
      "15 g kakao praha",
      "1 kašičica Dolcela praška za pecivo",
      "70 g šećera (podeljeno na 50 g i 20 g)",
      "prstohvat soli",
      "2 Dolcela Premium pudinga od borovnice",
      "2 Dolcela burbon vanilin šećera",
      "150 g šećera",
      "500 ml mleka",
      "500 g ABC svežeg krem sira Classic",
    ],
    priprema: [
      "Korak 1: Rernu zagrejte na 180 °C. Pripremite okrugli kalup za tortu prečnika 26 cm. Dno kalupa obložite papirom za pečenje i premažite maslacem.",
      "Korak 2: U posebnoj posudi pomešajte prosejano brašno i kakao.",
      "Korak 3: Žumanca penasto umutite sa 50 g šećera i prstohvatom soli (oko 5 minuta).",
      "Korak 4: Dodajte prosejano brašno, kakao i prašak za pecivo u smesu sa žumancima i kratko sjedinite.",
      "Korak 5: Od belanaca i preostalih 20 g šećera umutite čvrst sneg miksajući nekoliko minuta.",
      "Korak 6: Sneg od belanaca pažljivo umešajte špatulom u smesu sa žumancima.",
      "Korak 7: Smesu sipajte u pripremljen kalup i nežno poravnajte. Pecite 11–13 minuta.",
      "Korak 8: Ohlađeni biskvit stavite na tacnu i obložite obručem za tortu.",
      "Korak 9: Za krem, od 500 ml mleka odvojite 7 kašika i pomešajte ih sa oba praška za puding.",
      "Korak 10: Preostalo mleko stavite da provri u šerpi sa debljim dnom na srednje jakoj vatri.",
    ],
    vreme: "1 sat",
    slika:
      "https://piovariations.cdn.podravka.net/1c05af58-1bf7-11ef-88eb-52c2f6608951/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp",
    kategorija: [new mongoose.Types.ObjectId("68a24cfbd6329213330d92bb")],
    createdAt: new Date("2025-08-31"),
    user: "688f73033708e0cb89ef4adf",
  },
  {
    naziv: "Salata s lososom i poširanim jajem",
    sastojci: [
      "1 šaka mlade rukole",
      "1 zreo avokado",
      "nekoliko cherry paradajza",
      "½ salatnog krastavca",
      "230 g konzervisanog Podravka leblebije",
      "½ limuna",
      "2 kašike maslinovog ulja",
      "Vegeta Maestro morska so",
      "Vegeta Maestro crni biber",
      "2 Eva fileta lososa u biljnom ulju (2x100 g)",
      "1 jaje",
      "2 kašike sirćeta",
    ],
    priprema: [
      "Korak 1: Avokado isecite na ploške, paradajz presečite na pola, krastavac na tanke kolutove, a leblebiju ocedite.",
      "Korak 2: Na tanjir stavite malo rukole, preko nje rasporedite leblebiju, isečen krastavac i paradajz.",
      "Korak 3: Dodajte avokado i sve pokapajte limunovim sokom.",
      "Korak 4: Lagano prelijte maslinovim uljem, pospite sveže mlevenim crnim biberom i posolite.",
      "Korak 5: Komade oceđenih fileta lososa rasporedite po salati, a na kraju preko svega stavite poširano jaje.",
      "Korak 6: Za poširanje jajeta, razbijte jaje u posudu. U manji lonac ulijte vodu do pola i pustite da provri, pa dodajte kašičicu sirćeta (ne dodajte so).",
      "Korak 7: Smanjite vatru ili je potpuno ugasite, pa uz pomoć kašike napravite vrtlog u vodi (okretanjem u smeru kazaljke na satu).",
      "Korak 8: Pažljivo izlijte jaje u vrtlog i kuvajte 2–3 minuta.",
    ],
    vreme: "20 minuta",
    slika:
      "https://piovariations.cdn.podravka.net/f3f519c0-f722-11ee-b381-4a32a0a6b24c/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp",
    kategorija: [
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b8"),
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b2"),
      new mongoose.Types.ObjectId("68a24cfbd6329213330d92b5"),
    ],
    createdAt: new Date("2025-08-27"),
    user: "688f73033708e0cb89ef4adf",
  },
];
async function seedDB() {
  try {
    console.log("Seed pokrenut...");
    await Recipe.deleteMany({}); // Ako želiš prvo očistiti ovu kolekciju
    await Recipe.insertMany(seedRecepti);
    console.log("Seed završen!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

seedDB();
