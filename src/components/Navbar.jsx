import dayjs from 'dayjs';
import { navIcons, navLinks } from '@constants'

const Navbar = () => {
    return (
        <nav>
            <div className="">
                <img src="/images/logo.svg" alt="Logo" />
                <p className="font-bold">Jijo's Portfolio</p>

                <ul className="">
                    {navLinks.map((item) => (
                        <li key={`NavItem-${item.id}`}>
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="">
                <ul>{navIcons.map((item) => (
                    <li key={`NavIcon-${item.id}`}>
                        <img src={item.img} className='icon-hover' alt={`Icon-${item.id}`} />
                    </li>
                ))}</ul>
                <time>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
        </nav>
    )
}

export default Navbar