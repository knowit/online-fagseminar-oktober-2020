export const villages = [];

const year = '2020';
const season = {
  short: 'vår',
  shortCapitalized: 'Vår',
  long: 'våren',
  longCapitalized: 'Våren',
};
const startDate = '27. mars';
const endDate = '28. mars';

export const eventData = {
  date: `${startDate} - ${endDate} ${year}`,
  longDate: `${startDate} - ${endDate} ${year}`,
  venue: 'Sundvolden hotell',
  adress: 'Dronningveien 2, 3531 Krokkleiva',
  city: 'Sundvolden',
  country: 'Norway',
  year,
  monthNumber: 3,
  season,
  startDate,
  endDate,
  cities: [
    'Berlin',
    'Istanbul',
    'Madrid',
    'Dublin',
    'Svalbard',
    'Reykjavik',
    'Palma',
    'Ljubljana',
    'Strømstad',
    'Praha',
  ],
};

const viewmodel = {
  title: `Fagseminar ${eventData.season.longCapitalized} ${eventData.year}`,
  event: {
    ...eventData,
    gmapsUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99207.97332443556!2d10.418154500553305!3d59.98522145512699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4641059304c27703%3A0xfa3155c077bf0675!2sSundvolden%20Hotel!5e0!3m2!1sno!2sno!4v1580216793126!5m2!1sno!2sno',
  },
  meta: {
    title: `Knowit Objectnet Fagseminar ${eventData.year}`,
    description: `Knowit Objectnet arrangerer to fagseminarer årlig. Det er de ansatte selv som lager programmet. På dette seminaret vil også noen fra Amende delta. ${season.longCapitalized} ${year} vil den bli avholdt ${eventData.date} på ${eventData.city}, ${eventData.country}.`,
    keywords: `Fagseminar, ${eventData.city}, ${eventData.country}, Fag, Foredrag`,
  },
  days: [
    {
      date: '27',
      label: 'Fredag 27.03',
    },
    {
      date: '28',
      label: 'Lørdag 28.03',
    },
  ],
  schedules: [],
  talks: {},
  villages: [],
};

export default viewmodel;
