const Media = require("../model/Medai");
const fs = require("fs");
const path = require("path");

exports.createMedia = async (req, res, next) => {
  const medias = req.files;
  try {
    const response =await medias.reduce(
      async (memo, { fieldName, originalname, mimetype, filename, size }) => {
        // const author = req.user.id;
        const beforeResults = await memo;

        const obj = {
          alt: originalname,
          size,
          name: filename,
          media: {
            data: fs.readFileSync(
              path.resolve(__dirname, `../../uploads/${filename}`)
            ),
            contentType: mimetype,
          },
        };
        const newMedia = await Media.create(obj);
        fs.unlinkSync(path.resolve(__dirname, `../../uploads/${filename}`));
        return [...beforeResults, newMedia];
      },
      []
    );

    res.status(200).json(response);
  } catch (err) {
      next(err)
  }
};

exports.deleteMedia = async(id)=>{
  const deleted = await Media.findByIdAndRemove(id)
  return  { deleted };
}