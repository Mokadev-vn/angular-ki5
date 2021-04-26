import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  listComic: any;
  name!: String;
  id!: Number | String | null;
  constructor(private router: Router, private categoryService: CategoryService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.route.paramMap.subscribe(async (params: ParamMap) => {
      this.id = params.get('id')

      const data = await this.categoryService.getOne(Number(this.id)).toPromise()
      if (!data.comics.length) {
        this.router.navigate(['errors'])
        return
      }
      this.listComic = data.comics
      this.name = data.name

    })
  }

}
