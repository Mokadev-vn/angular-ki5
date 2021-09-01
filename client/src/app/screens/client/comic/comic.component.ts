import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { VisiterService } from 'src/app/services/visiter.service';
import { environment as env } from 'src/environments/environment';


@Component({
    selector: 'app-comic',
    templateUrl: './comic.component.html',
    styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private visiterService: VisiterService) { }

    id!: Number | String | null;
    listComics: any;
    data: any;
    baseUrl = env.API_MEDIA;

    async ngOnInit() {
        this.route.paramMap.subscribe(async (params: ParamMap) => {
            this.id = params.get('id')
            try {
                const comic = await this.visiterService.getOneComic(Number(this.id)).toPromise()
                this.data = comic[0]
                this.listComics = await this.visiterService.getOneCategory(comic[0].cate_id).toPromise()
            } catch (e) {
                console.log(e)
                this.router.navigate(['errors'])
            }
        })

    }

}
