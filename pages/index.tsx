import Image from "next/image";
import Link from "next/link";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

export default function Home() {
  return (
    <div className="flex gap-10 justify-between flex-wrap">
      <div className='w-1/5 p-5 flex flex-col justify-between bg-white rounded-md'>
        <h1 className='font-bold text-4xl'>Go further with us</h1>
        <p className='font-bold'>Take us along ur journeys and tag #LetsGoFurther to be featured</p>
        <div>
          <Link href='https://www.instagram.com/' className='underline mr-1' target="_blank">Follow us on Instagram</Link>
          <ArrowRightAltOutlinedIcon />
        </div>
      </div>
      {[1, 2, 3, 4, 5, 6].map(item => (
        <div className='w-1/5' key={item}>
          <Image src='/images/imageHomePage.jpg' alt="Logo" width={400} height={400} className='rounded-md' />
        </div>
      ))}
      <div className='w-1/5 p-5 flex flex-col justify-around bg-white rounded-md'>
        <h1 className='font-bold text-4xl'>Get started</h1>
        <p className='font-bold'>Take us along ur journeys and tag #LetsGoFurther to be featured</p>
        <p>Start shopping</p>
      </div>
    </div>
  );
}
