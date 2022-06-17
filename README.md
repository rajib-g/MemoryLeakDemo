# MemoryLeakDemo
Memory leak demo. 


I have created a basic Angular application using ng new command. Then I only modify the app.component.ts file. The same is written below:
by implementing OnDestroy 

`import { Component, HostListener, OnDestroy } from '@angular/core';
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
`


I have made a index.html file which is being served by IIS. On pressing add the angular application is being loaded inside an iframe and on pressing remove button the application is being destroyed and iframe is removed from DOM. 

The content of index.html file which is being served by IIS is written below:
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="width: 100vw; height: 100vh;">
    <div id="a"></div>
    <button onclick="add()">Add</button>
    <button onclick="remove()">Remove</button>
</body>
<script>
    function add() {
        let body = document.getElementById('a');
        body.innerHTML = `<iframe src="http://localhost:4200" title="Memory Leak Demo" id="miscEntFrm" style="width:100%; height:99%; border:none;"></iframe>`;
    }
    function remove() {
        document.getElementById('miscEntFrm').contentWindow.postMessage("close", "*");

        setTimeout(() => {
            let frame = document.getElementById('miscEntFrm');
            //frame.contentWindow.location.reload();
            frame.src = 'about:blank';
            frame.remove();
            frame = undefined;
        }, 1000);
    }
</script>
</html>`

But the thing is, when observing memory tab performance monitor I notice that heap memory is constantly increasing when adding and removing the angular application along with iframe. Along with heap memory there is also an increase in DOM nodes, document and event listeners which decrease to some extinct but equals the previous number.

![memory leak heap snapshot](https://user-images.githubusercontent.com/107666716/174235712-f08a4db0-3ca1-46a5-a34d-43d7fc535751.PNG)
