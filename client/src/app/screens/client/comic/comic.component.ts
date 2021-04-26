import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { CommicsService } from 'src/app/services/commics.service';

@Component({
    selector: 'app-comic',
    templateUrl: './comic.component.html',
    styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private comicService: CommicsService, private categoryService: CategoryService) { }

    id!: Number | String | null;
    listComics: any;
    data: any;
    async ngOnInit() {
        this.route.paramMap.subscribe(async (params: ParamMap) => {
            this.id = params.get('id')
            try {
                const comic = await this.comicService.getOne(Number(this.id)).toPromise()
                this.data = comic[0]
                this.listComics = await this.categoryService.getOne(comic[0].cate_id).toPromise()
            } catch (e) {
                this.router.navigate(['errors'])
            }
        })

    }

}
