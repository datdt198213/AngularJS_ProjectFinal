import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { DriedFoodComponent } from './dried-food/dried-food.component';
import { HomeComponent } from './home/home.component';
import { JuiceComponent } from './juice/juice.component';
import { MeatComponent } from './meat/meat.component';
import { VegetableComponent } from './vegetable/vegetable.component';
import { FruitComponent } from './fruit/fruit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    CartComponent,
    DriedFoodComponent,
    HomeComponent,
    JuiceComponent,
    MeatComponent,
    VegetableComponent,
    FruitComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
