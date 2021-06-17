using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        // Include property of PostTagId so that when a PostTag relationship is removed from a Post, it can be properly referenced in the DELETE fetch call.
        // This property will only be useful in the List<Tags> Tags property on a Post object in the GetByPostId method
        public int PostTagId { get; set; }
    }
}