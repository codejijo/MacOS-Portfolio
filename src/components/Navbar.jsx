import dayjs from 'dayjs';
import { navIcons, navLinks } from '@constants'
import useWindowStore from '@store/window';

const Navbar = () => {
    const { openWindow } = useWindowStore();

    return (
        <nav>
            {/* Desktop sections */}
            <div className="desktop-nav">
                <img src="/images/logo.svg" alt="Logo" />
                <p className="font-bold">Jijo's Portfolio</p>

                <ul>
                    {navLinks.map(({ id, name, type }) => (
                        <li key={`NavItem-${id}`} onClick={() => openWindow(type)}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="desktop-nav ml-auto">
                <ul>{navIcons.map(({ id, img }) => (
                    <li key={`NavIcon-${id}`}>
                        <img src={img} className='icon-hover' alt={`Icon-${id}`} />
                    </li>
                ))}</ul>
                <time>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>

            {/* Mobile iOS Status Bar */}
            <div className="mobile-ios-status">
                <time>{dayjs().format('h:mm')}</time>
                <div className="status-icons">
                    <img src="/icons/wifi.svg" className="w-3.5 h-3.5 invert" alt="wifi" />
                    <div className="w-5 h-2.5 border border-white rounded-[3px] p-[1px] relative flex">
                        <div className="bg-white h-full w-[80%] rounded-[1px]" />
                        <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-white rounded-r-sm" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar