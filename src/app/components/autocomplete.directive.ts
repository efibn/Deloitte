import { Directive, OnInit, ViewContainerRef, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutocomplete]',
  //template: '<input name="autocomplete" type="text"/>'
})
export class AutocompleteDirective implements OnInit {

  constructor(
    private te:TemplateRef<any>,
    private vc:ViewContainerRef) { 

  }

  ngOnInit() {
    this.vc.createEmbeddedView(this.te);
  }

}
