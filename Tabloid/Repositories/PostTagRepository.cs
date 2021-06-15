using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration config) : base(config) { }

        public List<Tag> GetPostTags(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT pt.id AS postTagId, pt.PostId, pt.TagId, t.[Name] 
                                          FROM PostTag pt
                                     LEFT JOIN Tag t ON TagId = t.id
                                         WHERE PostId = @id";
                    cmd.Parameters.AddWithValue("@id", postId);

                    var reader = cmd.ExecuteReader();

                    List<Tag> PostTags = new List<Tag>();

                    while (reader.Read())
                    {
                        Tag tag = new Tag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("TagId")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        };
                        PostTags.Add(tag);
                    }

                    reader.Close();
                    return PostTags;
                }
            }
        }

        public void AddPostTag(int postId, List<int> tagIds)
        {
            string sqlQuery = "";
            foreach (int tagId in tagIds)
            {
                sqlQuery += $"INSERT INTO PostTag (PostId, TagId) VALUES ({postId}, {tagId}) ";
            }

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = sqlQuery;

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeletePostTag(int postId, List<int> tagIdsToRemove)
        {
            //throw new NotImplementedException();
            string sqlQuery = "";
            foreach (int tagId in tagIdsToRemove)
            {
                sqlQuery += $"DELETE FROM PostTag WHERE PostId = {postId} AND TagId = {tagId} ";
            }

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = sqlQuery;

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
