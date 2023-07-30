import imagemin from "imagemin";
import mozjpeg from "imagemin-mozjpeg";
import pngquant from "imagemin-pngquant";
import path from "path";
import fs from "fs";

const compress = async (fileName) => {
  const filepath = path.resolve(fileName);
  const files = await imagemin([filepath], {
    destination: path.resolve("compressed_images/"),
    plugins: [mozjpeg(), pngquant()],
  });
  const image = fs.statSync(files[0].sourcePath).size;
  const compressedImage = fs.statSync(files[0].destinationPath).size;
  const rate = parseInt((compressedImage / image) * 100);

  return {
    message: `Tingkat kompresi gambar sebesar ${rate}%`,
    file: files[0].destinationPath,
  };
};

export default compress;
