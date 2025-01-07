export const uploadAudio = async (file: File): Promise<string> => {
  try {
    if (!file.type.startsWith('audio/')) {
      throw new Error('Invalid file type. Please upload an audio file.');
    }

    const timestamp = new Date().getTime();
    const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
    const fileExt = sanitizedFileName.split('.').pop();
    const uniqueFileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const formData = new FormData();
    formData.append('file', file);

    // Upload to your server/storage here
    // For now, we'll simulate a successful upload
    console.log('Uploading audio file:', uniqueFileName);

    // Return a mock URL for now
    return URL.createObjectURL(file);
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
};