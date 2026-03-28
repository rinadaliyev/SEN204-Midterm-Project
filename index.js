const listDOM = document.querySelector("#brand-list");
const aboutTitle = document.querySelector("#about-title");
const aboutModal = document.querySelector("#about-modal");
const aboutX = document.querySelector("#about-modal-x");
const searchBox = document.querySelector("#search");

function ModalOpener(modal){
    modal.classList.toggle("active");
}


searchBox.addEventListener("input", () => {
    listDOM.innerHTML = "";
    fetch('./brands.json')
    .then( res => res.json())
    .then(data => {
        const searchBrand = Object.values(data);
        let filterBrand = searchBrand.filter(e => e.title.toLowerCase().includes(searchBox.value.toLowerCase()))
        filterBrand.forEach(brand => {
            const brandDiv = document.createElement('div');
            brandDiv.classList.add('brand');
            const brandColorDiv = document.createElement('div');
            brandColorDiv.classList.add('brand-colors-container');
            const brandTitle = document.createElement("span");
            brandTitle.classList.add('brand-name');
            brandTitle.textContent = brand.title;
            brandDiv.append(brandTitle);
            brandDiv.append(brandColorDiv);
            brand.colors.forEach(c => {
                const clipboard = document.createElement('i');
                clipboard.classList.add("fa-regular");
                clipboard.classList.add("fa-copy");
                const colorBtn = document.createElement('button');
                colorBtn.classList.add('brand-color');
                colorBtn.style.backgroundColor = '#' + c;
                colorBtn.style.color = "#" + c;
                colorBtn.addEventListener("mouseenter", () => {

                    if (isLightColor(c)){
                        colorBtn.style.color = "#000";
                    }else {
                        colorBtn.style.color = "#fff";
                    }

                })
                colorBtn.addEventListener("mouseleave", () => {
                    colorBtn.style.color = "#" + c;
                })

                colorBtn.addEventListener("click", () => {
                    navigator.clipboard.writeText("#"+c);
                })
                colorBtn.dataset.color = "#" + c;
                colorBtn.append(clipboard);
                brandColorDiv.append(colorBtn);
            })        
            listDOM.append(brandDiv);
        })
    })
})


aboutTitle.addEventListener("click", ()=> {
    ModalOpener(aboutModal);
})

aboutX.addEventListener("click", () => {
    ModalOpener(aboutModal);
})


function isLightColor(hex) {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 155;
}


function fetchBrands() {
    
    fetch('./brands.json')
    .then(res => res.json())
    .then(data => {
        const brands = Object.values(data);
        brands.forEach(brand => {
            const brandDiv = document.createElement('div');
            brandDiv.classList.add('brand');
            const brandColorDiv = document.createElement('div');
            brandColorDiv.classList.add('brand-colors-container');
            const brandTitle = document.createElement("span");
            brandTitle.classList.add('brand-name');
            brandTitle.textContent = brand.title;
            brandDiv.append(brandTitle);
            brandDiv.append(brandColorDiv);
            brand.colors.forEach(c => {
                const clipboard = document.createElement('i');
                clipboard.classList.add("fa-regular");
                clipboard.classList.add("fa-copy");
                const colorBtn = document.createElement('button');
                colorBtn.classList.add('brand-color');
                colorBtn.style.backgroundColor = '#' + c;
                colorBtn.style.color = "#" + c;
                colorBtn.addEventListener("mouseenter", () => {

                    if (isLightColor(c)){
                        colorBtn.style.color = "#000";
                    }else {
                        colorBtn.style.color = "#fff";
                    }

                })
                colorBtn.addEventListener("mouseleave", () => {
                    colorBtn.style.color = "#" + c;
                })

                colorBtn.addEventListener("click", () => {
                    navigator.clipboard.writeText("#"+c);
                })
                colorBtn.dataset.color = "#" + c;
                colorBtn.append(clipboard);
                brandColorDiv.append(colorBtn);
            })        
            listDOM.append(brandDiv);

        })
    });


}


fetchBrands()