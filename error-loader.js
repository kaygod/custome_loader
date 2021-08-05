const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require('@babel/generator').default;
const t = require("@babel/types");

const ErrorLoader =  function (content,map,meta){
  
  const ast = parser.parse(content);

  traverse(ast,{
    FunctionDeclaration(path){

        const isAsyncFun = t.isFunctionDeclaration(path.node,{async:true});

        if(!isAsyncFun){
          return ;
        }

        const bodyNode = path.get("body");

        // 是不是大括号表达式
        if(t.isBlockStatement(bodyNode)){

           const FunNode = bodyNode.node.body;

           if(FunNode.length == 0) { // 空函数
             return; 
           }

           if(FunNode.length !== 1 || t.isTryStatement(FunNode[0])){ // 函数内没有被try ... catch 包裹
            
            // 异常捕捉的代码
            const code = `    
                 console.log(error);
            `;

            //生成目标ast语法树
            const resultAst = t.tryStatement(
              bodyNode.node,
              t.catchClause(t.identifier("error"),
              t.blockStatement(parser.parse(code).program.body) 
              )
            )

            bodyNode.replaceWithMultiple([resultAst]);
           
          }

        }
     }
  })

  this.callback(null,generate(ast).code,map,meta);

}

module.exports = ErrorLoader;