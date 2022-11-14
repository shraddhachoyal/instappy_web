import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { apiURL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private httpClient : HttpClient){ }
  private authUrl = apiURL;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:8000/' }) };

  
	getAllVideo()
	{
		return this.httpClient.get(this.authUrl + "getallvideo/");
	}

  getDesignVideo()
	{
		return this.httpClient.get(this.authUrl + "getdesignvideo/");
	}

  getContentVideo()
	{
		return this.httpClient.get(this.authUrl + "getcontentvideo/");
	}
  
  
}


