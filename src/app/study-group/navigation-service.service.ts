import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {


  private previousUrls: string[] = [];
  private currentUrl: string | null = null;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart)
      )
      .subscribe((event) => {
        const navigationStartEvent = event as NavigationStart;
        if (this.currentUrl) {
          this.previousUrls.push(this.currentUrl);
        }
        this.currentUrl = navigationStartEvent.url;
        console.log('Current URL:', this.currentUrl); // Debugging log
        console.log('Previous URLs:', this.previousUrls); // Debugging log
      });
  }

  public getPreviousUrl(): string | null {
    return this.previousUrls.length > 0 ? this.previousUrls[this.previousUrls.length - 1] : null;
  }

  public navigateToPrevious(): void {
    const previousUrl = this.getPreviousUrl();
    if (previousUrl) {
      this.router.navigateByUrl(previousUrl).catch(error => console.error('Navigation error:', error));
      // Remove the last entry as we navigated to it
      this.previousUrls.pop();
    } else {
      this.router.navigate(['/search']).catch(error => console.error('Navigation error:', error));
    }
  }
}
