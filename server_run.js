import fs from 'fs'
import http from 'http'
import {parse} from 'querystring'


http.createServer((req,res)=>{
    if(req.method==="GET"&&req.url === '/'){ 
        let data = fs.readFileSync('table.html')
        let list = fs.readFileSync('data.txt').toString().split(`*`)
        let empList = []
        list.map(val=>
            empList.push(JSON.parse(val))
            )
            let body = ''
            empList.map(val=>
                body+=`<tr><td>${val.name}</td><td>${val.age}</td><td>${val.city}</td><td>${val.salary}</td></tr>`
                )
                res.write(`${data} ${body} 
                </tbody>
                </table>
                </body>
                </html>    
                `)
                res.end()
    } 
        else if(req.method =='GET' && req.url ==='/addemplyoee'){
            let data = fs.readFileSync('AddEmplyoee.html')
            res.write(data)
            res.end()
        }

     else if(req.method=="POST" ){
        let body='';
        req.on('data',(data)=>{
            body = parse(data.toString())
            fs.appendFile('data.txt',`*${JSON.stringify(body)}`,(err)=>{if (err) throw err;
            console.log(body);
            })
        })

        req.on('end',()=>{
            res.writeHead(301, { "Location": "http://localhost:6677/" });
                res.end()
            })
 
        }


})
.listen(6677,()=>{
    console.log("listening on port 6677");
})