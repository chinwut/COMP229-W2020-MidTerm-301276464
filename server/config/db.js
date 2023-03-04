/** 
  db.js
  Student Name: Chinnawut Boonluea
  Student ID: 301276464
  Date: 2023-03-03
**/

// Purpose: This file is used to connect to the MongoDB database
const dbUrl = process.env.DATABASE_URL || "mongodb://localhost/books229";

module.exports =
{
    "URI": dbUrl
}