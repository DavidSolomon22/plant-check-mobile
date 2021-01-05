import { PLANT_PREDICTIONS_ORIGIN } from '@env';
import FileSystem from 'expo-file-system';

export const createPlantPrediction = async (
  userId,
  plantPhotoLocalUri,
  predictedPlantName,
) => {
  const url = `${PLANT_PREDICTIONS_ORIGIN}/users/${userId}/plants-predictions`;
  try {
    return await FileSystem.uploadAsync(url, plantPhotoLocalUri, {
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'plantPhoto',
      parameters: {
        predictedPlantName: predictedPlantName,
      },
    });
  } catch (error) {
    if (error.response) {
      console.log('error.response.data :>> ', error.response.data);
      console.log('error.response.status :>> ', error.response.status);
      console.log('error.response.headers :>> ', error.response.headers);
    } else if (error.request) {
      console.log('error.request :>> ', error.request);
    } else {
      console.log('error.message :>> ', error.message);
    }
  }
};
