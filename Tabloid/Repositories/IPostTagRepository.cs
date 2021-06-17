using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void AddPostTag(PostTag postTag);
        void DeletePostTag(int postId, List<int> tagIdsToRemove);
        List<Tag> GetPostTags(int postId);
    }
}