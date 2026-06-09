<div align="center">

<!-- HEADER BANNER -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:7f1d1d,50:dc2626,100:991b1b&height=230&section=header&text=TechStore%20-%20BMVC&fontSize=60&fontColor=ffffff&animation=twinkling&fontAlignY=35&desc=Arquitetura%20MVC%20em%20Python%20para%20Orientação%20a%20Objetos&descAlignY=55&descSize=16&descColor=fca5a5" />

<br/>

<!-- BADGES -->
<div>
  <img src="https://img.shields.io/badge/Python_3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</div>

<br/>

O **TechStore** é um projeto desenvolvido para a **Avaliação de Conhecimentos (BMVC I)** da disciplina de **Orientação a Objetos**. Ele implementa o padrão arquitetural MVC (Model-View-Controller) com persistência em memória de produtos em Python nativo.

</div>

<br/>

<!-- RED ANIMATED DIVIDER -->
<img src="https://raw.githubusercontent.com/notcostaip/notcostaip/main/assets/red-divider.svg" width="100%">

<!-- ARQUITETURA BMVC -->
<div align="center">

### &nbsp; 🏗️ Arquitetura BMVC

</div>

O projeto é estruturado seguindo o padrão de projeto BMVC, separando claramente as responsabilidades de cada componente:

| Camada | Componente | Responsabilidade |
|---|---|---|
| **Model** 📦 | `models/produto.py` | Dados do produto, atributos privados e encapsulamento (Orientação a Objetos). |
| **View** 🎨 | `views/index.html` | Interface visual renderizada para o usuário. |
| **Controller** ⚙️ | `controllers/produto_controller.py` | Gerenciamento das requisições HTTP, lógica de negócios e API REST. |
| **Browser** 🌐 | `static/app.js` + `style.css` | Consumo assíncrono da API (fetch) e estilização responsiva. |

<!-- RED ANIMATED DIVIDER -->
<img src="https://raw.githubusercontent.com/notcostaip/notcostaip/main/assets/red-divider.svg" width="100%">

<!-- COMO RODAR -->
<div align="center">

### &nbsp; 🚀 Como rodar

</div>

### 1. Clone o repositório
```bash
git clone https://github.com/notcostaip/bmvc-python.git
cd bmvc-python
```

### 2. Execute o servidor HTTP nativo
```bash
python3 main.py
```

### 3. Acesse a aplicação
Abra o seu navegador e acesse: [http://localhost:8080](http://localhost:8080)

<!-- RED ANIMATED DIVIDER -->
<img src="https://raw.githubusercontent.com/notcostaip/notcostaip/main/assets/red-divider.svg" width="100%">

<!-- TECNOLOGIAS -->
<div align="center">

### &nbsp; 🛠️ Tecnologias

<br/>

<img src="https://skillicons.dev/icons?i=py,html,css,js&theme=dark" alt="Tech" />

<br/><br/>

</div>

- **[Python](https://www.python.org/)** — Servidor HTTP nativo e estrutura orientada a objetos da aplicação
- **[HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML)** — Estrutura e marcação da View
- **[CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)** — Estilização moderna e layout responsivo
- **[JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)** — Lógica dinâmica de frontend e consumo da API REST

<!-- RED ANIMATED DIVIDER -->
<img src="https://raw.githubusercontent.com/notcostaip/notcostaip/main/assets/red-divider.svg" width="100%">

<!-- ESTRUTURA -->
<div align="center">

### &nbsp; 📁 Estrutura do Projeto

</div>

```
bmvc-python/
├── main.py                          ← Servidor HTTP (ponto de entrada)
├── README.md                        ← Este arquivo
├── controllers/
│   ├── __init__.py
│   └── produto_controller.py        ← Controller (Lógica + API REST)
├── models/
│   ├── __init__.py
│   └── produto.py                   ← Model (Classe Produto OO)
├── views/
│   └── index.html                   ← View (Interface HTML)
└── static/
    ├── style.css                    ← Folha de estilo CSS externa
    └── app.js                       ← JavaScript externo (lógica frontend)
```

<br/>

<!-- FOOTER -->
<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:7f1d1d,50:dc2626,100:991b1b&height=130&section=footer" />

<br/>

**Created by [Costa](https://github.com/notcostaip)**

</div>
