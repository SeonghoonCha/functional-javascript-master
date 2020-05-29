var users = [
    { id: 1, name: 'ID', age: 36 },
    { id: 2, name: 'BJ', age: 32 },
    { id: 3, name: 'JM', age: 32 },
    { id: 4, name: 'PJ', age: 27 },
    { id: 5, name: 'HA', age: 25 },
    { id: 6, name: 'JE', age: 26 },
    { id: 7, name: 'JI', age: 31 },
    { id: 8, name: 'MP', age: 23 }
];

/*************************************************************************************
 * each
 *************************************************************************************/

function _each(list, iter){
    for(var i =0; i < list.length; i++){
        iter(list[i]);
    }
    return list;
}

/*************************************************************************************
 * curry
 *************************************************************************************/

function _curry(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a,b) : function(b) {
            return fn(a, b);
        }
    }
}

var add = _curry(function(a, b){
    return a + b;
});

console.log(add(1)(2));

var add3 = add(3);

console.log(add3(5));


/*************************************************************************************
 * curryr
 *************************************************************************************/

function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) {
            return fn(b, a);
        }
    }
}

var minus = _curryr(function(a, b){
    return a - b;
});

console.log(minus(1)(2));

var minus3 = minus(3);

console.log(minus3(5));


/*************************************************************************************
 * get
 *************************************************************************************/
function _get(obj, key) {
    return obj == null ? undefined : obj[key];
}

var _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
});

var get_name = _get("name");

console.log(get_name(users));


/*************************************************************************************
 * reduce
 *************************************************************************************/

var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}


function _reduce(list, iter, memo) {
    if(arguments.length == 2){
        memo = list[0];
        list = _rest(list);
    }

    _each(list, function(item) {
        memo = iter(memo, item);
    });

    return memo;
}

var a = _reduce([1,2,3,4], add);

console.log(a);

/*************************************************************************************
 * pipe
 *************************************************************************************/
function _pipe() {
    var fns = arguments;

    return function(arg) {
        return _reduce(fns, function(arg, fn) {
            return fn(arg);
        }, arg);
    }
}

var f1 = _pipe(
    function(a) { return a + 1; },
    function(a) { return a * 2; },
    function(a) { return a * a; });

console.log( f1(1) );

/*************************************************************************************
 * go (즉시 실행되는 pipe 함수)
 *************************************************************************************/
function _go(arg) {
    var fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg);
}

/*************************************************************************************
 * filter
 ************************************************************************************/
// 명령형 함수
var temp_users = [];
for (var i = 0; i < users.length; i++) {
    if (users[i].age >= 30) {
        temp_users.push(users[i]);
    }
}
console.log(temp_users);

// filter 적용
function _filter_1(list, predi) {
    var new_list = [];
    for(var i = 0; i < list.length; i++){
        if(predi(list[i])){
            new_list.push(list[i]);
        }
    }
    return new_list;
}
var over_30_1 = _filter_1(users, function(user) { return user.age >= 30; });
console.log(over_30_1);

// each 적용
function _filter_2(list, predi){
    var new_list = [];
    _each(list, function(item){
        if(predi(item)){
            new_list.push(item);
        }
    });
    return new_list;
}

var over_30_2 = _filter_2(users, function(user) { return user.age >= 30; });
console.log(over_30_2);

// go 적용
_go(users, function(users) {
   return _filter_2(users, function(user){
       return user.age >= 30;
   },
   console.log);
});

console.clear();

function _filter(list, predi) {
    var new_list = [];
    _each(list, function(val) {
        if (predi(val)) new_list.push(val);
    });
    return new_list;
}

/*************************************************************************************
 * mapper
 *************************************************************************************/
// 명령형 함수
var names = [];
for (var i = 0; i < temp_users.length; i++) {
    names.push(temp_users[i].name);
}
console.log(names);

// map 적용
function _map_1(list, mapper) {
    var new_list = [];
    for (var i = 0; i < list.length; i++) {
        new_list.push(mapper(list[i]));
    }
    return new_list;
}
var names1 = _map_1(users, function(user) {
    return user.name;
});
console.log(names1);

// each 적용
function _map_2(list, mapper) {
    var new_list = [];
    _each(list, function(item){
        new_list.push(mapper(item));
    });
    return new_list;
}
var names2 = _map_2(users, function(user) {
    return user.name;
});
console.log(names2);

// get 적용
var names3 = _map_2(users, _get('name'));
console.log(names3);

console.clear();

var _filter = _curryr(_filter_2),
    _map = _curryr(_map_2);

_go(users,
    _filter(function(user) { return user.age >= 30; }),
    _map(_get('name')),
    console.log);
var users = [
    { id: 1, name: 'ID', age: 36 },
    { id: 2, name: 'BJ', age: 32 },
    { id: 3, name: 'JM', age: 32 },
    { id: 4, name: 'PJ', age: 27 },
    { id: 5, name: 'HA', age: 25 },
    { id: 6, name: 'JE', age: 26 },
    { id: 7, name: 'JI', age: 31 },
    { id: 8, name: 'MP', age: 23 }
];

/*************************************************************************************
 * each
 *************************************************************************************/

function _each(list, iter){
    for(var i =0; i < list.length; i++){
        iter(list[i]);
    }
    return list;
}

/*************************************************************************************
 * curry
 *************************************************************************************/

function _curry(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a,b) : function(b) {
            return fn(a, b);
        }
    }
}

var add = _curry(function(a, b){
    return a + b;
});

console.log(add(1)(2));

var add3 = add(3);

console.log(add3(5));


/*************************************************************************************
 * curryr
 *************************************************************************************/

function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) {
            return fn(b, a);
        }
    }
}

var minus = _curryr(function(a, b){
    return a - b;
});

console.log(minus(1)(2));

var minus3 = minus(3);

console.log(minus3(5));


/*************************************************************************************
 * get
 *************************************************************************************/
function _get(obj, key) {
    return obj == null ? undefined : obj[key];
}

var _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
});

var get_name = _get("name");

console.log(get_name(users));


/*************************************************************************************
 * reduce
 *************************************************************************************/

var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}


function _reduce(list, iter, memo) {
    if(arguments.length == 2){
        memo = list[0];
        list = _rest(list);
    }

    _each(list, function(item) {
        memo = iter(memo, item);
    });

    return memo;
}

var a = _reduce([1,2,3,4], add);

console.log(a);

/*************************************************************************************
 * pipe
 *************************************************************************************/
function _pipe() {
    var fns = arguments;

    return function(arg) {
        return _reduce(fns, function(arg, fn) {
            return fn(arg);
        }, arg);
    }
}

var f1 = _pipe(
    function(a) { return a + 1; },
    function(a) { return a * 2; },
    function(a) { return a * a; });

console.log( f1(1) );

/*************************************************************************************
 * go (즉시 실행되는 pipe 함수)
 *************************************************************************************/
function _go(arg) {
    var fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg);
}

/*************************************************************************************
 * filter
 ************************************************************************************/
// 명령형 함수
var temp_users = [];
for (var i = 0; i < users.length; i++) {
    if (users[i].age >= 30) {
        temp_users.push(users[i]);
    }
}
console.log(temp_users);

// filter 적용
function _filter_1(list, predi) {
    var new_list = [];
    for(var i = 0; i < list.length; i++){
        if(predi(list[i])){
            new_list.push(list[i]);
        }
    }
    return new_list;
}
var over_30_1 = _filter_1(users, function(user) { return user.age >= 30; });
console.log(over_30_1);

// each 적용
function _filter_2(list, predi){
    var new_list = [];
    _each(list, function(item){
        if(predi(item)){
            new_list.push(item);
        }
    });
    return new_list;
}

var over_30_2 = _filter_2(users, function(user) { return user.age >= 30; });
console.log(over_30_2);

// go 적용
_go(users, function(users) {
    return _filter_2(users, function(user){
            return user.age >= 30;
        },
        console.log);
});

console.clear();

function _filter(list, predi) {
    var new_list = [];
    _each(list, function(val) {
        if (predi(val)) new_list.push(val);
    });
    return new_list;
}

// curryr 적용
var _filter = _curryr(_filter_2);

/*************************************************************************************
 * mapper
 *************************************************************************************/
// 명령형 함수
var names = [];
for (var i = 0; i < temp_users.length; i++) {
    names.push(temp_users[i].name);
}
console.log(names);

// map 적용
function _map_1(list, mapper) {
    var new_list = [];
    for (var i = 0; i < list.length; i++) {
        new_list.push(mapper(list[i]));
    }
    return new_list;
}
var names1 = _map_1(users, function(user) {
    return user.name;
});
console.log(names1);

// each 적용
function _map_2(list, mapper) {
    var new_list = [];
    _each(list, function(item){
        new_list.push(mapper(item));
    });
    return new_list;
}
var names2 = _map_2(users, function(user) {
    return user.name;
});
console.log(names2);

// get 적용
var names3 = _map_2(users, _get('name'));
console.log(names3);


console.clear();

// go 적용

var _map = _curryr(_map_2);

_go(users,
    _filter(function(user) { return user.age >= 30; }),
    _map(_get('name')),
    console.log);

_go(users,
    _filter(user => user.age < 30),
    _map(_get('age')));