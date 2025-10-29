import { FaFeatherAlt } from 'react-icons/fa';
import './styles.scss';

export const Logo = () => (
    <div className='logo'>
            Storyteller <FaFeatherAlt data-testid='fa-feather-alt-icon' />
        <span>BETA</span>
    </div>
);