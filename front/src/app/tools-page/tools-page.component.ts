import { Component, OnInit } from '@angular/core';
import { ToolService } from '../core/services/tool.service'
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material';

@Component({
  selector: 'si-tools-page',
  templateUrl: './tools-page.component.html',
  styleUrls: ['./tools-page.component.css']
})
export class ToolsPageComponent implements OnInit {
  private tools: any[] = [];
  private totalLength: number = 0;
  private pageSize: number = 6;
  private pageSizeOptions: number[] = [];
  private actualLengthIndex: number = 0;
  private loaded: boolean = false;

  constructor(private toolService: ToolService,          
              private router: Router) {}
  
  ngOnInit() {
    this.update();
  }

  update(){
    this.toolService.findAll(this.actualLengthIndex, this.pageSize).subscribe(response => {
      this.tools = response.data;
      this.totalLength = response.totalCount;
      this.loaded = true;
    });
  }

  goToNewTool(){
    this.router.navigate(['ferramentas', 'novo']);
  }

  paginate($event){

    if( $event.pageIndex > this.actualLengthIndex ){
      this.actualLengthIndex += this.pageSize;
    }
    else {
      this.actualLengthIndex -= this.pageSize;
    }

    this.update();
  }
}