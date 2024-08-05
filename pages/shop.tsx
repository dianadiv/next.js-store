import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Image from "next/image";

interface IProduct {
  id: number;
  brand: string;
  category: string;
  availabilityStatus: string;
  title: string;
  description: string;
  discountPercentage: number;
  price: number;
  returnPolicy: string;
  images: string[];
  thumbnail: string;
  warrantyInformation: string;
  tags: string[];
}

export const getServerSideProps = (async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  return { props: { data: data.products } }
}) satisfies GetServerSideProps<{ data: IProduct }>

const ShopPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(data)
  return (
    <div>
      <h1 className="font-black text-6xl mb-3">Get Inspired</h1>
      <p className="font-normal text-xl block w-8/12">Browsing for your next long-haul trip,everyday journey, or just fancy a a look at what is new?
        From community favourites to abput-to-sell-out items, see them all here</p>
      <div>Categoies</div>
      <div className="flex justify-between flex-wrap gap-1">
        {data.map((item: IProduct) => (
          <div key={item.id} className="w-1/5 p-2 rounded-md hover:cursor-pointer hover:shadow-2xl">
            <Image
              src={item.images[0]}
              alt="item image"
              width={200}
              height={200}
              className="max-w-[200px] max-h-[200px] m-auto"
            />
            <h1 className="font-bold">{item.title}</h1>
            <p className="font-semibold">Price: $ {item.price}</p>
            <p className="font-semibold">Discount: $ {(item.discountPercentage * item.price / 100).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopPage;