/**
 * @param flatObject 
 * @returns nested object
 */
export const unflatObject = (flatObject: any) => {
    const nestedObject = {};

    for (const key in flatObject) {
        const value = flatObject[key];
        const keys = key.split('.');
        let current = nestedObject;
        keys.forEach((subKey, index) => {
            if (!current[subKey]) {
                current[subKey] = index === keys.length - 1 ? value : {};
            }
            current = current[subKey];
        });
    }

    return nestedObject;
};