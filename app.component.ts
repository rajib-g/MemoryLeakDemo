import { Component, HostListener, OnDestroy } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
  }
  @HostListener('window:message',['$event'])
  onMessage(e:any)
  {
    console.log(e);
    if(e["data"] == "close")
      this.closeForm();
  }
  closeForm() {
    platformBrowser().destroy();
  }
  title = 'demo';
}
