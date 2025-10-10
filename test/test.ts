import jtYxtus from "../src/index.ts";

const parser = new jtYxtus();

const tests = [
    {
        input: 'Hola *mundo*.',
        expected: '<p class="jt-yxtus">Hola <strong class="jt-yxtus">mundo</strong>.</p>'
    },
    {
        input: '# Título',
        expected: '<h1 id="titulo" class="jt-yxtus">Título</h1>'
    },
    {
        input: '`code`',
        expected: '<p class="jt-yxtus"><code class="jt-yxtus">code</code></p>'
    },
    {
        input: '![Hola mundo](http://example.com/img.png)',
        expected: '<img src="http://example.com/img.png" alt="Hola mundo" class="jt-yxtus" />'
    },
    {
        input: '[text](http://example.com)',
        expected: '<p class="jt-yxtus"><a href="http://example.com" target="_blank" class="jt-yxtus jt-yxtus-link">text</a></p>'
    },
    {
        input: 'Esto es /cursiva/.',
        expected: '<p class="jt-yxtus">Esto es <em class="jt-yxtus">cursiva</em>.</p>'
    },
    {
        input: 'Texto ~tachado~.',
        expected: '<p class="jt-yxtus">Texto <del class="jt-yxtus">tachado</del>.</p>'
    },
    {
        input: 'Texto _subrayado_.',
        expected: '<p class="jt-yxtus">Texto <u class="jt-yxtus">subrayado</u>.</p>'
    },
    {
        input: '## Subtítulo',
        expected: '<h2 id="subtitulo" class="jt-yxtus">Subtítulo</h2>'
    },
    {
        input: '```js\nconsole.log("Hola");\n```',
        expected: '<div class="jt-yxtus code-block"><button class="jt-yxtus" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code class="jt-yxtus" lang="js">console.log("Hola");\n</code></div>'
    },
    {
        input: '[video{1|0|1}](http://example.com/video.mp4)',
        expected: '<video src="http://example.com/video.mp4" autoplay controls class="jt-yxtus"></video>'
    },
    {
        input: '[audio{1|0|1}](http://example.com/audio.mp3)',
        expected: '<audio src="http://example.com/audio.mp3" autoplay controls class="jt-yxtus"></audio>'
    },
    {
        input: '[yt{1|0|640x480}](https://youtu.be/dQw4w9WgXcQ)',
        expected: '<iframe width="640" height="480" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube Embed from jtYxtus" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen class="jt-yxtus"></iframe>'
    },
    {
        input: '[iframe{640x480}](https://example.com)',
        expected: '<iframe src="https://example.com" width="640" height="480" frameborder="0" class="jt-yxtus"></iframe>'
    },
    {
        input: '[iframe{0x0}](https://example.com)',
        expected: '<iframe src="https://example.com" width="100%" height="512" frameborder="0" class="jt-yxtus"></iframe>'
    },
    {
        input: '[button{download,myfile.pdf}](http://example.com/file.pdf)',
        expected: '<a href="http://example.com/file.pdf" download="myfile.pdf" class="jt-yxtus jt-yxtus-button">button</a>'
    },
    {
        input: '[button{download}](http://example.com/file.pdf)',
        expected: '<a href="http://example.com/file.pdf" download class="jt-yxtus jt-yxtus-button">button</a>'
    },
    {
        input: '1. texto\n2. *texto*\n3. /texto/',
        expected: '<ol class="jt-yxtus">\n<li class="jt-yxtus">texto</li>\n<li class="jt-yxtus"><strong class="jt-yxtus">texto</strong></li>\n<li class="jt-yxtus"><em class="jt-yxtus">texto</em></li>\n</ol>'
    },
    {
        input: '- texto\n- [texto](url)\n- texto',
        expected: '<ul class="jt-yxtus">\n<li class="jt-yxtus">texto</li>\n<li class="jt-yxtus"><a href="url" target="_blank" class="jt-yxtus jt-yxtus-link">texto</a></li>\n<li class="jt-yxtus">texto</li>\n</ul>'
    },
    {
        input: '- [ ] Tarea pendiente\n- [x] Tarea completada\n- [ ] Otra tarea',
        expected: '<ul class="jt-yxtus task-list">\n<li class="jt-yxtus"><input type="checkbox" disabled class="jt-yxtus"> Tarea pendiente</li>\n<li class="jt-yxtus"><input type="checkbox" checked disabled class="jt-yxtus"> Tarea completada</li>\n<li class="jt-yxtus"><input type="checkbox" disabled class="jt-yxtus"> Otra tarea</li>\n</ul>'
    },
    {
        input: 'Texto con *negrita*, /cursiva/ y _subrayado_.',
        expected: '<p class="jt-yxtus">Texto con <strong class="jt-yxtus">negrita</strong>, <em class="jt-yxtus">cursiva</em> y <u class="jt-yxtus">subrayado</u>.</p>'
    },
    {
        input: `| Header1 | Header2 | Header3 | Header4 |
| --- | :--- | :---: | ---: |
| Body1 | /Body2/ | | Body4 |
| *Body1.1* | | Body2.1 | ~Body4.1~ |`,
        expected: '<table class="jt-yxtus"><thead><tr><th>Header1</th><th>Header2</th><th style="text-align: center;">Header3</th><th style="text-align: right;">Header4</th></tr></thead><tbody><tr><td>Body1</td><td><em class="jt-yxtus">Body2</em></td><td style="text-align: center;"></td><td style="text-align: right;">Body4</td></tr><tr><td><strong class="jt-yxtus">Body1.1</strong></td><td></td><td style="text-align: center;">Body2.1</td><td style="text-align: right;"><del class="jt-yxtus">Body4.1</del></td></tr></tbody></table>'
    },
    {
        input: '---',
        expected: '<hr class="jt-yxtus line1">'
    },
    {
        input: '---o---',
        expected: '<hr class="jt-yxtus line2">'
    },
    {
        input: '---^---',
        expected: '<hr class="jt-yxtus line3">'
    },
    {
        input: '> Esto es una cita',
        expected: '<blockquote class="jt-yxtus">Esto es una cita.</blockquote>'
    },
    {
        input: '> Primera línea\n> Segunda línea',
        expected: '<blockquote class="jt-yxtus">Primera línea<br/>Segunda línea</blockquote>'
    },
    {
        input: '> Nivel 1\n>> Nivel 2\n> De vuelta al nivel 1',
        expected: '<blockquote class="jt-yxtus">Nivel 1<br/><blockquote class="jt-yxtus">Nivel 2<br/></blockquote>De vuelta al nivel 1</blockquote>'
    },
    {
        input: '> [!NOTE@Hola *mundo*]\n> Saludar es lo correcto',
        expected: '<blockquote class="jt-yxtus note"><div class="jt-yxtus blockquote-title">Hola <strong class="jt-yxtus">mundo</strong></div><br/>Saludar es lo correcto</blockquote>'
    },
    {
        input: '> [!WARNING@Cuidado]\n> Esto es peligroso',
        expected: '<blockquote class="jt-yxtus warning"><div class="jt-yxtus blockquote-title">Cuidado</div><br/>Esto es peligroso</blockquote>'
    },
    {
        input: 'This is {HTML} and it works.\n\n*[HTML]: Hyper Text Markup Language',
        expected: '<p class="jt-yxtus">This is <abbr title="Hyper Text Markup Language" class="jt-yxtus">HTML</abbr> and it works.</p>'
    },
    {
        input: '{CSS} is cool.\n\n*[CSS]: Cascading Style Sheets\n*[HTML]: Hyper Text Markup Language',
        expected: '<p class="jt-yxtus"><abbr title="Cascading Style Sheets" class="jt-yxtus">CSS</abbr> is cool.</p>'
    },
    {
        input: '*Bold* text and {ABBR}.\n\n*[ABBR]: Abbreviation',
        expected: '<p class="jt-yxtus"><strong class="jt-yxtus">Bold</strong> text and <abbr title="Abbreviation" class="jt-yxtus">ABBR</abbr>.</p>'
    },
    {
        input: 'Texto ==resaltado==.',
        expected: '<p class="jt-yxtus">Texto <mark class="jt-yxtus">resaltado</mark>.</p>'
    },
    {
        input: 'Love this ;heart;.',
        expected: '<p class="jt-yxtus">Love this <i class="jt-yxtus ico-heart"></i>.</p>'
    },
    {
        input: 'Great job ;check;.',
        expected: '<p class="jt-yxtus">Great job <i class="jt-yxtus ico-check"></i>.</p>'
    },
    {
        input: 'Unknown ;unknown;.',
        expected: '<p class="jt-yxtus">Unknown <i class="jt-yxtus ico-unknown"></i>.</p>'
    }
];

tests.forEach((test, i) => {
    const result = parser.parse(test.input);
    console.log(`Test ${i + 1}:`);
    console.log(`Input: ${test.input}`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Got: ${result}`);
    console.log(`Pass: ${result === test.expected ? 'YES' : 'NO'}`);
    console.log('---');
});