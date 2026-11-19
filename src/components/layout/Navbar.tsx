import Logo from "../../assets/Favicon.sonora.png"

const Navbar = () => {
  return (
  <header className="h-screen w-64 border-r bg-(--bg) text-white">
  <nav className="flex h-full flex-col gap-4 p-4">
    <img src={Logo} alt="Logo" className="h-16 w-16" />
  </nav>
</header>
  )
}

export default Navbar
