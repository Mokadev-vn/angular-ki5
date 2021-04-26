import { Component, OnInit } from '@angular/core';
import { CommicsService } from 'src/app/services/commics.service';
import { Comic } from 'src/app/models/Comic'
import { sort } from 'src/app/ultis/sort'
import { SharedServiceService } from 'src/app/services/shared-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-comic',
  templateUrl: './list-comic.component.html',
  styleUrls: ['./list-comic.component.css']
})
export class ListComicComponent implements OnInit {

  comics: Comic[] = [];
  constructor(private comicService: CommicsService, private sharedService: SharedServiceService) {
    sharedService.toggle$.subscribe(async data => {
      this.comics = await comicService.search({
        model: "Comics",
        field: "title",
        query: data
      }).toPromise()
    })
  }
  async ngOnInit() {
    this.comics = await this.comicService.getAll().toPromise()
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
        await this.comicService.delete(id).toPromise()
        this.comics = this.comics.filter(comic => comic.id != id)
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
      this.comics = sort(this.comics, field)
      e.target.classList.remove("fa-sort-amount-up-alt");
      e.target.classList.add("fa-sort-amount-down-alt");
      e.target.setAttribute('sort', 'desc')
      return
    }

    this.comics = sort(this.comics, field, 2)
    e.target.classList.remove("fa-sort-amount-down-alt");
    e.target.classList.add("fa-sort-amount-up-alt");
    e.target.setAttribute('sort', 'asc')
  }


}
