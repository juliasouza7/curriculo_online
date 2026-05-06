from __future__ import annotations

import json
from pathlib import Path

CERTIFICATES_DIR = Path('certificados')
OUTPUT_FILE = Path('certificados.json')
ALLOWED_EXTENSIONS = {'.pdf', '.png', '.jpg', '.jpeg', '.webp'}


def prettify_name(path: Path) -> str:
    return path.stem.replace('-', ' ').replace('_', ' ').title()


def detect_type(path: Path) -> str:
    return 'pdf' if path.suffix.lower() == '.pdf' else 'imagem'


def main() -> None:
    CERTIFICATES_DIR.mkdir(exist_ok=True)
    certificates = []

    for path in sorted(CERTIFICATES_DIR.iterdir(), key=lambda item: item.name.lower()):
        if path.is_file() and path.suffix.lower() in ALLOWED_EXTENSIONS:
            certificates.append({
                'titulo': prettify_name(path),
                'instituicao': '',
                'arquivo': str(path).replace('\\', '/'),
                'tipo': detect_type(path),
            })

    OUTPUT_FILE.write_text(
        json.dumps(certificates, ensure_ascii=False, indent=2) + '\n',
        encoding='utf-8',
    )
    print(f'{len(certificates)} certificado(s) exportado(s) para {OUTPUT_FILE}')


if __name__ == '__main__':
    main()
