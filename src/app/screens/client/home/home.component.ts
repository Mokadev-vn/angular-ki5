import { CommicsService } from 'src/app/services/commics.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listComic: any;
  constructor(private comicService: CommicsService) { }

  async ngOnInit(){
    this.listComic = await this.comicService.getAll().toPromise()
  }

}
