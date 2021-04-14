import { Component, OnInit } from '@angular/core';
import { CommicsService } from 'src/app/services/commics.service';
import { Comic } from 'src/app/models/Comic'

@Component({
  selector: 'app-list-comic',
  templateUrl: './list-comic.component.html',
  styleUrls: ['./list-comic.component.css']
})
export class ListComicComponent implements OnInit {

  comics: Comic[] = [];
  constructor(private comicService: CommicsService) { }
  async ngOnInit() {
    this.comics = await this.comicService.getAll().toPromise()
  }

  async delete(e: any, id: any){
    e.preventDefault()
    if(confirm("Bạn muốn xóa nó không!")){
      await this.comicService.delete(id).toPromise()
      this.comics = this.comics.filter(comic  => comic.id != id)
    }
  }

}
