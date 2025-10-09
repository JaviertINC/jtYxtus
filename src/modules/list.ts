import { escapeHtml, startPlaceholder, endPlaceholder } from "../commons.js";

const insertPlaceholders = (text: string): string => {
    const lines = text.split('\n');
    const processedLines: string[] = [];
    let inOrderedList = false;
    let inUnorderedList = false;
    let inTaskList = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Check for ordered list item (1. 2. 3. etc.)
        const orderedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
        // Check for task list item (- [ ] or - [x])
        const taskMatch = trimmed.match(/^-\s+\[([ x])\]\s+(.+)$/);
        // Check for unordered list item (- ) - but not task items
        const unorderedMatch = trimmed.match(/^-\s+(.+)$/);

        if (orderedMatch) {
            const content = orderedMatch[2];
            if (!inOrderedList) {
                // Start of ordered list
                processedLines.push(startPlaceholder('OL'));
                inOrderedList = true;
                inUnorderedList = false;
                inTaskList = false;
            }
            processedLines.push(`${startPlaceholder('LI')}${content}${endPlaceholder('LI')}`);
        } else if (taskMatch) {
            const checked = taskMatch[1] === 'x' ? 'checked' : 'unchecked';
            const content = taskMatch[2];
            if (!inTaskList) {
                // Start of task list
                processedLines.push(startPlaceholder('TASK-UL'));
                inTaskList = true;
                inOrderedList = false;
                inUnorderedList = false;
            }
            processedLines.push(`${startPlaceholder('TASK-LI', checked)}${content}${endPlaceholder('TASK-LI')}`);
        } else if (unorderedMatch) {
            const content = unorderedMatch[1];
            if (!inUnorderedList) {
                // Start of unordered list
                processedLines.push(startPlaceholder('UL'));
                inUnorderedList = true;
                inOrderedList = false;
                inTaskList = false;
            }
            processedLines.push(`${startPlaceholder('LI')}${content}${endPlaceholder('LI')}`);
        } else {
            // End of any list if we were in one
            if (inOrderedList) {
                processedLines.push(endPlaceholder('OL'));
                inOrderedList = false;
            }
            if (inUnorderedList) {
                processedLines.push(endPlaceholder('UL'));
                inUnorderedList = false;
            }
            if (inTaskList) {
                processedLines.push(endPlaceholder('TASK-UL'));
                inTaskList = false;
            }
            processedLines.push(line);
        }
    }

    // Close any open lists at the end
    if (inOrderedList) {
        processedLines.push(endPlaceholder('OL'));
    }
    if (inUnorderedList) {
        processedLines.push(endPlaceholder('UL'));
    }
    if (inTaskList) {
        processedLines.push(endPlaceholder('TASK-UL'));
    }

    return processedLines.join('\n');
};

const replacePlaceholders = (text: string): string => {
    // Replace list item placeholders
    text = text.replace(/§§§LI:S§§§([^§]+)§§§LI:E§§§/g, (match, content) => `<li class="jt-yxtus">${content}</li>`);

    // Replace task list item placeholders
    text = text.replace(/§§§TASK-LI\{([^}]+)\}:S§§§([^§]+)§§§TASK-LI:E§§§/g, (match, checked, content) => {
        const checkbox = checked === 'checked'
            ? '<input type="checkbox" checked disabled class="jt-yxtus">'
            : '<input type="checkbox" disabled class="jt-yxtus">';
        return `<li class="jt-yxtus">${checkbox} ${content}</li>`;
    });

    // Replace ordered list placeholders
    text = text.replace(/§§§OL:S§§§([\s\S]*?)§§§OL:E§§§/g, (match, content) => `<ol class="jt-yxtus">${content}</ol>`);

    // Replace unordered list placeholders
    text = text.replace(/§§§UL:S§§§([\s\S]*?)§§§UL:E§§§/g, (match, content) => `<ul class="jt-yxtus">${content}</ul>`);

    // Replace task list placeholders
    text = text.replace(/§§§TASK-UL:S§§§([\s\S]*?)§§§TASK-UL:E§§§/g, (match, content) => `<ul class="jt-yxtus task-list">${content}</ul>`);

    return text;
};

export default { insertPlaceholders, replacePlaceholders };