$(".modal-container").on("click", function () {
    $(this).css("display", "none");
    $('body').removeClass("modalShown");
})

const logoTarget = $("#nav-logo-reveal");
$(window).on('load',function(){
  if (logoTarget.length) {
    logoTarget.get(0).setSpeed(1);
    logoTarget.get(0).setDirection(1);
    logoTarget.get(0).play();
  }
})

$(document).on("click", ".cart__btn", function (e) {
    e.preventDefault();
  
    var formData = $(this).parent().parent().parent().find('.shopify-product-form').serialize();
    $.ajax({
        type: "POST",
        url: "/cart/add.js",
        dataType: "json",
        data: formData,
        success: function (data) {
            // console.log(data);
            
            rendering();
            $("body").addClass("cartShown cartPopulated");
            // $(".cart-drawer").addClass("active");
            // $(".body-wrap").addClass("active-cart");
        },
        error: function (err) {
            // console.log(err);
        },
    });
});

$(document).on("click", ".add__cart-collection-product", function (e) {
    e.preventDefault();
  
    var formData = $(this).closest('.shopify-product-form').serialize();
    $.ajax({
        type: "POST",
        url: "/cart/add.js",
        dataType: "json",
        data: formData,
        success: function (data) {
            // console.log(data);
            
            rendering();
            $("body").addClass("cartShown cartPopulated");
            // $(".cart-drawer").addClass("active");
            // $(".body-wrap").addClass("active-cart");
        },
        error: function (err) {
            // console.log(err);
        },
    });
});




$(document).ready(function() {

    $('.cart__product-select').change(function() {
      var selectedValue = $(this).val();
      var availableQuantity = $(this).find('option:selected').data('quantity-available');
      var price = $(this).find('option:selected').data('quantity-price');
  
      $(this).closest('.shopify-product-form').find(".card__product-price").text(price);
      var findBtn = $(this).closest('.shopify-product-form').find(".add__card-product");
      if(!availableQuantity){
        findBtn.addClass("btn__disable");
        findBtn.find('span.btn-txt').text('Sold Out');
        // var fin_collectiondBtn = $(this).closest('.shopify-product-form').find(".add__cart-collection-product");
        // fin_collectiondBtn.addClass("btn__disable");
      } else{
        findBtn.removeClass("btn__disable");
         var btnLabel = findBtn.find('span.btn-txt').data('btn-text').length > 0 ? findBtn.find('span.btn-txt').data('btn-text') : 'Add to Cart';
        findBtn.find('span.btn-txt').text(btnLabel);
        // var fin_collectiondBtn = $(this).closest('.shopify-product-form').find(".add__cart-collection-product");
        // fin_collectiondBtn.removeClass("btn__disable");
      }
    //   console.log("Selected Variant ID: " + selectedValue);
  
      
    });
  });
  









// function selectedVariant() {
//     var selectedId = $(".cart__product-select").val();
// console.log(selectedId)
 
//     var url = new URL(window.location.href);
//     url.searchParams.set("variant", selectedId);
//     window.history.replaceState({}, "", url);
// }

// / When the user changes the selected variant
// $(document).on("change", ".cart__product-select", function () {
   
   
// });

// $(".cart__product-select").on("change",function(){
//  selectedUpdated(this);
//     selectedVariant();
// })

// function selectedUpdated($this) {
//     var selectedValue = $($this).val();
    
//     console.log("Selected variant prod: " + selectedValue);
    
    
//     $(".cart__product-select option").each(function () {
//         $(this).prop("selected", false);  
//     });
    
//     $(".cart__product-select option").each(function () {
//         var optionValue = $(this).val();
//         if (optionValue == selectedValue) {
//             $(this).prop("selected", true);  
            
            
//             var checkQuantity = $(this).attr("data-quantity-available");
//             var quantity_price = $(this).attr("data-quantity-price");
         
//             $($this).closest('.shopify-product-form').find(".card__product-price").text(quantity_price);
//             // console.log("Quantity Available: " + checkQuantity);
            
//             if (checkQuantity == 'false') {
//                 var findBtn = $($this).closest('.shopify-product-form').find(".add__card-product");
                
//                 findBtn.addClass("btn__disable");
              
               
//             } else {
//                 var findBtn = $($this).closest('.shopify-product-form').find(".add__card-product");
             
//                 findBtn.removeClass("btn__disable");
                
         
//             }
//             return false;  
//         }
//     });

//     // collection add to cart js 
// }
// function collection_selectedVariant() {
//     var selectedId = $(".cart__collection-product-select").val();

 
//     var url = new URL(window.location.href);
//     url.searchParams.set("variant", selectedId);
//     window.history.replaceState({}, "", url);
// }

// // / When the user changes the selected variant
// $(document).on("change", ".cart__collection-product-select", function () {
    
//     collection_product_selectedUpdated(this);
//     collection_selectedVariant();
// });

// function collection_product_selectedUpdated($this) {
//     var selectedValue = $($this).val();
//     console.log("Selected variant ID: " + selectedValue);
    
    
//     $(".cart__collection-product-select option").each(function () {
//         $(this).prop("selected", false);  
//     });
    
//     $(".cart__collection-product-select option").each(function () {
//         var optionValue = $(this).val();
//         if (optionValue == selectedValue) {
//             $(this).prop("selected", true);  
            
            
//             var checkQuantity = $(this).attr("data-quantity-available");
//             var quantity_price = $(this).attr("data-quantity-price");
         
//             $($this).closest('.shopify-product-form').find(".card__product-price").text(quantity_price);
//             console.log("Quantity Available: " + checkQuantity);
            
//             if (checkQuantity == 'false') {
                
//                 var fin_collectiondBtn = $($this).closest('.shopify-product-form').find(".add__cart-collection-product");
              
//                 fin_collectiondBtn.addClass("btn__disable");
               
//             } else {
              
//                 var fin_collectiondBtn = $($this).closest('.shopify-product-form').find(".add__cart-collection-product");
          
//                 fin_collectiondBtn.removeClass("btn__disable");
         
//             }
//             return false;  
//         }
//     });
// }



// add to cart product in product page
