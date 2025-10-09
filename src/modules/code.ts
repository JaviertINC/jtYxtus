import { startPlaceholder, endPlaceholder } from "../commons.js";

const insertPlaceholders = (text: string): string => {
    // Code blocks
    text = text.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, content) => {
        const params = lang ? lang : '';
        return `${startPlaceholder('CODE-BLOCK', params)}${content}${endPlaceholder('CODE-BLOCK')}`;
    });

    // Inline code
    text = text.replace(/`([^`]+)`/g, `${startPlaceholder('CODE-INLINE')}$1${endPlaceholder('CODE-INLINE')}`);

    return text;
};

const replacePlaceholders = (text: string): string => {
    // Inline code
    text = text.replace(/§§§CODE-INLINE:S§§§([^§]+)§§§CODE-INLINE:E§§§/g, '<code class="jt-yxtus jt-yxtus-code">$1</code>');

    // Code blocks
    text = text.replace(/§§§CODE-BLOCK\{([^}]*)\}:S§§§([\s\S]*?)§§§CODE-BLOCK:E§§§/g, (match, lang, content) => {
        const langAttr = lang ? ` lang="${lang}"` : '';
        const escapedContent = content.replace(/</g, '<').replace(/>/g, '>');
        return `<div class="jt-yxtus jt-yxtus-code-block"><button class="jt-yxtus" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code class="jt-yxtus jt-yxtus-code"${langAttr}>${escapedContent}</code></div>`;
    });

    return text;
};

export default { insertPlaceholders, replacePlaceholders };