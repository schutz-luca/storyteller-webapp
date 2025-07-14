import { useContext } from 'react';
import { FaHandPointRight } from 'react-icons/fa';
import { Logo } from '../../components/storyteller/logo';
import { Translation } from '../../components/translation';
import { FluidContext } from '../../context/fluid-context';
import './styles.scss';

export const IntroPage = () => {
    const { setIsNewSession } = useContext(FluidContext);
    const start = () => setIsNewSession(false);

    return (
        <div className='intro-page glass'>
            <div className='title-bg'>
                <p className='subtitle'><Translation id='introSubtitle' /></p>
                <Logo />
            </div>
            <Translation id='introText' />
            <div className='action-bg'>
                <div className='ready-text'>
                    <Translation id='introReadyText' />
                </div>
                <button onClick={start}>
                    <Translation id='introReadyButton' />
                    <FaHandPointRight />
                </button>
            </div>
        </div>
    );
};