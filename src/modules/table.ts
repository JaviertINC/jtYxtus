import { startPlaceholder, endPlaceholder } from "../commons.js";

interface TableData {
    header: string[];
    alignments: string[];
    body: string[][];
}

const parseTable = (lines: string[]): TableData | null => {
    if (lines.length < 2) return null;

    const header = lines[0].split('|').slice(1, -1).map(cell => cell.trim());
    const sep = lines[1].split('|').slice(1, -1).map(cell => cell.trim());

    if (header.length !== sep.length) return null;

    const alignments = sep.map(s => {
        if (s.startsWith(':') && s.endsWith(':')) return 'center';
        if (s.endsWith(':')) return 'right';
        return 'left';
    });

    const body = lines.slice(2).map(line => line.split('|').slice(1, -1).map(cell => cell.trim()));

    return { header, alignments, body };
};

const insertPlaceholders = (text: string): string => {
    const lines = text.split('\n');
    let result = '';
    let i = 0;
    while (i < lines.length) {
        if (lines[i].trim().match(/^\|.*\|$/)) {
            // potential table start
            const tableLines = [];
            while (i < lines.length && lines[i].trim().match(/^\|.*\|$/)) {
                tableLines.push(lines[i]);
                i++;
            }
            if (tableLines.length >= 2) {
                const table = parseTable(tableLines.map(line => line.trim()));
                if (table) {
                    const processInline = (cell: string) => {
                        cell = cell.replace(/\*([^*]+)\*/g, `${startPlaceholder('STRONG')}$1${endPlaceholder('STRONG')}`);
                        cell = cell.replace(/(?<!:\/\/)\/([^\/]+)\//g, `${startPlaceholder('EM')}$1${endPlaceholder('EM')}`);
                        cell = cell.replace(/~([^~]+)~/g, `${startPlaceholder('DEL')}$1${endPlaceholder('DEL')}`);
                        cell = cell.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `${startPlaceholder('A', '$2')}$1${endPlaceholder('A')}`);
                        cell = cell.replace(/_([^_]+)_/g, `${startPlaceholder('U')}$1${endPlaceholder('U')}`);
                        return cell;
                    };
                    table.header = table.header.map(processInline);
                    table.body = table.body.map(row => row.map(processInline));
                    const tableData = Buffer.from(JSON.stringify(table), 'utf8').toString('base64');
                    result += '\n' + startPlaceholder('TABLE') + tableData + endPlaceholder('TABLE') + '\n';
                } else {
                    result += tableLines.join('\n') + '\n';
                }
            } else {
                result += tableLines.join('\n') + '\n';
            }
        } else {
            result += lines[i] + '\n';
            i++;
        }
    }
    return result.replace(/\n+$/, ''); // remove trailing newlines
};

const replacePlaceholders = (text: string): string => {
    text = text.replace(/§§§TABLE:S§§§([^§]+)§§§TABLE:E§§§/g, (match, data) => {
        const table: TableData = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
        let html = '<table class="jt-yxtus"><thead><tr>';
        table.header.forEach((cell, i) => {
            const align = table.alignments[i] || 'left';
            const style = align === 'left' ? '' : ` style="text-align: ${align};"`;
            html += `<th${style}>${cell}</th>`;
        });
        html += '</tr></thead><tbody>';
        table.body.forEach(row => {
            html += '<tr>';
            row.forEach((cell, i) => {
                const align = table.alignments[i] || 'left';
                const style = align === 'left' ? '' : ` style="text-align: ${align};"`;
                html += `<td${style}>${cell}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody></table>';
        return html;
    });
    return text;
};

export default { insertPlaceholders, replacePlaceholders };