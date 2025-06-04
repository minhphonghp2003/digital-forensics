import { createClient } from '@supabase/supabase-js';

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
export const formatTime = (value: any) => {
    return new Date(value).toLocaleTimeString("vi-VN") || "N/A"
}
export async function hashFile(file: any) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
export async function uploadFileToCloud(file: any) {
    const supabaseUrl = 'https://qhxywugmcgniitjgzjqh.supabase.co'
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ""
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase.storage.from(process.env.NEXT_PUBLIC_BUCKET_NAME!)?.upload("df/"
        + file.name, file, { upsert: true })
    const { data: publicUrl } = supabase
        .storage
        .from(process.env.NEXT_PUBLIC_BUCKET_NAME!)
        .getPublicUrl("df/" + file.name);
    if (error) {
        return null
    } else {
        return publicUrl.publicUrl
    }
}