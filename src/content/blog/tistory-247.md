---
title: "class-validator의 조건부 사용"
date: 2021-06-30
tags: ["Tech", "JavaScript", "validation", "class-validator", "ValidateIf"]
tistory_url: "https://idenrai.tistory.com/247"
---

아래의 파라메터를 필요로 하는 API를 만들고 있다.

```
{
  "country": "string",
  "date": "string",
  "type": [
    "string"
  ],
  "color": [
    "string"
  ],
  "def": "string"
}
```

해당 파라메터의 Validation을 위해 class-validator를 사용하고 있는데, 여기서 조건이 한 가지.

기본적으로 모든 항목에 not empty를 걸고 싶은데, type과 color는 둘 중 하나만 있어도 OK로 하고 싶다.

뭐 해결방법은 아래와 같다.

```
import * as v from "class-validator";
import { RequestModel } from "../models/RequestModel"
import { countryCode } from '../enums/countryCode';

export class TypeColorRequestModel extends RequestModel {
    constructor(event: object, context: object) {
        super(event, context);
        this.country = this.requestParams?.country;
        this.date = this.requestParams?.date;
        this.type = this.requestParams?.type;
        this.color = this.requestParams?.color;
        this.def = this.requestParams?.def;
    }

    @v.IsNotEmpty()
    @v.IsEnum(countryCode)
    country: string;

    @v.IsNotEmpty()
    @v.IsISO8601()
    date: string;

    @v.ValidateIf(o => !o.color || o.color.length === 0 || o.type)
    @v.IsNotEmpty()
    type: string[];

    @v.ValidateIf(o => !o.type || o.type.length === 0 || o.color)
    @v.IsNotEmpty()
    color: string[];

    @v.IsNotEmpty()
    def: string;
}
```

기본적으로 이런 조건류는 ValidateIf를 걸면 만능이더라.

**참조**

[class-validator/conditional-validation](https://github.com/typestack/class-validator#conditional-validation)
