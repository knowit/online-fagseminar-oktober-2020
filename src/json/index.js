export const villages = [];

const year = '2020';
const season = {
  short: 'vår',
  shortCapitalized: 'Vår',
  long: 'våren',
  longCapitalized: 'Våren',
};
const startDate = '18. juni';
const endDate = '18. juni';

export const eventData = {
  date: `${startDate} ${year}`,
  longDate: `${startDate} ${year}`,
  city: 'Online',
  country: 'Norway',
  year,
  monthNumber: 6,
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
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32000.817284701054!2d10.746149204923535!3d59.91469960262475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e80811e2d6f%3A0x471e76986b8efc28!2sKnowit%20AS!5e0!3m2!1sno!2sno!4v1592290668940!5m2!1sno!2sno',
  },
  meta: {
    title: `Knowit Objectnet Fagseminar ${eventData.year}`,
    description: `Knowit Objectnet arrangerer to fagseminarer årlig. Det er de ansatte selv som lager programmet. ${season.longCapitalized} ${year} vil den bli avholdt ${eventData.date} online.`,
    keywords: `Fagseminar, ${eventData.city}, ${eventData.country}, Fag, Foredrag`,
  },
  days: [
    {
      date: '18',
      label: 'Torsdag 18.06',
    }
  ],
  schedules: [],
  talks: {},
  villages: [],
};

export default viewmodel;
