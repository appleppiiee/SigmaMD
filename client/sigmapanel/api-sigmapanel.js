const create = async (user) => { 
    try {
    let response = await fetch('/api/sigmapanels/', { 
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json' 
    },
    body: JSON.stringify(user) 
    })
    return await response.json() 
    } catch(err) {
    console.log(err) 
    }
    }
    const list = async (signal) => { 
    try {
    let response = await fetch('/api/sigmapanels/', { 
    method: 'GET',
    signal: signal, 
    })
    return await response.json() 
    } catch(err) {
    console.log(err) 
    }
    }
    const read = async (params, credentials, signal) => { 
    try {
    let response = await fetch('/api/sigmapanels/' + params.userId, { 
    method: 'GET',
    signal: signal, 
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + credentials.t 
    }
    })
    return await response.json() 
    } catch(err) {
    console.log(err) 
    }
    }
    const update = async (params, credentials, user) => { 
    try {
    let response = await fetch('/api/sigmapanels/' + params.userId, { 
    method: 'PUT',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + credentials.t 
    },
    body: JSON.stringify(user) 
    })
    return await response.json() 
    } catch(err) {
    console.log(err) 
    }
    }
   
    export { create, list, read, update }
    