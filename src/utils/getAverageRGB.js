export const calculateRGB = (imgUrl) => {
    return new Promise((resolve, reject) => {
        let blockSize = 5, // only visit every 5 pixels
            defaultRGB = {r: 255, g: 255, b: 255}, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r: 255, g: 255, b: 255},
            count = 0;

        if (!context) {
            reject(defaultRGB);
            return;
        }

        let imgEl = new Image();
        imgEl.onload = function () {
            height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
            width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

            context.drawImage(imgEl, 0, 0);

            try {
                data = context.getImageData(0, 0, width, height);
            } catch (e) {
                /* security error, img on diff domain */
                reject(defaultRGB);
                return;
            }

            length = data.data.length;

            while ((i += blockSize * 4) < length) {
                ++count;
                rgb.r += data.data[i];
                rgb.g += data.data[i + 1];
                rgb.b += data.data[i + 2];
            }

            // ~~ used to floor values
            rgb.r = Math.floor(rgb.r / count);
            rgb.g = Math.floor(rgb.g / count);
            rgb.b = Math.floor(rgb.b / count);
            resolve(rgb);
        };
        imgEl.src = imgUrl;
    });
}
