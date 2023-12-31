
var con = require('./connection');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));

app.set('view engine','ejs');

app.get('/',function(req,res){
    res.sendFile(__dirname+'/register.html');
})



app.post('/',function(req,res){
    var name = req.body.name;
    var id = req.body.id;
    var sem = req.body.sem;
    var credit = req.body.credit;

    con.connect(function(error)
    {
        if(error) throw error;

        var sql = "INSERT INTO student(name,id,sem,credit) VALUES('"+name+"','"+id+"','"+sem+"','"+credit+"')";
        con.query(sql,function(error,result){
            if(error) throw error;
            res.redirect('/student');
           // res.send('registerd successfully '+result.insertId);
        })
    })
})

app.get('/student',function(req,res)
{
    con.connect(function(error)
    {
        if(error) console.log(error);
        var sql = "select * from student";
        con.query(sql,function(error,result)
        {
            if(error) console.log(error);
           //  console.log(result);
             res.render(__dirname+'/student',{student:result});
        })
    })
})
app.get('/delete-student',function(req,res)
{
    con.connect(function(error)
    {
        if(error) console.log(error);
        var sql = "delete from student where id=?";
        var id = req.query.id;
        con.query(sql,[id],function(error,result)
        {
            if(error) console.log(error);
           //  console.log(result);
           //  res.render(__dirname+'/student',{student:result});
            res.redirect('/student')
        })
    })

})
app.get('/update-student',function(req,res)
{
    con.connect(function(error)
    {
        if(error) console.log(error);
        var sql = "select * from student where id=?";
        var id = req.query.id;
        con.query(sql,[id],function(error,result)
        {
            if(error) console.log(error);
           //  console.log(result);
             res.render(__dirname+'/update-student',{student:result});
            
        })
    })

})

app.post('/update-student',function(req,res)
{
    var name = req.body.name;
    var id = req.body.id;
    var sem = req.body.sem;
    var credit = req.body.credit;
    con.connect(function(error)
    {
        if(error) console.log(error);
        var sql = "UPDATE student set name=?, sem=?, credit=? where id=?";
        con.query(sql,[name, sem, credit, id],function(error,result)
        {
            if(error) console.log(error);
           res.redirect('/student');
            
            
        })
    })

})

app.get('/search-student',function(req,res)
{
    con.connect(function(error)
    {
        if(error) console.log(error);
        var sql = "select * from student";
        con.query(sql,function(error,result)
        {
            if(error) console.log(error);
           //  console.log(result);
             res.render(__dirname+'/search-student',{student:result});
        })
    })
})

app.get('/search',function(req,res)
{
    var name = req.query.name
    var id = req.query.id

    con.connect(function (error)
        {
            if(error) console.log("error");

            var sql = "select * from student where name LIKE '%"+name+"%' AND id LIKE '%"+id+"%'"
            con.query(sql,function(error,result)
            {
                if(error) console.log("error")
                res.render(__dirname+"/search-student",{student:result})
            })
        })
})
app.listen(7000);
