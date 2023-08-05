import { imageCanvas, imageColors, imageRgb, replaceRgb } from "./utility";

// var imagePng = document.getElementById("image");

const circleCreate = (image) => {

    if (imagePng.naturalWidth !== 512 && imagePng.naturalHeight !== 512)
        throw "Image size doesn't match"

    var imageData = imageCanvas(image);
    var rgbVal = imageRgb(imageData.data)

    return imageColors(rgbVal)
}

const parallelImage = (image) => {

    var canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth = 512
    canvas.height = image.naturalHeight = 512

    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    replaceRgb(context, canvas)

    var pngDataUrl = canvas.toDataURL('image/png');
    // image.src = pngDataUrl
}


