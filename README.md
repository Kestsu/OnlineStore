# OnlineStore - Uma Loja Online!
<details>
    <summary><strong>Imagens da aplicação </strong></summary><br />
<img src="https://github.com/Kestsu/OnlineStore/assets/99990041/aec3fdd7-82b5-4431-b947-15d7b7ed9990" width="400px">
<img src="https://github.com/Kestsu/OnlineStore/assets/99990041/7b194c68-5b66-4c41-861e-88633339b9e2" width="400px">
<img src="https://github.com/Kestsu/OnlineStore/assets/99990041/ac40157c-e910-4f01-858f-157a05429e5e" width="400px">
<img src="https://github.com/Kestsu/OnlineStore/assets/99990041/b1ed03c9-d40c-4b2c-81b0-2fbe3ddcdde4" width="400px">
<img src="https://github.com/Kestsu/OnlineStore/assets/99990041/3d328aec-7ebc-46bc-b7a2-2f7f04e41509" width="400px">
<img src="https://github.com/Kestsu/OnlineStore/assets/99990041/9da53ca6-a09d-4d9f-93b3-f77e19c92a64" width="400px">
<img src="https://github.com/Kestsu/OnlineStore/assets/99990041/53aa3bf5-57d1-4fa0-bf1a-9704faed9d75" width="400px">
<img src="https://github.com/Kestsu/OnlineStore/assets/99990041/2efcc73a-6259-4504-8d5c-c864df171f6a" width="400px">
</details>

<details>
    <summary><strong>:convenience_store: Desenvolvimento </strong></summary><br />
Neste projeto foi criado uma loja online, sem persistência no banco de dados. Foi desenvolvido em grupo usando as demandas definidas em um quadro Kanban, em um cenário mais próximo ao do mercado de trabalho.

A partir dessas demandas, temos uma aplicação onde os usuários poderão:

Buscar produtos por termos e categorias a partir da API do Mercado Livre;
<br/>
Interagir com os produtos buscados de modo a adicioná-los e removê-los de um carrinho de compras em diferentes quantidades;
<br/>
Visualizar detalhes e avaliações prévias de um produto, bem como criar novas avaliações;
<br/>
E por fim, finalizar a compra (simulada) dos itens selecionados.


  ### Documentação da API do Mercado Livre

  A página _web_ irá consumir os dados da API do _Mercado Livre_ para realizar a busca de itens da sua loja online. Para realizar essas buscas foram utilizados esses EndPoints abaixo:
  
  - Para listar as categorias disponíveis:
    - Endpoint: https://api.mercadolibre.com/sites/MLB/categories
  - Para buscar por itens por termo:
    - Parâmetro de busca $QUERY (este parâmetro deve ser substituído pelo valor do campo de busca)
    - Endpoint: https://api.mercadolibre.com/sites/MLB/search?q=$QUERY
  - Para buscar itens por categoria:
    - Parâmetro de busca $CATEGORY_ID (este parâmetro deve ser substituído pelo ID da categoria selecionada)
    - Endpoint: https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID
  - Para buscar itens de uma categoria por termo (vale ressaltar, que este endpoint não necessariamente precisa receber ambos os parâmetros para funcionar):
    - Parâmetro de busca $QUERY (este parâmetro deve ser substituído pelo valor do campo de busca)
    - Parâmetro de busca $CATEGORY_ID (este parâmetro deve ser substituído pelo ID da categoria selecionada)
    - Endpoint: https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY
  - Para buscar detalhes de um item especifico:
    - Parâmetro de busca $PRODUCT_ID (este parâmetro deve ser substituído pelo valor do campo de busca)
    - Endpoint: https://api.mercadolibre.com/items/$PRODUCT_ID


  Se você quiser aprender mais sobre a API do _Mercado Livre_, veja a [documentação](https://developers.mercadolivre.com.br/pt_br/itens-e-buscas).

</details>

## Conhecimento envolvido: 

- JavaScript
- Métodos Ágeis
- Kanban
- Scrum
- Trabalho em Equipe
- React
- CSS
- POO
- Trello

## Execução da aplicação localmente


1. Instale as dependências.

```bash
npm install
```

2. Execute a aplicação.

```bash
npm start
```


