import path from "path";
import multer from "multer";

const storage = multer.memoryStorage();

// utiliza a storage para configurar a instância do multer

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

const uploader = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
  fileFilter: fileFilter,
});

export { uploader };
