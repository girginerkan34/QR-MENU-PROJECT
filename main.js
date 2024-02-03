import { menu, buttonsData } from "./db.js";
import { calculatePrice } from "./helpers.js";
// HTML'den gelenler
const menuArea = document.getElementById("menu-area");
const buttonsArea = document.getElementById("buttons-area");


// sayfanın yüklenme olayını izleme
// Yüklendiği anda ekrana menü elemanırı basma fonksiyonunu çalıştır
document.addEventListener("DOMContentLoaded", () => { 
renderButtons('all');
renderMenuItems(menu);
});

// Butonlar kısmında tıklanma olyalarını izler
buttonsArea.addEventListener('click' , searchCategory)



//! ekrana menü elemaını basar
function renderMenuItems(menuItems) {
  // Dizideki herbir obje için
  // bir menü elemanını temsil eden html olştur
  // bu html yi bir diziye aktar
  // Stringe çevir

  let menuHtml = menuItems.map((item) => {
   
    return `
<a href="/productDetail.html?id=${item.id}" id="card" class="d-flex flex-column flex-md-row text-decoration-none text-dark gap-3">
        <img class="rounded shadow" 
        src=${item.img}>
        <div>
            <div class="d-flex justify-content-between">
                <h5>${item.title}</h5>
                <p class="text-success"> &#8378; ${calculatePrice(item.price)} </p>
            </div>
            <p class="lead">
                ${item.desc} katın.
            </p>
        </div>
    </a>
`;
  });
  // Diziyi stringe çevir
  menuHtml = menuHtml.join(" ");

  // Oluşturduğumuz html yi ekrana bas
  menuArea.innerHTML = menuHtml;
}

// ! Filtreleme
// Tıklanılan butona göre ekrana o butonun kaegorisine ait
// ürünleri listeler.
function searchCategory(e){
 const category = e.target.dataset.category;
 
//  tüm dizi elemanlarından yanlızca kategori değerleri 
// butonun kategori değerleriyle eşleşenleri getir
   const filtredMenu = menu.filter((item) => item.category === category
   );
//  Hepsi seçilirse o zaman bütün menüyü ekrana bas.
   if(category === "all"){
    renderMenuItems(menu)
   }else{
  //  filtrelenmiş diziyi ekrana basma
  renderMenuItems(filtredMenu);
   }
  
  //  Butonları güncelle
  renderButtons(category);
}

//! ekrana butonları basacak fonksiyon
function renderButtons(active) {
  // eski butonları kaldırma
  buttonsArea.innerHTML = ' ';

  // Yeni butonları oluşturma
  buttonsData.forEach((btn) => {
    // html butonu oluşturma
    const buttonEle = document.createElement("button");

    // gerekli class ları verme
    buttonEle.className = "btn btn-outline-dark filter-btn";

    // içerisindeki yzıyı değiştirme
    buttonEle.innerText = btn.text;

    // Hangi kategori olduğu bilgisini buton elementine ekleme.
    buttonEle.dataset.category =btn.value;

    // eğerki aktif kategorisiyle buton eşlerşirse ona farklı bir class ver
    if(btn.value === active){
     buttonEle.classList.add('bg-dark', 'text-light');
    }
    
    // htmel'e gönderme
    buttonsArea.appendChild(buttonEle);
  });
}
