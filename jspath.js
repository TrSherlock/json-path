function jsonQuery(obj, path) {
    return path.split('/').reduce((a,b)=>{
        if(a?.[b]) {
            a = a[b];
        } else {
            if(b.includes('?')) {
                const [prop, query] = b.split('?');
                const [attr, value] = query.split('=');
                // console.log(a);
                if(Array.isArray(a)){
                    a = a.find(r => r[prop][attr] === value)?.[prop]['#text']
                } else {
                    // console.log(a);
                    a = a[prop]?.['#text'];
                }
                // a = a.find(r => r[prop][attr] === value)?.[prop]['#text']
            } else {
                if(Array.isArray(a)){
                    a = a.map(r => {
                        if(r[b]) {
                            return r[b];
                        }
                    }).filter(r => r !== undefined);
                } else {
                    a = '';
                }
            }
        }
        return a;
    },obj)
}


const path = 'Invoice/cbc:ID';
jsonQuery(obj, path)
