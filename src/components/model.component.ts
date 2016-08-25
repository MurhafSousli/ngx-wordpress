import {Component, Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';

import {WpModel} from '../service/model.service';

@Component({
  selector: 'model',
  providers: [WpModel],
  template: `<ng-content></ng-content>`
})

export class Model implements OnChanges{

  /** Inputs for api endpoint, query arguments and model id */
  @Input() endpoint:string;
  @Input() args:any;
  @Input() id:string;

  /** Output for the response */
  @Output() response = new EventEmitter();

  constructor(private wpModel:WpModel) {
  }

  /** Detects if args has changed to fetch again. */
  ngOnChanges(changes:{[propName:string]:SimpleChange}) {
    let prevId = changes['id'].previousValue;
    let newId = changes['id'].currentValue;
    if (prevId != newId) {
      this.fetch(newId, this.args);
    }
  }

  /** Get a model of endpoint type by id */
  public fetch(id, args?) {
    this.wpModel.Endpoint(this.endpoint).get(id, args).subscribe(
      (res) => {
        this.response.emit({object: res});
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
