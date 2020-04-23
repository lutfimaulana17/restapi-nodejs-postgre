const sql = require("./db.js")

//constructor
const Customer = function(customer) {
    this.email = customer.email
    this.name = customer.name
    this.active = customer.active
}

Customer.create = (newCustomer, result) => {
    const {email, name, active} = newCustomer
    sql.query(`INSERT INTO customers (email, name, active) VALUES ('${email}', '${name}', ${active})`, (err, res) => {
        if (err) {
            console.log("error", err)
            result(err, null)
            return
        }

        console.log("created customer: ", {id: res.insertId, ...newCustomer})
        result(null, { id: res.insertId, ...newCustomer })
    })
}

Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("found customer: ", res[0])
            result(null, res[0])
            return
        }

        //if not found
        result({ kind: "not_found" }, null)
    })
}

Customer.getAll = result => {
    sql.query("SELECT * FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        }

        console.log("customers: ", res)
        result(null, res)
    })
}

Customer.updateById = (id, customer, result) => {
    sql.query(
        `UPDATE customers SET email = '${customer.email}', name = '${customer.name}', active = '${customer.active}' WHERE id = ${id}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(null, err)
                return
            }

            if (res.affectedRows == 0) {
                //not found customer with the id
                result({ kind: "not_found" }, null)
                return
            }

            console.log("updated customer: ", {id: id, ...customer})
            result(null, {id: id, ...customer})
        }
    )
}

Customer.remove = (id, result) => {
    sql.query(`DELETE FROM customers WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        }
        
        if (res.affectedRows == 0) {
            // not found customer with the id
            result({ kind: "not_found" }, null)
            return
        }
    
        console.log("deleted customer with id: ", id)
        result(null, res)
    })
}

Customer.removeAll = result => {
    sql.query("DELETE FROM customers", (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }
  
      console.log(`deleted ${res.affectedRows} customers`)
      result(null, res)
    })
}

module.exports = Customer