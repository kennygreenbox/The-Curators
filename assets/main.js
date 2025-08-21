function upsellProductGrid() {
  if ($('.product-slider').length) {
    var productSlider = new Swiper('.product-slider', {
      loop: true,
      slidesPerView: 1.33,
      spaceBetween: 20,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        991: {
          slidesPerView: 3.03,
          spaceBetween: 60,
          shortSwipes:false,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }
        }
      }
    });
  }

  // if ($('.upsell-slider').length) {
  //         var upselltSlider = new Swiper('.upsell-slider', {
  //             loop: true,
  //             slidesPerView: 1.23,
  //             spaceBetween: 16,
  //             shortSwipes:false,
  //             pagination: {
  //               el: ".swiper-pagination",
  //             }
  //         });
  //       }

  // if ($('.upsell-slider').length) {
  //   var upsellSlider = new Swiper('.upsell-slider', {
  //     loop: true,
  //     slidesPerView: 1.23,
  //     spaceBetween: 16,
  //     allowTouchMove: true,
  //     shortSwipes:true,
  //     pagination: {
  //       el: ".swiper-pagination-bullets",
  //       type: 'progressbar',
  //       clickable: true,
  //     }
  //   });
  // }


  if ($(window).width() < 991) {

    if ($('.mobile-marquee-slider').length) {

      var mlogoSlider = new Swiper('.mobile-marquee-slider', {
        loop: true,
        slidesPerView: 'auto',
        speed: 5000,
        allowTouchMove: false,
        autoplay: {
          delay: 1, // Autoplay delay for a continuous scrolling effect
        },
        spaceBetween: 38,
      });

    }

    if ($('.featured-product-grid').length) {

      var fproductSlider = new Swiper('.featured-product-grid', {
        loop: false,
        slidesPerView: 1.22,
        spaceBetween: 20,
        breakpoints: {
          640: {
            slidesPerView: 2.22
          },
        }
      });
    }

  }

}



function rendering() {
  fetch("?section_id=cart-drawer")
    .then((res) => res.text())
    .then((data) => {
      var cart__html = $(data);
      var render__html = $(".cart-trigger", cart__html);
      $(".cart-trigger").replaceWith(render__html);

      var render__html = $(".cart__drawer-items-wrap", cart__html);
      $(".cart__drawer-items-wrap").replaceWith(render__html);

      var render__html = $(".total-cost", cart__html);
      $(".total-cost").replaceWith(render__html);

      var render__html = $(".shipping__goal", cart__html);
      $(".shipping__goal").replaceWith(render__html);

      var render__html = $(".total-protein-cart", cart__html);
      $(".total-protein-cart").replaceWith(render__html);
      upsellProductGrid()
      window.loyaltylion.ui.refresh();
      var upselltSlider = new Swiper('.upsell-slider', {
        loop: true,
        slidesPerView: 1.23,
        spaceBetween: 16,
        shortSwipes:true,
        paginationClickable: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
    });

    });
  
}




function addUpsell_porduct($this, event) {
  event.preventDefault();
  var formData = $($this).closest(".upsell_product").serialize();

  $.ajax({
    type: "POST",
    url: "/cart/add.js",
    dataType: "json",
    data: formData,
    success: function (data) {
      rendering();
      
    },
    error: function (err) {
      // console.log("Error adding products:", err);
    },
  });


}


function removeItem(event, el) {

  event.preventDefault();
  var data_line = $(el).attr("data-line");
  // console.log(data_line)
  // console.log(data_line)
  var deleteData = {
    "line": data_line,
    "quantity": 0
  };

  $.ajax({
    type: "POST",
    url: "/cart/change.js",
    dataType: "json",
    data: deleteData,
    success: function (data) {
      // console.log(data)
      rendering();
      
    }
  })
}




function increment(el) {
  var input = el.previousElementSibling;
  // console.log(el)
  var value = parseInt(input.value);

  value = isNaN(value) ? 0 : value
  value++;
  input.value = value;
  changeQuantity(input)
}

function decrement(el) {
  var input = el.nextElementSibling;
  // console.log(input)
  var value = parseInt(input.value);
  if (value > 0) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
    changeQuantity(input)
  }
}

function changeQuantity(input) {

  var quantity = $(input).val();
  var data_line = $(input).attr("data-line");
  // console.log(data_line)
  var data = {
    "line": data_line,
    "quantity": quantity
  };
  $.ajax({
    type: "POST",
    url: "/cart/change.js",
    dataType: "json",
    data: data,
    success: function (data) {
      // console.log(data);
      rendering();
      
    },
    error: function (err) {
      // console.log("Error from quantity update")
    }
  })


}














// $(document).on("click", ".atc_btn", function (e) {
//     e.preventDefault();
//     var formData = $(this).closest('.shopify-product-form').serialize();
//     $.ajax({
//         type: "POST",
//         url: "/cart/add.js",
//         dataType: "json",
//         data: formData,
//         success: function (data) {
//             console.log(data);

//             rendering();
//             $("body").addClass("cartShown cartPopulated");
//             // $(".cart-drawer").addClass("active");
//             // $(".body-wrap").addClass("active-cart");
//         },
//         error: function (err) {
//             console.log(err);
//         },
//     });
// });



// function selectedVariant() {
//     var selectedId = $(".product-select").val();

//     console.log('hi' + selectedId);
//     var url = new URL(window.location.href);
//     url.searchParams.set("variant", selectedId);
//     window.history.replaceState({}, "", url);
// }

// // / When the user changes the selected variant
// $(document).on("change", ".product-select", function () {
//     console.log('Variant changed');
//     selectedUpdated(this);
//     selectedVariant();
// });

// function selectedUpdated($this) {
// ($this); 

//     var selectedValue = $($this).val();
//     console.log("Selected variant ID: " + selectedValue);

//     $(".product-select option").each(function () {
//         $(this).prop("selected", false);
//     });

//     $(".product-select option").each(function () {
//         var optionValue = $(this).val();
//         if (optionValue == selectedValue) {
//             $(this).prop("selected", true);
//             var checkQuantity=$(this).attr("data-quantity-available");
//             if(checkQuantity == 'false'){
//               var pp=$(this).closest('.atc_btn');
//               console.log(pp)
//               // $(".atc_btn");
//             }
//             else{
//               $(".atc_btn").removeClass("btn__disable"); 
//             }
//             return false;
//         }
//     });
// }



// add to cart product in product page



$(document).ready(function () {

  $(".add__to-cart").on("click", function (e) {
    e.preventDefault();
    var formData = $('.single__product-form').serialize();

    $.ajax({
      type: "POST",
      url: "/cart/add.js",
      dataType: "json",
      data: formData,
      success: function (data) {
        $("body").addClass("cartShown cartPopulated");
        rendering();
        

      },
      error: function (err) {
        console.log(err);
      },
    });

  });
 
  function loyaltyLionPointCalc() {
    var closestOverview = $('.single-product__radio-input:checked').attr('id');
    if(closestOverview == 'oneTime') {
      var loyalPrice = $('.one__time-bundle-price').html();
    } else if(closestOverview == 'subscribe'){
      var loyalPrice = $('.subscription__bundle-price').html();
    }

    $('.loyalty-lion-price-target').html(loyalPrice);
  }

  function selectedVarint() {
    var slectedId = $(".select__variant").val();
    var url = new URL(window.location.href);
    url.searchParams.set("variant", slectedId);
    window.history.replaceState({}, "", url);
  }

  function pdpPriceChange(selectedVariant, qty) {
    var variant__price = selectedVariant.attr("data-variant-price"),
    variant__compare_price = selectedVariant.attr("data-variant-compare-at-price"),
    variant__sub_price = selectedVariant.attr("data-variant-sub-price"),
    ot_unit_price = selectedVariant.attr("data-unit-price"),
    quantity = qty ? qty : $('#quantity-input').val(),
    ot_total_price = (parseFloat(variant__price.replace(/[^0-9.-]+/g, "")) * quantity).toFixed(2);
    $(".product__variant-price").text(shopifyCurrencySymbol+ot_total_price);
    $(".product-price .price h5").html(variant__price);
    $(".one__time-bundle-price").text(shopifyCurrencySymbol + ot_total_price);
    $('.ot-price-p-item').text(ot_unit_price + ' per bag');
// console.log('variant__compare_price',variant__compare_price)
    if(variant__compare_price.length > 0) {
      var variant__compare_total_price = (parseFloat(variant__compare_price.replace(/[^0-9.-]+/g, "")) * quantity).toFixed(2);

      $(".product-price .price h5").append('<em>'+shopifyCurrencySymbol+variant__compare_total_price+'</em>');
      console.log(variant__compare_total_price);
    }

    if(variant__sub_price.length > 0) {
      var sub_total_price = (parseFloat(variant__sub_price.replace(/[^0-9.-]+/g, "")) * quantity).toFixed(2);
      var sub_unit_price = selectedVariant.attr("data-sub-unit-price");
      $(".subscription__bundle-price").text(shopifyCurrencySymbol+sub_total_price);
      $(".subscription-purchase-option .subscription-price-display").text(shopifyCurrencySymbol+sub_total_price);
      $('.sub-price-p-item').text(sub_unit_price+' per bag');
    }
    loyaltyLionPointCalc();
  }

  function selectedUpdate() {
    var updateValue = "";
    $(".product-options input[type='radio']:checked").each(
      function () {
        updateValue += (updateValue ? " / " : "") + $(this).val();
      }
    );

    $(".select__variant option").each(function (op) {

      var optionValue = $(this).text().trim();

      if (optionValue == updateValue) {
        $(this).prop("selected", true);
        pdpPriceChange($(this));
        var variant__title = $(this).attr("variant-title");
        $('.price-details p').text(variant__title);
        /*
        var variant__price = $(this).attr("data-variant-price"),
        variant__sub_price = $(this).attr("data-variant-sub-price"),
        ,
        ot_unit_price = $(this).attr("data-unit-price");
        quantity = $('#quantity-input').val() ? $('#quantity-input').val() : 1,
        ot_total_price = parseFloat(variant__price.replace(/[^0-9.-]+/g, "")) * quantity;
        
        $(".product__variant-price").text(shopifyCurrencySymbol+ot_total_price);
        $(".product-price .price h5").html(variant__price);
    
        $(".one__time-bundle-price").text(shopifyCurrencySymbol + ot_total_price);
        $('.ot-price-p-item').text(ot_unit_price + ' per bag');
        if(variant__sub_price.length > 0) {
          var sub_total_price = parseFloat(variant__sub_price.replace(/[^0-9.-]+/g, "")) * quantity;
          var sub_unit_price = $(this).attr("data-sub-unit-price");
          $(".subscription__bundle-price").text(shopifyCurrencySymbol+sub_total_price);
          $(".subscription-purchase-option .subscription-price-display").text(shopifyCurrencySymbol+sub_total_price);
          $('.sub-price-p-item').text(sub_unit_price+' per bag');
        }
          */
       

        var available_check = $(this).attr("data-available");
        var findBtn = $(this).closest('.shopify-product-form').find(".add__card-product");
        if (available_check == 'false') {
          findBtn.addClass("btn__disable");
          findBtn.find("span.btn-txt").text('Sold Out');
        } else {
          findBtn.removeClass("btn__disable");
          var btnLabel = findBtn.find('span.btn-txt').data('btn-text').length > 0 ? findBtn.find('span.btn-txt').data('btn-text') : 'Add to Cart';
          findBtn.find('span.btn-txt').text(btnLabel);
        }
        return true;
      }

    });
  }

  $(".product-options input[type='radio']").change(function () {

    selectedUpdate();
    selectedVarint();
    loyaltyLionPointCalc();
  });
  selectedUpdate();
  loyaltyLionPointCalc();
// PDP Quantity Increment and Decrement
if( $('#quantity-input').length >0 ){
  const $quantityInput = $('#quantity-input');
  $('body').on('click', '#decrease-quantity', function() {
    let currentValue = parseInt($quantityInput.val());
    if (currentValue > 1) {
      var newValue = currentValue - 1;
      $quantityInput.val(newValue);
      var selectedVariant = $(".select__variant").find("option:selected");
      pdpPriceChange(selectedVariant, newValue);
    }
    
  });

  $('body').on('click', '#increase-quantity', function() {
    let currentValue = parseInt($quantityInput.val());
    var newValue = currentValue + 1;
    $quantityInput.val(newValue);
    var selectedVariant = $(".select__variant").find("option:selected");
    pdpPriceChange(selectedVariant, newValue);
  });
}

  $(".purchase-price-overview").on("click", function () {
    // Check the radio input
    $(this).find(".single-product__radio-input").prop("checked", true);

    $(this).find(".single-product__radio-input").trigger("change");
  });



 
  // Handle the selling plan selection
  $(document).on("change", ".product__selling-plan-select", function () {
    var drop_id = $(this).val();
    $('.selling__plan-set-value').val(drop_id);
    var selectedOption = $(this).find("option:selected");
    var selling_name = selectedOption.attr("data-selling-plan-name");
    $(".lead-text p span").text(selling_name);

  });

  // Handle the subscription and one-time purchase toggle
  $(".single-product__radio-input").on("change", function () {
    if ($("#subscribe").is(":checked")) {
      // Subscription selected
      $(".product__selling-plan-select").attr("name", "selling_plan");
      $(".selling__plan-set-value").attr("name", "selling_plan");
      $('.wrap__selling-plan').css('display', 'flex');
      $('.on__time-purchase').hide();
      var defaultValue = $(".product__selling-plan-select option:selected").attr("data-selling-plan-name");
      $(".lead-text p span").text(defaultValue);

    } else {
      // One-time purchase selected
      $(".product__selling-plan-select").attr("name", "");
      $(".selling__plan-set-value").attr("name", "");
      $('.wrap__selling-plan').hide();
      $('.on__time-purchase').show();
      $(".lead-text p span").text('One time purchase');
    }
    loyaltyLionPointCalc();
  });

  // Default state setup
  if ($("#subscribe").is(":checked")) {
    $(".product__selling-plan-select").attr("name", "selling_plan");
    $(".selling__plan-set-value").attr("name", "selling_plan");
    $('.wrap__selling-plan').css('display', 'flex');
    $('.on__time-purchase').hide();
  } else {
    $(".product__selling-plan-select").attr("name", "");
    $(".selling__plan-set-value").attr("name", "");
    $('.wrap__selling-plan').hide();
    $('.on__time-purchase').show();
  }
});




$('.reset-pass').click(function(e){
  e.preventDefault();
  $('.customer__login').addClass('show-reset');
});
$('.back-to-login').click(function(e){
  e.preventDefault();
  $('.customer__login').removeClass('show-reset');
});
$('.customer__nav-url_tab').click(function(e){
  e.preventDefault();
  var my_tab = $(this).attr('data-target');
  $('.customer__nav-url').removeClass('active');
  $(this).addClass('active');
  $('.customer__tab-content').removeClass('active');
  $(my_tab).addClass('active');
});
var my_country = $('.address-country').attr('data-default');
$('.address-country').val(my_country);





// benefit-slider
$(".benefit-marque").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 5000,
  cssEase: "linear",
  variableWidth: true,
  arrows: false,
  pauseOnHover: false,
  infinite: true
});