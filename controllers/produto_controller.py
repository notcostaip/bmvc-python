"""
Controller: ProdutoController
Responsável por receber requisições, interagir com o Model
e delegar a renderização para a View.
"""

import json
import os
from models.produto import Produto


class ProdutoController:
    """Controlador responsável pela lógica de negócio de Produtos."""

    def __init__(self):
        # Banco de dados em memória (lista de Produtos)
        self.__produtos = self._seed_data()

    def _seed_data(self) -> list[Produto]:
        """Popula dados iniciais."""
        return [
            Produto(1, "Notebook Pro X", "Notebook de alto desempenho para programadores", 4999.99, "Tecnologia"),
            Produto(2, "Mouse Ergonômico", "Mouse sem fio com design ergonômico e 12 botões", 249.90, "Periféricos"),
            Produto(3, "Teclado Mecânico RGB", "Teclado mecânico com switches blue e iluminação RGB", 599.90, "Periféricos"),
            Produto(4, "Monitor 4K 27\"", "Monitor UHD com painel IPS e 144Hz", 3199.99, "Tecnologia"),
            Produto(5, "Headset Gamer", "Fone surround 7.1 com microfone noise-cancelling", 399.90, "Áudio"),
            Produto(6, "Webcam Full HD", "Câmera 1080p com autofoco para streaming", 299.90, "Periféricos"),
        ]

    def listar_produtos(self) -> list[dict]:
        """Retorna todos os produtos como lista de dicionários."""
        return [p.to_dict() for p in self.__produtos]

    def buscar_por_id(self, id: int) -> Produto | None:
        """Busca um produto pelo ID."""
        for produto in self.__produtos:
            if produto.get_id() == id:
                return produto
        return None

    def adicionar_produto(self, dados: dict) -> Produto:
        """Cria e adiciona um novo produto."""
        novo_id = max(p.get_id() for p in self.__produtos) + 1
        novo = Produto(
            novo_id,
            dados["nome"],
            dados["descricao"],
            float(dados["preco"]),
            dados["categoria"],
        )
        self.__produtos.append(novo)
        return novo

    def handle_request(self, path: str, method: str, body: bytes = b"") -> tuple[int, str, str]:
        """
        Roteador principal do controlador.
        Retorna: (status_code, content_type, body)
        """
        # Serve a página HTML estática
        if path == "/" or path == "/index.html":
            return self._serve_static("views/index.html", "text/html")

        # Serve arquivos estáticos (CSS / JS)
        if path.startswith("/static/"):
            file_path = path.lstrip("/")
            if path.endswith(".css"):
                return self._serve_static(file_path, "text/css")
            elif path.endswith(".js"):
                return self._serve_static(file_path, "application/javascript")

        # API REST
        if path == "/api/produtos" and method == "GET":
            dados = self.listar_produtos()
            return 200, "application/json", json.dumps(dados, ensure_ascii=False)

        if path == "/api/produtos" and method == "POST":
            try:
                dados = json.loads(body.decode("utf-8"))
                novo = self.adicionar_produto(dados)
                return 201, "application/json", json.dumps(novo.to_dict(), ensure_ascii=False)
            except (KeyError, ValueError) as e:
                return 400, "application/json", json.dumps({"erro": str(e)})

        return 404, "text/plain", "404 - Recurso não encontrado"

    def _serve_static(self, file_path: str, content_type: str) -> tuple[int, str, str]:
        """Lê e retorna um arquivo estático."""
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        full_path = os.path.join(base_dir, file_path)
        if os.path.exists(full_path):
            with open(full_path, "r", encoding="utf-8") as f:
                return 200, content_type, f.read()
        return 404, "text/plain", "Arquivo não encontrado"
