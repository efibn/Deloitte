import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  @Input() list:any[];

  panelVisible: boolean = false;

  input: any;

  value: any;
  
  onModelChange: Function = () => {};

  filled: boolean;

  constructor() { }

  ngOnInit() {
  }

  hide() {
    this.panelVisible = false;
  }

  show() {
    if(!this.panelVisible) {
      this.panelVisible = true;
    }
  }

  onKeydown(event:any , inputEL: HTMLInputElement) {
    if(this.panelVisible) {
      //let highlightItemIndex = this.findOptionIndex(this.highlightOption);

      switch(event.which) {
        //down
        case 40:
          if(highlightItemIndex != -1) {
            var nextItemIndex = highlightItemIndex + 1;
            if(nextItemIndex != (this.suggestions.length)) {
              this.highlightOption = this.suggestions[nextItemIndex];
              this.highlightOptionChanged = true;
            }
          }
          else {
            this.highlightOption = this.suggestions[0];
          }

          event.preventDefault();
          break;

        //up
        case 38:
          if(highlightItemIndex > 0) {
            let prevItemIndex = highlightItemIndex - 1;
            this.highlightOption = this.suggestions[prevItemIndex];
            this.highlightOptionChanged = true;
          }

          event.preventDefault();
          break;

        //enter
        case 13:
          if(this.highlightOption) {

            this.selectItem(this.highlightOption);
            this.hide();
          }
          event.preventDefault();
          break;

        //escape
        case 27:
          this.hide();
          event.preventDefault();
          break;


        //tab
        case 9:
          if(this.highlightOption) {
            this.selectItem(this.highlightOption);
          }
          this.hide();
          break;
      }
    } else {
      if(event.which === 40 && this.suggestions) {
        this.search(event, event.target.value);
      } else if(event.which === 13) {
        this.selectItem(event.target.value);
        event.preventDefault();
      } else if(event.which === 9) {
        this.selectItem(event.target.value);
      }
    }

    
  }

  selectItem(option: any) {
    if(!option || option =='')
      return;
    if(this.multiple) {
      this.input.value = '';
      this.value = this.value||[];
      if(!this.isSelected(option)) {
        let val =option;
        if(this.field && typeof val == "string"){
          val ={};
          val[this.field]=option;
        }
        this.value.push(val);
        this.onModelChange(this.value);
      }
    }
    else {
      this.input.value = this.field ? this.resolveFieldData(option): option;
      this.value = option;
      this.onModelChange(this.value);
    }

    if(typeof option === "object"){
      this.onSelect.emit(option);
    }else{
      this.onSelect.emit(option);
      this.onAdd.emit({
        originalEvent: event,
        value: option
      });
    }


    this.input.focus();
  }

  onInput(event: any ) {
    let value = event.target.value;
    if(!this.multiple) {
      this.value = value;
      this.onModelChange(value);
    }

    if(value.length === 0) {
      this.hide();
    }

    if(value.length >= this.minLength) {
      //Cancel the search request if user types within the timeout
      if(this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.search(event, value);
      }, this.delay);
    }
    else {
      this.suggestions = null;
    }
    this.updateFilledState();
  }

  updateFilledState() {
    this.filled = this.input && this.input.value != '';
  }

}
