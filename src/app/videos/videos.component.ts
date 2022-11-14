import { Component, OnInit } from '@angular/core';
import { VideosService } from './videos.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
declare function videopush(): any;
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  allvideo: any = [];
  designvideo: any = [];
  contentvideo: any = [];
  constructor(
    private videosService: VideosService,
    private httpClient: HttpClient
  ) {
  }


  id: any = "all";
  tabChange(ids: any) {
    this.id = ids;
    console.log(this.id);
  }

  class: any = "all";
  tab(ids: any) {
    this.id = ids;
    console.log(this.id);
  }


  ngOnInit(): void {

    this.getAllVideoData();
    this.getDesignVideoData();
    this.getContentVideoData();
    videopush();

  }

  getAllVideoData() {
    this.videosService.getAllVideo().subscribe(res => { console.log(res); this.allvideo = res });
  }

  getDesignVideoData() {
    this.videosService.getDesignVideo().subscribe(res => { console.log(res); this.designvideo = res });
  }

  getContentVideoData() {
    this.videosService.getContentVideo().subscribe(res => { console.log(res); this.contentvideo = res });
  }


}


