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
