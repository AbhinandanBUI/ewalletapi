const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");

exports.copyUser = async (req, res) => {
  if (!req.files) {
    model = {
      success: true,
      message: "file not found",
    };
  }
  const username = req.files.image[0];
  const file = req.files.image;
  const dataa = req.body;
  console.log("this is :::", dataa);
  let newpath = "../EREPORTAPI/assest/userProfileImage/" + file.name;

  var fname = file.name;
  file.mv(newpath, (err) => {
    if (err) {
      console.log(err);
      return err;
    }
  });
  const data = {
    pathName: newpath,
    fileName: fname,
  };

  return data;
};

exports.getUserImage = async (imageUrl) => {
  const imgfile = [];

  return  null;
  let newpath = imageUrl.imageUrl;
  fs.exists(newpath, function (exists) {
    if (!exists) {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });
      res.end("404 Not Found");
      return;
    }

    // Extracting file extension
    var ext = path.extname(action);

    // Setting default Content-Type
    var contentType = "text/plain";

    // Checking if the extension of
    // image is '.png'
    if (ext === ".jpeg") {
      contentType = "image/jpeg";
    }

    // Setting the headers
    res.writeHead(200, {
      "Content-Type": contentType,
    });

    // Reading the file
    fs.readFile(filePath, function (err, content) {
      // Serving the image
      res.end(content);
    });
  });
   
};
