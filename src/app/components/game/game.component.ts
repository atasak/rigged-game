import {Component, HostListener} from '@angular/core';
import {GameService}             from '../../logic/game.service';

@Component({
               selector   : 'app-game',
               templateUrl: './game.component.html',
               styleUrls  : ['./game.component.sass'],
           })
export class GameComponent {

    constructor (public game: GameService) {
    }

    @HostListener('window:keydown', ['$event'])
    keyDown (event: KeyboardEvent) {
        this.game.keyDown(event);
    }

    modalShow (): number {
        return this.game.showModal ? 1 : 0;
    }

    modalIconBackground (): string {
        return `-${this.game.modalIcon.col * 64}px -${this.game.modalIcon.row * 64}px`;
    }
}
