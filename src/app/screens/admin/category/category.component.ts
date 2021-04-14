import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  constructor(private categoryService: CategoryService) { }
  async ngOnInit() {
    this.categories = await this.categoryService.getAll().toPromise()
  }

  async delete(e: any, id: any){
    e.preventDefault()
    if(confirm("Bạn muốn xóa nó không!")){
      await this.categoryService.delete(id).toPromise()
      this.categories = this.categories.filter(cate => cate.id != id)
    }
  }

  

}
