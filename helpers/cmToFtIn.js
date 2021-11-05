/**
 * 
 * @param {number} cm 
 * @returns {string}
 */
export const cmToFtIn = (cm) => {
    const inches = Math.round(cm / 2.54)
    return `feet: ${Math.floor(inches / 12)}, inches: ${inches % 12}`;
};