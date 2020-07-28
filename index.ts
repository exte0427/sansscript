const path=(code:string):Array<{string:string,code:string}>=>{
    const array:Array<{string:string,code:string}>=[];
    const codeList:string[]=code.split(``);
    for(let i=0;i<codeList.length;i+=0){
        const data=pather(codeList,i);
        i=data.i;
        array.push({string:data.str,code:data.type});
    };
    return array;
};
const pather=(codeList:string[],i:number):{type:string,str:string,i:number}=>{
    let is:string=``,j:number=i,str:string;
    const test=(stro:string):number=>{
        let ii;
        for(ii=0;ii<stro.split(``).length;ii++){
            if(stro.split(``)[ii]!=codeList[i+ii]){
                return 0;
            }
        }
        return i+ii;
    }
    //실행
    if(test(`와!`)!=0){
        j=test(`와!`);
        str="(";
        is="(";
    }
    else if(test(`아시는구나`)!=0){
        j=test(`아시는구나`);
        str=")";
        is=")";
    }
    else if(test(`그게 가능할 거라 생각해?`)!=0){
        j=test(`그게 가능할 거라 생각해?`);
        str="?";
        is="if";
    }
    else if(test(`샌즈와의전투`)!=0){
        j=test(`샌즈와의전투`);
        str="while";
        is="loop";
    }
    else if(test(`그럼`)!=0){
        j=test(`그럼`);
        str="{\n";
        is="then";
    }
    else if(test(`그래`)!=0){
        j=test(`그래`);
        str="\n}";
        is="end";
    }
    else if(test(`\n`)!=0){
        j=test(`\n`);
        str="\n";
        is="endl";
    }else if(test(` `)!=0){
        j=test(` `);
        str=" ";
        is="space";
    }
    else if(test(`헤,`)!=0){
        j=test(`헤,`);
        let strs="`";
        for(j;codeList[j+1]!=="친"|| codeList[j+2]!=="구";j++){
            strs+=codeList[j];
        }
        strs+=codeList[j];
        j+=3;
        str=strs+"`";
        is="string";
    }
    else if(test(`더하기`)!=0){
        j=test(`더하기`);
        str="+";
        is="+";
    }
    else if(test(`빼기`)!=0){
        j=test(` 빼기 `);
        str="-";
        is="-";
    }
    else if(test(`나누기`)!=0){
        j=test(` 나누기 `);
        str="/";
        is="/";
    }
    else if(test(`곱하기`)!=0){
        j=test(`곱하기`);
        str="*";
        is="*";
    }
    else if(codeList[j]==="는"){
        j=j+1;
        str="=";
        is="=";
    }
    else if(codeList[j]==="은"){
        j=j+1;
        str="=";
        is="=";
    }
    else if(test(`터어얼렸구나`)!=0){
        j=test(`터어얼렸구나`);
        str="break;";
        is="break";
    }
    else if(test(`의지`)!=0){
        j=test(`의지`);
        str="return ";
        is="return";
    }
    else if(test(`몰라요`)!=0){
        j=test(`몰라요`);
        str="!";
        is="not";
    }else if(test(`샌즈의`)!=0){
        j=test(`샌즈의`);
        let strs="";
        for(j; codeList[j]!==`하` || codeList[j+1]!==`기`;j++){
            if(codeList[j]==`값`){
                j--;
                break;
            }
            //console.log(codeList[j]);
            strs+=codeList[j];
        }
        j+=2;
        str=strs;
        is="identifi";
    }else if(test(`.`)!=0){
        j=test(`.`);
        str="\n";
        is="endl";
    }else if(test(`의`)!=0){
        j=test(`의`);
        str=".";
        is="and";
    }else if(test(`길이`)!=0){
        j=test(`길이`);
        str="length";
        is="length";
    }
    else if(test(`배열`)!=0){
        j=test(`배열`);
        str="[";
        is="[";
    }else if(test(`끗`)!=0){
        j=test(`끗`);
        str="]";
        is="]";
    }
    //끝
    else{
        is=codeList[i];
        str=codeList[i];
        j++;
    }
    return {type:is,str,i:j};
}
const comp=code=>{
    let JScode:string="";
    let pathData=path(code);
    let j:number=0;
    for(let i=0;i<pathData.filter(data=>data.string===`\n`).length;i++){
        let data=[];
        for(j;j<pathData.length;j++){
            if(pathData[j].string===`\n`)
                break;
            if(pathData[j].string!==` `)
                data.push({string:pathData[j].string,code:pathData[j].code});
        }
        j++;
        if(data.length!==0){
            JScode+=`${compp(data.map(a=>a.string).join(``))}\n`;
        }
    }
    try{
        eval(JScode);
    }catch(err){
        console.log(JScode);
        console.log(err);
    }
}
const compare = (d:string,a:string):boolean=>{
    let t=a.split(">");
    let str:string=d;
    for(let i=0;i<t.length;i++){
        const th=t[i].split("<")[0];
        if(str.indexOf(th)!=-1){
            str=str.replace(th,"");
        }
        else{
            return false;
        }
    }
    return true;
}
const data=(d:string,a:string):any[]=>{
    let t=a.split(">");
    let str=d;
    for(let i=0;i<t.length;i++){
        const th=t[i].split("<")[0];
        if(str.indexOf(th)!=-1){
            str=str.replace(th,"※");
        }
    }
    const str2=[];
    str.split("※").map(a=>{if(a!="" && a!=undefined){str2.push(a);}});
    let returnStr:string[]=[];
    str2.map(a=>{
        if(a.startsWith(`)`)){
            returnStr[returnStr.length-1]=returnStr[returnStr.length-1]+a;
        }else{
            returnStr.push(a);
        }
    });
    return returnStr;
}
const compp=(code):string=>{
    let returnText:string="";
    const codeSTR=code;
    const comright=(datas:string,returndata:string):string=>{
        if(compare(codeSTR,datas)){
            const wa=data(codeSTR,datas).map(a=>compp(a));
            let returndatas:string=returndata;
            while(1){
                if(returndatas.indexOf(`<data`)==-1){
                    break;
                }
                const ii:number=Number(returndatas.charAt(returndatas.indexOf(`<data`)+5));
                if(wa[ii-1]==undefined){
                    returndatas=returndatas.replace(`<data${ii}>`,"");
                }else{
                    returndatas=returndatas.replace(`<data${ii}>`,wa[ii-1]);
                }
            }
            return returndatas;
        }else{
            return "";
        }
    }
    if(returnText===""){returnText=comright(`(<data1>)<data2>?<data3>{`,`if(<data2><data1>)<data3>{`);} //if
    if(returnText===""){returnText=comright(`샌즈하기<data1>`,`let <data1>`);}  //선언
    if(returnText===""){returnText=comright(`말(<data1>)`,`console.log(<data1>)`);} //출력
    if(returnText===""){returnText=comright(`while(<data1>)<data2>{`,`while(<data2><data1>){`);} //와일
    if(returnText===""){returnText=comright(`샌즈선언<data1>(<data2>){`,`function <data1>(<data2>){`);} //샌즈선언
    if(returnText===""){returnText=codeSTR;}
    return returnText;
}
comp(`
샌즈선언 샌즈의인덱스오브하기와!샌즈의배열값,샌즈의문자값아시는구나 그럼 
    샌즈하기 샌즈의i값은0
    샌즈하기 샌즈의returndata값은false
    샌즈와의전투 와!샌즈의i값<은샌즈의배열값의길이아시는구나 그럼
        와!샌즈의배열값 배열샌즈의i값끗은는샌즈의문자값 아시는구나 그게 가능할 거라 생각해? 그럼
        샌즈의returndata값은 샌즈의i값
        터어얼렸구나
        그래
        샌즈의i값더하기는1
    그래
    의지 샌즈의returndata값
그래
샌즈의말하기와!샌즈의인덱스오브하기와!배열0,3,4끗,샌즈의3값아시는구나아시는구나
`);