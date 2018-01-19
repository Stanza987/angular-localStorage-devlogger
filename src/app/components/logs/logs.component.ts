import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Log } from '../../models/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styles: [`
    .log-date {
      color: #777;
    }

    .del-pointer {
      cursor: pointer;
      color: darkred;
    }
  `]
})
export class LogsComponent implements OnInit {

  logs: Log[];
  selectedLog: Log;
  loaded = false;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.stateSource.subscribe(clear => {
      if (clear) this.selectedLog = { id: '', text: '', date: new Date };
    });
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });
  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    if (confirm('Are you sure?')) this.logService.deleteLog(log);
  }

}
