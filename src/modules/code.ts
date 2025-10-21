import { startPlaceholder, endPlaceholder } from "../commons.ts";

let codeBlocks: { lang: string; content: string }[] = [];
let inlineCodes: string[] = [];

const insertPlaceholders = (text: string): string => {
    codeBlocks = [];
    inlineCodes = [];

    // Code blocks
    text = text.replace(/(`{3,10})(\w+)?\n?([\s\S]*?)\1/g, (match, backticks, lang, content) => {
        codeBlocks.push({ lang: lang || '', content });
        return `§§§CODEBLOCK_${codeBlocks.length - 1}§§§`;
    });

    // Inline code
    text = text.replace(/`([^`]+)`/g, (match, content) => {
        inlineCodes.push(content);
        return `§§§CODEINLINE_${inlineCodes.length - 1}§§§`;
    });

    return text;
};

const replacePlaceholders = (text: string): string => {
    // Inline code
    text = text.replace(/§§§CODEINLINE_(\d+)§§§/g, (match, index) => {
        const content = inlineCodes[parseInt(index)];
        return `<code class="jt-yxtus jt-yxtus-code">${content}</code>`;
    });

    // Code blocks
    text = text.replace(/§§§CODEBLOCK_(\d+)§§§/g, (match, index) => {
        const { lang, content } = codeBlocks[parseInt(index)];
        const langAttr = lang ? ` lang="${lang}"` : '';
        const escapedContent = content.replace(/</g, '<').replace(/>/g, '>');
        return `<div class="jt-yxtus jt-yxtus-code-block"><button class="jt-yxtus" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code class="jt-yxtus jt-yxtus-code"${langAttr}>${escapedContent}</code></div>`;
    });

    return text;
};

export default { insertPlaceholders, replacePlaceholders };