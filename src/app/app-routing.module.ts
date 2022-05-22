import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DriedFoodComponent } from './dried-food/dried-food.component';
import { HomeComponent } from './home/home.component';
import { MeatComponent } from './meat/meat.component';
import { ProductsComponent } from './products/products.component';
import { VegetableComponent } from './vegetable/vegetable.component';

const routes: Routes = [
  {path: 'home/product/:id', component: ProductsComponent},
  {path: 'product', component: ProductsComponent},
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'dried', component: DriedFoodComponent },
  { path: 'vegetable', component: VegetableComponent },
  { path: 'meat', component: MeatComponent },
  { path: 'juice', component: VegetableComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, //Mới vào trang hiển thị trang chủ
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
