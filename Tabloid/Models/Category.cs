using System.ComponentModel;

namespace Tabloid.Models
{
    public class Category
    {
        public int Id { get; set; }

        [DisplayName("Category Name")]
        public string Name { get; set; }
    }
}