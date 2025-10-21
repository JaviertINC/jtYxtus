import { escapeHtml, kebabCase, startPlaceholder, endPlaceholder } from "../commons.ts";

const insertPlaceholders = (text: string): string => {
    // Remove comments
    text = text.replace(/<!--.*?-->/gs, '');

    // Headings
    text = text.replace(/^#{1,6} (.+)$/gm, (match, content, offset, full) => {
        const level = match.match(/^#+/)![0].length;
        return `${startPlaceholder(`H${level}`)}${content}${endPlaceholder(`H${level}`)}`;
    });

    // Bold
    text = text.replace(/\*([^*]+)\*/g, `${startPlaceholder('STRONG')}$1${endPlaceholder('STRONG')}`);

    // Italic
    text = text.replace(/(?<!:\/\/)\/([^\/]+)\//g, `${startPlaceholder('EM')}$1${endPlaceholder('EM')}`);

    // Strike
    text = text.replace(/~([^~]+)~/g, `${startPlaceholder('DEL')}$1${endPlaceholder('DEL')}`);

    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `${startPlaceholder('LINK', '$2')}$1${endPlaceholder('LINK')}`);

    // Underline
    text = text.replace(/_([^_]+)_/g, `${startPlaceholder('U')}$1${endPlaceholder('U')}`);

    // Line breaks
    text = text.replace(/  $/gm, startPlaceholder('BR'));

    const lines = text.split('\n');
    let insideBlockquote = false;
    const processedLines = lines.map(line => {
        if (line.includes('§§§BLOCKQUOTE') && line.includes(':S§§§')) insideBlockquote = true;
        if (line.includes('§§§BLOCKQUOTE:E§§§')) insideBlockquote = false;

        if (insideBlockquote && !line.startsWith('§§§')) {
            return line;
        }

        if (line.trim() === '' || line.startsWith('§§§H') || line.startsWith('§§§CODEBLOCK') || line.startsWith('§§§IMG') || line.startsWith('§§§VIDEO') || line.startsWith('§§§AUDIO') || line.startsWith('§§§YOUTUBE') || line.startsWith('§§§IFRAME') || line.startsWith('§§§BUTTON') || line.startsWith('§§§TABLE') || line.startsWith('§§§BLOCKQUOTE') || line.startsWith('§§§HR') || line.startsWith('§§§OL') || line.startsWith('§§§UL') || line.startsWith('§§§LI') || line.startsWith('§§§TASK-UL') || line.startsWith('§§§TASK-LI') || line.startsWith('§§§ALIGN') || line.startsWith('>')) {
            return line;
        }
        return `${startPlaceholder('PARAGRAPH')}${line}${endPlaceholder('PARAGRAPH')}`;
    });
    text = processedLines.join('\n');

    return text;
};

const replacePlaceholders = (text: string): string => {
    // Headings
    for (let i = 1; i <= 6; i++) {
        const regex = new RegExp(`§§§H${i}:S§§§([^§]+)§§§H${i}:E§§§`, 'g');
        text = text.replace(regex, (match, content) => {
            const id = kebabCase(content);
            return `<h${i} id="${id}" class="jt-yxtus">${escapeHtml(content)}</h${i}>`;
        });
    }

    // Strong
    text = text.replace(/§§§STRONG:S§§§([^§]+)§§§STRONG:E§§§/g, (match, content) => `<strong class="jt-yxtus">${escapeHtml(content)}</strong>`);

    // Em
    text = text.replace(/§§§EM:S§§§([^§]+)§§§EM:E§§§/g, (match, content) => `<em class="jt-yxtus">${escapeHtml(content)}</em>`);

    // Del
    text = text.replace(/§§§DEL:S§§§([^§]+)§§§DEL:E§§§/g, (match, content) => `<del class="jt-yxtus">${escapeHtml(content)}</del>`);

    // U
    text = text.replace(/§§§U:S§§§([^§]+)§§§U:E§§§/g, (match, content) => `<u class="jt-yxtus">${escapeHtml(content)}</u>`);

    // Links
    text = text.replace(/§§§LINK\{([^}]+)\}:S§§§([^§]+)§§§LINK:E§§§/g, (match, url, content) => {
        const target = url.startsWith('#') ? '' : ' target="_blank"';
        return `<a href="${url}"${target} class="jt-yxtus jt-yxtus-link">${escapeHtml(content)}</a>`;
    });

    // BR
    text = text.replace(/§§§BR:S§§§/g, '<br class="jt-yxtus">');

    // Paragraphs
    text = text.replace(/§§§PARAGRAPH:S§§§([\s\S]*?)§§§PARAGRAPH:E§§§/g, (match, content) => `<p class="jt-yxtus">${content}</p>`);

    return text;
};

export default { insertPlaceholders, replacePlaceholders };
