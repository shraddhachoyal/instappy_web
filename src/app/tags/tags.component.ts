import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";
import { TagService } from './tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tagname: any;
  constructor(private route: ActivatedRoute, private router: Router, private tagService: TagService,) { }

  ngOnInit(): void {
    this.getSingleTag();
  }

  getSingleTag() {

    this.route.params.forEach((params: Params) => {
      if (params.name !== undefined) {
        const name = params.name;
        this.tagname = name;
        // this.tagService.getSingleTag(name).subscribe(res => {
        //   console.log('Tag Res:', res);
        // })
        console.log('tag-name: ', name);
      } else {
        //this.navigated = false;
      }
    });
  }
}
