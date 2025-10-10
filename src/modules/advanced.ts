import { escapeHtml } from "./../commons.ts";

const startPlaceholder = (element: string, params?: string): string => `§§§${element}${params ? `{${params}}` : ''}:S§§§`;
const endPlaceholder = (element: string): string => `§§§${element}:E§§§`;

const insertPlaceholders = (text: string): string => {
    const abbrMap: { [key: string]: string } = {};
    const lines = text.split('\n');
    const filteredLines: string[] = [];
    for (const line of lines) {
        const match = line.match(/^\*\[([^\]]+)\]:\s*(.+)$/);
        if (match) {
            abbrMap[match[1]] = match[2];
        } else {
            filteredLines.push(line);
        }
    }
    text = filteredLines.join('\n');

    for (const abbr in abbrMap) {
        const regex = new RegExp(`\\{(${abbr})\\}`, 'g');
        text = text.replace(regex, (match, abbrText) => {
            return `${startPlaceholder('ABBR', abbrMap[abbr])}${abbrText}${endPlaceholder('ABBR')}`;
        });
    }

    // Iframe
    text = text.replace(/\[iframe\{(\d+x\d+)\}\]\(([^)]+)\)/g, (match, size, url) => {
        return `${startPlaceholder('IFRAME', `${size}|${url}`)} ${endPlaceholder('IFRAME')}`;
    });

    // Button
    text = text.replace(/\[([^\{]+)\{([^}]+)\}\]\(([^)]+)\)/g, (match, buttonText, options, url) => {
        return `${startPlaceholder('BUTTON', `${options}|${url}`)}${buttonText}${endPlaceholder('BUTTON')}`;
    });

    return text;
};

const replacePlaceholders = (text: string): string => {
    // Abbreviation
    text = text.replace(/§§§ABBR\{([^}]+)\}:S§§§([^§]+)§§§ABBR:E§§§/g, (match, title, content) => {
        return `<abbr title="${escapeHtml(title)}" class="jt-yxtus">${escapeHtml(content)}</abbr>`;
    });

    // Iframe
    text = text.replace(/§§§IFRAME\{([^|]+)\|([^}]+)\}:S§§§([^§]*)§§§IFRAME:E§§§/g, (match, size, url) => {
        let [width, height] = size.split('x');
        if (width === '0') width = '100%';
        if (height === '0') height = '512';
        return `<iframe src="${url}" width="${width}" height="${height}" frameborder="0" class="jt-yxtus jt-yxtus-iframe"></iframe>`;
    });

    // Button
    text = text.replace(/§§§BUTTON\{([^|]+)\|([^}]+)\}:S§§§([^§]+)§§§BUTTON:E§§§/g, (match, options, url, content) => {
        const opts = options.split(',');
        let downloadAttr = '';
        if (opts.includes('download')) {
            const filename = opts[1] ? `="${opts[1]}"` : '';
            downloadAttr = ` download${filename}`;
        }
        return `<a href="${url}"${downloadAttr} class="jt-yxtus jt-yxtus-button">${escapeHtml(content)}</a>`;
    });

    return text;
};

export default { insertPlaceholders, replacePlaceholders };