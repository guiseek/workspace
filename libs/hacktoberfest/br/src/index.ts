interface TextEffectQueue {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
}

class HacktoberfestBrEffects {
  private queue: TextEffectQueue[];

  frameRequest: number;

  frame: number;

  resolve: Function;

  private chars = `シ<>ス_テ[ム{が=落+ち*る#必?_要_が:あ#り?ま$す`;

  constructor(public el: HTMLElement) {
    this.update = this.update.bind(this);
  }

  setText(newText: string) {
    const oldText = this.el.innerText;

    const length = Math.max(oldText.length, newText.length);

    const promise = new Promise((resolve) => (this.resolve = resolve));

    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';

      const to = newText[i] || '';

      const start = Math.floor(Math.random() * 40);

      const end = start + Math.floor(Math.random() * 40);

      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);

    this.frame = 0;

    this.update();

    return promise;
  }

  update() {
    let output = '';

    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;

        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();

          this.queue[i].char = char;
        }

        output += `<span class="swap">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);

      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const hacktoberfestInviteStyles = `:host {
  height: 100%;
  width: 100%;
  background: #101010;
  justify-content: center;
  align-items: center;
  display: flex;
}
.invite {
  color: #8fef9c;
  font-weight: 600;
  font-size: 100%;
  line-height: 120%;
  font-family: 'Courier New', Courier, monospace;
  filter: drop-shadow(5px 1px 16px #8ce6a2);
}
.swap {
  color: #afe7b6;
}`;

class HacktoberfestBrElement extends HTMLElement {
  shadow: ShadowRoot;

  phrases = [
    'contribuir com',
    'open source',
    'significa',
    'fazer mudanças',
    'e pequenas mudanças',
    'fazem diferença',
    'para transformação',
    '[SYSTEM FAILURE]',
  ];

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.innerHTML = hacktoberfestInviteStyles;
    this.shadow.appendChild(style);

    const invite = document.createElement('p');
    invite.classList.add('invite');
    this.shadow.appendChild(invite);
  }
  connectedCallback() {
    const el = this.shadow.querySelector<HTMLElement>('.invite');
    const hacktoberEffects = new HacktoberfestBrEffects(el);

    let counter = 0;

    const next = () => {
      hacktoberEffects
        .setText(this.phrases[counter])
        .then(() => setTimeout(next, counter ? 2000 : 10000));

      counter = (counter + 1) % this.phrases.length;
    };

    next();
  }
}

customElements.define('hacktoberfest-br', HacktoberfestBrElement);
