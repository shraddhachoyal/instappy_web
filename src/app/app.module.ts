import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { PricingComponent } from './pricing/pricing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ContactComponent } from './contact/contact.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { VideosComponent } from './videos/videos.component';
import { Faqcomponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PanelComponent } from './panel/panel.component';
import { PanelHeaderComponent } from './panel-header/panel-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyAppsComponent } from './my-apps/my-apps.component';
import { HttpClientModule, HttpEvent, HTTP_INTERCEPTORS, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { PublishAppComponent } from './publish-app/publish-app.component';
import { MyaccountComponent } from './myaccount/myaccount.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { TagsComponent } from './tags/tags.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { AuthGuard } from './auth/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ReturnpolicyComponent } from './returnpolicy/returnpolicy.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    LoginHeaderComponent,
    BlogComponent,
    BlogDetailsComponent,
    PricingComponent,
    ContactComponent,
    ForgetpasswordComponent,
    VideosComponent,
    Faqcomponent,
    PrivacyPolicyComponent,
    TermsConditionComponent,
    PanelComponent,
    PanelHeaderComponent,
    BillingInfoComponent,
    CheckoutComponent,
    MyAppsComponent,
    DashboardComponent,
    PublishAppComponent,
    MyaccountComponent,
    TagsComponent,
    ResetPasswordComponent,
    EmailVerifyComponent,
    DashboardHeaderComponent,
    SubscriptionComponent,
    ReturnpolicyComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    ColorPickerModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
    NgbModule,
  ],
  providers: [AuthGuard,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }, { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],

  bootstrap: [AppComponent],

})
export class AppModule { }
