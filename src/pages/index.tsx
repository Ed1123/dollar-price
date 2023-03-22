
type DollarPrice = {
  url: string,
  sell_price: number,
  buy_price: number
}

function Header({ title }: { title?: string }) {
  return <h1>{title ? title : "Default title"} </h1>
}

export default function HomePage() {
  const prices: DollarPrice[] = [{ url: 'test1.com', sell_price: 1.1, buy_price: 1.2 }, { url: 'test2.com', sell_price: 2.1, buy_price: 2.2 }]

  return (
    <div>
      <Header title={"Online dollar prices in Peru"} />
      <ul>
        {
          prices.map((price) => (
            <li key={price.url} > {price.url} </li>
          ))
        }
      </ul>

    </div>
  )
}