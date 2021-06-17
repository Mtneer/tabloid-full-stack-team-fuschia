using Microsoft.Data.SqlClient;
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
           

            if (reader.IsDBNull("title"))
            {
                ThisCategory.IsUsed = false;
            }
            else
            {
                ThisCategory.IsUsed = true;
            }

            return ThisCategory;

        }
    }
}
