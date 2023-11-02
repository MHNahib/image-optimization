import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputFolder = path.join(__dirname, "output");

try {
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }
} catch (error) {
  console.error(`Error creating the output folder: ${error}`);
}

const readImage = async (path) => {
  try {
    return await sharp(path).toBuffer();
  } catch (error) {
    throw new Error("Error reading image: " + error.message);
  }
};

const getMetadata = async (imageData) => {
  try {
    return await sharp(imageData).metadata();
  } catch (error) {
    throw new Error("Error getting image metadata: " + error.message);
  }
};

const imageConversionCallback = (err, info) => {
  if (err) {
    console.log(`Error converting image: ${err}`);
  } else {
    console.log(`Image converted!`);
  }
};

const convertToJPEG = async (
  buffer,
  fileName = new Date().getTime(),
  quality = 80
) => {
  await sharp(buffer)
    .jpeg({ mozjpeg: true, quality })
    .toFile(
      path.join(outputFolder, `${fileName}.jpeg`),
      imageConversionCallback
    );
};

const convertToPNG = async (
  buffer,
  fileName = new Date().getTime(),
  quality = 6
) => {
  await sharp(buffer)
    .png({ quality })
    .toFile(
      path.join(outputFolder, `${fileName}.png`),
      imageConversionCallback
    );
};

const convertToWEBP = async (
  buffer,
  fileName = new Date().getTime(),
  quality = 80
) => {
  await sharp(buffer)
    .webp({ quality })
    .toFile(
      path.join(outputFolder, `${fileName}.webp`),
      imageConversionCallback
    );
};

const resizeByPercentage = async (imageBuffer, percentage) => {
  try {
    return await sharp(imageBuffer).resize({ percentage }).toBuffer();
  } catch (error) {
    throw error;
  }
};

const resizeBySize = async (imageBuffer, width, height) => {
  try {
    return await sharp(imageBuffer).resize(width, height).toBuffer();
  } catch (error) {
    throw error;
  }
};

const updateEXIF = async (
  imageBuffer,
  options,
  type,
  fileName = new Date().getTime(),
  quality
) => {
  let buffer = imageBuffer;

  if (!type || (type !== "jpg" && type !== "webp")) {
    throw new Error("Error on type: Please provide JPG or WebP");
  }

  if (quality) {
    buffer = await sharp(imageBuffer)
      .jpeg({
        quality,
      })
      .toBuffer();
  }

  await sharp(buffer)
    .withMetadata({
      exif: {
        IFD0: {
          Copyright: options?.copyright ?? "",
          ImageDescription: options?.description ?? "",
          XPTitle: options?.title ?? "",
          XPComment: options?.comment ?? "",
          XPKeywords: options?.tags ?? "",
          XPAuthor: options?.author ?? "",
          Artist: options?.author ?? "",
        },
        IFD3: {
          GPSLatitudeRef: options?.GPSLatitudeRef ?? "",
          GPSLatitude: options?.GPSLatitude ?? "",
          GPSLongitudeRef: options?.GPSLongitudeRef ?? "",
          GPSLongitude: options?.GPSLongitude ?? "",
        },
      },
    })
    .toFormat(type, {
      quality: 50,
    })
    .toFile(
      path.join(outputFolder, `${fileName}.${type}`),
      imageConversionCallback
    );
};

export {
  readImage,
  getMetadata,
  convertToJPEG,
  convertToPNG,
  convertToWEBP,
  resizeByPercentage,
  resizeBySize,
  updateEXIF,
};
