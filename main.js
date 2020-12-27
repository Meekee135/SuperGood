const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const oddStripes = document.querySelectorAll(".stripe:nth-of-type(odd)");
const stripes = document.querySelectorAll(".stripe");

let tl = gsap.timeline();

tl.paused(true);
tl.to(oddStripes, { top: "50%", duration: 0.1 });
tl.to(stripes, { rotate: "45deg", duration: 0.2 });
tl.to(oddStripes, { rotate: "135deg", duration: 0.2 }, "-=0.1");
tl.to(".menu",{ clipPath: "circle(100%)", ease: "power1.in", duration: 0.4 },"-=.6");
tl.to(".item",{ opacity: 1, y: "-30px", stagger: 0.1, ease: "back.out(2)", duration: 0.6 },"-=.7");

clickOpen();
function clickOpen() {
  burger.addEventListener("click", menuShow);
}
function menuShow() {
  tl.play();
  burger.removeEventListener("click", menuShow);
  burger.addEventListener("click", menuHide);
}
function menuHide() {
  tl.reverse(0.7);
  burger.removeEventListener("click", menuHide);
  clickOpen();
}

window.addEventListener('load', setup);
function setup(){
  getProducts();
}

// let slide = gsap.timeline();

// slide.paused(false);
// slide.to(descr.childNodes,{opacity: 0,})

const endpoint = "http://meekee.me/public.html/SuperGood/wp-json/wp/v2/"

function getProducts(){
  fetch(endpoint+"product?_embed&_fields=title,short_description,tastes_like,long_description,nutritional_label,ingredients,background_color,_links,_embedded")
  .then(res=>res.json())
  // .then(out => console.log(out))
  .then(createProducts)
}

function createProducts(allProducts){
  const parent = document.querySelector(".prod_present");
  const slider = document.querySelector(".productSlider").content;
  
  allProducts.forEach(product => {
    const copy = slider.cloneNode(true);
    
    copy.querySelector(".BGcolor").style.backgroundColor = product.background_color;
    copy.querySelector(".descr h2").textContent = product.title.rendered;
    copy.querySelector(".descr p").textContent = product.short_description;
    
    product.ingredients.forEach(ingre => {
      const whatsInParent = copy.querySelector(".whats_in");
      const whatsIn = copy.getElementById("whatsIn").content;
      const ingred = whatsIn.cloneNode(true);

      ingred.querySelector("p").textContent = ingre.name;
      whatsInParent.appendChild(ingred);
    })

    parent.appendChild(copy);
  })

  const lineUpPar = document.querySelector(".line_up"); //parent
  const lineUp = document.getElementById("line_up").content;

  allProducts.forEach(product => {
    const title = lineUp.cloneNode(true)

    title.querySelector(".prod_title").textContent = product.title.rendered;
    lineUpPar.appendChild(title);
  })
  
  let titles = document.querySelectorAll(".prod_title")
  let array = Array.from(titles)
  let marker = document.querySelector(".marker")

  titles.forEach(title => {
    title.addEventListener("click", (e) =>{
    indicator(e.target);
    console.log(array.indexOf(e.target))
    })
  })

  marker.style.left = array[0].offsetLeft+"px";
  marker.style.width = array[0].offsetWidth+"px";
  
  function indicator(e){
    marker.style.left = e.offsetLeft+"px";
    marker.style.width = e.offsetWidth+"px";
  }
}


