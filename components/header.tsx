import Link from "next/link";
import PagesIcon from '@mui/icons-material/Pages';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="flex justify-between py-10">
      <Link href="/"><PagesIcon /></Link>
      <nav>
        <ul className="flex gap-3">
          <Link href="/posts" className="hover:underline">
            <span className="font-bold text-xl">Posts</span>
          </Link>
          <Link href="/users" className="hover:underline">
            <span className="font-bold text-xl">Users</span>
          </Link>
        </ul>
      </nav>
      <div className="flex gap-3">
        <SignedIn>
          <UserButton showName />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  )
};

export default Header;