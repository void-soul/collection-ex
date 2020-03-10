# Extend the set/map so that it can support objects

## SetEx

```
const {SetEx} from 'collection-ex';

const set = new SetEx<Cpuser>('userid');

set.add({userid: 1,name: 'one'});
set.add({userid: 2,name: 'two'});

set.size(); // 2

set.add({userid: 1, name: 'one-one'});

set.size(); // 2
```

## MapEx

```
const {MapEx} from 'collection-ex';

const map = new MapEx<string,Cpuser>({userid: 1,name: 'one'});
Array.from(map.keys()); // [userid, name]
```

## MapClass

```
const {MapClass} from 'collection-ex';

const map = new MapClass<Cpuser>({userid: 1,name: 'one'});
map.delete('name');

map.toClass(); // {userid: 1}

```
