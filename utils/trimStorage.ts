interface TrimData {
  startTime: number;
  endTime: number;
  lastUpdated: number;
}
  
interface TrimStorage {
  [videoId: string]: TrimData;
}
  
export const saveTrimData = (videoId: string, startTime: number, endTime: number) => {
  try {
    // Get existing data
    const existingData = sessionStorage.getItem('videoTrimData');
    const trimData: TrimStorage = existingData ? JSON.parse(existingData) : {};

    // Update data for this video
    trimData[videoId] = {
      startTime,
      endTime,
      lastUpdated: Date.now()
    };

    // Save back to localStorage
    sessionStorage.setItem('videoTrimData', JSON.stringify(trimData));
  } catch (error) {
    console.error('Error saving trim data:', error);
  }
};
  
export const getTrimData = (videoId: string): TrimData | null => {
  try {
    const existingData = sessionStorage.getItem('videoTrimData');
    if (!existingData) return null;

    const trimData: TrimStorage = JSON.parse(existingData);
    return trimData[videoId] || null;
  } catch (error) {
    console.error('Error getting trim data:', error);
    return null;
  }
};