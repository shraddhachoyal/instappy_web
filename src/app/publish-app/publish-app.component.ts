import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publish-app',
  templateUrl: './publish-app.component.html',
  styleUrls: ['./publish-app.component.css']
})
export class PublishAppComponent implements OnInit {

  constructor() { }

  id:any = "steps_1";
  tabChange(ids:any){
    this.id = ids;
     console.log(this.id);
  }

  class:any = "steps_1";
  tab(ids:any){
    this.id = ids;
     console.log(this.id);
  }
  ngOnInit(): void {

}

}
