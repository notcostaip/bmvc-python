# TechStore — BMVC Python

Projeto desenvolvido para a **Avaliação de Conhecimentos (BMVC I)** da disciplina de **Orientação a Objetos**.

## 📁 Estrutura do Projeto (MVC)

```
bmvc-python/
├── main.py                          ← Servidor HTTP (ponto de entrada)
├── models/
│   ├── __init__.py
│   └── produto.py                   ← Model: classe Produto (OO)
├── controllers/
│   ├── __init__.py
│   └── produto_controller.py        ← Controller: lógica + API REST
├── views/
│   └── index.html                   ← View: página estática HTML
└── static/
    ├── style.css                    ← CSS externo (carregado pelo HTML)
    └── app.js                       ← JavaScript externo (carregado pelo HTML)
```

## 🚀 Como executar

```bash
cd bmvc-python
python main.py
```

Acesse: [http://localhost:8080](http://localhost:8080)

## 🏗️ Arquitetura BMVC

| Camada        | Arquivo                        | Responsabilidade                        |
|---------------|--------------------------------|-----------------------------------------|
| **Model**     | `models/produto.py`            | Dados, atributos privados, getters/setters |
| **View**      | `views/index.html`             | Interface visual para o usuário         |
| **Controller**| `controllers/produto_controller.py` | Recebe requisições, processa, responde |
| **Browser**   | `static/app.js` + `style.css` | Consome a API e renderiza dinamicamente |

## 🔗 Repositório

> _Cole aqui o link do seu repositório GitHub público_
