import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Log } from '../../models/Log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styles: []
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: Date;

  isNew = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.logSource.subscribe(log => {
      if (log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }

  onSubmit() {
    if (this.isNew) {
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      };
      this.logService.addLog(newLog);
    } else {
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      };
      this.logService.updateLog(updLog);
    }
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.logService.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
