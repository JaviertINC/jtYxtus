import { escapeHtml } from "./../commons.ts";

const startPlaceholder = (element: string, params?: string): string => `§§§${element}${params ? `{${params}}` : ''}:S§§§`;
const endPlaceholder = (element: string): string => `§§§${element}:E§§§`;

const extractYouTubeId = (urlOrId: string): string => {
    const match = urlOrId.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : urlOrId;
};

const insertPlaceholders = (text: string): string => {
    // Images
    text = text.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, `${startPlaceholder('IMG', '$2')}$1${endPlaceholder('IMG')}`);

    // Videos
    text = text.replace(/\[video\{([01])\|([01])\|([01])\}\]\(([^)]+)\)/g, (match, autoplay, mute, controls, url) => {
        return `${startPlaceholder('VIDEO', `${autoplay}|${mute}|${controls}|${url}`)} ${endPlaceholder('VIDEO')}`;
    });

    // Audio
    text = text.replace(/\[audio\{([01])\|([01])\|([01])\}\]\(([^)]+)\)/g, (match, autoplay, mute, controls, url) => {
        return `${startPlaceholder('AUDIO', `${autoplay}|${mute}|${controls}|${url}`)} ${endPlaceholder('AUDIO')}`;
    });

    // YouTube
    text = text.replace(/\[yt\{([01])\|([01])\|(\d+x\d+)\}\]\(([^)]+)\)/g, (match, autoplay, mute, size, url) => {
        const id = extractYouTubeId(url);
        return `${startPlaceholder('YOUTUBE', `${autoplay}|${mute}|${size}|${id}`)} ${endPlaceholder('YOUTUBE')}`;
    });

    return text;
};

const replacePlaceholders = (text: string): string => {

    // Images
    text = text.replace(/§§§IMG\{([^}]+)\}:S§§§([^§]+)§§§IMG:E§§§/g, (match, url, alt) => `<img src="${url}" alt="${escapeHtml(alt)}" class="jt-yxtus" />`);

    // Videos
    text = text.replace(/§§§VIDEO\{([01])\|([01])\|([01])\|([^}]+)\}:S§§§([^§]*)§§§VIDEO:E§§§/g, (match, autoplay, mute, controls, url) => {
        let attrs = `src="${url}"`;
        if (autoplay === '1') attrs += ' autoplay';
        if (mute === '1') attrs += ' muted';
        if (controls === '1') attrs += ' controls';
        return `<video ${attrs} class="jt-yxtus"></video>`;
    });

    // Audio
    text = text.replace(/§§§AUDIO\{([01])\|([01])\|([01])\|([^}]+)\}:S§§§([^§]*)§§§AUDIO:E§§§/g, (match, autoplay, mute, controls, url) => {
        let attrs = `src="${url}"`;
        if (autoplay === '1') attrs += ' autoplay';
        if (mute === '1') attrs += ' muted';
        if (controls === '1') attrs += ' controls';
        return `<audio ${attrs} class="jt-yxtus"></audio>`;
    });

    // YouTube
    text = text.replace(/§§§YOUTUBE\{([01])\|([01])\|([^|]+)\|([^}]+)\}:S§§§([^§]*)§§§YOUTUBE:E§§§/g, (match, autoplay, mute, size, urlOrId) => {
        const id = extractYouTubeId(urlOrId);
        const [width, height] = size.split('x');
        const allow = ['accelerometer', 'clipboard-write', 'encrypted-media', 'gyroscope', 'picture-in-picture', 'web-share'];
        if (autoplay === '1') allow.push('autoplay');
        const allowStr = allow.join('; ');
        return `<iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${id}" title="YouTube Embed from jtYxtus" frameborder="0" allow="${allowStr}" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen${mute === '1' ? ' muted' : ''} class="jt-yxtus jt-yxtus-youtube"></iframe>`;
    });

    return text;
};

export default { insertPlaceholders, replacePlaceholders };