const fs = require("fs");

const unlinkFile = (files) => {
  if (files && files.length > 0) {
    files.forEach((file) => {
      fs.unlink(file.path, (error) => {
       
      });
    });
  }
};

module.exports = unlinkFile;
