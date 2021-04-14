import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})

export class CreateCategoryComponent implements OnInit {

  id!: Number;
  isAdd?: boolean;
  cateForm: FormGroup;

  constructor(private categoryService: CategoryService,
    private router: Router, private route: ActivatedRoute) {
      this.cateForm = new FormGroup({
        name: new FormControl('', {
          validators: [Validators.required, Validators.minLength(4)],
          // asyncValidators: [checkNameCate(this.categoryService)],
          updateOn: 'change'
        }),
      });
    }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAdd = !this.id;

    if (!this.isAdd) {
      try {
        let dataCate = await this.categoryService.getOne(this.id).toPromise();
        this.cateForm.patchValue(dataCate);
      } catch (e) {
        this.router.navigate(['/admin/category']);
      }
    }

  }

  onSubmit() {
    if (this.isAdd) {
      this.categoryService.addNewCategory(this.cateForm.value).subscribe(data => {
        if (data != undefined) {
          this.router.navigate(['/admin/category']);
        }
      })
      return;
    }

    this.categoryService.edit(this.id, this.cateForm.value).subscribe(data => {
      if (data != undefined) {
        this.router.navigate(['/admin/category']);
      }
    })

  }

  get form() {
    console.log(this.cateForm.controls.name)
    return this.cateForm.controls;
  }


}
