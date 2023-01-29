export const getActivePlayTime = (start) => {
    const startTime = new Date(start);
    const currentTime = new Date();
    const diff = currentTime - startTime;
    const diffInMinutes = diff / 60000; // convert milliseconds to minutes
    const hours = Math.floor(diffInMinutes / 60).toString().padStart(2, "0")
    const minutes = Math.floor(diffInMinutes % 60).toString().padStart(2, "0")

    return hours + ":" + minutes;
}