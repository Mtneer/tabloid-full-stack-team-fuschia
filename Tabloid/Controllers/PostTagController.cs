using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        // Define private properties for the PostController to link the relevant repositories.
        private readonly IPostTagRepository _postTagRepository;

        // Create a Constructor Method to instantiate the controller
        public PostTagController(IPostTagRepository postTagRepository)
        {
            _postTagRepository = postTagRepository;
        }

        // POST api/<PostTagController>
        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            _postTagRepository.AddPostTag(postTag);
            return NoContent();
        }

        // DELETE api/<PostTagController>/5
        [HttpDelete("{postTagId}")]
        public IActionResult Delete(int postTagId)
        {
            _postTagRepository.DeletePostTag(postTagId);
            return NoContent();
        }
    }
}
