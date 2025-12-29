import * as crypto from 'crypto';

/**
 * Tạo ID ngẫu nhiên độ dài 10 ký tự (Gồm Prefix + Random)
 * @param prefix Tiền tố (Ví dụ: 'DT', 'CC', 'ND'). Nên dài 2 ký tự.
 * @returns Chuỗi ID độ dài 10 (Ví dụ: DTX7B9A2)
 */
export const generateId = (prefix: string): string => {
    const lengthNeeded = 10 - prefix.length;

    if (lengthNeeded <= 0) {
        throw new Error("Prefix quá dài, không thể tạo ID độ dài 10!");
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    
    let result = '';
    const randomBytes = crypto.randomBytes(lengthNeeded);
    
    for (let i = 0; i < lengthNeeded; i++) {
        const randomIndex = randomBytes[i] % charactersLength;
        result += characters.charAt(randomIndex);
    }

    return prefix + result;
};