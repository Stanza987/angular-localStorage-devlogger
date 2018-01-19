import { Injectable } from '@angular/core';
import { Log } from '../models/Log';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LogService {
  logs: Log[];

  logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  stateSource = new BehaviorSubject<boolean>(true);

  constructor() {
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    (localStorage.getItem('logs') === null) ? this.logs = [] : this.logs = JSON.parse(localStorage.getItem('logs'));
    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => { if (log.id === cur.id) this.logs.splice(index, 1); });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => { if (log.id === cur.id) this.logs.splice(index, 1); });
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }

}
