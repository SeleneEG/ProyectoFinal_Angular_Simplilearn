import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faPinterestP,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  faFacebook = faFacebookF;
  faInstagram = faInstagram;
  faPinterestP = faPinterestP;
  faTwitter = faTwitter;

  constructor() {}

  ngOnInit(): void {}
}
