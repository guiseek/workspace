import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'guiseek-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css'],
})
export class DrawComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  colors = ['green', 'blue', 'red', 'yellow', 'orange', 'black'];

  flag = false;
  prevX = 0;
  currX = 0;
  prevY = 0;
  currY = 0;
  dot_flag = false;
  w = 0;
  h = 0;
  x = 'black';
  y = 2;

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.w = this.canvas.width;
    this.h = this.canvas.height;

    this.canvas.addEventListener(
      'mousemove',
      (e) => {
        this.findxy('move', e);
      },
      false
    );
    this.canvas.addEventListener(
      'mousedown',
      (e) => {
        this.findxy('down', e);
      },
      false
    );
    this.canvas.addEventListener(
      'mouseup',
      (e) => {
        this.findxy('up', e);
      },
      false
    );
    this.canvas.addEventListener(
      'mouseout',
      (e) => {
        this.findxy('out', e);
      },
      false
    );
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.strokeStyle = this.x;
    this.ctx.lineWidth = this.y;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  color({ target }) {
    switch (target.id) {
      case 'green':
        this.x = 'green';
        break;
      case 'blue':
        this.x = 'blue';
        break;
      case 'red':
        this.x = 'red';
        break;
      case 'yellow':
        this.x = 'yellow';
        break;
      case 'orange':
        this.x = 'orange';
        break;
      case 'black':
        this.x = 'black';
        break;
      case 'white':
        this.x = 'white';
        break;
    }

    if (this.x === 'white') this.y = 14;
    else this.y = 2;
  }
  erase() {
    const m = confirm('Want to clear');
    if (m) {
      this.ctx.clearRect(0, 0, this.w, this.h);
      document.getElementById('this.canvasimg').style.display = 'none';
    }
  }

  save() {
    document.getElementById('this.canvasimg').style.border = '2px solid';
    const dataURL = this.canvas.toDataURL();
    document.querySelector<HTMLImageElement>('this.canvasimg').src = dataURL;
    document.getElementById('this.canvasimg').style.display = 'inline';
  }

  findxy(res: string, e: MouseEvent) {
    if (res === 'down') {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.currX = e.clientX - this.canvas.offsetLeft;
      this.currY = e.clientY - this.canvas.offsetTop;

      this.flag = true;
      this.dot_flag = true;
      if (this.dot_flag) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.x;
        this.ctx.fillRect(this.currX, this.currY, 2, 2);
        this.ctx.closePath();
        this.dot_flag = false;
      }
    }
    if (res === 'up' || res === 'out') {
      this.flag = false;
    }
    if (res === 'move') {
      if (this.flag) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.offsetLeft;
        this.currY = e.clientY - this.canvas.offsetTop;
        this.draw();
      }
    }
  }

  constructor() {}

  ngOnInit(): void {
    // this.canvas = document.getElementById('can');
  }
}
