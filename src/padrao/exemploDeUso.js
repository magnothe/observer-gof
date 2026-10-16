// ----------------------------------------------------------------------
// COMO O PADRÃO É USADO (o "cliente" do padrão)
//
// Este arquivo não é executado pelo jogo: ele existe para ser exibido no
// painel "Ver o código" como exemplo mínimo de uso.
// ----------------------------------------------------------------------
import { Loja } from "./Loja.js";
import { ClienteEmail, PainelLED, BotWhatsApp } from "./assinantesConcretos.js";

// 1) A publicadora concreta
const loja = new Loja("TechStore");

// 2) Os assinantes concretos. O terceiro argumento é o que cada um faz ao
//    ser notificado — na tela do jogo, mostrar um balão de fala.
const mostrarNaTela = (assinante, texto) => console.log(assinante.nome, texto);

const ana    = new ClienteEmail("Ana", "ana", mostrarNaTela);
const bruno  = new ClienteEmail("Bruno", "bruno", mostrarNaTela);
const painel = new PainelLED("Painel de LED", "led", mostrarNaTela);
const bot    = new BotWhatsApp("Bot do WhatsApp", "bot", mostrarNaTela);

// 3) INSCREVER: cada um escolhe o evento que lhe interessa
loja.inscrever("promocao", ana);
loja.inscrever("promocao", bruno);
loja.inscrever("chegou-produto", painel);
loja.inscrever("chegou-produto", bot);

// 4) NOTIFICAR: a loja dispara o evento e NÃO sabe quem vai receber.
//    Internamente ela faz events.notify("promocao", "iPhone 17 -20%"),
//    que percorre a lista e chama update() em cada assinante.
loja.lancarPromocao("iPhone 17 -20%");
//  -> ana.update("promocao", "iPhone 17 -20%")
//  -> bruno.update("promocao", "iPhone 17 -20%")
//     (o painel e o bot NÃO recebem: não assinaram esse evento)

// 5) CANCELAR INSCRIÇÃO: a lista é dinâmica, em tempo de execução
loja.cancelarInscricao("promocao", bruno);

// Repare no que NÃO existe aqui:
//  - a Loja não tem nenhum "if" para decidir quem avisar;
//  - a Loja não importa ClienteEmail, PainelLED nem BotWhatsApp;
//  - para adicionar um assinante novo, nada na Loja muda (Aberto/Fechado).
