import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GithubResponse } from "../../interfaces/github/githubProfile";


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor (private http: HttpClient) {
  }

  getData (user_name: string): Observable<GithubResponse> {
    return this.http.get<GithubResponse>(`https://api.github.com/search/users?q=${user_name}`)
  }
}
