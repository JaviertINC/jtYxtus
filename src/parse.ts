import advanced from "./modules/advanced.ts";
import basic from "./modules/basic.ts";
import code from "./modules/code.ts";
import decorators from "./modules/decorators.ts";
import icons from "./modules/icons.ts";
import list from "./modules/list.ts";
import media from "./modules/media.ts";
import table from "./modules/table.ts";

const parse = (text: string): string => {
    // Paso 1: Procesar media placeholders (necesita URLs reales para extraer IDs)
    let protectedText = media.insertPlaceholders(text);

    // Paso 2: Procesar advanced placeholders
    protectedText = advanced.insertPlaceholders(protectedText);

    // Paso 2.5: Procesar icons placeholders
    protectedText = icons.insertPlaceholders(protectedText);

    // Paso 3: Proteger URLs
    const urlRegex = /(https?:\/\/[^)\s}]+)/g;
    const urls: string[] = [];
    protectedText = protectedText.replace(urlRegex, (match) => {
        urls.push(match);
        return `§§§URL_${urls.length - 1}§§§`;
    });

    // Paso 4: Procesar code, table, list, decorators y basic placeholders
    protectedText = code.insertPlaceholders(protectedText);
    protectedText = table.insertPlaceholders(protectedText);
    protectedText = list.insertPlaceholders(protectedText);
    protectedText = decorators.insertPlaceholders(protectedText);
    protectedText = basic.insertPlaceholders(protectedText);

    // Paso 5: Reemplazar placeholders por HTML
    protectedText = media.replacePlaceholders(protectedText);
    protectedText = icons.replacePlaceholders(protectedText);
    protectedText = code.replacePlaceholders(protectedText);
    protectedText = table.replacePlaceholders(protectedText);
    protectedText = advanced.replacePlaceholders(protectedText);
    protectedText = basic.replacePlaceholders(protectedText);
    protectedText = list.replacePlaceholders(protectedText);
    protectedText = decorators.replacePlaceholders(protectedText);

    // Paso 6: Restaurar URLs
    urls.forEach((url, index) => {
        protectedText = protectedText.replace(`§§§URL_${index}§§§`, url);
    });

    return protectedText;
};

export default parse;