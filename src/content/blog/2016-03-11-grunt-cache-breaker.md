---
title: "grunt-cache-breaker"
date: 2016-03-11
tags: ["Tech", "NPM", "grunt", "grunt-cache-breaker"]
tistory_url: "https://idenrai.tistory.com/61"
---

뒤늦게 Grunt를 접하고, 이것저것 만져 보고 있는데...

꽤 쓸만한 녀석이 있어, 바로 써먹어 보았다.

**[grunt-cache-breaker](https://www.npmjs.com/package/grunt-cache-breaker)**

```
{
"name": "Test",
"version": "1.9.0",
"devDependencies": {
"grunt": "~0.4.5",
"moment": "^2.8.3",
"grunt-cache-breaker": "^1.0.1"
}
}
Colored by Color Scripter
```

그 후,

```
npm install
```

로 노드 모듈 다 땡겨오고

**Gruntfile.js**를 작성한다.

```
'use strict';
var moment = (require('moment'))();

module.exports = function (grunt) {
var timestamp = 'None';

grunt.initConfig({
cachebreaker: {
dist: {
options: {
match: ['.js(?!p)'],
replacement: function () {
return moment.format('YYYYMMDDhhmmss');
}
},
files: {
src: ['WEB-INF/view/**/*.jsp']
}
}
}
});

grunt.loadNpmTasks('grunt-cache-breaker');

// TASK名を「break」に指定
// Cache-breakingをするときは、コンソールで「grunt break」
grunt.registerTask('break', ['cachebreaker:dist']);

// DefaultのTaskはBuildとする
grunt.registerTask('default', ['build']);
};
Colored by Color Scripter
```

이후, package.json과 Gruntfile.js가 있는 폴더에서

```
grunt break
```

를 돌리면 끝.

이 예시의 경우는 match가 저질코드긴 한데...

js만 캐시브레이킹 하려고 했더니, jsp까지 잡아버리길래

js만 건질 방법을 찾으려다가, 그냥 뒤에 p가 안붙는 애를 잡는 걸로 대충 정해버렸다.
