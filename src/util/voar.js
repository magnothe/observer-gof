// Partícula que voa da publicadora até o cartão do assinante.
// É uma das poucas partes imperativas do app: precisa das posições reais
// dos elementos na tela, então usa getBoundingClientRect + Web Animations.

export function voar(de, para, atraso = 0, classe = "", icone = "i-mail") {
  if (!de || !para) return;
  const a = de.getBoundingClientRect();
  const b = para.getBoundingClientRect();

  const p = document.createElement("div");
  p.className = `particula ${classe}`;
  p.innerHTML = `<svg viewBox="0 0 24 24"><use href="#${icone}"/></svg>`;
  document.body.appendChild(p);

  const x0 = a.left + a.width / 2;
  const y0 = a.top + a.height / 2;
  const x1 = b.left + b.width / 2;
  const y1 = b.top + b.height / 2;

  const anim = p.animate(
    [
      { transform: `translate(${x0}px,${y0}px) scale(.3)`, opacity: 0 },
      {
        transform: `translate(${(x0 + x1) / 2}px,${Math.min(y0, y1) - 70}px) scale(1.15)`,
        opacity: 1,
        offset: 0.5,
      },
      { transform: `translate(${x1}px,${y1}px) scale(.45)`, opacity: 0 },
    ],
    { duration: 820, delay: atraso, easing: "cubic-bezier(.4,0,.3,1)" }
  );
  anim.onfinish = () => p.remove();
}
