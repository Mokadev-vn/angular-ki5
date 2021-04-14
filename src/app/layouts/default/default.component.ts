import { Category } from './../../models/Category';
import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})

export class DefaultComponent implements OnInit {
  constructor(private categoryService: CategoryService) { }
  dataCategory: Category[] = [];
  async ngOnInit() {
    this.dataCategory = await this.categoryService.getAll().toPromise()
  }

}
