const mongoClient = require('mongodb').MongoClient;
const uriDatabase = "mongodb+srv://sotsubo:Guada2015@cluster0-ijn90.mongodb.net/test?retryWrites=true&w=majority";
const chalk = require('chalk'); 

const client = new mongoClient(uriDatabase, { useNewUrlParser: true, useUnifiedTopology: true });
const inventor = {
    first : "Claudio",
    last : "Fernandez",
    year : 2009
}


const newInventor = {
    first : "Claudio",
    last : "Perez",
    year : 1999
}


client.connect()
    .then ((client) => {
        return client.db("sample_betp2").collection("inventors")
    })

    .then((inventors) =>{
        collection=inventors;
        console.log(chalk.green("Crea un inventor"))
        return inventors.insertOne(inventor)
    })
    .then ((result) =>{
        id=result.insertedId
        console.table(chalk.yellow(result))
        return id
    })
    .then((id)=>{
        console.log(chalk.green("Busca inventor"))
        return collection.find({_id:id}).toArray()
    })
    .then((items) =>{
        console.log(`Successfully found ${items.length} documents.`)
        items.forEach(console.log)
        return items._id
      })
    // console.table(chalk.yellow(`Se encontro el id ${id}`))
    //     console.table(resultSearch)
    //     return id
    // })
    .then((id) =>{
        console.log(chalk.green("Modifico el inventor"))
        return  collection.updateOne({_id:id}, {$set: newInventor})
    })
    .then(
    //     (item) =>{
    //     console.log(`Se modifico el documento.`)
    //     console.log(item)
    //     return item._id
    //   })
        (result) =>{
        console.table(chalk.yellow(result))
        return id
    })

    .then((id)=>{
        console.log(chalk.green("Borro inventor"))
        console.log(chalk.green(id))
        return collection.deleteOne({_id:id})
    
    })
    
    .then((result)=>{
        console.table(chalk.yellow(result))

        console.log(chalk.green("Cierro conexion"))

        client.close()
    })
    .catch((err)=>{
        console.error(err)
    })

