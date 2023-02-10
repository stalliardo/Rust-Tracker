export const truncateString = (str, startIndex, endIndex, trailingDots = true) => {
    return str.slice(startIndex, endIndex) + (trailingDots ? "..." : "");
}