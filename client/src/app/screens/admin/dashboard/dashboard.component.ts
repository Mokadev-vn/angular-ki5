import { CommicsService } from 'src/app/services/commics.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listComic: any;
  listCate: any;
  listAuthor: any;
  constructor(private comicService: CommicsService, 
    private authorService: AuthorService, 
    private categoryService: CategoryService) { }

  async ngOnInit(){
    this.listComic = await this.comicService.getAll().toPromise()
    this.listCate = await this.categoryService.getAll().toPromise()
    this.listAuthor = await this.authorService.getAll().toPromise()
  }
  

}
