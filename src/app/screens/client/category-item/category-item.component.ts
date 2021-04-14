import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  listComic: any;
  name!: String;
  id!: Number;
  constructor(private router: Router, private categoryService: CategoryService, private route: ActivatedRoute) { }

  async ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    const data = await this.categoryService.getOne(this.id).toPromise()
    this.listComic = data.comics
    this.name = data.name
  }

}
