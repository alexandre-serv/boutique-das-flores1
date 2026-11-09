
/* CONFIGURAÇÕES DA LOJA */

// Coloque o número verdadeiro do WhatsApp da loja.
// Formato: código do país + DDD + número, somente números.
const whatsappLoja = "5511999999999";

// Categorias e quantidades de produtos.
const categorias = [
    {
        id: "novidades",
        nome: "Novidades",
        numero: "01",
        quantidade: 9
    },
    {
        id: "buques",
        nome: "Buquês para todas as ocasiões",
        numero: "02",
        quantidade: 52
    },
    {
        id: "cafe",
        nome: "Cestas de café da manhã",
        numero: "03",
        quantidade: 6
    },
    {
        id: "flores",
        nome: "Cestas com flores",
        numero: "04",
        quantidade: 13
    },
    {
        id: "cestas",
        nome: "Cestas",
        numero: "05",
        quantidade: 29
    },
    {
        id: "chocolates",
        nome: "Chocolates",
        numero: "06",
        quantidade: 15
    }
];


/* CRIAÇÃO DOS ESPAÇOS DOS PRODUTOS */

// Por enquanto, os produtos ficam como espaços reservados.
// Depois vamos colocar os nomes, fotos e preços verdadeiros.
const produtos = {};

categorias.forEach(categoria => {

    produtos[categoria.id] = [];

    for (let i = 1; i <= categoria.quantidade; i++) {

        produtos[categoria.id].push({
            nome: `Produto ${String(i).padStart(2, "0")}`,
            preco: "Consulte o preço",
            imagem: ""
        });

    }

});


/* MOSTRAR OS PRODUTOS */

const listaProdutos = document.getElementById("listaProdutos");

const categoriaNome = document.getElementById("categoriaNome");
const categoriaNumero = document.getElementById("categoriaNumero");
const quantidadeProdutos = document.getElementById("quantidadeProdutos");

function mostrarProdutos(idCategoria) {

    const categoria = categorias.find(item => item.id === idCategoria);

    if (!categoria) return;

    const lista = produtos[idCategoria];

    categoriaNome.textContent = categoria.nome;
    categoriaNumero.textContent = `CATEGORIA ${categoria.numero}`;
    quantidadeProdutos.textContent =
        `${String(lista.length).padStart(2, "0")} produtos`;

    listaProdutos.innerHTML = "";

    lista.forEach((produto, indice) => {

        const mensagem = encodeURIComponent(
            `Olá! Gostaria de saber mais sobre o ${produto.nome} da categoria ${categoria.nome}.`
        );

        const linkWhatsApp =
            `https://wa.me/${whatsappLoja}?text=${mensagem}`;

        const elemento = document.createElement("article");
        elemento.classList.add("produto");

        let imagemProduto = `
            <div class="imagem-vazia">
                <span>❀</span>
                <small>FOTO DO PRODUTO</small>
            </div>
        `;

        if (produto.imagem) {
            imagemProduto = `
                <img src="${produto.imagem}" alt="${produto.nome}">
            `;
        }

        elemento.innerHTML = `
            <div class="produto-imagem">
                ${imagemProduto}
            </div>

            <div class="produto-informacoes">
                <h4>${produto.nome}</h4>
                <p>Um presente preparado com carinho.</p>

                <div class="produto-rodape">
                    <span class="produto-preco">${produto.preco}</span>

                    <a
                        href="${linkWhatsApp}"
                        class="produto-whatsapp"
                        target="_blank"
                        rel="noopener noreferrer">
                        ENCOMENDAR ↗
                    </a>
                </div>
            </div>
        `;

        listaProdutos.appendChild(elemento);

    });

}


/* TROCAR CATEGORIA */

const botoesCategorias = document.querySelectorAll(".categoria");

botoesCategorias.forEach(botao => {

    botao.addEventListener("click", () => {

        botoesCategorias.forEach(item => {
            item.classList.remove("ativa");
        });

        botao.classList.add("ativa");

        mostrarProdutos(botao.dataset.categoria);

    });

});


/* MENU PARA CELULAR */

const menuMobile = document.getElementById("menuMobile");
const navegacao = document.getElementById("navegacao");

menuMobile.addEventListener("click", () => {

    const aberto = navegacao.classList.toggle("aberta");

    menuMobile.setAttribute("aria-expanded", aberto);

});

document.querySelectorAll(".navegacao a").forEach(link => {

    link.addEventListener("click", () => {

        navegacao.classList.remove("aberta");
        menuMobile.setAttribute("aria-expanded", "false");

    });

});


/* WHATSAPP GERAL */

const whatsappGeral = document.getElementById("whatsappGeral");

whatsappGeral.href =
    `https://wa.me/${whatsappLoja}?text=${encodeURIComponent(
        "Olá! Gostaria de conhecer os produtos da Boutique das Flores."
    )}`;


/* INICIAR SITE */

mostrarProdutos("novidades");

// Tentar iniciar o vídeo automaticamente
const videoFundo = document.querySelector(".video-fundo");

function iniciarVideo() {
    videoFundo.muted = true;

    const reproducao = videoFundo.play();

    if (reproducao !== undefined) {
        reproducao.catch(() => {
            console.log("O navegador bloqueou a reprodução automática.");
        });
    }
}

document.addEventListener("DOMContentLoaded", iniciarVideo);

window.addEventListener("pageshow", iniciarVideo);