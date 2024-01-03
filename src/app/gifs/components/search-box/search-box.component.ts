import { Component } from '@angular/core';

@Component({
  selector: 'app-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text" class="form-control" placeholder="buscar gifs...">
  `,
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

}
