import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import Swal from 'sweetalert2'
import {sort} from 'src/app/ultis/sort'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  constructor(private categoryService: CategoryService, private sharedService: SharedServiceService) {
    sharedService.toggle$.subscribe(async data => {
      this.categories = await categoryService.search({
        model: "Categories",
        field: "name",
        query: data
      }).toPromise()
    })
  }
  async ngOnInit() {
    this.categories = await this.categoryService.getAll().toPromise()
  }

  async delete(e: any, id: any){
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.categoryService.delete(id).toPromise()
      this.categories = this.categories.filter(cate => cate.id != id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  sortData(e: any, field: string) {
    let type = e.target.getAttribute('sort')
    // asc: tăng fa-sort-amount-up-alt and desc: giảm fa-sort-amount-down-alt

    if (!type || type == 'asc') {
      this.categories = sort(this.categories, field)
      e.target.classList.remove("fa-sort-amount-up-alt");
      e.target.classList.add("fa-sort-amount-down-alt");
      e.target.setAttribute('sort', 'desc')
      return
    }

    this.categories = sort(this.categories, field, 2)
    e.target.classList.remove("fa-sort-amount-down-alt");
    e.target.classList.add("fa-sort-amount-up-alt");
    e.target.setAttribute('sort', 'asc')
  }

}
