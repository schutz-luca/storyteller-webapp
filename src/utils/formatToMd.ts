export const formatToMd = (text: string) => {
    const result = text ? `
    ${text}
    `.split('```markdown')[1] : '';

    return result || text;
};