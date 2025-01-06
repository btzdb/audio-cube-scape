import { supabase } from '@/integrations/supabase/client';

export async function uploadAudio(file: File) {
  try {
    // Validate file type
    if (!file.type.startsWith('audio/')) {
      throw new Error('Invalid file type. Please upload an audio file.');
    }

    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('audio')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('audio')
      .getPublicUrl(fileName);

    console.log('Audio file uploaded successfully:', publicUrl);
    
    return publicUrl;
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
}