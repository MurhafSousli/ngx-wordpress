import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {WpModel} from '../../service';

@Component({
  selector: 'model',
  providers: [WpModel],
  template: `<ng-content></ng-content>`
})

export class Model implements OnInit{

  /** Inputs for api endpoint, query arguments and model id */
  @Input() endpoint:string;
  @Input() args:any;
  @Input() id:string;

  /** Output for the response */
  @Output() response = new EventEmitter();

  private data:any;

  constructor(private wpModel:WpModel) {
  }

  ngOnInit(){
    this.fetch(this.id, this.args);
  }

  /** Get a model of endpoint type by id */
  public fetch(id, args?) {
    this.wpModel.Endpoint(this.endpoint).get(id, args).subscribe(
      (res) => {
        this.data = res;
        this.response.emit({object: this.data});
      },
      (err) => {
        this.response.emit({error: err});
      }
    );
  }

}

/*
 * Model component uses WpModel service to get a single model,
 * it has 2 properties:
 *  - @INPUT: args
 *  - @INPUT: endpoint
 *  - @OUTPUT: response
 */
