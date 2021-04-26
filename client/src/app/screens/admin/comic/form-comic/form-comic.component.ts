import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommicsService } from 'src/app/services/commics.service';
import { CategoryService } from 'src/app/services/category.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-form-comic',
  templateUrl: './form-comic.component.html',
  styleUrls: ['./form-comic.component.css']
})
export class FormComicComponent implements OnInit {

  id!: Number;
  isAdd?: boolean;
  comicForm: FormGroup;
  listCate: any;
  listAuthor: any;
  image: any;
  oldImage: any;

  constructor(private comicService: CommicsService, private categoryService: CategoryService, private authorService: AuthorService,
    private router: Router, private route: ActivatedRoute) {
    this.comicForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      author_id: new FormControl('', [Validators.required]),
      cate_id: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
  }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.isAdd = !this.id;
    this.getCategory()
    this.getAuthor()

    if (!this.isAdd) {
      try {
        let dataComic = await this.comicService.getOne(this.id).toPromise();
        this.image = dataComic[0].image
        this.oldImage = dataComic[0].image
        this.comicForm.patchValue({
          title: dataComic[0].title,
          cate_id: dataComic[0].cate_id,
          author_id: dataComic[0].author_id,
          status: dataComic[0].status
        });
      } catch (e) {
        this.router.navigate(['/admin/comic']);
      }
    }
  }

  onSubmit() {
    let data = new FormData();
    data.append('title', this.comicForm.value.title);
    if(this.image != this.oldImage){
      data.append('image', this.image);
    }
    data.append('author_id', this.comicForm.value.author_id);
    data.append('cate_id', this.comicForm.value.cate_id);
    data.append('status', this.comicForm.value.status);

    if (this.isAdd) {
      this.comicService.add(data).subscribe(data => {
        if (data != undefined) {
          this.router.navigate(['/admin/comic']);
        }
      })
      return;
    }

    this.comicService.edit(this.id, data).subscribe(data => {
      if (data != undefined) {
        this.router.navigate(['/admin/comic']);
      }
    })

  }

  get form() {
    return this.comicForm.controls;
  }

  async getCategory() {
    const data = await this.categoryService.getAll().toPromise()
    this.listCate = data
  }

  async getAuthor() {
    const data = await this.authorService.getAll().toPromise()
    this.listAuthor = data
  }

  selectFile(event: any) {
    this.image = event.target.files[0]
  }

}
