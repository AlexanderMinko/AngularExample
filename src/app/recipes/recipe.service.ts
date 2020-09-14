import { Recipe } from './recipe.model'
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingreadient.model';
import { ShoppingService } from '../shopping-list/shopping-list-.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()
    
    // private recipes: Recipe[] = [
    //     new Recipe('Soup',
    //         'very tasty',
    //         'https://img.povar.ru/main/ab/23/b4/9c/samii_vkusnii_borsh-404089.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Bubble', 23)
    //         ]),
    //     new Recipe('Borch',
    //         'love it',
    //         'https://cdn.lifehacker.ru/wp-content/uploads/2014/12/ob-05_1568611223.jpg',
    //         [
    //             new Ingredient('Kek', 12),
    //             new Ingredient('Cheburek', 223)
    //         ])
    // ];

    private recipes: Recipe[] = [];

    constructor(private shippingService: ShoppingService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    onAddIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shippingService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}