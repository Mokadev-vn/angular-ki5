import { Component, OnInit } from '@angular/core';
import { VisiterService } from 'src/app/services/visiter.service';
import { environment as env} from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listComic: any;
  baseUrl = env.API_MEDIA;
  
  constructor(private visiterService: VisiterService) { }

  async ngOnInit(){
    this.listComic = await this.visiterService.getAllComic().toPromise()
  }

}
