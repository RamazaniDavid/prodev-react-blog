import { projectStorage } from "./storageInit";

const uploadFile = async (file, pathName) => {
  const fileName = `${Date.now()}-${file.originalname.replace(/\s/g, "")}`;

  const fileRef = projectStorage.ref(pathName).child(fileName);
  const snapshot = await fileRef.put(file.buffer);
  const url = await snapshot.ref.getDownloadURL();
  return {
    url,
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
