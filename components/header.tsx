import Link from "next/link"

const Header = () => {
  return (
    <header className="flex justify-between py-10">
      <p>Logo</p>
      <nav>
        <ul className="flex gap-3">
          <Link href="/shop">Shop</Link>
          <li>Collections</li>
          <li>Explore</li>
        </ul>
      </nav>
      <div className="flex gap-3">
        <button>Cart 0</button>
        <button>Sign In</button>
      </div>
    </header>
  )
};

export default Header;