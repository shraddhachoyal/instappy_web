import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';
import { VideosComponent } from './videos/videos.component';
import { Faqcomponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { PanelComponent } from './panel/panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyAppsComponent } from './my-apps/my-apps.component';
import { PublishAppComponent } from './publish-app/publish-app.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { TagsComponent } from './tags/tags.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ReturnpolicyComponent } from './returnpolicy/returnpolicy.component';
// import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-details', component: BlogDetailsComponent },
  { path: 'blog-details/:id', component: BlogDetailsComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'faq', component: Faqcomponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-condition', component: TermsConditionComponent },
  { path: 'forget', component: ForgetpasswordComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'dashboard/:id/:paystatus', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'billing-info', canActivate: [AuthGuard], component: BillingInfoComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'my-apps', canActivate: [AuthGuard], component: MyAppsComponent },
  { path: 'publish-app', component: PublishAppComponent },
  { path: 'myaccount', canActivate: [AuthGuard], component: MyaccountComponent },
  { path: 'tags/:name', component: TagsComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'email-verify', component: EmailVerifyComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'returnpolicy', component: ReturnpolicyComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule],

})
export class AppRoutingModule { }


