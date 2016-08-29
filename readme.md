# Firebase: DB without ops

### Contents

This repository contains a pair complete.html and complete.js, which represent the complete example.

database.rules.json contains the database read/write rules. 

You can use index.html as a starting point. It contains jQuery and a basic html layout for the tutorial.

### Summary

1. Create your firebase.google.com account.
2. Paste firebase web code into html head tag from the firebase console home.
3. Set test data `firebase.database().ref("date/rightnow").set(new Date().toString())`
4. Run a web server and try
    - ruby: ruby -run -ehttpd . -p8000
    - python2: python -m SimpleHTTPServer 8000
    - python3: python -m http.server 8000
    - https://gist.github.com/willurd/5720255
4. Enable google auth in the firebase auth console.
5. Create a guestbook using the firebase.database() and .auth()

https://gitter.im/North-Shore-Startup-Hackers/Lobby
