<template>
<footer class="footer-area footer--light">
  <div class="footer-big">
    <!-- start .container -->
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-12">
          <div class="footer-widget">
            <div class="widget-about">
              <div class="img-fluid">
                <img src="@/assets/ORTA_logo.png" alt="" class="img-fluid">
              </div>
              <p>ORTA.kz</p>
              <ul class="contact-details">
                <li>
                  <span class="icon-earphones"></span> Call Us:
                  <a href="tel:458-218-356">458-218-356</a>
                </li>
                <li>
                  <span class="icon-envelope-open"></span>
                  <a href="mailto:support@orta.com">support@orta.com</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- Ends: .footer-widget -->
        </div>
        <!-- end /.col-md-4 -->
        <div class="col-md-3 col-sm-4">
          <div class="footer-widget">
            <div class="footer-menu footer-menu--1">
              <h4 class="footer-widget-title">Popular Category</h4>
              <ul>
                <li>
                  <a href="#">Wordpress</a>
                </li>
                <li>
                  <a href="#">Plugins</a>
                </li>
                <li>
                  <a href="#">Joomla Template</a>
                </li>
                <li>
                  <a href="#">Admin Template</a>
                </li>
                <li>
                  <a href="#">HTML Template</a>
                </li>
              </ul>
            </div>
            <!-- end /.footer-menu -->
          </div>
          <!-- Ends: .footer-widget -->
        </div>
        <!-- end /.col-md-3 -->

        <div class="col-md-3 col-sm-4">
          <div class="footer-widget">
            <div class="footer-menu">
              <h4 class="footer-widget-title">Our Company</h4>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">How It Works</a>
                </li>
                <li>
                  <a href="#">Affiliates</a>
                </li>
                <li>
                  <a href="#">Testimonials</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Plan &amp; Pricing</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
            <!-- end /.footer-menu -->
          </div>
          <!-- Ends: .footer-widget -->
        </div>
        <!-- end /.col-lg-3 -->

        <div class="col-md-3 col-sm-4">
          <div class="footer-widget">
            <div class="footer-menu no-padding">
              <h4 class="footer-widget-title">Help Support</h4>
              <ul>
                <li>
                  <a href="#">Support Forum</a>
                </li>
                <li>
                  <a href="#">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="#">Support Policy</a>
                </li>
                <li>
                  <a href="#">Refund Policy</a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
                <li>
                  <a href="#">Buyers Faq</a>
                </li>
                <li>
                  <a href="#">Sellers Faq</a>
                </li>
              </ul>
            </div>
            <!-- end /.footer-menu -->
          </div>
          <!-- Ends: .footer-widget -->
        </div>
        <!-- Ends: .col-lg-3 -->

      </div>
      <!-- end /.row -->
    </div>
    <!-- end /.container -->
  </div>
  <!-- end /.footer-big -->
</footer>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
export default {
  name: 'FooterVue'
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700);
body {
 font-family:Rubik,sans-serif;
 position:relative;
 font-weight:400;
 font-size:15px
}
ul {
 padding:0;
 margin:0
}
li {
 list-style:none
}
a:focus,a:hover {
 text-decoration:none;
 -webkit-transition:.3s ease;
 -o-transition:.3s ease;
 transition:.3s ease
}
a:focus {
 outline:0
}
img {
 max-width:100%
}
p {
 font-size:16px;
 line-height:30px;
 color:#ffffff;
 font-weight:300
}
h4 {
 font-family:Rubik,sans-serif;
 margin:0;
 font-weight:400;
 padding:0;
 color:#ffffff
}
a {
 color:#ffffff
}
.no-padding {
 padding:0!important
}
.go_top {
 line-height:40px;
 cursor:pointer;
 width:40px;
 background:#5867dd;
 color:#e9e9e9;
 position:fixed;
 -webkit-box-shadow:0 4px 4px rgba(0,0,0,.1);
 box-shadow:0 4px 4px rgba(0,0,0,.1);
 -webkit-border-radius:50%;
 border-radius:50%;
 right:-webkit-calc((100% - 1140px)/ 2);
 right:calc((100% - 1140px)/ 2);
 z-index:111;
 bottom:80px;
 text-align:center
}
.go_top span {
 display:inline-block
}
.footer-big {
 padding:105px 0 65px 0
}
.footer-big .footer-widget {
 margin-bottom:40px
}
.footer--light {
 background:#1C2431
}
.footer-big .footer-menu ul li a,.footer-big p,.footer-big ul li {
 color:#ffffff
}
.footer-menu {
 padding-left:48px
}
.footer-menu ul li a {
 font-size:15px;
 line-height:32px;
 -webkit-transition:.3s;
 -o-transition:.3s;
 transition:.3s
}
.footer-menu ul li a:hover {
 color:#5867dd
}
.footer-menu--1 {
 width:100%
}
.footer-widget-title {
 line-height:42px;
 margin-bottom:10px;
 font-size:18px
}
.mini-footer {
 background:#e5ebf1;
 text-align:center;
 padding:32px 0
}
.mini-footer p {
 margin:0;
 line-height:26px;
 font-size:15px;
 color:#999
}
.mini-footer p a {
 color:#5867dd
}
.mini-footer p a:hover {
 color:#34bfa3
}
.widget-about img {
 display:block;
 margin-bottom:30px
}
.widget-about p {
 font-weight:400
}
.widget-about .contact-details {
 margin:30px 0 0 0
}
.widget-about .contact-details li {
 margin-bottom:10px
}
.widget-about .contact-details li:last-child {
 margin-bottom:0
}
.widget-about .contact-details li span {
 padding-right:12px
}
.widget-about .contact-details li a {
 color:#5867dd
}
@media (max-width:991px) {
 .footer-menu {
  padding-left:0
 }
}

@media (max-width:900px) {
  .footer-big {
    font-size: 20px;
    height: 20%;
  }
  .img-fluid {
    display: none;
    padding: 0;
    margin: 0;
  }
}

</style>