using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void AddPostTag(int postId, List<int> tagIds);
        void DeletePostTag(int postId, List<int> tagIdsToRemove);
        List<Tag> GetPostTags(int postId);
    }
}