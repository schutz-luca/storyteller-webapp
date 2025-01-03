export interface Question {
    id: string;
    value: string;
    answer?: string;
}

export interface FillableAnswerGroup {
    goal?: string;
    targetAudience?: {
        profile?: string;
        feelings?: string;
    } | undefined;
    story?: {
        about?: string;
        climax?: string;
        moral?: string;
    } | undefined;
    structure?: {
        soundsLike?: string;
        creativeRef?: string;
        density?: string;
    } | undefined;
}