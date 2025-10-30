import Lottie from 'lottie-react';
import loading from '../../assets/lottie/loading.json';
import { LoadingsProps } from './types';
import './styles.scss';

export const Loading = ({ text }: LoadingsProps) => (
    <div className="loading-container" data-testid="loading">
        <Lottie animationData={loading} loop={true} className="loading" />
        <span>{text}</span>
    </div>
);