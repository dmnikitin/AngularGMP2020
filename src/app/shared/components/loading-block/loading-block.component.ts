import { LoaderService } from './../../../core/services/loader.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loading-block',
  templateUrl: './loading-block.component.html',
  styleUrls: ['./loading-block.component.scss']
})
export class LoadingBlockComponent implements OnInit {

  public isLoading: Subject<boolean>;

  constructor(private loaderService: LoaderService) { }

  public ngOnInit(): void {
    this.isLoading = this.loaderService.isLoading;
  }

}
