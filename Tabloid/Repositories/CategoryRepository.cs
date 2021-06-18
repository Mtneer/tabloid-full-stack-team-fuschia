﻿using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration config) : base(config) { }
        public List<Category> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.title ,c.Id AS CategoryId, c.[Name] AS CategoryName
                         FROM Category c
                         LEFT JOIN Post p ON p.CategoryId = c.Id";

                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();

                    while (reader.Read())
                    {
                    //checks if category with same name exists, if not add it         
                    if (categories.Any(item => item.Name == NewCategoryFromReader(reader).Name))
                        {
                            
                         }else
                        {
                            categories.Add(NewCategoryFromReader(reader));
                        }
                    }

                    reader.Close();

                    return categories;
                }
            }
        }

        public void Add(Category category)
        {
            
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Category (
                            Name )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name
                                )";
                    cmd.Parameters.AddWithValue("@Name", category.Name);
                    

                    category.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Category
                            WHERE Id = @id 
                            
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Category GetById(int id)
        {
            // Define a variable to identify the database connection
            // ("Connection" comes from the BaseRepository.cs)
            using (var conn = Connection)
            {
                conn.Open();
                // Open the connection to the database.
                using (var cmd = conn.CreateCommand())
                {
                    // Instantiate a variable called cmd to use as short-hand for defining the SQL query.
                    cmd.CommandText = @"
                       SELECT  Id as CategoryId, Name as CategoryName
                              
                         FROM Category 
                              WHERE Id = @id";
                    // Attach the UserId parameter to the SQL Query using SQLConnection provided methods
                    cmd.Parameters.AddWithValue("@id", id);
                    // Execute the Query
                    var reader = cmd.ExecuteReader();

                    Category category = null;

                    while (reader.Read())
                    {
                        if (category == null)
                        {
                            category = NewCategoryFromReader(reader);
                        }

                        
                    }

                    reader.Close();

                    return category;
                }
            }
        }

        public void Edit(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Category
                                        SET Name = @name
                                            
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", category.Id);
                    cmd.Parameters.AddWithValue("@name", category.Name);
                    

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void CheckUsed(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            WHERE Id = @id AND Id NOT IN(
                                SELECT Post.CategoryId
                                FROM Post 
                            )
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Category NewCategoryFromReader(SqlDataReader reader)
        {
             var ThisCategory = new Category()
            {
                Id = DbUtils.GetInt(reader, "CategoryId"),
                Name = DbUtils.GetString(reader, "CategoryName")
            };
            //checked to see if title of each row is null, if null, category isnt being used, set isUsed to false

            try
            {
                if (reader.IsDBNull("title"))
                {
                    ThisCategory.IsUsed = false;
                }
                else
                {
                    ThisCategory.IsUsed = true;
                }
            }
            catch (Exception e)
            {
                //  Block of code to handle errors
            }
            

            return ThisCategory;

        }
    }
}
