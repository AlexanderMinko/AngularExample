import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // localStorage.setItem('zheka', 'HelloZheka');
    // let zheka = localStorage.getItem('zheka');
    // alert(zheka);

    // document.cookie = 'login=zhopa33';
    // let cookies = document.cookie.split(';');
    // for(let i = 0; i < cookies.length; i++) {
    //   let parts = cookies[i].split('='), name = parts[0], value = parts[1];
    //   alert('name = ' + name + ', value = ' + value);
    // }
  }
}
