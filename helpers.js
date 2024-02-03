
// fiyat hesaplama fonsiyonu 
export function calculatePrice(price){
    // fiyatın 15 katını alma
   let newPrice =  price * 15
  
  //  noktadan sonra iki basamak ile sınırlama
   newPrice = newPrice.toFixed(2)
  
   return newPrice;
  }