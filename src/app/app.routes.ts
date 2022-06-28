import { RouterModule, Routes } from '@angular/router';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { HomeComponent } from './components/home/home.component';
import { ListaComponent } from './components/lista/lista.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';

const routes: Routes = [
    {path: 'inicio', component: HomeComponent},
    {path: 'peli', component: PeliculasComponent},
    {path: 'detalles/:id/:pelicula', component: DetallesComponent},
    {path: 'search/:busqueda', component: ListaComponent},
    {path: 'faqs', component: FaqsComponent },
    {path: 'acerca', component: AcercadeComponent },
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
]

export const appRouting = RouterModule.forRoot(routes);