import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingreadient.model';
import { ShoppingService } from './shopping-list-.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private idChangeSub: Subscription;

  constructor(private shippingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shippingService.getIngredients();
    this.idChangeSub = this.shippingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.shippingService.startingEditing.next(index);
  }

  ngOnDestroy(): void {
    this.idChangeSub.unsubscribe();
  }
}
