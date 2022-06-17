# MemoryLeakDemo
Memory leak demo. 


I have created a basic Angular application using ng new command. Then I only modify the app.component.ts file. The same is written below:

I have uploaded the same in this repo.


I have made a index.html file which is being served by IIS. On pressing add the angular application is being loaded inside an iframe and on pressing remove button the application is being destroyed and iframe is removed from DOM. 

The content of index.html file which is being served by IIS is written below:

I have uploaded the same in this repo.

But the thing is, when observing memory tab performance monitor I notice that heap memory is constantly increasing when adding and removing the angular application along with iframe. Along with heap memory there is also an increase in DOM nodes, document and event listeners which decrease to some extinct but equals the previous number.

![memory leak heap snapshot](https://user-images.githubusercontent.com/107666716/174235712-f08a4db0-3ca1-46a5-a34d-43d7fc535751.PNG)
