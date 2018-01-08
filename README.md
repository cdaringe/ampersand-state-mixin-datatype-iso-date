[ ![Codeship Status for cdaringe/ampersand-state-mixin-datatype-iso-date](https://codeship.com/projects/3c615720-04cc-0133-3db8-1a88c4115bd9/status?branch=master)](https://codeship.com/projects/89403)

# ampersand-state-mixin-datatype-iso-date

[![Greenkeeper badge](https://badges.greenkeeper.io/cdaringe/ampersand-state-mixin-datatype-iso-date.svg)](https://greenkeeper.io/)
Adds ISO 8601 date functionality to ampersand state.  This module stores dates explicity as full ISO
8601 strings with client locale TZ.  This makes all timestamps **lossless**, vs using UTC ISO stamps or
Unix time (epoch) values.

```js
// same time, different formats
"2015-07-04T15:26:19-07:00" // good! lossless timestamp data, keeping client TZ. we use this
"2015-07-04T22:26:19.000Z" // poor! UTC normalized.  drops user TZ
1436048779 // poor! unix time, UTC normalized (maybe!*). drops user TZ
```

You may want to specify something like the following in your ampersand-states or ampersand-models:

```js
var State = require('ampersand-state');
var DateState = State.extend(isoDateMixin, {
    props: {
        sometime: 'iso-date'
    }
});
```

# usage
Using the example from above
```js
var State = require('ampersand-state');
var funcMixin = require('ampersand-state-mixin-datatype-iso-date');
var DateState = State.extend(funcMixin, {
    props: {
        sometime: {
            type: 'iso-date',
            required: true
        }
    }
});

var model = new DateState({
    myTime: new Date()
});
model.myTime; //=> "2015-07-04T15:26:19-07:00"

model.myTime = "2015-07-04 16:30:20-07:00"; // no T is still ISO compliant. some DBs, like postgres, omit it by default
model.myTime; //=> "2015-07-04T16:30:20-07:00";

model.myTime = '10/10/2010'; // Using incomplete timestamps is deprecated in this module's moment.js dep, thus not recommended
model.myTime; //=> "2010-10-10T00:00:00-07:00" (caution!)
```
