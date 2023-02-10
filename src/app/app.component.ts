import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngularSwiperV9';

  items = Array.from(Array(9).keys());

  imageSet1 = [
    this.createPexelsImg('617278', 700),
    this.createPexelsImg('416160', 700),
    this.createPexelsImg('177809', 700),
    this.createPexelsImg('96428', 700),
    this.createPexelsImg('1643456', 700),
    this.createPexelsImg('774731', 700),
    this.createPexelsImg('979503', 700),
    this.createPexelsImg('979247', 700),
    this.createPexelsImg('96938', 700),
  ];

  imageSet2 = [
    this.createPexelsImg('1633522', 700),
    this.createPexelsImg('733416', 700),
    this.createPexelsImg('1938126', 700),
    this.createPexelsImg('333083', 700),
    this.createPexelsImg('1959054', 700),
    this.createPexelsImg('1452717', 700),
    this.createPexelsImg('248307', 700),
    this.createPexelsImg('101635', 700),
    this.createPexelsImg('128817', 700),
  ];

  imageSet3 = [
    [this.createPexelsImg('584165', 400), this.createPexelsImg('584165', 700)],
    [
      this.createPexelsImg('1618659', 400),
      this.createPexelsImg('1618659', 700),
    ],
    [this.createPexelsImg('325946', 400), this.createPexelsImg('325946', 700)],
    [this.createPexelsImg('321899', 400), this.createPexelsImg('321899', 700)],
    [
      this.createPexelsImg('1695717', 400),
      this.createPexelsImg('1695717', 700),
    ],
    [this.createPexelsImg('751687', 400), this.createPexelsImg('751687', 700)],
    [this.createPexelsImg('751689', 400), this.createPexelsImg('751689', 700)],
    [this.createPexelsImg('321535', 400), this.createPexelsImg('321535', 700)],
    [this.createPexelsImg('312826', 400), this.createPexelsImg('312826', 700)],
  ];

  createPexelsImg(id: string, width: number) {
    const BASE_URL =
      'https://images.pexels.com/photos/###/pexels-photo-###.jpeg?auto=compress&cs=tinysrgb&w=$$$';
    return BASE_URL.replaceAll('###', id).replaceAll('$$$', `${width}`);
  }
}
