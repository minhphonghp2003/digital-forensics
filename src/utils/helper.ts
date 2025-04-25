export const truncateFromMiddle = (
    fullStr = '',
    strLen = 14,
    middleStr = '...',
) => {
    if (fullStr.length <= strLen) return fullStr;
    const midLen = middleStr.length;
    const charsToShow = strLen - midLen;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return (
        fullStr.substr(0, frontChars) +
        middleStr +
        fullStr.substr(fullStr.length - backChars)
    );
};

export const formatDate = (value: any) => {
    return new Date(value).toLocaleDateString("vi-VN") || "N/A"
}