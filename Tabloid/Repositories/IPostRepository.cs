using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);
        void Edit(Post post);
        List<Post> GetAllPublishedPosts();
        List<Post> GetPostsByUserId(int id);
        Post GetById(int id);
    }
}