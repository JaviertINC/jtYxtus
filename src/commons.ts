export const startPlaceholder = (element: string, params?: string): string => `§§§${element}${params ? `{${params}}` : ''}:S§§§`;
export const endPlaceholder = (element: string): string => `§§§${element}:E§§§`;

export const escapeHtml = (str: string): string => {
    return str
        .replace(/&/g, '&')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '"')
        .replace(/'/g, "'");
};

export const kebabCase = (str: string): string => {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-+/g, '-');
};