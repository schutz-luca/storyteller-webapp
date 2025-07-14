import { useTranslation } from 'react-i18next';
import { Question } from '../@types';

export const useQuestions = () => {
    const { t } = useTranslation();

    const questions: Question[] = [
        {
            id: 'textType', value: t('textTypeQuestion'), tips: [
                t('textTypeTip1'),
                t('textTypeTip2'),
                t('textTypeTip3'),
                t('textTypeTip4'),
                t('textTypeTip5'),
                t('textTypeTip6')
            ]
        },
        {
            id: 'goal', value: t('goalQuestion'), tips: [
                t('goalTip1'),
                t('goalTip2'),
                t('goalTip3'),
                t('goalTip4'),
                t('goalTip5'),
                t('goalTip6')
            ]
        },
        {
            id: 'targetAudience.profile', value: t('targetAudienceProfileQuestion'), tips: [
                t('targetAudienceProfileTip1'),
                t('targetAudienceProfileTip2'),
                t('targetAudienceProfileTip3'),
                t('targetAudienceProfileTip4'),
                t('targetAudienceProfileTip5'),
                t('targetAudienceProfileTip6'),
                t('targetAudienceProfileTip7'),
                t('targetAudienceProfileTip8')
            ]
        },
        {
            id: 'targetAudience.feelings', value: t('targetAudienceFeelingsQuestion'), tips: [
                t('targetAudienceFeelingsTip1'),
                t('targetAudienceFeelingsTip2'),
                t('targetAudienceFeelingsTip3'),
                t('targetAudienceFeelingsTip4'),
                t('targetAudienceFeelingsTip5'),
                t('targetAudienceFeelingsTip6'),
                t('targetAudienceFeelingsTip7')
            ]
        },
        {
            id: 'story.about', value: t('storyAboutQuestion'), tips: [
                t('storyAboutTip1'),
                t('storyAboutTip2'),
                t('storyAboutTip3'),
                t('storyAboutTip4'),
                t('storyAboutTip5'),
                t('storyAboutTip6')
            ]
        },
        {
            id: 'story.climax', value: t('storyClimaxQuestion'), nullable: true, tips: [
                t('storyClimaxTip1'),
                t('storyClimaxTip2'),
                t('storyClimaxTip3'),
                t('storyClimaxTip4')
            ]
        },
        {
            id: 'story.moral', value: t('storyMoralQuestion'), nullable: true, tips: [
                t('storyMoralTip1'),
                t('storyMoralTip2'),
                t('storyMoralTip3'),
                t('storyMoralTip4'),
                t('storyMoralTip5'),
                t('storyMoralTip6')
            ]
        },
        {
            id: 'structure.soundsLike', value: t('structureSoundsLikeQuestion'), tips: [
                t('structureSoundsLikeTip1'),
                t('structureSoundsLikeTip2'),
                t('structureSoundsLikeTip3'),
                t('structureSoundsLikeTip4'),
                t('structureSoundsLikeTip5'),
                t('structureSoundsLikeTip6'),
                t('structureSoundsLikeTip7'),
                t('structureSoundsLikeTip8'),
                t('structureSoundsLikeTip9')
            ]
        },
        {
            id: 'structure.creativeRef', value: t('structureCreativeRefQuestion'), nullable: true, tips: [
                t('structureCreativeRefTip1'),
                t('structureCreativeRefTip2'),
                t('structureCreativeRefTip3'),
                t('structureCreativeRefTip4'),
                t('structureCreativeRefTip5')
            ]
        },
        {
            id: 'structure.density', value: t('structureDensityQuestion'), tips: [
                t('structureDensityTip1'),
                t('structureDensityTip2'),
                t('structureDensityTip3'),
                t('structureDensityTip4'),
                t('structureDensityTip5'),
                t('structureDensityTip6')
            ]
        }
    ];

    return questions;
};