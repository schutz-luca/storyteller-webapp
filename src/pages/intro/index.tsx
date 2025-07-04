import { Logo } from '../../components/storyteller/logo';
import HintExample from '../../../public/hint-example.jpg'
import './styles.scss';
import { FaHandPointRight } from 'react-icons/fa';

export const IntroPage = ({ setIsNewSession }: { setIsNewSession: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const start = () => setIsNewSession(false);

    return (
        <div className='intro-page'>
            <div className='title-bg' />
            <div className='action-bg' />
            <p className='subtitle'>Crie novas histórias com</p>
            <Logo />
            <h2>O que é?</h2>
            <p>
                O Storyteller é uma ferramenta criativa feita para quem quer <b>ganhar tempo na criação de conteúdo</b> e se conectar de forma mais empática com seu público. Ideal para tirar ideias do papel, <b>superar bloqueios criativos</b> e acompanhar o ritmo dinâmico das tendências.
            </p>

            <h2>Como posso usar?</h2>
            <p>
                Responda a 9 perguntas simples e receba roteiros e ideias criadas sob medida, com base nas suas respostas. Use para posts, vídeos, campanhas, narrativas ficcionais ou qualquer outro formato criativo.
            </p>

            <h2>Para quem é?</h2>
            <p className='roles'>
                ✨ Para quem trabalha com criatividade – de <b>criadores de conteúdo</b> a profissionais de <b>marketing</b> e audiovisual.<br />
                🛍️ Se você tem uma loja, conecte-se com os <b>assuntos em alta</b> e ganhe tempo na criação de posts.<br />
                📱 Produz <b>vídeos para redes sociais</b>? Gere roteiros que engajam com seu público.<br />
                🎬 Atua com <b>audiovisual</b>? Use como ponto de partida para desenvolver histórias completas.
            </p>

            <h2>Fique atento às dicas</h2>
            <p>Sempre a baixo das perguntas terão dicas como essa:</p>
            <img src={HintExample} />
            <p>Elas te darão um caminho para você pensar na resposta.</p>

            <div className='ready-text'>
                <h2 ><b>Pronto para começar?</b></h2>
                <p>
                    Clique e desbloqueie novas narrativas
                </p>
            </div>
            <button onClick={start}>Começar <FaHandPointRight /></button>
        </div>
    )
}