import { Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';

// this class is to be decorated with @Component or @Directive
// that is so that the actual template and appearance of the slider is more customisable
export class Slider implements OnInit, AfterViewInit {
    // the min value associated with the slider
    // @Input() min: number;
    // the max value associated with the slider
    // @Input() max: number;
    @Input() set value(val){
        this._onValueChange(val);
    }
    get value() {
        return this._value;
    }
    @Input('htmlSliderBarContainer') protected htmlSliderBarContainer: any;
    @Input('htmlSliderProgressContainer') protected htmlSliderProgressContainer: any;
    @Input('htmlSliderThumb') protected htmlSliderThumb: any;

    // Event emitted when the slider value changes
    @Output() change = new EventEmitter();
    // Event emitted when the slider's thumb moves
    @Output() input = new EventEmitter();
    // Event emitter when the mouse is over the slider
    @Output() onMousemove = new EventEmitter();
    // the value associated with the slider, bound by min and max
    private _value;

    private _onValueChange(val) {
        this._value = val;
        this.change.emit(this._value);
    };

    private _onInput = (event: any) => {
        const xDecimal = event.offsetX / event.target.parentElement.clientWidth;
        this.input.emit(xDecimal);
    }

    private _onMousemove = (event: any) => {
        const xDecimal = event.offsetX / event.target.parentElement.clientWidth;
        this.onMousemove.emit(xDecimal);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.renderer.listen(this.htmlSliderBarContainer, 'click', this._onInput);
        this.renderer.listen(this.htmlSliderBarContainer, 'mousemove', this._onMousemove);
    }
    constructor(private renderer: Renderer2) {};

}
