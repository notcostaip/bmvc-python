"""
Servidor HTTP principal - ponto de entrada da aplicação BMVC.
Utiliza o módulo http.server nativo do Python sem dependências externas.
"""

import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from controllers.produto_controller import ProdutoController


class BMVCRequestHandler(BaseHTTPRequestHandler):
    """Handler HTTP que delega todas as requisições ao Controller."""

    controller = ProdutoController()

    def do_GET(self):
        self._handle("GET")

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length) if length > 0 else b""
        self._handle("POST", body)

    def _handle(self, method: str, body: bytes = b""):
        status, content_type, response_body = self.controller.handle_request(
            self.path, method, body
        )
        self._send(status, content_type, response_body)

    def _send(self, status: int, content_type: str, body: str):
        encoded = body.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", f"{content_type}; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def log_message(self, format, *args):
        """Formata os logs de acesso no terminal."""
        print(f"  [{self.address_string()}] {format % args}")


def main():
    host = "localhost"
    port = 8080

    print("=" * 55)
    print("  🐍 BMVC Python — Servidor iniciado!")
    print("=" * 55)
    print(f"  🌐 Acesse: http://{host}:{port}")
    print(f"  📦 API:    http://{host}:{port}/api/produtos")
    print("  ⏹  Pressione Ctrl+C para encerrar.")
    print("=" * 55)

    server = HTTPServer((host, port), BMVCRequestHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Servidor encerrado.")
        sys.exit(0)


if __name__ == "__main__":
    main()
