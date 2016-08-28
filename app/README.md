# How does it work
 
1. When visiting "http://localhost" (or the actual host) in the browser, the browser makes a get request to server
2. NodeJs server receives it as a "/" request, so the express routes it to indexRouter
3. indexRouter only does one thing, which is sending back the "index.html" file
4. In the head of the index.html file, it firstly downloads some scripts using path of e.g. "/public/scripts/app.js"
5. This download request goes to server as a get request again
6. NodeJs express server receives it, and sends back the static file using the actual path of that file on the server
7. The "index.html" gets interpreted down and encountered an Angular directive which defines an ng-app called "tinyurlApp"
8. app.js was loaded before, it now configures the view/controller selector for the tinyurlApp 
9. The "index.html" gets interpreted down again and encountered an ng-view, which triggers the selection of view/controller
10. app.js says if it's "/", replace the view with "home.html" and use homeController
11. home.html gets displayed and it has a "Get Your Short Url" button associated with an ng-submit action: submit() 
12. User types in the long url and clicks the button. On clicking the button, submit() function gets called
13. homeController has defined the submit() function, where it does a post request with "/api/v1/urls" to server with a long url
14. NodeJs express server now sees "/api/v1", then it routes the request to restRouter
15. restRouter sees "urls", then goes to urlService to get back the shortUrl say "2" and return
16. Once the post call is returned, homeController changes the address bar address to, say "/urls/2"
17. Well in app.js, there's a config saying that if it's "/urls/2", replace the view with "url.html" and use urlController
18. Then "url.html" gets displayed and urlController starts working
19. What urlController does is: it creates an "api/v1/urls/2" get request to server
20. NodeJs express sees "api/v1" again so routes to restRouter
21. restRouter sees "urls/:shortUrl", then it goes to urlService to get back the long url and return back to urlController
22. urlController gets the response and sets the variables' values to be displayed on url.html
23. Now in the shortUrl field on url.html, it has a valid url populated: http://localhost/2
24. If user clicks on that shortUrl, there's no router rules in angular for "/2", so it directly goes to server
25. NodeJs express receives "/:shortUrl" now, then routes it to redirectRouter
26. redirectRouter parses out the shortUrl and call urlService to get the long url
27. Once redirectRouter gets the long url, it directly goes to the website of it. 

# Done

# Docker How-To

1. Using Vagrant to run Ubuntu, then run docker in Ubutntu
  - Add synced folder in [Vagrantfile](https://github.com/fairyqiqi/TinyUrl/blob/master/playgroud/Vagrantfile)
    * ```config.vm.synced_folder "../app", "/root/tinyUrlSource"```
      * "../app" - Source code path relative to where Vagrantfile is
      * "/root/tinyUrlSource" - Source code path to sync in Ubuntu which will contain node_modules
  - Mark down the network address of the guest Ubuntu
    * ```s1.vm.network :private_network, ip: "192.168.77.101"```
  
2. Docker file
  - Dockerfile is written based on the guest Ubuntu's path.
  - See [Dockerfile](https://github.com/fairyqiqi/TinyUrl/blob/master/app/Dockerfile)

3. Run Docker
  ```
  $ cd playground
  $ vagrant up s1
  $ vagrant ssh s1
  $ sudo su -
  # cd /root/tinyUrlSource
  # docker build -t qiqi-tinyUrl:latest .                  //--> qiqi-tinyurl is the image name, all lower case
  # docker run --name tinyurl -p 7777:7777 -d qiqi-tinyurl //--> tinyurl is the container name
  ```

4. Test
  - In host machine, type this address in browser: 
  ```http://192.168.77.101:7777```

# Done