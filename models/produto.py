"""
Model: Produto
Responsável pelos dados e regras de negócio relacionados a produtos.
"""


class Produto:
    """Representa um produto no catálogo."""

    def __init__(self, id: int, nome: str, descricao: str, preco: float, categoria: str):
        self.__id = id
        self.__nome = nome
        self.__descricao = descricao
        self.__preco = preco
        self.__categoria = categoria

    # --- Getters ---
    def get_id(self) -> int:
        return self.__id

    def get_nome(self) -> str:
        return self.__nome

    def get_descricao(self) -> str:
        return self.__descricao

    def get_preco(self) -> float:
        return self.__preco

    def get_categoria(self) -> str:
        return self.__categoria

    # --- Setters ---
    def set_nome(self, nome: str):
        self.__nome = nome

    def set_preco(self, preco: float):
        if preco < 0:
            raise ValueError("Preço não pode ser negativo.")
        self.__preco = preco

    def to_dict(self) -> dict:
        return {
            "id": self.__id,
            "nome": self.__nome,
            "descricao": self.__descricao,
            "preco": self.__preco,
            "categoria": self.__categoria,
        }

    def __str__(self) -> str:
        return f"Produto(id={self.__id}, nome='{self.__nome}', preco=R${self.__preco:.2f})"
