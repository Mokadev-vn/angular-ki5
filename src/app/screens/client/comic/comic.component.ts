import { CommicsService } from './../../../services/commics.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {

  id!:Number;
  data: any;
  listComic: any;
  constructor(private route: ActivatedRoute, private router: Router, private comicService: CommicsService, private categoryService: CategoryService) { }

  async ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    const comic = await this.comicService.getOne(this.id).toPromise()
    this.data = comic[0]
    this.listComic = await this.categoryService.getOne(comic[0].cate_id).toPromise()
  }

}
