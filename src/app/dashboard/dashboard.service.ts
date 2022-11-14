import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api_url } from 'src/environments/environment';
import { Notification } from './model-class/notification/notification';
import { Paymentgateway } from './model-class/paymentgateway/paymentgateway';
import { AppName } from './model-class/edit_app/app-name';
import { Tax } from './model-class/tax/tax';
import { Myapp } from '../panel/myapp';
import { Docommission } from './model-class/additionalApps/docommission';
import { Documents } from './model-class/additionalApps/documents';
import { Termsconditions } from './model-class/termsCondition/termsconditions';
import { Bannercat } from './model-class/banners/bannercat';
import { MyAdditionalapp } from './model-class/additionalApps/my-additionalapp';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  getMyAppDetails(app_uid: any, payStatus: any) {
    return this.httpClient.get(api_url + "apps-details/app-details/" + app_uid + "/" + payStatus + "/");
  }

  updateAppDetails(myapp: Myapp, pay_status: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Myapp[]>(api_url + 'apps-details/app-details-update/' + pay_status + "/", myapp, httpOptions)
  }


  updateAppName(appName: AppName, pay_status: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<AppName[]>(api_url + 'apps-details/app-details-update/' + pay_status + "/", appName, httpOptions)
  }

  getAdditionalApps(user_id: any) {
    return this.httpClient.get(api_url + "master/additional-app-list/" + user_id + '/');
  }

  /* Notifications */
  getAppdetailsTypeList(auth_id: number) {
    return this.httpClient.get(api_url + "apps-details/app-details-type-list/" + auth_id + "/");
  }
  getNotifications(app_uid: any, status: any) {
    return this.httpClient.get(api_url + "apps-details/notification-list/" + app_uid + "/" + status + '/');
  }
  addNotification(notification: Notification) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Notification[]>(api_url + 'apps-details/add-notification/', notification, httpOptions)
  }
  getNotificationDetails(notification_id: number) {
    return this.httpClient.get(api_url + "apps-details/notification-details/" + notification_id + "/");
  }
  updateNotification(notification_id: number, notification: Notification) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Notification[]>(api_url + 'apps-details/notification-update/' + notification_id + '/', notification, httpOptions)
  }
  deleteNotifications(notification_id: number) {
    return this.httpClient.get(api_url + "apps-details/notification-delete/" + notification_id + "/");
  }

  /* This method is used for get all Payment Methods */
  getAllPaymentMethods() {
    return this.httpClient.get(api_url + "apps-details/payment-gateway-master-list-web/");
  }
  getPaymentDetails(app_uid: any, pType: any) {
    return this.httpClient.get(api_url + "apps-details/payment-gateway-list/" + app_uid + '/' + pType + "/");
  }
  addPaymentGateway(paymentgateway: Paymentgateway, paymentID: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    if (paymentID) {
      return this.httpClient.post<Paymentgateway[]>(api_url + 'apps-details/payment-gateway-update/', paymentgateway, httpOptions)
    } else {
      return this.httpClient.post<Paymentgateway[]>(api_url + 'apps-details/add-payment-gateway/', paymentgateway, httpOptions)
    }
  }

  getTaxDetails(app_uid: any) {
    return this.httpClient.get(api_url + "tax/tax-list/" + app_uid + "/");
  }
  addTax(tax: Tax, taxID: any) {
    if (taxID) {
      return this.httpClient.post<Tax[]>(api_url + 'tax/tax-update/', tax, this.httpOptions);
    } else {
      return this.httpClient.post<Tax[]>(api_url + 'tax/add-tax/', tax, this.httpOptions);
    }
  }

  getBanners(app_uid: any) {
    return this.httpClient.get(api_url + "apps-details/app-banner-list/" + app_uid + "/");
  }
  getCategories(app_uid: any) {
    return this.httpClient.get(api_url + "apps-details/consumer-category-list-web/" + app_uid + "/");
  }

  addCatBan(bannercat: Bannercat) {
    return this.httpClient.post<Bannercat[]>(api_url + 'apps-details/add-category-banner/', bannercat, this.httpOptions);
  }

  createAdditionalApp(myapp: Myapp) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Myapp[]>(api_url + 'apps-details/add-app-details-main/', myapp, httpOptions)
  }

  updateAdditionalApp(myapp: Myapp) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Myapp[]>(api_url + 'apps-details/app-details-update/1/', myapp, httpOptions)
  }

  getAdditionalAppInfo(app_type: number, auth_id: number) {
    return this.httpClient.get(api_url + "apps-details/additional-app-details-list/" + auth_id + "/" + app_type);
  }

  getDocommission(app_id: any, app_type: number) {
    return this.httpClient.get(api_url + "document/required-document-list-web/" + app_id + "/" + app_type + "/");
  }

  addRestroDocs(docommission: Docommission) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Docommission[]>(api_url + 'document/add-document-commission/', docommission, httpOptions)
  }

  addRiderDocs(documents: Documents) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Documents[]>(api_url + 'document/add-required-document/', documents, httpOptions)
  }

  getTermCondition(app_id: any, app_type: any) {
    return this.httpClient.get(api_url + "termsconditionprivacypolicy/get_policy_terms/" + app_id + "/2/");
  }
  addTermCondition(termsconditions: Termsconditions) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Termsconditions[]>(api_url + 'termsconditionprivacypolicy/post_policy_terms/', termsconditions, httpOptions)
  }

  deleteDocument(docID: number) {
    return this.httpClient.get(api_url + "document/required-document-delete/" + docID + "/");
  }
}
