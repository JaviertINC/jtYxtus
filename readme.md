[![javiertinc@yxtus](https://javiertinc.github.io/media/jtYxtus/gh-header.png)](https://github.com/JaviertINC/jtYxtus)

¿Necesitas una forma más rápida de escribir en tus blogs, proyectos o incluso en las traducciones de tus sitios web?

**jtYxtus** es tu respuesta.

¡Es tu **traductor** a HTML desde texto plano! Similar a [Markdown](https://www.markdownguide.org), tan solo con escribir en un formato especifico, ahorrarás mucho tiempo.

> [!NOTE]
> Este proyecto está hecho con [Typescript](https://www.typescriptlang.org) e incluye las interfaces y el tipado de las funciones.

[![Documentación](https://javiertinc.github.io/media/jtYxtus/gh-documentacion.png)](https://github.com/JaviertINC/jtYxtus/wiki)
¿Todo bien para escribir tus ideas de una forma más eficiente? 🚀

Incursiona en la [**Wiki del proyecto**](https://github.com/JaviertINC/jtYxtus/wiki). Allí te espera la guía completa, ejemplos prácticos y todos los secretos para dominar **jtYxtus** como todo un experto.

[![Instalación](https://javiertinc.github.io/media/jtYxtus/gh-instalacion.png)](https://github.com/JaviertINC/jtYxtus/wiki)
¡Empezar con **jtYxtus** es más que fácil! Solo necesitas un gestor de paquetes como npm, yarn o pnpm. Si ya tienes uno instalado, simplemente ejecuta uno de los siguientes comandos en la raíz de tu proyecto:

```bash
npm install @javiertinc/yxtus
```

```bash
yarn add @javiertinc/yxtus
```

```bash
pnpm add @javiertinc/yxtus
```

¡Y ya tienes la mitad del trabajo hecho!

[![¿Cómo se usa?](https://javiertinc.github.io/media/jtYxtus/gh-como-se-usa.png)](https://github.com/JaviertINC/jtYxtus/wiki)

Aquí te muestro un ejemplo muy sencillo de como convertir tus notas a HTML.

```typescript
import jtYxtus from '@javiertinc/yxtus';

// Crea una instancia para pasarle algunas configuraciones.
// (Le puedes poner el nombre que tu quieras a la instancia)
const jtYxtusInstance = new jtYxtus();

let text = '*esto* /es/ una ~test~ _prueba_';

let output = jtYxtusInstance.parse(text);

// ! Precaución al hacer innerHtml en el body, eliminarás todo lo demás jeje. Luego lo adaptas a lo que necesites.
document.body.innerHTML = output;
```

¡TAH DAH! Ahora tienes tus notas en HTML, le podrás dar el estilo y forma que tu quieras. Recuerda revisar la [**documentación**](https://github.com/JaviertINC/jtYxtus/wiki) con más detalles sobre cada utilidad disponible en esta interesante librería.

[![Elementos soportados](https://javiertinc.github.io/media/jtYxtus/gh-elementos-soportados.png)](https://github.com/JaviertINC/jtYxtus/wiki)

| Carácterística | Estado | Ejemplo de uso |
| :---: | :---: | --- |
| [Bold](https://github.com/JaviertINC/jtYxtus/wiki/Basic) | Implementado | `*texto*` |
| [Italic](https://github.com/JaviertINC/jtYxtus/wiki/Basic) | Implementado | `/texto/` |
| [Strike](https://github.com/JaviertINC/jtYxtus/wiki/Basic) | Implementado | `~texto~` |
| [Underline](https://github.com/JaviertINC/jtYxtus/wiki/Basic) | Implementado | `_texto_` |
| [Links](https://github.com/JaviertINC/jtYxtus/wiki/Basic) | Implementado | `[texto](url)` |
| [Headings](https://github.com/JaviertINC/jtYxtus/wiki/Basic) | Implementado | `# Título` |
| [Line breaks](https://github.com/JaviertINC/jtYxtus/wiki/Basic) | Implementado | `Texto  ` |
| [Paragraphs](https://github.com/JaviertINC/jtYxtus/wiki/Basic) | Implementado | `Texto automático` |
| [Images](https://github.com/JaviertINC/jtYxtus/wiki/Media) | Implementado | `![alt](url)` |
| [Videos](https://github.com/JaviertINC/jtYxtus/wiki/Media) | Implementado | `[video{1\|0\|1}](url)` |
| [Audio](https://github.com/JaviertINC/jtYxtus/wiki/Media) | Implementado | `[audio{1\|0\|1}](url)` |
| [YouTube](https://github.com/JaviertINC/jtYxtus/wiki/Media) | Implementado | `[yt{1\|0\|640x480}](URL o ID)` |
| [Inline code](https://github.com/JaviertINC/jtYxtus/wiki/Code) | Implementado | ```` `código` ```` |
| [Code blocks](https://github.com/JaviertINC/jtYxtus/wiki/Code) | Implementado | ```` ```código``` ```` |
| [Tables](https://github.com/JaviertINC/jtYxtus/wiki/Tables) | Implementado | `\| Header \| \| --- \| \| Body \|` |
| [Iframes](https://github.com/JaviertINC/jtYxtus/wiki/Advanced) | Implementado | `[iframe{640x480}](url)` |
| [Buttons](https://github.com/JaviertINC/jtYxtus/wiki/Advanced) | Implementado | `[texto{opciones}](url)` |
| [Horizontal lines](https://github.com/JaviertINC/jtYxtus/wiki/Decorators) | Implementado | `---` |
| [Blockquotes](https://github.com/JaviertINC/jtYxtus/wiki/Decorators) | Implementado | `> Texto` |
| [Special blockquotes](https://github.com/JaviertINC/jtYxtus/wiki/Decorators) | Implementado | `> [!NOTE@Título]\n> Texto` |
| [Comments](https://github.com/JaviertINC/jtYxtus/wiki/Basic) | Implementado | `<!-- comentario -->` |
| [Ordered lists](https://github.com/JaviertINC/jtYxtus/wiki/Lists) | Implementado | `1. Item` |
| [Unordered lists](https://github.com/JaviertINC/jtYxtus/wiki/Lists) | Implementado | `- Item` |
| [Task lists](https://github.com/JaviertINC/jtYxtus/wiki/Lists) | Implementado | `- [ ] Item` |
| [Abbreviations](https://github.com/JaviertINC/jtYxtus/wiki/Advanced) | Implementado | `{HTML}\n*[HTML]: Hyper Text Markup Language` |
| [Colors](https://github.com/JaviertINC/jtYxtus/wiki/Advanced) | Implementado | `!{color}(texto)` |
| [Highlight](https://github.com/JaviertINC/jtYxtus/wiki/Decorators) | Implementado | `==texto==` |
| [Icons](https://github.com/JaviertINC/jtYxtus/wiki/Icons-emojis) | Implementado | `;heart;` |
| Footnotes | Planificado | `Texto[^1]` |
| Captys embed | Planificado | `[captys{512x512}](URL o ID)` |
