import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { apiURL, api_url } from 'src/environments/environment';


@Injectable({
	providedIn: 'root'
})
export class HomeService {

	constructor(
		private httpClient: HttpClient) { }


	private authUrl = apiURL;


	/*getHomePageSection1()
	{
		return this.httpClient.get(this.authUrl + "homepage1list/");
	}

	getHomePageSection2()
	{
		return this.httpClient.get(this.authUrl + "homepage2list/");
	}

	getHomePageSection3()
	{
		return this.httpClient.get(this.authUrl + "homepage3list/");
	}

	getHomePageSection4()
	{
		return this.httpClient.get(this.authUrl + "homepage4list/");
	}

  getHomePageSection5()
	{
		return this.httpClient.get(this.authUrl + "homepage5list/");
	}

  getHomePageFaqList()
	{
		return this.httpClient.get(this.authUrl + "faqlist/");
	}

	getHomePageSection6()
	{
		return this.httpClient.get(this.authUrl + "homepage6list/");
	}
	getHomePageSection7()
	{
		return this.httpClient.get(this.authUrl + "homepage7list/");
	}*/


	//Get Home Page Services
	getHomeContent() {
		return this.httpClient.get(api_url + "v1/getHomeContent/");
	}

	getBanners() {
		return this.httpClient.get(api_url + "v1/getBanners/");
	}

	getLogos() {
		return this.httpClient.get(api_url + "v1/getLogos/");
	}

	getAppSteps() {
		return this.httpClient.get(api_url + "v1/getAppSteps/");
	}

	getAppFeatures() {
		return this.httpClient.get(api_url + "v1/getAppFeatures/");
	}

	getNativeApps() {
		return this.httpClient.get(api_url + "v1/getNativeApps/");
	}

	getCustomerStories() {
		return this.httpClient.get(api_url + "v1/getCustomerStories/");
	}

	getDesignProperties() {
		return this.httpClient.get(api_url + "v1/getDesignProperties/");
	}




}
