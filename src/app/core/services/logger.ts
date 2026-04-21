
export default class Logger{

    static log(caller: string, data: any) {
        console.log({ caller, data });
    }

};
