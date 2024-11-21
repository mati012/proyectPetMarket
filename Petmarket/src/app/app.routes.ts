import { RouterModule, Routes } from '@angular/router';
import { JuguetesComponent } from './juguetes/juguetes.component';
import { ComidaComponent } from './comida/comida.component';
import { TransportadoresComponent } from './transportadores/transportadores.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },  // Home route
    { path: 'juguetes', component: JuguetesComponent },
    { path: 'comida', component: ComidaComponent },
    { path: 'transportadores', component: TransportadoresComponent },
    {path: 'login', component: LoginComponent},
    {path: 'registrarse', component: RegistrarseComponent},
    {path: 'cart', component: CartComponent},
    { path: 'product/:id', component: ProductDetailComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard redirect


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}