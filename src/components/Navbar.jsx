import dayjs from 'dayjs';
import { navIcons, navLinks } from '@constants'
import useWindowStore from '@store/window';

const Navbar = () => {
    const { openWindow } = useWindowStore();

    return (
        <nav>
            <div className="">
                <img src="/images/logo.svg" alt="Logo" />
                <p className="font-bold">Jijo's Portfolio</p>

                <ul className="">
                    {navLinks.map(({ id, name, type }) => (
                        <li key={`NavItem-${id}`} onClick={() => openWindow(type)}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="">
                <ul>{navIcons.map(({ id, img }) => (
                    <li key={`NavIcon-${id}`}>
                        <img src={img} className='icon-hover' alt={`Icon-${id}`} />
                    </li>
                ))}</ul>
                <time>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
        </nav>
    )
}

export default Navbar