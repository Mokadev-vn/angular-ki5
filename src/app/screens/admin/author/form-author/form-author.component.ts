import { AuthorService } from './../../../../services/author.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-author',
  templateUrl: './form-author.component.html',
  styleUrls: ['./form-author.component.css']
})
export class FormAuthorComponent implements OnInit {

  id!: Number;
  isAdd?: boolean;
  authorForm: FormGroup;

  constructor(private authorService: AuthorService,
    private router: Router, private route: ActivatedRoute) {
      this.authorForm = new FormGroup({
        name: new FormControl('', {
          validators: [Validators.required, Validators.minLength(4)],
          updateOn: 'change'
        }),
      });
    }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAdd = !this.id;

    if (!this.isAdd) {
      try {
        let dataCate = await this.authorService.getOne(this.id).toPromise();
        this.authorForm.patchValue(dataCate);
      } catch (e) {
        this.router.navigate(['/admin/author']);
      }
    }

  }

  onSubmit() {
    if (this.isAdd) {
      this.authorService.add(this.authorForm.value).subscribe(data => {
        if (data != undefined) {
          this.router.navigate(['/admin/author']);
        }
      })
      return;
    }

    this.authorService.edit(this.id, this.authorForm.value).subscribe(data => {
      if (data != undefined) {
        this.router.navigate(['/admin/author']);
      }
    })

  }

  get form() {
    console.log(this.authorForm.controls.name)
    return this.authorForm.controls;
  }


}
