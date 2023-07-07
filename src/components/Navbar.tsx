import Link from 'next/link';
import { GoPeople, GoHome } from 'react-icons/go';

export default function Navbar() {
  const Menus = [
    {link: '/', name: 'Home', icon: GoHome},
    {link: '/', name: 'Students', icon: GoPeople},
  ]

  return (
    <nav className="fixed w-full bottom-0 left-0 p-2 bg-white">
      <ul className="flex justify-around items-center m-0 p-0 text-gray-700">
        {
          Menus.map((menu, index) => (
            <li key={index} className='flex-1'>
              <Link href={menu.link} className='flex flex-col  items-center text-center font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-emerald-500'>
                <menu.icon size={32} className='transition-all duration-300 ease-in-out transform' />
                <span className='transition-all duration-300 ease-in-out transform'>{menu.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
