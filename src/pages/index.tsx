import { InferGetServerSidePropsType } from 'next';

type DollarData = {
  exchange_name: string;
  url: string;
  sell_price: number;
  buy_price: number;
};

type Price = { name: string; url: string; price: number };

const PRICES: DollarData[] = [
  { exchange_name: 'test1', url: 'test1.com', sell_price: 3.8, buy_price: 3.9 },
  {
    exchange_name: 'test2',
    url: 'test2.com',
    sell_price: 3.75,
    buy_price: 3.8,
  },
];

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://9vc25p.deta.dev/rates`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

function Header({ title }: { title?: string }) {
  return <h1>{title ? title : 'Default title'} </h1>;
}

function PricesList({
  prices,
  showAll,
}: {
  prices: Price[];
  showAll: boolean;
}) {
  return (
    <ul>
      {(showAll ? prices : prices.slice(0, 3)).map((price) => (
        <li key={price.url}>
          <a href={price.url} target="_blank" rel="noopener noreferrer">
            {price.name}
          </a>
          at {price.price}
        </li>
      ))}
    </ul>
  );
}

function getBuySellPrices(prices: DollarData[]) {
  const buyPrices: Price[] = prices.map((price) => ({
    name: price.exchange_name,
    url: price.url,
    price: price.buy_price,
  }));
  buyPrices.sort((a, b) => -a.price + b.price);
  const sellPrices: Price[] = prices.map((price) => ({
    name: price.exchange_name,
    url: price.url,
    price: price.sell_price,
  }));
  sellPrices.sort((a, b) => a.price - b.price);
  return { buyPrices, sellPrices };
}

export default function HomePage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { buyPrices, sellPrices } = getBuySellPrices(data);

  return (
    <div>
      <Header title={'Online dollar prices in Peru'} />

      <h2>Best places to sell</h2>
      <PricesList prices={buyPrices} showAll={false} />

      <h2>Best places to buy</h2>
      <PricesList prices={sellPrices} showAll={true} />
    </div>
  );
}
