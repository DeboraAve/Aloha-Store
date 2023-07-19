let products = [
    {id: "1", nome: "Camisa Xadrez", preco: "R$ 69,99", img: "../imagens/feminino/1.jpg", categoria: "feminino",},
    {id: "2", nome: "Casaco Xadrez", preco: "R$ 119,90", img: "../imagens/feminino/2.jpg", categoria: "feminino",},
    {id: "3",nome: "Regata de Botões - Branca", preco: "R$ 39,99", img: "../imagens/feminino/3.jpg", categoria: "feminino",},
    {id: "4",nome: "Camisa Manga Larga- Bege",preco: "R$ 49,90",img: "../imagens/feminino/4.jpg",categoria: "feminino",},
    {id: "5",nome: "Blusa Onça",preco: "R$ 55,00",img: "../imagens/feminino/5.jpg",categoria: "feminino",},
    {id: "6",nome: "Blusa Leaves - Preta",preco: "R$ 29,90",img: "../imagens/feminino/6.jpg",categoria: "feminino",},
    {id: "7",nome: "Blusa de Frio Stitch - Rosa",preco: "R$ 39,90",img: "../imagens/infantil/1.jpg",categoria: "infantil",},
    {id: "8",nome: "Camisa Sonic - Branca",preco: "R$ 39,90",img: "../imagens/infantil/2.jpg",categoria: "infantil",},
    {id: "9",nome: "Vestido Xadrez",preco: "R$ 69,90",img: "../imagens/infantil/3.jpg",categoria: "infantil",},
    {id: "10",nome: "Camisa Jurassic Park - Amarela",preco: "R$ 44,90",img: "../imagens/infantil/4.jpg",categoria: "infantil",},
    {id: "11",nome: "Blusa de Frio Minnie - Vermelha",preco: "R$ 79,90",img: "../imagens/infantil/5.jpg",categoria: "infantil",},
    {id: "12",nome: "Vestido Oncinha", preco: "R$ 99,90",img: "../imagens/infantil/6.jpg", categoria: "infantil",},
    {id: "13",nome: "Camisa Social Xadrez", preco: "R$ 89,90", img: "../imagens/masculino/1.jpg", categoria: "masculino",},
    {id: "14",nome: "Blusa de Frio Gola Alta - Azul Marinho", preco: "R$ 109,90",  img: "../imagens/masculino/2.jpg", categoria: "masculino",},
    {id: "15",nome: "Camisa Rick and Morty - Preta", preco: "R$ 69,90", img: "../imagens/masculino/3.jpg", categoria: "masculino",},
    { id: "16",nome: "Camisa Polo - Cinza", preco: "R$ 49,90", img: "../imagens/masculino/4.jpg", categoria: "masculino", },
    {id: "17",nome: "Camisa Floral - Branco e Cinza",preco: "R$ 64,90", img: "../imagens/masculino/5.jpg", categoria: "masculino",},
    {id: "18", nome: "Camisa Social - Bege",preco: "R$ 84,90",img: "../imagens/masculino/6.jpg",categoria: "masculino",},
  ];
  
  let currentCategory = "todos";

  let selectedItems = [];
  
  window.onload = function () {
    
    document.getElementById("nav-todos").onclick = function () {
      currentCategory = "todos";
      generateProductElements();
    };
    
    document.getElementById("nav-feminino").onclick = function () {
      currentCategory = "feminino";
      generateProductElements();
    };
    
    document.getElementById("nav-masculino").onclick = function () {
      currentCategory = "masculino";
      generateProductElements();
    };
    
    document.getElementById("nav-infantil").onclick = function () {
      currentCategory = "infantil";
      generateProductElements();
    };
   
    generateProductElements();
  };
  
 
  
  
  function searchProducts() {
    let searchInput = document.getElementById("search-input").value.toLowerCase(); 
  
    let searchResults = products.filter((product) =>
      product.nome.toLowerCase().includes(searchInput)
    ); 
  
    currentCategory = "search"; 
    generateProductElements(searchResults); 
  }
  
  
  document.getElementById("search-button").onclick = searchProducts;
  
  
  function generateProductElements(results = null) {
    let productContainer = document.getElementById("product-container");
  
    
    productContainer.innerHTML = "";
     
    let productList = results ? results : products;
  
  
    if (productList.length === 0) {
      let noProductMessage = document.createElement("p");
      noProductMessage.innerText = "Nenhum produto foi encontrado.";
      noProductMessage.className = "text-center";
      productContainer.appendChild(noProductMessage);
    } else {
      for (let i = 0; i < productList.length; i++) {
        let product = productList[i];
  
        if (
          currentCategory === "todos" ||
          product.categoria === currentCategory ||
          currentCategory === "search"
        ) {
          let columnDiv = document.createElement("div");
          columnDiv.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
  
          let productCard = document.createElement("div");
          productCard.className =
            "card h-100 d-flex flex-column justify-content-between justify-content-center align-items-center";
  
          let img = document.createElement("img");
          img.src = product.img;
          img.className = "card-img-top mx-auto d-block";
          productCard.appendChild(img);
  
          let cardBody = document.createElement("div");
          cardBody.className =
            "card-body d-flex flex-column justify-content-center align-items-center";
  
          let title = document.createElement("h5");
          title.innerText = product.nome;
          title.className = "card-title text-center bold";
          cardBody.appendChild(title);
  
          let price = document.createElement("p");
          price.innerText = product.preco;
          price.className = "card-text text-center";
          cardBody.appendChild(price);
  
          productCard.appendChild(cardBody);
  
          let cardFooter = document.createElement("div");
          cardFooter.className =
            "card-footer no-background d-flex justify-content-center align-items-center";
  
          let button = document.createElement("input");
          button.type = "button";
          button.value = "Adicionar";
          button.className = "btn btn-primary btn-sm";
          button.onclick = function () {
            addItemToCart(product);
          };
          cardFooter.appendChild(button);
  
          productCard.appendChild(cardFooter);
  
          columnDiv.appendChild(productCard);
          productContainer.appendChild(columnDiv);
        }
      }
    }
  }
  
  
  let cartItems = []; 
  
  function addItemToCart(product) {
    alert("Item " + product.nome + " adicionado ao carrinho!");
  
    let existingProduct = cartItems.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantidade += 1;
    } else {
      let cartItem = { ...product, quantidade: 1 };
      cartItems.push(cartItem);
    }

    updateCartModal();
  }

  function updateCartModal() {
    let carrinhoModalBody = document.getElementById("carrinhoModalBody");
    carrinhoModalBody.innerHTML = "";
  
    for (let product of cartItems) {
      let productCard = document.createElement("div");
      productCard.className = "d-flex align-items-center mb-3";
  
      let img = document.createElement("img");
      img.src = product.img;
      img.className = "img-thumbnail me-3";
      img.style.width = "100px";
      productCard.appendChild(img);
  
      let title = document.createElement("h6");
      title.innerText = product.nome;
      title.className = "mb-0";
      productCard.appendChild(title);
  
      let quantity = document.createElement("p");
      quantity.innerText = "Quantidade: " + product.quantidade;
      quantity.className = "mb-0 ms-auto";
      productCard.appendChild(quantity);
  
      let price = document.createElement("p");
      price.innerText = "Preço: " + product.preco;
      price.className = "mb-0 ms-auto";
      productCard.appendChild(price);
  
      carrinhoModalBody.appendChild(productCard);
    }
  }