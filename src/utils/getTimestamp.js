export const getTimestampFromFilename = (name) => {
  const stringArray = name.split("_");
  return stringArray[stringArray.length - 1].split(".")[0];
}