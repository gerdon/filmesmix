import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { FilmePage } from '../filme/filme';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FilmePage;
  tab3Root = AboutPage;

  constructor() {

  }
}
