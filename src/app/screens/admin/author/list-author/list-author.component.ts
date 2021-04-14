import { Author } from './../../../../models/Author';
import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';


@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.css']
})
export class ListAuthorComponent implements OnInit {

  authors: Author[] = [];
  constructor(private authorService: AuthorService) { }
  async ngOnInit() {
    this.authors = await this.authorService.getAll().toPromise()
  }

  async delete(e: any, id: any){
    e.preventDefault()
    if(confirm("Bạn muốn xóa nó không!")){
      await this.authorService.delete(id).toPromise()
      this.authors = this.authors.filter(author  => author.id != id)
    }
  }
}
