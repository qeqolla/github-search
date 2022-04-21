import { Component, OnDestroy, OnInit } from '@angular/core';
import { GithubService } from "../../sytem/services/github/github.service";

import { Subject, takeUntil, } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators'
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { GithubProfile } from "../../sytem/interfaces/github/githubProfile";


@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.scss']
})
export class GithubSearchComponent implements OnInit, OnDestroy {
  inputEl!: HTMLInputElement
  data!: Array<GithubProfile>

  searchField: FormControl;
  searchForm: FormGroup;
  notifier = new Subject<void>()

  constructor (
    private githubService: GithubService,
    private fb: FormBuilder
  ) {
    this.searchField = new FormControl();
    this.searchForm = fb.group({search: this.searchField});


    this.searchForm.valueChanges.pipe(
      debounceTime(400),
      filter(value => value.search.trim()),
      takeUntil(this.notifier),
      switchMap(searchString => this.githubService.getData(searchString.search))
    ).subscribe((result) => {
      this.data = result.items
    });


  }

  ngOnInit (): void {
  }


  ngOnDestroy () {
    this.notifier.next()
    this.notifier.complete()
  }
}
