import { startPlaceholder, endPlaceholder } from "../commons.ts";

const insertPlaceholders = (text: string): string => {
    // Icons
    text = text.replace(/;([^;]+);/g, (match, icon) => {
        return `${startPlaceholder('ICON', icon)} ${endPlaceholder('ICON')}`;
    });

    return text;
};

const replacePlaceholders = (text: string): string => {
    // Icons
    text = text.replace(/§§§ICON\{([^}]+)\}:S§§§([^§]+)§§§ICON:E§§§/g, (match, icon) => {
        return `<i class="jt-yxtus ico-${icon}"></i>`;
    });

    return text;
};

export default { insertPlaceholders, replacePlaceholders };