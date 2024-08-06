import Link from "next/link";
import PagesIcon from '@mui/icons-material/Pages';

const Header = () => {
  return (
    <header className="flex justify-between py-10">
      <Link href="/"><PagesIcon /></Link>
      <nav>
        <ul className="flex gap-3">
          <Link href="/posts" className="hover:underline">
            <span className="font-bold text-xl">Posts</span>
          </Link>
          <Link href="/posts" className="hover:underline">
            <span className="font-bold text-xl">Collections</span>
          </Link>
        </ul>
      </nav>
      <div className="flex gap-3">
        <span className="font-bold text-xl">Sign In</span>
      </div>
    </header>
  )
};

export default Header;