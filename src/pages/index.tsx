import { InferGetServerSidePropsType } from "next";

const PRICES: DollarData[] = [
  { exchange_name: "test1", url: "test1.com", sell_price: 3.8, buy_price: 3.9 },
  {
    exchange_name: "test2",
    url: "test2.com",
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

type DollarData = {
  exchange_name: string;
  url: string;
  sell_price: number;
  buy_price: number;
};

function Header({ title }: { title?: string }) {
  return <h1>{title ? title : "Default title"} </h1>;
}

type Price = { name: string; url: string; price: number };
function PricesList({ prices }: { prices: Price[] }) {
  return (
    <ul>
      {prices.map((price) => (
        <li key={price.url}>
          {" "}
          <a href={price.url}>{price.name}</a> at {price.price}
        </li>
      ))}
    </ul>
  );
}

export default function HomePage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const prices: DollarData[] = data;
  const buy_prices: Price[] = prices.map((price) => ({
    name: price.exchange_name,
    url: price.url,
    price: price.buy_price,
  }));
  buy_prices.sort((a, b) => -a.price + b.price);
  const sell_prices: Price[] = prices.map((price) => ({
    name: price.exchange_name,
    url: price.url,
    price: price.sell_price,
  }));
  sell_prices.sort((a, b) => a.price - b.price);

  return (
    <div>
      <Header title={"Online dollar prices in Peru"} />

      <h2>Best places to sell</h2>
      <PricesList prices={buy_prices} />

      <h2>Best places to buy</h2>
      <PricesList prices={sell_prices} />
    </div>
  );
}
