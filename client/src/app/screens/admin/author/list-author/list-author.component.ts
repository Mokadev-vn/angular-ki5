import { Author } from 'src/app/models/Author'
import { Component, Input, OnInit } from '@angular/core';
import { sort } from 'src/app/ultis/sort'
import { AuthorService } from 'src/app/services/author.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.css']
})
export class ListAuthorComponent implements OnInit {
  @Input() someProperty!: string;
  authors: Author[] = [];
  constructor(private authorService: AuthorService, private sharedService: SharedServiceService) {
    sharedService.toggle$.subscribe(async data => {
      this.authors = await authorService.search({
        model: "Authors",
        field: "name",
        query: data
      }).toPromise()
    })
  }
  async ngOnInit() {
    this.authors = await this.authorService.getAll().toPromise()
  }

  async delete(e: any, id: any) {
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
        await this.authorService.delete(id).toPromise()
        this.authors = this.authors.filter(author => author.id != id)
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
      this.authors = sort(this.authors, field)
      e.target.classList.remove("fa-sort-amount-up-alt");
      e.target.classList.add("fa-sort-amount-down-alt");
      e.target.setAttribute('sort', 'desc')
      return
    }

    this.authors = sort(this.authors, field, 2)
    e.target.classList.remove("fa-sort-amount-down-alt");
    e.target.classList.add("fa-sort-amount-up-alt");
    e.target.setAttribute('sort', 'asc')
  }

}
