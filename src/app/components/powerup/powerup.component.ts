import {animate, style, transition, trigger} from '@angular/animations';
import {Component, Input, OnInit}            from '@angular/core';
import {PowerUp, powerUps}                   from '../../logic/powerups';

@Component({
               selector   : 'app-powerup',
               templateUrl: './powerup.component.html',
               styleUrls  : ['./powerup.component.sass'],
               animations : [
                   trigger('powerUp', [
                       transition(':enter', [
                           style(
                               {
                                   bottom : '0px',
                                   opacity: 1,
                               }),
                           animate('1s ease-out', style(
                               {
                                   bottom : '32px',
                                   opacity: 0,
                               })),
                       ]),
                   ]),
               ],
           })
export class PowerupComponent implements OnInit {
    @Input() powerUp: PowerUp = powerUps[0];

    text = '';
    icon = '';

    constructor () {
    }

    ngOnInit () {
        this.text = this.powerUp.text;
        this.icon = `-${this.powerUp.icon.col * 48}px -${this.powerUp.icon.row * 48}px`;
    }
}
