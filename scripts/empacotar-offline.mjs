/**
 * Gera uma versão de arquivo único a partir do build do Vite.
 *
 * Por que: o build normal carrega o JS como <script type="module" src=...>,
 * e navegadores bloqueiam módulos vindos de file:// por CORS. Ou seja, o
 * dist/ não abre com duplo clique. Embutindo o CSS e o JS dentro do HTML,
 * nada é buscado da rede e o arquivo roda offline, direto do pendrive —
 * que é o plano B da apresentação.
 *
 * Uso: npm run build:offline
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DIST = "dist";
const SAIDA = "offline";

const html = await readFile(join(DIST, "index.html"), "utf8");

const refCss = html.match(/<link[^>]+href="([^"]+\.css)"[^>]*>/);
const refJs = html.match(/<script[^>]+src="([^"]+\.js)"[^>]*><\/script>/);
if (!refCss || !refJs) {
  throw new Error("não achei as tags de CSS/JS no dist/index.html");
}

const caminho = (ref) => join(DIST, ref.replace(/^\.\//, ""));
const css = await readFile(caminho(refCss[1]), "utf8");
const js = await readFile(caminho(refJs[1]), "utf8");

// Atenção: o texto de substituição precisa vir de uma FUNÇÃO. Passado como
// string, o replace() interpretaria as sequências $&, $` e $' que existem
// dentro do bundle do React e embaralharia o arquivo inteiro.
const unico = html
  .replace(refCss[0], () => `<style>\n${css}\n</style>`)
  .replace(
    refJs[0],
    () =>
      // um </script> dentro de uma string do bundle fecharia a tag antes da hora
      `<script type="module">\n${js.replace(/<\/script>/gi, "<\\/script>")}\n</script>`
  );

await mkdir(SAIDA, { recursive: true });
await writeFile(join(SAIDA, "index.html"), unico);

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1);
console.log(`offline/index.html gerado: ${kb(unico)} KB (CSS ${kb(css)} KB + JS ${kb(js)} KB)`);
console.log("abre com duplo clique, sem servidor e sem internet.");
