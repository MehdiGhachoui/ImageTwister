// Draw Image into a canvas to get image info
export const imageCanvas = (image) => {
    var canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    return context.getImageData(0, 0, canvas.width, canvas.height);
}

// Convert each image pixel into rgba values
export const imageRgb = (imageData) => {
    var rgbValues = [];
    for (let i = 0; i < imageData.length; i += 4) {
        var rgb = {
            r: imageData[i],
            g: imageData[i + 1],
            b: imageData[i + 2],
            a: imageData[i + 3]
        };
        rgbValues.push(rgb);
    }

    if (rgbValues.some(d => d.a < 255))
        throw "Image contains transparent elements"

    return rgbValues;
};


// check if the image contains the happy colors - Yellow , Pink , ...- 
export const imageColors = (rgb) => {
    var colors = [{ b: 0, g: 255, r: 255 }, { b: 203, g: 192, r: 255 }]

    for (let i = 0; i < colors.length; i++) {
        if (rgb.some(d => d.b != colors[i].b && d.g != colors[i].g && d.r != colors[i].r))
            return "Not all colors in the badge gives a happy feeling :("
    }

    return "The colors in the badge gives a happy feeling :)"
}


// replace pixels that are trasparent or not "happy" with a happy yellow color
export const replaceRgb = (context, canvas) => {

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i] != 0 && imageData.data[i + 1] != 255 && imageData.data[i + 2] != 255) {
            imageData.data[i] = 255;
            imageData.data[i + 1] = 255;
            imageData.data[i + 2] = 0;
        }
        if (imageData.data[i + 3] < 255)
            imageData.data[i + 3] = 255;
    }

    context.putImageData(imageData, 0, 0);
};

