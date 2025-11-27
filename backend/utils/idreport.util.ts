import { ulid } from 'ulid';

/**
 * Tạo một ULID duy nhất có prefix. ULID được sắp xếp theo thời gian (lexicographically sortable).
 * @param prefix Tiền tố (ví dụ: 'ND', 'DT', 'CC')
 * @returns Chuỗi ID duy nhất
 */
export const generateId = (prefix: string): string => {
    const uniquePart = ulid().substring(0, 6); 
    return prefix + uniquePart;
};
