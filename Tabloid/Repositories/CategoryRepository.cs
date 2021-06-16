using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
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
                       SELECT c.Id AS CategoryId, c.[Name] AS CategoryName
                         FROM Category c";
                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();

                    while (reader.Read())
                    {
                        categories.Add(NewCategoryFromReader(reader));
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

        private Category NewCategoryFromReader(SqlDataReader reader)
        {
            return new Category()
            {
                Id = DbUtils.GetInt(reader, "CategoryId"),
                Name = DbUtils.GetString(reader, "CategoryName")

            };
        }
    }
}
