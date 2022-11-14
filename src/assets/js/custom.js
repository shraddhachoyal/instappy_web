function connectApp() {
  document.getElementById("app_details").scrollIntoView();
}

///////////////Ecommerce & Payment///////////////
function myFunction() {
  var x = document.getElementById("paymentstep_2");
  var a = document.getElementById("paymentstep_1");
  var tax_sec = document.getElementById("tax_section");
  var con_sec = document.getElementById("connection_section");
  var api_sec = document.getElementById("api_section");
  var ship_sec = document.getElementById("shipping_section");
  x.style.display = "block";
  a.style.display = "none";
  tax_sec.style.display = "none";
  con_sec.style.display = "none";
  api_sec.style.display = "none";
  ship_sec.style.display = "none";
}

function paypalFunction() {
  var x = document.getElementById("settings_paypal");
  var y = document.getElementById("ecommerce_payment");
  x.style.display = "block";
  y.style.display = "none";
}
///////////////Ecommerce Back Section///////////////
function settingFunction() {
  var x = document.getElementById("settings_paypal");
  var y = document.getElementById("ecommerce_payment");
  var z = document.getElementById("paymentstep_2");
  var a = document.getElementById("paymentstep_1");
  var tax_sec = document.getElementById("tax_section");
  var con_sec = document.getElementById("connection_section");
  var api_sec = document.getElementById("api_section");
  var ship_sec = document.getElementById("shipping_section");
  var tax_step_1 = document.getElementById("tax_step_1");
  var tax_step_2 = document.getElementById("tax_step_2");
  var ecommerce_section = document.getElementById("ecommerce_section");
  var connection_step_1 = document.getElementById("connection_step_1");
  var connection_step_2 = document.getElementById("connection_step_2");
  var ecommerce_payment1 = document.getElementById("ecommerce_payment1");
  if (a.style.display === "none") {
    //alert('hi');
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
    a.style.display = "block";
    tax_sec.style.display = "block";
    con_sec.style.display = "block";
    api_sec.style.display = "block";
    ship_sec.style.display = "block";
  }
  ///////////////Ecommerce tax///////////////
  document.getElementById("tax_section").onclick = function () {
    // alert('hello');
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
    a.style.display = "block";
    tax_sec.style.display = "block";
    con_sec.style.display = "block";
    api_sec.style.display = "block";
    ship_sec.style.display = "block";
    tax_step_1.style.display = "block";
    tax_step_2.style.display = "none";
    ecommerce_section.style.display = "block";
  }
  document.getElementById("connection_section").onclick = function () {
    //alert('kheema');
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
    a.style.display = "block";
    tax_sec.style.display = "block";
    con_sec.style.display = "block";
    api_sec.style.display = "block";
    ship_sec.style.display = "block";
    tax_step_1.style.display = "block";
    tax_step_2.style.display = "none";
    ecommerce_section.style.display = "block";
    ecommerce_payment1.style.display = "block";
    connection_step_1.style.display = "block";
    connection_step_2.style.display = "none";
  }
}

//Payment Integration Function Start
function paymentIntegrationFunction() {
  var settings_paypal = document.getElementById("settings_paypal");
  var ecommerce_payment = document.getElementById("ecommerce_payment");
  var paymentstep_2 = document.getElementById("paymentstep_2");
  paymentstep_2.style.display = "block";
  ecommerce_payment.style.display = "block";
  settings_paypal.style.display = "none";
}

//Payment Integration Function End
///////////////Tax///////////////
function taxFunction() {
  //alert('hello');
  var x = document.getElementById("tax_step_2");
  var y = document.getElementById("tax_step_1");
  var con_sec = document.getElementById("connection_section");
  var ecom_sec = document.getElementById("ecommerce_section");
  var api_sec = document.getElementById("api_section");
  var ship_sec = document.getElementById("shipping_section");
  var tax_step_1 = document.getElementById("tax_step_1");
  document.getElementById("tax_section").onclick = function () {
    x.style.display = "block";
    con_sec.style.display = "none";
    ecom_sec.style.display = "none";
    api_sec.style.display = "none";
    ship_sec.style.display = "none";
    tax_step_1.style.display = "none";
  }
  if (x.style.display === "none") {
    x.style.display = "block";
    con_sec.style.display = "none";
    ecom_sec.style.display = "none";
    api_sec.style.display = "none";
    ship_sec.style.display = "none";
    tax_step_1.style.display = "none";
  }
}
///////////////Connection_Section///////////////
function connectionFunction() {
  var x = document.getElementById("tax_step_2");
  var y = document.getElementById("tax_step_1");
  var con_sec = document.getElementById("connection_section");
  var ecom_sec = document.getElementById("ecommerce_section");
  if (x.style.display === "none") {
    x.style.display = "block";
    con_sec.style.display = "none";
    ecom_sec.style.display = "none";
  } else {
    x.style.display = "none";
  }
}
///////////////Firebase_Section///////////////
function connectionFirebaseFunction() {
  //alert('kheema');
  var x = document.getElementById("settings_paypal");
  var y = document.getElementById("ecommerce_payment");
  var z = document.getElementById("paymentstep_2");
  var a = document.getElementById("paymentstep_1");
  var tax_sec = document.getElementById("tax_section");
  var con_sec = document.getElementById("connection_section");
  var api_sec = document.getElementById("api_section");
  var ship_sec = document.getElementById("shipping_section");
  var tax_step_1 = document.getElementById("tax_step_1");
  var tax_step_2 = document.getElementById("tax_step_2");
  var ecommerce_section = document.getElementById("ecommerce_section");
  var connection_step_1 = document.getElementById("connection_step_1");
  var connection_step_2 = document.getElementById("connection_step_2");
  var ecommerce_payment1 = document.getElementById("ecommerce_payment1");
  connection_step_2.style.display = "block";
  ecommerce_section.style.display = "none";
  ship_sec.style.display = "none";
  api_sec.style.display = "none";
  tax_sec.style.display = "none";
  ecommerce_payment1.style.display = "none";
  connection_step_1.style.display = "none";
  document.getElementById("connection_section").onclick = function () {
    connection_step_2.style.display = "block";
    ecommerce_section.style.display = "none";
    ship_sec.style.display = "none";
    api_sec.style.display = "none";
    tax_sec.style.display = "none";
    ecommerce_payment1.style.display = "none";
    connection_step_1.style.display = "none";
  }
}
///////////////Additional_Section///////////////
function additional_appFunction() {
  var restaurant_step_1 = document.getElementById("restaurant_step_1");
  var restaurant_step_2 = document.getElementById("restaurant_step_2");
  var rider_step_1 = document.getElementById("rider_step_1");
  var rider_step_2 = document.getElementById("rider_step_2");
  restaurant_step_1.style.display = "block";
  restaurant_step_2.style.display = "none";
  rider_step_1.style.display = "block";
  rider_step_2.style.display = "block"
}

function icon_1Change() {
  //document.getElementById("icon_1").src="assets/images/panel/dashboard_1.png";
  document.getElementById("icon_1").src = "assets/images/panel/icon_1g.png";
  document.getElementById("icon_2").src = "assets/images/panel/icon_2.png";
  document.getElementById("icon_3").src = "assets/images/panel/icon_3.png";
  document.getElementById("icon_4").src = "assets/images/panel/icon_4.png";
  document.getElementById("icon_5").src = "assets/images/panel/icon_5.png";
  // document.getElementById("icon_6").src="assets/images/panel/icon_6.png";
  document.getElementById("icon_7").src = "assets/images/panel/icon_7.png";
  var tab_7_hide = document.getElementById("tab_7_hide");
  tab_7_hide.style.display = "none";
}

function icon_2Change() {
  document.getElementById("icon_1").src = "assets/images/panel/icon_1.png";
  document.getElementById("icon_2").src = "assets/images/panel/icon_2g.png";
  document.getElementById("icon_3").src = "assets/images/panel/icon_3.png";
  document.getElementById("icon_4").src = "assets/images/panel/icon_4.png";
  document.getElementById("icon_5").src = "assets/images/panel/icon_5.png";
  // document.getElementById("icon_6").src="assets/images/panel/icon_6.png";
  document.getElementById("icon_7").src = "assets/images/panel/icon_7.png";
  var tab_7_hide = document.getElementById("tab_7_hide");
  tab_7_hide.style.display = "none";
}

function icon_3Change() {
  document.getElementById("icon_1").src = "assets/images/panel/icon_1.png";
  document.getElementById("icon_2").src = "assets/images/panel/icon_2.png";
  document.getElementById("icon_3").src = "assets/images/panel/icon_3g.png";
  document.getElementById("icon_4").src = "assets/images/panel/icon_4.png";
  document.getElementById("icon_5").src = "assets/images/panel/icon_5.png";
  // document.getElementById("icon_6").src="assets/images/panel/icon_6.png";
  document.getElementById("icon_7").src = "assets/images/panel/icon_7.png";
  var tab_7_hide = document.getElementById("tab_7_hide");
  tab_7_hide.style.display = "none";
}

function icon_4Change() {
  document.getElementById("icon_1").src = "assets/images/panel/icon_1.png";
  document.getElementById("icon_2").src = "assets/images/panel/icon_2.png";
  document.getElementById("icon_3").src = "assets/images/panel/icon_3.png";
  document.getElementById("icon_4").src = "assets/images/panel/icon_4g.png";
  document.getElementById("icon_5").src = "assets/images/panel/icon_5.png";
  // document.getElementById("icon_6").src="assets/images/panel/icon_6.png";
  document.getElementById("icon_7").src = "assets/images/panel/icon_7.png";
  var tab_7_hide = document.getElementById("tab_7_hide");
  tab_7_hide.style.display = "none";
}

function icon_5Change() {
  document.getElementById("icon_1").src = "assets/images/panel/icon_1.png";
  document.getElementById("icon_2").src = "assets/images/panel/icon_2.png";
  document.getElementById("icon_3").src = "assets/images/panel/icon_3.png";
  document.getElementById("icon_4").src = "assets/images/panel/icon_4.png";
  document.getElementById("icon_5").src = "assets/images/panel/icon_5g.png";
  // document.getElementById("icon_6").src="assets/images/panel/icon_6.png";
  document.getElementById("icon_7").src = "assets/images/panel/icon_7.png";
  var tab_7_hide = document.getElementById("tab_7_hide");
  tab_7_hide.style.display = "none";
}

function icon_7Change() {
  document.getElementById("icon_1").src = "assets/images/panel/icon_1.png";
  document.getElementById("icon_2").src = "assets/images/panel/icon_2.png";
  document.getElementById("icon_3").src = "assets/images/panel/icon_3.png";
  document.getElementById("icon_4").src = "assets/images/panel/icon_4.png";
  document.getElementById("icon_5").src = "assets/images/panel/icon_5.png";
  // document.getElementById("icon_6").src="assets/images/panel/icon_6.png";
  document.getElementById("icon_7").src = "assets/images/panel/icon_7g.png";
  var x = document.getElementById("restaurant_step_22");
  var y = document.getElementById("restaurant_step_21");
  var a = document.getElementById("restaurant_step_11");
  var b = document.getElementById("restaurant_step_12");
  var tab_7_hide = document.getElementById("tab_7_hide");
  var app_details = document.getElementById("app_details");
  tab_7_hide.style.display = "block";
  a.style.display = "block";
  b.style.display = "block";
  x.style.display = "none";
  app_details.style.display = "none";
  y.style.display = "none";
}

$(function () {
  var color = $('#colorpicker').val();
  hexcolor = $('#hexcolor');
  hexcolor.html(color);
  $('#colorpicker').on('change', function () {
    hexcolor.html(this.value);
  });
});

function restaurantFunction(app_type, id, pyment_status) {
  var x = document.getElementById("restaurant_step_1");
  var a = document.getElementById("restaurant_step_2");
  var c = document.getElementById("commissionbox");
  x.style.display = "none";
  a.style.display = "block";
  if (app_type === 2) {
    c.style.display = "none";
  }
  if (app_type === 3) {
    c.style.display = "block";
  }

  if (pyment_status === 0) {
    $("#app_details").css('display', 'none');
  } else {
    $("#app_details").css('display', 'block');
  }
}

function restaurantFunction_old(id) {
  var x = document.getElementById("restaurant_step_22");
  var y = document.getElementById("restaurant_step_21");
  var a = document.getElementById("restaurant_step_1");
  var b = document.getElementById("restaurant_step_2");
  var app_details = document.getElementById("app_details");
  var rider_step_1 = document.getElementById("rider_step_1");
  var rider_step_2 = document.getElementById("rider_step_2");
  if (id === 3) {
    x.style.display = "none";
    y.style.display = "block";
  }

  if (id === 2) {
    x.style.display = "block";
    y.style.display = "none";
  }
  app_details.style.display = "block";
  b.style.display = "none";//more detail hide
  a.style.display = "none";
  rider_step_1.style.display = "none";
  rider_step_2.style.display = "none";
}

function restaurantartnerFunction() {
  var app_details = document.getElementById("app_details");
  var restaurant_step_1 = document.getElementById("restaurant_step_1");
  // var restaurant_step_2 = document.getElementById("restaurant_step_2");
  app_details.style.display = "block";
  restaurant_step_1.style.display = "none";
}
//////////////////multi step form////////////////////
$(document).ready(function () {
  var current_fs, next_fs, previous_fs;
  var opacity;
  $(".next").click(function () {
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    next_fs.show();
    current_fs.animate({
      opacity: 0
    }, {
      step: function (now) {
        opacity = 1 - now;
        current_fs.css({
          'display': 'none',
          'position': 'relative'
        });
        next_fs.css({
          'opacity': opacity
        });
      },
      duration: 600
    });
  });
  $(".previous").click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
  });
  $(".submit").click(function () {
    return false;
  })
});


///////////////Dashboard Mobile///////////////
function homedataFunction() {
  var home_data = document.getElementById("menu_mobile");
  var home_data = document.getElementById("home_data");
  var contact_data = document.getElementById("contact_data");
  var terms_data = document.getElementById("terms_data");
  var search_box = document.getElementById("search_box");
  var product_list = document.getElementById("product_list");
  var edit_app_data = document.getElementById("edit_app_data");
  var contact_list = document.getElementById("contact_list");
  $("#edit_data_right_1 #home_data").removeClass('home_class2');
  $("#edit_data_right_1 #terms_data").removeClass('terms_data2');
  $("#edit_data_right_1 #home_data").removeClass('home_class1');
  $("#edit_data_right_1 #terms_data").removeClass('terms_data1');
  home_data.style.display = "block";
  contact_data.style.display = "none";
  terms_data.style.display = "none";
  search_box.style.display = "block";
  product_list.style.display = "none";
  edit_app_data.style.display = "block";
  contact_list.style.display = "none";
  $("#menu_home").addClass('mob-active');
  $("#menu").removeClass('menu_toggle');
  $("#menu_contact").removeClass('mob-active');
  $("#menu_terms").removeClass('mob-active');

}

function menucollapseFunction() {
  $("#menu").toggleClass("menu_toggle");
}

function contactdataFunction() {
  var home_data = document.getElementById("home_data");
  var contact_data = document.getElementById("contact_data");
  var terms_data = document.getElementById("terms_data");
  var search_box = document.getElementById("search_box");
  var product_list = document.getElementById("product_list");
  var edit_app_data = document.getElementById("edit_app_data");
  var contact_list = document.getElementById("contact_list");
  $("#edit_data_right_1 #home_data").removeClass('home_class2');
  $("#edit_data_right_1 #terms_data").removeClass('terms_data2');
  $("#edit_data_right_1 #home_data").removeClass('home_class1');
  $("#edit_data_right_1 #terms_data").removeClass('terms_data1');
  home_data.style.display = "none";
  contact_data.style.display = "block";
  terms_data.style.display = "none";
  search_box.style.display = "none";
  product_list.style.display = "none";
  edit_app_data.style.display = "none";
  contact_list.style.display = "block";


  $("#menu_home").removeClass('mob-active');
  $("#menu_contact").addClass('mob-active');
  $("#menu_terms").removeClass('mob-active');
  $("#menu").removeClass('menu_toggle');
  $("#menu").css('transform', 'translate(-100%, 0)');
}

function termsConditionFunction() {
  var home_data = document.getElementById("home_data");
  var contact_data = document.getElementById("contact_data");
  var search_box = document.getElementById("search_box");
  var terms_data = document.getElementById("terms_data");
  var product_list = document.getElementById("product_list");
  var edit_app_data = document.getElementById("edit_app_data");
  var contact_list = document.getElementById("contact_list");
  menu_terms
  home_data.style.display = "none";
  contact_data.style.display = "none";
  search_box.style.display = "none";
  terms_data.style.display = "block";
  product_list.style.display = "block";
  edit_app_data.style.display = "none";
  contact_list.style.display = "none";
  $("#edit_data_right_1 #home_data").removeClass('home_class2');
  $("#edit_data_right_1 #terms_data").removeClass('terms_data2');
  $("#edit_data_right_1 #home_data").removeClass('home_class1');
  $("#edit_data_right_1 #terms_data").removeClass('terms_data1');
  $("#menu_home").removeClass('mob-active');
  $("#menu_contact").removeClass('mob-active');
  $("#menu_terms").addClass('mob-active');
  $("#menu").removeClass('menu_toggle');
  $("#menu").css('transform', 'translate(-100%, 0)');
}


function terms_listdataFunction() {
  var product_list = document.getElementById("product_list");
  var edit_app_data = document.getElementById("edit_app_data");
  var edit_data_right = document.getElementById("edit_data_right");
  var home_data = document.getElementById("home_data");
  var terms_data = document.getElementById("terms_data");
  // const data = document.querySelector('#selectMenu');
  // console.log(selectMenu);
  if (selectMenu.value == "2") {
    //alert('term');
    $("#edit_data_right_1 #home_data").addClass('home_class1');
    $("#edit_data_right_1 #terms_data").addClass('terms_data1');
    $("#edit_data_right_1 #home_data").removeClass('home_class2');
    $("#edit_data_right_1 #terms_data").removeClass('terms_data2');
    product_list.style.display = "block";
    edit_app_data.style.display = "none";
    edit_data_right.style.display = "none";
    home_data.style.display = "none";
    terms_data.style.display = "block";


  } if (selectMenu.value == "1") {
    //alert('home');
    $("#edit_data_right_1 #home_data").addClass('home_class2');
    $("#edit_data_right_1 #terms_data").addClass('terms_data2');
    $("#edit_data_right_1 #home_data").removeClass('home_class1');
    $("#edit_data_right_1 #terms_data").removeClass('terms_data1');
    product_list.style.display = "none";
    edit_app_data.style.display = "block";
    edit_data_right.style.display = "block";
    home_data.style.display = "block";
    terms_data.style.display = "none";
  }
}








function home_listdataFunction() {
  var product_list = document.getElementById("product_list");
  var edit_app_data = document.getElementById("edit_app_data");
  var edit_data_right = document.getElementById("edit_data_right");
  product_list.style.display = "none";
  edit_app_data.style.display = "block";
  edit_data_right.style.display = "block";

}
let homeChange = document.querySelector('#home_change');
if (homeChange == 'selected') {

}

function basicinfoFunction() {
  var formFirstState = document.getElementById("formFirstState");
  var formSecondState = document.getElementById("formSecondState");
  var formThirdState = document.getElementById("formThirdState");

  formFirstState.style.display = "block";
  formSecondState.style.display = "none";
  formThirdState.style.display = "none";
  // $('#progressbar li span').removeClass("active");
  // $('#progressbar li span').addClass("active");
  $('#active1').addClass("active");
  $('#active2').removeClass("active");
  $('#active3').removeClass("active");


}
function commissionFunction() {
  var formFirstState = document.getElementById("formFirstState");
  var formSecondState = document.getElementById("formSecondState");
  var formThirdState = document.getElementById("formThirdState");

  formFirstState.style.display = "none";
  formSecondState.style.display = "block";
  formThirdState.style.display = "none";
  // $('#progressbar li span').removeClass("active");
  //$(this).addClass("active");
  $('#active1').removeClass("active");
  $('#active2').addClass("active");
  $('#active3').removeClass("active");

}

function terms_conditionFunction() {
  var formFirstState = document.getElementById("formFirstState");
  var formSecondState = document.getElementById("formSecondState");
  var formThirdState = document.getElementById("formThirdState");

  formFirstState.style.display = "none";
  formSecondState.style.display = "none";
  formThirdState.style.display = "block";

  $('#active1').removeClass("active");
  $('#active2').removeClass("active");
  $('#active3').addClass("active");
}

//This function is used for show message when App purchased and creating new app
function purchasedMsgShow() {
  $("#app_purchased").modal('show');
}

function videopush() {
  $('.modal').on('hidden.bs.modal', function (e) {
    $iframe = $(this).find("iframe");
    $iframe.attr("src", $iframe.attr("src"));
  });
};

function chartcircle() {
  $("[id$='circle']").percircle();
  $("#clock").percircle({
    perclock: true
  });
}


$(function () {
  $("[id$='circle']").percircle();
  $("#clock").percircle({
    perclock: true
  });
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// document.addEventListener('DOMContentLoaded', () => {
//   $(".tab-active").click(function () {
//     location.reload();
//   });
// })


//Section 3 Start

function homedataFunction1() {
  var home_data = document.getElementById("menu_mobile");
  var home_data = document.getElementById("home_data");
  var contact_data = document.getElementById("contact_data");
  var terms_data = document.getElementById("terms_data");
  var search_box = document.getElementById("search_box");
  home_data.style.display = "block";
  contact_data.style.display = "none";
  terms_data.style.display = "none";
  search_box.style.display = "block";
  $("#menu_home").addClass('mob-active');
  $("#menu").removeClass('menu_toggle');
  $("#menu_contact").removeClass('mob-active');
  $("#menu_terms").removeClass('mob-active');

}

function contactdataFunction2() {
  var home_data = document.getElementById("home_data");
  var contact_data = document.getElementById("contact_data");
  var terms_data = document.getElementById("terms_data");
  var search_box = document.getElementById("search_box");
  home_data.style.display = "none";
  contact_data.style.display = "block";
  terms_data.style.display = "none";
  search_box.style.display = "none";
  $("#menu_home").removeClass('mob-active');
  $("#menu_contact").addClass('mob-active');
  $("#menu_terms").removeClass('mob-active');
  $("#menu").removeClass('menu_toggle');
  $("#menu").css('transform', 'translate(-100%, 0)');
}

function termsConditionFunction3() {
  var home_data = document.getElementById("home_data");
  var contact_data = document.getElementById("contact_data");
  var search_box = document.getElementById("search_box");
  var terms_data = document.getElementById("terms_data");
  home_data.style.display = "none";
  contact_data.style.display = "none";
  search_box.style.display = "none";
  terms_data.style.display = "block";
  $("#menu_home").removeClass('mob-active');
  $("#menu_contact").removeClass('mob-active');
  $("#menu_terms").addClass('mob-active');
  $("#menu").removeClass('menu_toggle');
  $("#menu").css('transform', 'translate(-100%, 0)');
}

//Section 3 End
