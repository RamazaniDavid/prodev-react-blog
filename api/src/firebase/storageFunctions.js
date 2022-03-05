import { projectStorage } from "./storageInit";

const uploadFile = async (file, pathName) => {
  const fileName = `${Date.now()}-${file.originalname.replace(/\s/g, "")}`;

  const fileRef = projectStorage.ref(pathName).child(fileName);
  const snapshot = await fileRef.put(file.buffer);
  const url = await snapshot.ref.getDownloadURL();
  return {
    url: url.replace(
      "https://firebasestorage.googleapis.com/",
      "/api/proxy/gl_fbs/"
    ),
    proxyUrl: url.replace(
      "https://firebasestorage.googleapis.com/",
      "https://px.ramazanidavid.info/api/proxy/gl_fbs/"
    ),
    orginalUrl: url,
    fileFullName: `${pathName}/${fileName}`,
  };
};

const delelteFile = async (fileFullName) => {
  const fileRef = projectStorage.ref(fileFullName);
  await fileRef.delete();
};

export {
  uploadFile as uploadFileToCloude,
  delelteFile as deleteFileFromCloude,
};
