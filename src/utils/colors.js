export const getContrastRatio = (hex1, hex2) => {
    const rgb1 = rgbaToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    const L1 = getRelativeLuminance(rgb1);
    const L2 = getRelativeLuminance(rgb2);
    return ((L1 + 0.05) / (L2 + 0.05)).toFixed(2);
}

function hexToRgb(hex) {
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);
    return {r, g, b};
}

function rgbaToRgb(rgba) {
    const rgbaValues = rgba.substring(rgba.indexOf("(")+1, rgba.lastIndexOf(")")).split(",");
    const r = parseInt(rgbaValues[0]);
    const g = parseInt(rgbaValues[1]);
    const b = parseInt(rgbaValues[2]);
    return { r, g, b };
}
function getRelativeLuminance(rgb) {
    const {r, g, b} = rgb;
    const R = r / 255;
    const G = g / 255;
    const B = b / 255;
    return  0.2126 * R + 0.7152 * G + 0.0722 * B;
}

