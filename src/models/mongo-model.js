////represents generic mongoose model

class Model {
    constructor (schema) {
    this.schema= schema;
    }
//CRUD OPERATORS 
    create(record) {
        const newRecord = new this.schema(record);
        return newRecord.save();
    }

    read(id) {
        const queryObject = id ? { _id: id } : {};
        return this.schema.find(queryObject);
    }

    update(id, record){
        return this.schema.findByIdAndUpdate(id, record, {new:true})
    }

    delete(id){
        return this.schema.findByIdAndDelete(id)

    }
}

module.exports = Model