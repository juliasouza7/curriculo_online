# Currículo Virtual — Júlia Costa

Site estático para GitHub Pages com abas de currículo, projetos, skills, certificados e contato.

## Como usar

1. Coloque seus certificados em `certificados/`.
2. Aceita arquivos `.pdf`, `.png`, `.jpg`, `.jpeg` e `.webp`.
3. Faça commit e push para o GitHub.
4. O GitHub Actions atualiza automaticamente o `certificados.json`.
5. Ative o GitHub Pages em **Settings > Pages > Deploy from a branch > main / root**.

## Rodar localmente

Como o site carrega `certificados.json`, o ideal é abrir com um servidor local:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Personalização

- Edite textos em `index.html`.
- Edite cores e layout em `style.css`.
- Edite comportamento das abas e certificados em `script.js`.
- Substitua o PDF em `assets/curriculo-julia-costa-2026.pdf` quando atualizar o currículo.
