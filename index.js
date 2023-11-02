import {
  readImage,
  getMetadata,
  convertToJPEG,
  convertToPNG,
  convertToWEBP,
  resizeByPercentage,
  updateEXIF,
} from "./imageHelper.js";

const imagePath = "./asset/original.jpg";

readImage(imagePath)
  .then(async (imageData) => {
    try {
      // before
      // convertToJPEG(imageData, "test-image-jpg");
      // convertToPNG(imageData, "test-image-png");
      // convertToWEBP(imageData, "test-image-webp");
      // //after
      // convertToJPEG(imageData, "test-image-compressed-jpg", 50);
      // convertToPNG(imageData, "test-image-compressed-png", 2);
      // convertToWEBP(imageData, "test-image-compressed-webp", 50);
      // const resizedPercentageBuffer = await resizeByPercentage(imageData, 30);
      // const resizedSizeBuffer = await resizeByPercentage(imageData, 1629, 1013);
      // convertToJPEG(resizedPercentageBuffer, "resizedPercentageBuffer");
      // convertToJPEG(resizedSizeBuffer, "resizedSizeBuffer");
      // convertToJPEG(resizedPercentageBuffer, "resizedPercentageBuffer-50", 50);
      // convertToJPEG(resizedSizeBuffer, "resizedSizeBuffer-50", 50);
      await updateEXIF(
        imageData,
        {
          copyright: "The National Gallery",
          description: "Your Image Description",
          title: "Your Title",
          comment: "Your Comment",
          tags: "tag1,tag2,tag3",
          author: "M. H. Nahib",
          author: "M. H. Nahib",
          GPSLatitudeRef: "N",
          GPSLatitude: "51/1 30/1 3230/100",
          GPSLongitudeRef: "W",
          GPSLongitude: "0/1 7/1 4366/100",
        },
        "jpg",
        "exif-file",
        40
      );
    } catch (error) {
      console.error("Error: ", error.message);
    }
  })
  .catch((error) => {
    console.log(error.message);
  });
