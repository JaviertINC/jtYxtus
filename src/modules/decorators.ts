import { escapeHtml, startPlaceholder, endPlaceholder } from "../commons.js";
import basic from "./basic.js";

const insertPlaceholders = (text: string): string => {
    const lines = text.split('\n');
    const processedLines: string[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        // Check for horizontal lines
        if (trimmed === '---') {
            processedLines.push(startPlaceholder('HR', 'line1'));
            i++;
            continue;
        }
        if (trimmed === '---o---') {
            processedLines.push(startPlaceholder('HR', 'line2'));
            i++;
            continue;
        }
        if (trimmed === '---^---') {
            processedLines.push(startPlaceholder('HR', 'line3'));
            i++;
            continue;
        }

        // Check for blockquote start
        const blockquoteMatch = line.match(/^>(.*)$/);
        if (blockquoteMatch) {
            const { blockquoteHtml, linesConsumed } = parseBlockquote(lines, i);
            processedLines.push(blockquoteHtml);
            i += linesConsumed;
            continue;
        }

        processedLines.push(line);
        i++;
    }

    return processedLines.join('\n');
};

const parseBlockquote = (lines: string[], startIndex: number): { blockquoteHtml: string; linesConsumed: number } => {
    let i = startIndex;
    const blockquoteLines: { level: number; content: string }[] = [];
    let blockquoteType = 'regular';
    let blockquoteTitle = '';

    // Check if first line is special blockquote
    const firstLine = lines[i];
    const specialMatch = firstLine.match(/^>\s*\[!(NOTE|IMPORTANT|HELP|INFO|SUCCESS|WARNING|ERROR|NEUTRAL)@(.+)\]$/);
    if (specialMatch) {
        blockquoteType = specialMatch[1].toLowerCase();
        blockquoteTitle = specialMatch[2].replace(/\*([^*]+)\*/g, `${startPlaceholder('STRONG')}$1${endPlaceholder('STRONG')}`);
        i++;
    }

    // Parse blockquote lines
    while (i < lines.length) {
        const line = lines[i];
        const match = line.match(/^>+ /);
        if (!match) break;

        const rawLevel = match[0].length - 1; // number of >
        const level = blockquoteType === 'regular' ? rawLevel - 1 : rawLevel;
        const content = line.substring(match[0].length);
        blockquoteLines.push({ level, content });
        i++;
    }

    // Build HTML
    const params = blockquoteType === 'regular' ? 'regular' : `${blockquoteType}|${blockquoteTitle}`;
    let html = startPlaceholder('BLOCKQUOTE', params);

    // Group lines by nesting level
    let baseLevel = blockquoteType === 'regular' ? 0 : 1;
    let currentLevel = baseLevel;
    for (const { level, content } of blockquoteLines) {
        if (level > currentLevel) {
            // Open nested blockquotes
            for (let l = currentLevel; l < level; l++) {
                html += startPlaceholder('BLOCKQUOTE2', 'regular');
            }
        } else if (level < currentLevel) {
            // Close nested blockquotes
            for (let l = currentLevel; l > level; l--) {
                html += endPlaceholder('BLOCKQUOTE2');
            }
        }
        currentLevel = level;
        html += content + '\n';
    }

    // Close remaining nested blockquotes
    for (let l = currentLevel; l > baseLevel; l--) {
        html += endPlaceholder('BLOCKQUOTE');
    }

    html += endPlaceholder('BLOCKQUOTE');

    return {
        blockquoteHtml: html,
        linesConsumed: i - startIndex
    };
};

const replacePlaceholders = (text: string): string => {
    // Horizontal lines
    text = text.replace(/§§§HR\{([^}]+)\}:S§§§/g, (match, type) => `<hr class="jt-yxtus ${type}">`);

    // Blockquotes
    text = text.replace(/§§§BLOCKQUOTE\{([^|}]+)\|([^}]+)\}:S§§§([\s\S]*?)§§§BLOCKQUOTE:E§§§/g, (match: string, type: string, title: string, content: string) => {
        let processed = content;
        // Apply paragraph processing
        const lines = processed.split('\n');
        const processedLines = lines.filter(line => line.trim() !== '').map(line => {
            if (line.startsWith('<') || line.startsWith('§§§')) return line;
            return escapeHtml(line);
        });
        processed = processedLines.join('<br/>');
        return `<blockquote class="jt-yxtus ${type}"><div class="jt-yxtus blockquote-title">${title}</div><br/>${processed}</blockquote>`;
    });

    text = text.replace(/§§§BLOCKQUOTE\{regular\}:S§§§([\s\S]*?)§§§BLOCKQUOTE:E§§§/g, (match: string, content: string) => {
        let processed = content;
        // Apply paragraph processing
        const lines = processed.split('\n');
        const processedLines = lines.filter(line => line.trim() !== '').map(line => {
            if (line.startsWith('<') || line.startsWith('§§§')) return line;
            return escapeHtml(line);
        });
        processed = processedLines.join('<br/>');
        if (processedLines.length === 1 && !processed.endsWith('.')) processed += '.';
        return `<blockquote class="jt-yxtus">${processed}</blockquote>`;
    });

    // Blockquotes2
    text = text.replace(/§§§BLOCKQUOTE2\{regular\}:S§§§([\s\S]*?)§§§BLOCKQUOTE2:E§§§/g, (match: string, content: string) => {
        let processed = content;
        const lines = processed.split('\n');
        const processedLines = lines.filter(line => line.trim() !== '').map(line => {
            if (line.startsWith('<') || line.startsWith('§§§')) return line;
            return escapeHtml(line);
        });
        processed = processedLines.join('<br/>');
        return `<blockquote class="jt-yxtus">${processed}</blockquote>`;
    });

    return text;
};

export default { insertPlaceholders, replacePlaceholders };