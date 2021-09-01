import { Component, OnInit } from '@angular/core';
import { CommicsService } from 'src/app/services/commics.service';
import { Comic } from 'src/app/models/Comic'
import { paginate } from 'src/app/ultis/paginate'
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { environment as env} from 'src/environments/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-comic',
  templateUrl: './list-comic.component.html',
  styleUrls: ['./list-comic.component.css']
})
export class ListComicComponent implements OnInit {

  comics: Comic[] = [];
  response: any;
  paginateData: any = [];
  dataParam: any = {};
  baseUrl = env.API_MEDIA;
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
    this.response = await this.comicService.getAll().toPromise()
    this.comics = this.response['data']
    this.paginateData = paginate(this.response['links'])
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

  async sortData(e: any, field: string) {
    let type = e.target.getAttribute('sort')
    // asc: tăng fa-sort-amount-up-alt and desc: giảm fa-sort-amount-down-alt
    delete this.dataParam.title
    delete this.dataParam.author
    delete this.dataParam.category
    delete this.dataParam.status
    delete this.dataParam.views

    this.dataParam[field] = !type ? 'asc' : type;

    this.response = await this.comicService.getAll(this.dataParam).toPromise()
    this.comics = this.response['data']
    this.paginateData = paginate(this.response['links'])

    if (!type || type == 'asc') {
      e.target.classList.remove("fa-sort-amount-up-alt");
      e.target.classList.add("fa-sort-amount-down-alt");
      e.target.setAttribute('sort', 'desc')
      return
    }

    e.target.classList.remove("fa-sort-amount-down-alt");
    e.target.classList.add("fa-sort-amount-up-alt");
    e.target.setAttribute('sort', 'asc')
  }

  async paginated(e: any, id: any) {
    e.preventDefault()
    this.dataParam.page = id;
    this.response = await this.comicService.getAll(this.dataParam).toPromise();
    this.comics = this.response['data']
    this.paginateData = paginate(this.response['links'])
  }


}
