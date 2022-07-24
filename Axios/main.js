//AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


function getTodos() {
    // console.log('GET Request');.
    // axios({
    //     method :'Get',
    //    url : 'https://jsonplaceholder.typicode.com/todos',
    //    params:{
    //     _limit : 5
    //    }
    // })
    // .then(res => showOutput(res))
    // .catch(arr => console.log(arr));
    axios
        .get('https://jsonplaceholder.typicode.com/todos?_limit=5')   // if we do axios it will get automatically
        .then(res => showOutput(res))
        .catch(err => console.log(err))
}

// POST REQUEST
function addTodo() {
    // console.log('POST Request');
    axios
        .post('https://jsonplaceholder.typicode.com/todos', {
            titile: 'Sajid New tOdO',
            completed: false
        })
        .then(res => showOutput(res))
        .catch(arr => console.log(arr));

}

// PUT/PATCH REQUEST
function updateTodo() {
    axios
        .patch('https://jsonplaceholder.typicode.com/todos/1', {  // we can use .put of .patch anyone
            titile: 'updated New tOdO',
            completed: true
        })
        .then(res => showOutput(res))
        .catch(arr => console.log(arr));

}

// DELETE REQUEST
function removeTodo() {
    //console.log('DELETE Request');
    axios
        .delete('https://jsonplaceholder.typicode.com/todos/1')   //delete kr rhe isliye object ki need nhi
        .then(res => showOutput(res))
        .catch(arr => console.log(arr));
}

// SIMULTANEOUS DATA  //agar post or todo ek sath lena ho mtlb ek se jada data ek sath lena ho to we use this this takes in the form of array
function getData() {
    // console.log('Simultaneous Request');
    axios
        .all([
            axios.get('https://jsonplaceholder.typicode.com/todos/1'),
            axios.get('https://jsonplaceholder.typicode.com/todos/1')

        ])
        //   .then(res => {
        //     console.log(res[0]);
        //     console.log(res[1]);
        //     showOutput(res[1]);
        //   })
        .then(axios.spread((todos, posts) => showOutput(posts)))
        .catch(err => console.log(err));
}

// CUSTOM HEADERS
  //  console.log('Custom Headers');
  function customHeaders(){
    const config = {

        headers : {
             'Content-Type' : 'application/json',
             Authorization : 'sometoken'
        }
    };

    axios
    .post (
        'https://jsonplaceholder.typicode.com/todos',
        {
            title : 'New Todo',
            completed : false
        },
        config
    )
    .then (res => showOutput(res))
    .catch(err => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    // console.log('Transform Response');
    const options = {
        method : 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
            title : 'Hello Sajid'
        },
        transformResponse : axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    };
    axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
    // console.log('Error Handling');
    axios
    .get('https://jsonplaceholder.typicode.com/todoss')   
    .then(res => showOutput(res))
    .catch(err => {
        if(err.response){
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);

            if(err.response.status === 404){
                alert('Error : Page not found');
            }
        } else if (err.request){
            //request was made but no response
            console.log(err.request);

        } else{
            console.error(err.message);
        }
    });

}

// CANCEL TOKEN
function cancelToken() {
    // console.log('Cancel Token');
    const source = axios.CancelToken.source();

    axios
    .get('https://jsonplaceholder.typicode.com/todos', {
        cancelToken : source.token
    })
    .then (res => showOutput(res))
    .then(thrown => {
        if(axios.isCancel(thrown)){
            console.log('Request canceled' , thrown.message);
        }
    });

    if(true){
        source.cancel('Request canceled!');
    }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
    config => {
        console.log(
            `${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`
        );
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// AXIOS INSTANCES

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});
axiosInstance.get('/comments').then(res => showOutput(res));

// Show output in browser
function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
