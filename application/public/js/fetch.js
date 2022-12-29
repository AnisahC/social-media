/**
 * Creating a card node using the DOM API.
 * @param {*} containter where to add to the newly created dom node 
 * @param {*} data used to fill in the dom node
 */
 function buildCardsUsingJSAPI(containter, data) {
  let cardDiv = document.createElement("div"); //create div element
  cardDiv.setAttribute("class", "product-card"); //set class HTML attribute 
  let imgDiv = document.createElement("img"); //create img element
  imgDiv.setAttribute("src", data.thumbnail); //set src HTML attribute
  imgDiv.setAttribute("class", "prod-img"); //set class HTML attribute
  let infoDiv = document.createElement("div"); //create div element
  infoDiv.setAttribute("class", "prod-info"); //set class HTML attribute
  let titleP = document.createElement("p"); //create p element
  let costP = document.createElement("p");//create p element
  titleP.setAttribute("class", "prod-title"); //set class HTML attribute
  costP.setAttribute("class", "prod-cost"); //set class HTML attribute
  titleP.appendChild(document.createTextNode(data.title)); //adding a text node to the p tag
  costP.appendChild(document.createTextNode(data.price)); //adding a text node to the p tag
  infoDiv.appendChild(titleP) // add the p tag to prod-info div
  infoDiv.appendChild(costP) // add the p tag to prod-info div
  cardDiv.appendChild(imgDiv) // add the img tag to product-card div
  cardDiv.appendChild(infoDiv); // add the img tag to product-card div
  containter.appendChild(cardDiv); // add product-card div to prdouct list div
}

function fetchPhotos() {
  // where we will get products from
  var url = "https://dummyjson.com/products";
  fetch(url)
    .then((response) => { 
      //extract the body from response object.
      return response.json();
    })
    .then((data) => {
      //get product-list div
      let containerDiv = document.getElementById("product-list");
      //get the array of products from data json object
      let products = data.products;
      //create a document Fragment (https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment)
      let containerFragment = document.createDocumentFragment();
      //for each product , build a card HTML element
      products.forEach((product) => {
        buildCardsUsingJSAPI(containerFragment, product);
      });
      //add the container fragment to DOM(the product-list div)
      containerDiv.appendChild(containerFragment);
    })
    .catch((error) => {
      console.log(error);
    });

}
fetchPhotos();