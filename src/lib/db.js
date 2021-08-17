import { dbAuthKey, dbURL } from '.\\db_auth.js';

class DBClient {
    constructor ({
        url = '',
        auth_key = ''
    }) {
        this.url = url;
        this.headers = {
            'x-hasura-admin-secret': auth_key
        }
        this.queries = {};
    }

    addQuery(queryName, query, requiresVariables) {
        this.queries[queryName] = {
            query: query,
            variables: requiresVariables
        }
    }

    query(queryName, variables=null) {
        if (!(queryName in this.queries)) return -1;
        if (this.queries.variables && variables===null) return -2;

        let body = this.queries[queryName].query
        
        if (variables !== null) {
            let keys = Object.keys(variables);

            for(var i = 0; i < keys.length; i++) {
                if (body.query.search(keys[i]) != -1) {
                    let v = variables[keys[i]].replace(/\"/g, "\\\"");

                    body.query = body.query
                                        .replace('$'+keys[i], v);
                }
            }
        }

        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data;
            });
    }
}

export const client = new DBClient({url: dbURL, auth_key: dbAuthKey})