import {Component, OnInit, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() listOfData: any[] = [];
  @Input() headers: string[] = [];

  @Input() tableCells: TemplateRef<void>[] = []
  @Input() emptyView: TemplateRef<void> | null;
  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(index: number){
    return index;
  }

}
