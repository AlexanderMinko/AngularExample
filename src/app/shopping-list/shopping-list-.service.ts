import { Ingredient } from '../shared/ingreadient.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startingEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Pineapples', 2)
      ];

      getIngredients() {
          return this.ingredients.slice();
      }

      getIngredient(index: number): Ingredient {
          return this.ingredients[index];
      }

      addIngredient(ingreadient: Ingredient) {
          this.ingredients.push(ingreadient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient) {
          this.ingredients[index] = newIngredient;
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
          this.ingredients.splice(index, 1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
}