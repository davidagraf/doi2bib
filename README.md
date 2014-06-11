doi2bib
=======

### Installation
    git clone https://github.com/davidagraf/doi2bib.git
    cd doi2bib
    npm install -g bower gulp
    npm install && bower install

### Run Development
    gulp serve

### Create Distribution
    gulp dist
    
### Run Distribution
    node app/server.js

### Testing
#### Preparations
    npm install -g protractor
    webdriver-manager update

#### Running Tests
    gulp serve
    webdriver-manager start
    protractor test/protractor-conf.js
    

### Authors

[David Graf](https://twitter.com/davidagraf)

[Thomas Thurnherr](https://twitter.com/thurnherr)

### License

Copyright (c) doi2bib, 2014.
