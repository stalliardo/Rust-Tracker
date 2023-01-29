export const getActivePlayTime = (start) => {
    const startTime = new Date(start);
    const currentTime = new Date();
    const diff = currentTime - startTime;
    const diffInMinutes = diff / 60000; // convert milliseconds to minutes
    const hours = Math.floor(diffInMinutes / 60).toString().padStart(2, "0")
    const minutes = Math.floor(diffInMinutes % 60).toString().padStart(2, "0")

    return hours + ":" + minutes;
}

export const sortByLongestPlayTimeFirst = (sessionArray) => {
    return sessionArray.sort(function(a, b) {
        // Extract the hours and minutes from the playTime strings
        const aTime = a.playTime.split(':');
        const bTime = b.playTime.split(':');
        const aHours = parseInt(aTime[0]);
        const aMinutes = parseInt(aTime[1]);
        const bHours = parseInt(bTime[0]);
        const bMinutes = parseInt(bTime[1]);
      
        // Compare the hours first
        if (aHours !== bHours) {
          return bHours - aHours;
        }
      
        // If the hours are the same, compare the minutes
        return bMinutes - aMinutes;
      });
}