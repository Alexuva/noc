import { envs } from './config/plugins/env.plugins';
import { Server } from './presentation/server';

(async ()=>{
    main();
})();

function  main(){
    Server.start();
}