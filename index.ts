import {app} from './app.ts'

const hostname = '127.0.0.1';
const port = 3003;
app.listen(port, hostname, (error : Error) : void => {
    if(error){
        console.error(error);
    }
    else {
        console.log(`Server running at http://${hostname}:${port}/`);
    }
});